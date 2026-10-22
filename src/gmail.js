// =============================================================================
// CLIENTE GMAIL — relatório interno de uso (envia a arte exportada por e-mail)
//
// Usa uma conta Google só para automação, via OAuth2 "refresh token" (sem
// interação do usuário — o token de acesso é renovado a cada envio). Escopo
// necessário na credencial: gmail.send.
// Variáveis em .env: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET,
// GOOGLE_REFRESH_TOKEN, REPORT_EMAIL_TO (destinatário).
// =============================================================================

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SEND_URL  = 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send';

async function obterAccessToken() {
  const params = new URLSearchParams({
    client_id:     process.env.GOOGLE_CLIENT_ID ?? '',
    client_secret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN ?? '',
    grant_type:    'refresh_token'
  });

  const resp = await fetch(TOKEN_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:    params
  });

  if (!resp.ok) {
    throw new Error(`Falha ao renovar token do Google (${resp.status})`);
  }
  const json = await resp.json();
  return json.access_token;
}

function codificarAssunto(assunto) {
  // UTF-8 "encoded-word" (RFC 2047) — necessário pra acentos no assunto.
  return `=?UTF-8?B?${Buffer.from(assunto, 'utf-8').toString('base64')}?=`;
}

// Quebra uma string base64 em linhas de 76 colunas — convenção MIME pra
// corpos codificados em base64 (RFC 2045); nem todo cliente tolera uma
// linha única gigante.
function quebrarBase64(base64) {
  return base64.match(/.{1,76}/g)?.join('\r\n') ?? base64;
}

// Monta um e-mail MIME multipart/mixed (texto + um anexo binário) já
// codificado em base64url, no formato que a API do Gmail espera em `raw`.
function montarEmailComAnexo({ to, subject, text, attachment }) {
  const boundary = `limite_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const partes = [
    `To: ${to}`,
    `Subject: ${codificarAssunto(subject)}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    '',
    text,
    '',
    `--${boundary}`,
    `Content-Type: ${attachment.mimeType}; name="${attachment.filename}"`,
    'Content-Transfer-Encoding: base64',
    `Content-Disposition: attachment; filename="${attachment.filename}"`,
    '',
    quebrarBase64(attachment.base64Data),
    '',
    `--${boundary}--`
  ];
  const raw = partes.join('\r\n');
  return Buffer.from(raw, 'utf-8').toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Envia um e-mail com um único anexo binário via Gmail API.
 * @param {{ to: string, subject: string, text: string, attachment: { filename: string, mimeType: string, base64Data: string } }} params
 */
async function enviarEmailComAnexo({ to, subject, text, attachment }) {
  const accessToken = await obterAccessToken();
  const raw = montarEmailComAnexo({ to, subject, text, attachment });

  const resp = await fetch(SEND_URL, {
    method:  'POST',
    headers: {
      Authorization:  `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ raw })
  });

  if (!resp.ok) {
    const corpo = await resp.text().catch(() => '');
    throw new Error(`Gmail recusou o envio (${resp.status}): ${corpo.slice(0, 300)}`);
  }
  return resp.json();
}

module.exports = { enviarEmailComAnexo };
