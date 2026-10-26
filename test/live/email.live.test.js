// =============================================================================
// Teste "ao vivo" — manda um e-mail DE VERDADE via Gmail API (consome as
// credenciais OAuth do .env e chega de fato na caixa de entrada de
// REPORT_EMAIL_TO). Registra o teste manual feito quando o relatório de
// exportação (ver src/gmail.js, POST /api/reportar-exportacao) foi criado.
//
// NÃO roda em "npm test" — só em "npm run test:live", de propósito (manda
// e-mail de verdade a cada execução). Pula sozinho se faltar alguma
// credencial do Google ou o destinatário.
// =============================================================================
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { enviarEmailComAnexo } = require('../../src/gmail');

const TEM_CHAVES = Boolean(process.env.GOOGLE_CLIENT_ID)
  && Boolean(process.env.GOOGLE_CLIENT_SECRET)
  && Boolean(process.env.GOOGLE_REFRESH_TOKEN)
  && Boolean(process.env.REPORT_EMAIL_TO);

if (!TEM_CHAVES) {
  console.warn('\n  ⚠  Credenciais do Google/REPORT_EMAIL_TO ausentes — pulando email.live.test.js.\n');
}

// PNG 1×1 válido (menor anexo possível) — só pra exercitar o envio de
// verdade sem precisar gerar uma arte completa pra isso.
const PNG_MINIMO_BASE64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';

test(
  'envia um e-mail de teste de verdade via Gmail API',
  { skip: !TEM_CHAVES, timeout: 30_000 },
  async () => {
    const resultado = await enviarEmailComAnexo({
      to:      process.env.REPORT_EMAIL_TO,
      subject: '[Teste automatizado] Suíte de testes do Gerador de Artes',
      text:    'E-mail disparado por "npm run test:live" — pode ignorar, não é uma exportação de verdade.',
      attachment: { filename: 'teste.png', mimeType: 'image/png', base64Data: PNG_MINIMO_BASE64 }
    });

    assert.ok(resultado.id, 'a resposta do Gmail deveria incluir o id da mensagem enviada');
  }
);
