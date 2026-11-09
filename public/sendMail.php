<?php
/**
 * Contact form endpoint. Receives JSON { name, email, message, website } via POST
 * and forwards it to RECIPIENT with PHP's mail(). Responds with JSON { ok: bool }.
 */

declare(strict_types=1);

const RECIPIENT = 'adrianbieber2@gmail.com';
// must be an address on the own domain, otherwise the mail is likely rejected as spoofed
const SENDER = 'noreply@adrian-bieber-portfolio.de';
const ALLOWED_HOSTS = ['adrian-bieber-portfolio.de', 'www.adrian-bieber-portfolio.de'];

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(int $status, bool $ok): void
{
    http_response_code($status);
    echo json_encode(['ok' => $ok]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, false);
}

// only accept requests coming from the own site
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array(parse_url($origin, PHP_URL_HOST), ALLOWED_HOSTS, true)) {
    respond(403, false);
}

$data = json_decode(file_get_contents('php://input') ?: '', true);
if (!is_array($data)) {
    respond(400, false);
}

$field = static fn (string $key): string => is_string($data[$key] ?? null) ? trim($data[$key]) : '';

// honeypot: humans never see this field, bots fill it -> pretend success, send nothing
if ($field('website') !== '') {
    respond(200, true);
}

// no line breaks in the name, it goes into the subject header
$name = preg_replace('/[\r\n]+/', ' ', $field('name'));
$email = $field('email');
$message = $field('message');

if (
    $name === '' || mb_strlen($name) > 100 ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 254 ||
    $message === '' || mb_strlen($message) > 5000
) {
    respond(422, false);
}

$subject = '=?UTF-8?B?' . base64_encode("Portfolio – Nachricht von $name") . '?=';
$body = "Name: $name\nE-Mail: $email\n\n$message\n";
$headers = implode("\r\n", [
    'From: Portfolio <' . SENDER . '>',
    "Reply-To: $email",
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

$sent = mail(RECIPIENT, $subject, $body, $headers, '-f' . SENDER);
respond($sent ? 200 : 500, $sent);
