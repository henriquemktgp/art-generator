// =============================================================================
// CLIENTE MAGNIFIC (Mystic) — geração de imagem por IA
//
// Substitui a OpenAI (gpt-image-1). Diferença fundamental: a API do Magnific
// é assíncrona — o POST inicial só devolve um task_id, e é preciso consultar
// GET /v1/ai/mystic/{task_id} até o status virar "COMPLETED" para pegar a
// URL da imagem final (não vem base64 direto, como na OpenAI).
//
// Docs: https://docs.magnific.com/api-reference/mystic
// =============================================================================

const MAGNIFIC_API_URL      = 'https://api.magnific.com/v1/ai/mystic';
const POLL_INTERVAL_MS      = 3000;
const POLL_TIMEOUT_MS       = 120000; // 2 min — geração de imagem pode demorar

function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Gera uma imagem via Magnific (modelo Mystic) e retorna a URL do resultado.
 * @param {string} prompt
 * @param {string} aspectRatio — enum do Magnific, ex. 'square_1_1', 'social_story_9_16'
 * @returns {Promise<string>} URL da imagem gerada
 */
async function gerarImagemMagnific(prompt, aspectRatio) {
  const apiKey = process.env.MAGNIFIC_API_KEY ?? '';

  const criarResp = await fetch(MAGNIFIC_API_URL, {
    method:  'POST',
    headers: {
      'Content-Type':       'application/json',
      'x-magnific-api-key': apiKey
    },
    body: JSON.stringify({
      prompt,
      aspect_ratio: aspectRatio,
      resolution:   '2k',
      model:        'realism'
    })
  });

  if (!criarResp.ok) {
    const texto = await criarResp.text().catch(() => '');
    throw new Error(`Magnific recusou a geração (${criarResp.status}): ${texto.slice(0, 300)}`);
  }

  const criarJson = await criarResp.json();
  const taskId    = criarJson?.data?.task_id;
  if (!taskId) {
    throw new Error('Magnific não retornou um task_id.');
  }

  const inicio = Date.now();
  while (Date.now() - inicio < POLL_TIMEOUT_MS) {
    await esperar(POLL_INTERVAL_MS);

    const statusResp = await fetch(`${MAGNIFIC_API_URL}/${taskId}`, {
      headers: { 'x-magnific-api-key': apiKey }
    });
    if (!statusResp.ok) continue; // tenta de novo no próximo ciclo de polling

    const statusJson = await statusResp.json();
    const status      = statusJson?.data?.status;

    if (status === 'COMPLETED') {
      const url = statusJson?.data?.generated?.[0];
      if (!url) throw new Error('Magnific concluiu a tarefa, mas não retornou nenhuma imagem.');
      return url;
    }
    if (status === 'FAILED') {
      throw new Error('Magnific falhou ao gerar a imagem.');
    }
    // CREATED / IN_PROGRESS — continua aguardando
  }

  throw new Error('Tempo esgotado esperando o Magnific gerar a imagem.');
}

module.exports = { gerarImagemMagnific };
