<?php
/**
 * Contact form handler for greibersalas.com (runs on IONOS webspace, PHP >= 8.1).
 *
 * - JSON response when called via fetch (Accept: application/json), minimal HTML page otherwise (no-JS fallback).
 * - Anti-spam: honeypot field, minimum fill time, per-IP rate limit (hashed IP, temp dir).
 * - No personal data is stored on the server; the message is only emailed to the site owner.
 */

declare(strict_types=1);

// --- Configuration -----------------------------------------------------------
const MAIL_TO = 'greibersalas@gmail.com';
// Sender must be an address on the site's domain so IONOS relays it and it isn't flagged as spoofed.
const MAIL_FROM = 'noreply@greibersalas.com';
const MAIL_FROM_NAME = 'greibersalas.com';
const RATE_LIMIT_MAX = 5;          // submissions...
const RATE_LIMIT_WINDOW = 3600;    // ...per hour per IP
const MIN_FILL_SECONDS = 3;        // faster submissions are treated as bots

const PROJECT_TYPES = ['web-app' => 'Aplicación web / SaaS', 'b2b' => 'Portal / solución B2B', 'api' => 'API / backend', 'ai' => 'Producto con IA', 'other' => 'Otro'];
const BUDGETS = ['lt-5k' => '< 5.000 €', '5k-15k' => '5.000 – 15.000 €', '15k-30k' => '15.000 – 30.000 €', 'gt-30k' => '> 30.000 €', 'unknown' => 'No lo sabe'];
const TIMELINES = ['asap' => 'Lo antes posible', '1-3m' => '1 – 3 meses', '3m+' => '> 3 meses', 'flexible' => 'Flexible'];

// Messages for the no-JS HTML fallback
const TEXT = [
    'es' => ['ok_title' => 'Mensaje enviado', 'ok' => 'Gracias, te responderé lo antes posible.', 'err_title' => 'No se pudo enviar', 'validation' => 'Faltan datos o hay campos no válidos. Vuelve atrás y revisa el formulario.', 'rate_limit' => 'Has enviado varios mensajes seguidos. Inténtalo más tarde.', 'server' => 'Error al enviar. Escríbeme directamente a ' . MAIL_TO . '.', 'back' => '← Volver a la web', 'home' => '/'],
    'en' => ['ok_title' => 'Message sent', 'ok' => "Thanks, I'll get back to you as soon as possible.", 'err_title' => "Couldn't send", 'validation' => 'Some fields are missing or invalid. Go back and check the form.', 'rate_limit' => "You've sent several messages in a row. Please try again later.", 'server' => 'Sending failed. Email me directly at ' . MAIL_TO . '.', 'back' => '← Back to the site', 'home' => '/en/'],
];

// --- Helpers -----------------------------------------------------------------
function wants_json(): bool
{
    return str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');
}

function respond(bool $ok, string $lang, string $error = '', array $fields = [], int $status = 200): never
{
    http_response_code($status);
    header('Cache-Control: no-store');
    header('X-Robots-Tag: noindex');
    if (wants_json()) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok, 'error' => $error ?: null, 'fields' => $fields], JSON_UNESCAPED_UNICODE);
        exit;
    }
    $t = TEXT[$lang];
    $title = $ok ? $t['ok_title'] : $t['err_title'];
    $body = $ok ? $t['ok'] : ($t[$error] ?? $t['server']);
    header('Content-Type: text/html; charset=utf-8');
    $e = static fn(string $s): string => htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
    echo '<!doctype html><html lang="' . $e($lang) . '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
        . '<meta name="robots" content="noindex"><title>' . $e($title) . ' — Greiber Salas</title>'
        . '<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#060912;color:#eef2fb;font:17px/1.6 system-ui,sans-serif;text-align:center;padding:24px}'
        . 'h1{font-size:2rem;margin:0 0 12px}p{color:#aab4ce}a{color:#4d82ff}</style></head><body><main>'
        . '<h1>' . $e($title) . '</h1><p>' . $e($body) . '</p><p><a href="' . $e($t['home']) . '">' . $e($t['back']) . '</a></p>'
        . '</main></body></html>';
    exit;
}

