require('dotenv').config();

const express     = require('express');
const compression = require('compression');
const path        = require('path');
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
// gzip/brotli nas respostas — sem isso, app.js + style.css (~240 KB somados)
// e o JSON de /api/gerar-fundo trafegam sem compressão nenhuma.
app.use(compression());

// Fotos/logos/fontes praticamente não mudam depois de cadastrados (e quando
// mudam, é sempre trocando o conteúdo de um arquivo já versionado no git, não
// o nome) — cache longo aqui é seguro e elimina re-download a cada visita.
// app.js/style.css/index.html ficam de fora de propósito: mudam com
// frequência durante o desenvolvimento, e sem nome de arquivo versionado
// (hash/query string), um cache agressivo neles serviria versão desatualizada
// pro time depois de um deploy. Middlewares são avaliados na ordem declarada,
// então estes dois precisam vir ANTES do express.static(public) genérico
// abaixo, senão ele responderia primeiro (sem o maxAge) pra essas mesmas rotas.
const UM_DIA = 24 * 60 * 60 * 1000;
app.use('/assets', express.static(path.join(__dirname, '..', 'public', 'assets'), { maxAge: 30 * UM_DIA }));
app.use('/fonts',  express.static(path.join(__dirname, '..', 'public', 'fonts'),  { maxAge: 30 * UM_DIA }));
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
//
// Domínios externos usados nos assets das marcas (logo via CDN etc.) — o
// front-end só chama este proxy pra quem é de fato cross-origin (ver
// processarImgExport em app.js); tudo que é local (public/assets, public/
// fonts) é servido direto, sem passar por aqui. Adicione um domínio novo
// só quando uma marca realmente precisar de um asset externo.
const DOMINIOS_PROXY_PERMITIDOS = new Set([
  'cdn.jsdelivr.net', // logo/elemento decorativo da Delinte
]);

app.get('/api/proxy-img', async (req, res) => {
  const { url } = req.query;
  if (typeof url !== 'string') {
    return res.status(400).json({ erro: 'URL inválida.' });
  }

  // Valida com o parser de URL de verdade (não regex/startsWith) — um valor
  // como "https://cdn.jsdelivr.net@evil.com/x" começa com o domínio esperado
  // mas aponta pro host depois do "@" (evil.com). Sem isso (e sem checar o
  // host contra uma lista fechada), qualquer um podia usar este endpoint
  // como proxy aberto pra sondar endereços internos da VPS (ex.: serviços em
  // localhost, metadata da nuvem em 169.254.169.254) ou qualquer site
  // externo, com o servidor fazendo a requisição por ele.
  let alvo;
  try {
    alvo = new URL(url);
  } catch {
    return res.status(400).json({ erro: 'URL inválida.' });
  }
  if (alvo.protocol !== 'https:' || !DOMINIOS_PROXY_PERMITIDOS.has(alvo.hostname)) {
    return res.status(400).json({ erro: 'URL inválida.' });
  }

  try {
    const r = await fetch(alvo.href, { headers: { 'User-Agent': 'Mozilla/5.0' } });
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
  console.log(`\n Art Generator`);
  console.log(`  Acesse: http://localhost:${PORT}\n`);
});
