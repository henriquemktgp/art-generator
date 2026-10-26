// =============================================================================
// Testes de src/gmail.js — a montagem do e-mail (MIME, sem rede) e, a partir
// daqui, enviarEmailComAnexo com o fetch global MOCKADO (node:test tem um
// mock embutido, equivalente ao pytest-mock/unittest.mock do Python) — exercita
// os caminhos de sucesso e erro sem precisar de rede nem de credencial real.
// Envio de e-mail DE VERDADE (sem mock, contra a API real) fica fora da
// suíte padrão — ver test/live/email.live.test.js.
// =============================================================================
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { enviarEmailComAnexo, montarEmailComAnexo, quebrarBase64, codificarAssunto } = require('../src/gmail');

// Monta um objeto parecido com a Response do fetch — só com o que
// enviarEmailComAnexo/obterAccessToken realmente usam (.ok, .status, .json(), .text()).
function respostaFalsa({ ok, status = 200, corpoJson, corpoTexto }) {
  return {
    ok,
    status,
    json: async () => corpoJson,
    text: async () => corpoTexto ?? JSON.stringify(corpoJson ?? {})
  };
}

const ANEXO_TESTE = { filename: 'f.png', mimeType: 'image/png', base64Data: 'QQ==' };

function decodificarRaw(raw) {
  // Desfaz o base64url (mesma troca que o Gmail espera na ida) pra conferir
  // o conteúdo bruto da mensagem montada.
  const base64 = raw.replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(base64, 'base64').toString('utf-8');
}

test('quebrarBase64 quebra em linhas de até 76 colunas', () => {
  const entrada = 'A'.repeat(200);
  const quebrado = quebrarBase64(entrada);
  const linhas = quebrado.split('\r\n');
  assert.ok(linhas.length > 1);
  for (const linha of linhas) assert.ok(linha.length <= 76);
  assert.equal(linhas.join(''), entrada);
});

test('codificarAssunto produz um "encoded-word" RFC 2047 válido', () => {
  const codificado = codificarAssunto('Arte exportada — Delinte');
  assert.match(codificado, /^=\?UTF-8\?B\?.+\?=$/);
});

test('montarEmailComAnexo monta um MIME multipart/mixed com o anexo correto', () => {
  const raw = montarEmailComAnexo({
    to: 'henrique.araujo@gpcorpbr.com',
    subject: 'Arte exportada — Delinte · feed · padrao',
    text: 'Marca: Delinte\nFormato: feed',
    attachment: { filename: 'delinte-feed-arte.png', mimeType: 'image/png', base64Data: 'ZmFrZS1wbmctZGF0YQ==' }
  });

  // raw precisa estar em base64url (sem '+', '/' ou '=' de padding).
  assert.ok(!/[+/=]/.test(raw), 'raw deve estar em base64url, não base64 padrão');

  const texto = decodificarRaw(raw);
  assert.match(texto, /^To: henrique\.araujo@gpcorpbr\.com/m);
  assert.match(texto, /Content-Type: multipart\/mixed; boundary="/);
  assert.match(texto, /Content-Type: image\/png; name="delinte-feed-arte\.png"/);
  assert.match(texto, /Content-Disposition: attachment; filename="delinte-feed-arte\.png"/);
  assert.match(texto, /Marca: Delinte/);
  assert.match(texto, /ZmFrZS1wbmctZGF0YQ==/);
});

test('montarEmailComAnexo gera um boundary diferente a cada chamada', () => {
  const base = { to: 'a@b.com', subject: 'x', text: 'y', attachment: { filename: 'f.png', mimeType: 'image/png', base64Data: 'QQ==' } };
  const raw1 = decodificarRaw(montarEmailComAnexo(base));
  const raw2 = decodificarRaw(montarEmailComAnexo(base));
  const boundary1 = raw1.match(/boundary="([^"]+)"/)[1];
  const boundary2 = raw2.match(/boundary="([^"]+)"/)[1];
  assert.notEqual(boundary1, boundary2);
});

// ── enviarEmailComAnexo com fetch mockado ────────────────────────────────────
// t.mock.method restaura o fetch original sozinho ao fim de cada teste — não
// precisa de afterEach/restore manual (diferente do pytest, onde normalmente
// se usa um fixture `mocker` pra isso).

test('enviarEmailComAnexo: token OK + Gmail aceita -> devolve o id da mensagem', async (t) => {
  const chamadas = [];
  t.mock.method(globalThis, 'fetch', async (url) => {
    chamadas.push(String(url));
    if (String(url).includes('oauth2.googleapis.com')) {
      return respostaFalsa({ ok: true, corpoJson: { access_token: 'token-falso-123' } });
    }
    return respostaFalsa({ ok: true, corpoJson: { id: 'msg-falso-456' } });
  });

  const resultado = await enviarEmailComAnexo({ to: 'a@b.com', subject: 'x', text: 'y', attachment: ANEXO_TESTE });

  assert.equal(resultado.id, 'msg-falso-456');
  assert.equal(chamadas.length, 2, 'deveria chamar o endpoint de token e depois o de envio');
  assert.match(chamadas[0], /oauth2\.googleapis\.com/);
  assert.match(chamadas[1], /gmail\.googleapis\.com/);
});

test('enviarEmailComAnexo: Gmail recusa o envio (401) -> lança erro com o status', async (t) => {
  t.mock.method(globalThis, 'fetch', async (url) => {
    if (String(url).includes('oauth2.googleapis.com')) {
      return respostaFalsa({ ok: true, corpoJson: { access_token: 'token-falso-123' } });
    }
    return respostaFalsa({ ok: false, status: 401, corpoTexto: '{"error":"invalid_grant"}' });
  });

  await assert.rejects(
    () => enviarEmailComAnexo({ to: 'a@b.com', subject: 'x', text: 'y', attachment: ANEXO_TESTE }),
    /Gmail recusou o envio \(401\)/
  );
});

test('enviarEmailComAnexo: falha ao renovar o token -> nunca chega a tentar enviar', async (t) => {
  const fetchMock = t.mock.method(globalThis, 'fetch', async () => respostaFalsa({ ok: false, status: 400 }));

  await assert.rejects(
    () => enviarEmailComAnexo({ to: 'a@b.com', subject: 'x', text: 'y', attachment: ANEXO_TESTE }),
    /Falha ao renovar token do Google \(400\)/
  );
  assert.equal(fetchMock.mock.calls.length, 1, 'só a chamada de token — nunca deveria tentar mandar o e-mail');
});