/** Trimmed single-line string (CR/LF removed to prevent header injection). */
function field(string $key, int $max): string
{
    $value = trim((string)($_POST[$key] ?? ''));
    $value = preg_replace('/[\r\n\t]+/', ' ', $value) ?? '';
    return mb_substr($value, 0, $max);
}

function rate_limited(string $ip): bool
{
    $dir = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'gs-contact';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true)) {
        return false; // fail open: never block real users because of a storage problem
    }
    $file = $dir . DIRECTORY_SEPARATOR . hash('sha256', 'gs-contact|' . $ip) . '.json';
    $now = time();
    $hits = is_file($file) ? (json_decode((string)@file_get_contents($file), true) ?: []) : [];
    $hits = array_values(array_filter($hits, static fn($ts) => is_int($ts) && $ts > $now - RATE_LIMIT_WINDOW));
    if (count($hits) >= RATE_LIMIT_MAX) {
        return true;
    }
    $hits[] = $now;
    @file_put_contents($file, json_encode($hits), LOCK_EX);
    return false;
}

// --- Request handling --------------------------------------------------------
$lang = ($_POST['lang'] ?? '') === 'en' ? 'en' : 'es';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(false, $lang, 'validation', [], 405);
}

// Honeypot filled or submitted too fast: pretend success so bots don't retry
$honeypot = (string)($_POST['website'] ?? '');
$startedAt = (int)($_POST['ts'] ?? 0); // ms timestamp set by JS when the form becomes interactive
$tooFast = $startedAt > 0 && (microtime(true) * 1000 - $startedAt) < MIN_FILL_SECONDS * 1000;
if ($honeypot !== '' || $tooFast) {
    respond(true, $lang);
}

if (rate_limited($_SERVER['REMOTE_ADDR'] ?? 'unknown')) {
    respond(false, $lang, 'rate_limit', [], 429);
}

$name = field('name', 100);
$email = field('email', 254);
$company = field('company', 120);
$projectType = field('project_type', 20);
$budget = field('budget', 20);
$timeline = field('timeline', 20);
$message = mb_substr(trim(str_replace("\r\n", "\n", (string)($_POST['message'] ?? ''))), 0, 5000);
$privacy = ($_POST['privacy'] ?? '') === '1';

$invalid = [];
if (mb_strlen($name) < 2) $invalid[] = 'name';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $invalid[] = 'email';
if (!array_key_exists($projectType, PROJECT_TYPES)) $invalid[] = 'project_type';
if (!array_key_exists($budget, BUDGETS)) $invalid[] = 'budget';
if (!array_key_exists($timeline, TIMELINES)) $invalid[] = 'timeline';
if (mb_strlen($message) < 10) $invalid[] = 'message';
if (!$privacy) $invalid[] = 'privacy';
if ($invalid) {
    respond(false, $lang, 'validation', $invalid, 422);
}

$subject = 'Nuevo contacto web: ' . $name . ($company !== '' ? " ({$company})" : '');
$body = implode("\n", [
    'Nuevo mensaje desde el formulario de greibersalas.com',
    '',
    'Nombre:    ' . $name,
    'Email:     ' . $email,
    'Empresa:   ' . ($company !== '' ? $company : '—'),
    'Proyecto:  ' . PROJECT_TYPES[$projectType],
    'Presupuesto: ' . BUDGETS[$budget],
    'Plazo:     ' . TIMELINES[$timeline],
    'Idioma:    ' . $lang,
    'Privacidad aceptada: sí (' . gmdate('Y-m-d H:i') . ' UTC)',
    '',
    'Mensaje:',
    $message,
]);

$headers = [
    'From: ' . mb_encode_mimeheader(MAIL_FROM_NAME, 'UTF-8') . ' <' . MAIL_FROM . '>',
    'Reply-To: ' . mb_encode_mimeheader($name, 'UTF-8') . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: greibersalas.com contact form',
];

$sent = @mail(MAIL_TO, mb_encode_mimeheader($subject, 'UTF-8'), $body, implode("\r\n", $headers), '-f' . MAIL_FROM);

$sent ? respond(true, $lang) : respond(false, $lang, 'server', [], 500);
