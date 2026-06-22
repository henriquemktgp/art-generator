require('dotenv').config();

const express = require('express');
const path    = require('path');
const OpenAI  = require('openai');
const { montarPrompt } = require('./prompts');

const app  = express();
const PORT = process.env.PORT ?? 3000;

// ── Validação da chave na inicialização ──────────────────────────────────────
if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.startsWith('sk-...')) {
  console.warn('\n  ⚠  OPENAI_API_KEY não configurada.');
  console.warn('     Copie .env.example para .env e insira sua chave antes de usar.\n');
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY ?? '' });

// ── Parâmetros aceitos (validação server-side) ────────────────────────────────
const FORMATOS_VALIDOS  = new Set(['feed', 'story', 'banner']);
const OBJETIVOS_VALIDOS = new Set(['promocao', 'lancamento', 'aviso']);

// ── Middlewares ───────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── Rota de geração de fundo ──────────────────────────────────────────────────
// POST /api/gerar-fundo
// Body: { formato: 'feed'|'story'|'banner', objetivo: 'promocao'|'lancamento'|'aviso' }
// Resposta: { imagem: '<base64 PNG>' }
app.post('/api/gerar-fundo', async (req, res) => {
  const { formato, objetivo } = req.body ?? {};

  if (!FORMATOS_VALIDOS.has(formato) || !OBJETIVOS_VALIDOS.has(objetivo)) {
    return res.status(400).json({ erro: 'Parâmetros inválidos.' });
  }

  const { prompt, tamanho } = montarPrompt(formato, objetivo);

  try {
    const resposta = await openai.images.generate({
      model:   'gpt-image-1',
      prompt,
      n:       1,
      size:    tamanho,
      quality: 'high'
    });

    const item = resposta.data[0];

    // gpt-image-1 retorna b64_json diretamente
    if (item.b64_json) {
      return res.json({ imagem: item.b64_json });
    }

    // Fallback para modelos que retornam URL (ex.: dall-e-3)
    if (item.url) {
      const imgRes = await fetch(item.url);
      const buffer = await imgRes.arrayBuffer();
      const b64 = Buffer.from(buffer).toString('base64');
      return res.json({ imagem: b64 });
    }

    throw new Error('Resposta da API sem dados de imagem.');

  } catch (err) {
    // Log interno com detalhes — usuário vê apenas mensagem amigável
    console.error('[Delinte] Erro ao gerar fundo:', err.message ?? err);
    res.status(502).json({
      erro: 'Não foi possível gerar o fundo agora. Verifique sua conexão e tente novamente.'
    });
  }
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  Delinte Art Generator v2`);
  console.log(`  Acesse: http://localhost:${PORT}\n`);
});
