// =============================================================================
// VERIFICAÇÃO DE LOGO DE VEÍCULO (Claude Vision)
//
// Camada extra de segurança sobre a regra mandatória "sem logo de fabricante
// de veículo" (ver REGRA_SEM_LOGO_VEICULO em prompts.js) — o prompt sozinho
// não garante 100% (a API do Magnific não tem negative prompt), então toda
// imagem que pode conter um veículo passa por essa checagem visual antes de
// ser entregue. Ver uso em server.js (loop de até 3 tentativas em
// /api/gerar-fundo).
// =============================================================================

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const MODELO_VISAO  = 'claude-haiku-5-5';

const PROMPT_VERIFICACAO =
  'Olhe esta imagem com atenção. Ela pode conter um veículo (carro, picape, SUV etc.). ' +
  'Responda SOMENTE com a palavra APROVADO ou REPROVADO, sem mais nada. ' +
  'REPROVADO se houver QUALQUER logotipo, emblema, selo, símbolo ou nome de fabricante ' +
  'de veículo visível em qualquer parte da imagem — grade frontal, capô, rodas/calotas, ' +
  'volante, bancos, retrovisores, para-choque, ou em qualquer texto/placa. ' +
  'APROVADO se não houver nenhum logotipo/emblema de fabricante visível (a imagem pode ' +
  'não ter veículo nenhum, ou ter um veículo sem nenhuma marca aparente — os dois casos são APROVADO).';

/**
 * @param {string} base64Png Imagem PNG em base64 (sem o prefixo data:)
 * @returns {Promise<boolean>} true = aprovado (sem logo de fabricante aparente)
 */
async function imagemAprovadaSemLogoVeiculo(base64Png) {
  const apiKey = process.env.ANTHROPIC_API_KEY ?? '';

  const resp = await fetch(ANTHROPIC_URL, {
    method:  'POST',
    headers: {
      'x-api-key':         apiKey,
      'anthropic-version': '2023-06-01',
      'content-type':      'application/json'
    },
    body: JSON.stringify({
      model:      MODELO_VISAO,
      // Precisa de folga bem maior que a resposta em si (uma palavra) — o
      // Haiku 5.5 gera um bloco de "thinking" antes do texto (ver comentário
      // abaixo), e um max_tokens baixo cortava a resposta ANTES do bloco de
      // texto existir, deixando a checagem sempre "reprovada" por engano
      // (testado — ver histórico).
      max_tokens: 300,
      messages: [{
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: 'image/png', data: base64Png } },
          { type: 'text', text: PROMPT_VERIFICACAO }
        ]
      }]
    })
  });

  if (!resp.ok) {
    const corpo = await resp.text().catch(() => '');
    throw new Error(`Claude Vision recusou a checagem (${resp.status}): ${corpo.slice(0, 200)}`);
  }

  const json = await resp.json();
  // O Haiku 5.5 retorna um bloco "thinking" ANTES do bloco "text" — nunca
  // assumir que a resposta está em content[0] (testado — ver histórico).
  const blocoTexto = (json?.content ?? []).find(b => b.type === 'text');
  const texto = (blocoTexto?.text ?? '').trim().toUpperCase();
  // Falha segura: qualquer resposta que não seja claramente "APROVADO" conta
  // como reprovado (força nova tentativa) — a regra é mandatória, então o
  // benefício da dúvida vai pro lado mais rigoroso, nunca pro mais permissivo.
  return texto.startsWith('APROVADO');
}

module.exports = { imagemAprovadaSemLogoVeiculo };
