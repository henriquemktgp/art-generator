require('dotenv').config();

const express = require('express');
const path    = require('path');
const { montarPrompt, montarPromptMedida, montarPromptCarro } = require('./prompts');
const { gerarImagemMagnific } = require('./magnific');

const app  = express();
const PORT = process.env.PORT ?? 3000;

// ── Validação da chave na inicialização ──────────────────────────────────────
if (!process.env.MAGNIFIC_API_KEY) {
  console.warn('\n  ⚠  MAGNIFIC_API_KEY não configurada.');
  console.warn('     Copie .env.example para .env e insira sua chave antes de usar.\n');
}

// ── Parâmetros aceitos (validação server-side) ────────────────────────────────
const FORMATOS_VALIDOS        = new Set(['feed', 'story', 'banner']);
const FORMATOS_VALIDOS_MEDIDA = new Set(['feed', 'story']); // banner ainda não existe no modo Arte de Medida
const OBJETIVOS_VALIDOS       = new Set(['promocao', 'lancamento', 'aviso']);
const LINHAS_VALIDAS          = new Set(['esportiva', 'offroad', 'runflat', 'carga', 'passeio', 'semislick', 'institucional']);
const MODOS_VALIDOS           = new Set(['livre', 'medida', 'carrofrente', 'carrolado']);
const MODOS_CARRO             = new Set(['carrofrente', 'carrolado']);
// "carrofrente" (Pneu + Carro de Frente) não tem Banner — mesma restrição do
// modo "medida". "carrolado" (Pneu + Carro de Lado) tem os 3 formatos.
const MODOS_SEM_BANNER            = new Set(['medida', 'carrofrente']);
const FORMATOS_VALIDOS_SEM_BANNER = FORMATOS_VALIDOS_MEDIDA;

// ── Middlewares ───────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// ── Rota de geração de fundo ──────────────────────────────────────────────────
// POST /api/gerar-fundo
// Body: { formato: 'feed'|'story'|'banner', objetivo: 'promocao'|'lancamento'|'aviso', modo: 'livre'|'medida' }
// Resposta: { imagem: '<base64 PNG>' }
app.post('/api/gerar-fundo', async (req, res) => {
  const { formato, objetivo, linha, customPrompt, modo, sugestaoCarro } = req.body ?? {};

  const modoValido = MODOS_VALIDOS.has(modo) ? modo : 'livre';
  const formatosValidosDoModo = MODOS_SEM_BANNER.has(modoValido)
    ? FORMATOS_VALIDOS_SEM_BANNER
    : FORMATOS_VALIDOS;

  if (!formatosValidosDoModo.has(formato)) {
    return res.status(400).json({ erro: 'Parâmetros inválidos.' });
  }
  // No modo "arte livre" o Objetivo é obrigatório (define cena + badge). Nos
  // modos "arte de medida" e "carro-herói" o Objetivo não existe na UI — a
  // cena usa sempre a variante "promocao" da linha do produto.
  if (modoValido === 'livre' && !OBJETIVOS_VALIDOS.has(objetivo)) {
    return res.status(400).json({ erro: 'Parâmetros inválidos.' });
  }

  const linhaValida = LINHAS_VALIDAS.has(linha) ? linha : 'institucional';

  // customPrompt: aceito se string ≤ 500 chars; nunca executa código
  const promptUsuario = typeof customPrompt === 'string'
    ? customPrompt.slice(0, 500)
    : '';
  const sugestaoCarroValida = typeof sugestaoCarro === 'string'
    ? sugestaoCarro.slice(0, 200)
    : '';

  const { prompt, aspectRatio } = modoValido === 'medida'
    ? montarPromptMedida(formato, linhaValida, promptUsuario)
    : MODOS_CARRO.has(modoValido)
      ? montarPromptCarro(formato, modoValido === 'carrofrente' ? 'frente' : 'lado', linhaValida, sugestaoCarroValida, promptUsuario)
      : montarPrompt(formato, objetivo, linhaValida, promptUsuario);

  try {
    const imagemUrl = await gerarImagemMagnific(prompt, aspectRatio);

    // Magnific devolve uma URL, não base64 — baixa aqui pra manter o mesmo
    // contrato de resposta que o frontend já espera ({ imagem: '<base64>' }).
    const imgRes = await fetch(imagemUrl);
    if (!imgRes.ok) throw new Error('Não foi possível baixar a imagem gerada pelo Magnific.');
    const buffer = await imgRes.arrayBuffer();
    const b64    = Buffer.from(buffer).toString('base64');
    return res.json({ imagem: b64 });

  } catch (err) {
    // Log interno com detalhes — usuário vê apenas mensagem amigável
    console.error('[Magnific] Erro ao gerar fundo:', err.message ?? err);
    res.status(502).json({
      erro: 'Não foi possível gerar o fundo agora. Verifique sua conexão e tente novamente.'
    });
  }
});

// ── Proxy de imagens para exportação ─────────────────────────────────────────
// html2canvas não captura recursos cross-origin sem CORS.
// Este endpoint busca a imagem no servidor e a devolve com CORS liberado.
// GET /api/proxy-img?url=https://...
app.get('/api/proxy-img', async (req, res) => {
  const { url } = req.query;
  if (!url || !/^https?:\/\//i.test(url)) {
    return res.status(400).json({ erro: 'URL inválida.' });
  }
  try {
    const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!r.ok) return res.status(r.status).end();
    const buf = await r.arrayBuffer();
    res.set('Content-Type', r.headers.get('content-type') || 'image/png');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Cache-Control', 'public, max-age=3600');
    res.send(Buffer.from(buf));
  } catch (err) {
    console.error('[proxy-img]', err.message);
    res.status(502).end();
  }
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  Delinte Art Generator v2`);
  console.log(`  Acesse: http://localhost:${PORT}\n`);
});
