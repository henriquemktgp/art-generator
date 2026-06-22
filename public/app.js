'use strict';

// =============================================================================
// CADASTRO DE PRODUTOS — EDITE AQUI
//
// Como adicionar um produto:
//   1. Copie um bloco { nome, specs, foto } e cole antes do ] final
//   2. Salve — a mudança reflete automaticamente na interface
//
// Como atualizar a foto:
//   Substitua gerarPlaceholder("XX") pela URL do PNG oficial recortado:
//   foto: "https://url-da-foto-oficial.png"
//
// "Sem produto" deve permanecer como primeiro item (índice 0).
// =============================================================================

const PRODUTOS = [
  {
    nome: "Sem produto",
    specs: "",
    foto: ""
  },
  {
    nome: "DS2",
    specs: "Ultra-high performance · sulcos assimétricos",
    foto: gerarPlaceholder("DS2")
  },
  {
    nome: "HP91",
    specs: "High performance · padrão direcional",
    foto: gerarPlaceholder("HP91")
  },
  {
    nome: "PT311",
    specs: "Passenger touring · conforto e durabilidade",
    foto: gerarPlaceholder("PT311")
  },
  {
    nome: "AT606",
    specs: "All-terrain · desempenho on e off-road",
    foto: gerarPlaceholder("AT606")
  },
  {
    nome: "WD66",
    specs: "Winter drive · aderência em pistas molhadas",
    foto: gerarPlaceholder("WD66")
  }
];

// =============================================================================
// CONFIGURAÇÃO DA MARCA — NÃO EDITAR
//
// [MULTIMARCA] Para suportar marcas além da Delinte, organize em:
//   const CATALOGO = { delinte: { marca: MARCA, produtos: PRODUTOS }, ... }
//   e adapte renderArt() para receber o objeto de marca como parâmetro.
// =============================================================================

const MARCA = {
  cores: { primaria: '#FFDB0F', fundo: '#000000', texto: '#FFFFFF' },
  logos: {
    principal: 'https://cdn.jsdelivr.net/gh/marketing-gp/delinte@main/Delinte%20-%20S%20Slogan.svg',
    simbolo:   'https://cdn.jsdelivr.net/gh/marketing-gp/delinte@main/Delinte%20-%20D.svg',
    elemento:  'https://cdn.jsdelivr.net/gh/marketing-gp/delinte@main/Delinte%20-%20Elemento.svg'
  }
};

// ─── Formatos disponíveis ────────────────────────────────────────────────────
const FORMATOS = {
  feed:   { label: 'Feed 1:1',          width: 1080, height: 1080, desc: '1080 × 1080 px' },
  story:  { label: 'Story 9:16',        width: 1080, height: 1920, desc: '1080 × 1920 px' },
  banner: { label: 'Banner Horizontal', width: 1440, height: 600,  desc: '1440 × 600 px'  }
};

// ─── Objetivos disponíveis ───────────────────────────────────────────────────
const OBJETIVOS = {
  promocao:   { texto: 'PROMOÇÃO',   cls: 'obj-promocao'   },
  lancamento: { texto: 'LANÇAMENTO', cls: 'obj-lancamento' },
  aviso:      { texto: 'AVISO',      cls: 'obj-aviso'      }
};

// ─── Limites de caracteres ───────────────────────────────────────────────────
const LIMITES = { titulo: 40, sub: 80, cta: 25 };

// ─── Estado da aplicação ─────────────────────────────────────────────────────
const estado = {
  formato:      'feed',
  objetivo:     'promocao',
  produto:      0,
  titulo:       '',
  sub:          '',
  cta:          '',
  fundoGerado:  false,   // true após a primeira geração bem-sucedida
  gerando:      false    // true durante chamada à API
};

// =============================================================================
// INICIALIZAÇÃO
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  popularProdutos();
  vincularEventos();
  renderArt();
  atualizarEscala();
  window.addEventListener('resize', atualizarEscala);
});

function popularProdutos() {
  const sel = document.getElementById('sel-produto');
  PRODUTOS.forEach((p, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = p.nome;
    sel.appendChild(opt);
  });
}

// =============================================================================
// EVENTOS
// =============================================================================

function vincularEventos() {
  // Botões de grupo (formato / objetivo)
  document.querySelectorAll('.btn-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      const campo = btn.dataset.field;
      const valor = btn.dataset.val;

      btn.closest('.btn-group').querySelectorAll('.btn-opt').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      // Trocar formato invalida o fundo atual (prompt de fundo muda)
      if (campo === 'formato' && valor !== estado.formato) {
        resetarFundo();
        atualizarMeta();
      }

      estado[campo] = valor;
      renderArt();
      atualizarEscala();
    });
  });

  // Seleção de produto
  document.getElementById('sel-produto').addEventListener('change', e => {
    estado.produto = parseInt(e.target.value, 10);
    renderArt();
  });

  // Campos de texto
  criarCampoTexto('inp-titulo', 'cnt-titulo', 'titulo', LIMITES.titulo);
  criarCampoTexto('inp-sub',    'cnt-sub',    'sub',    LIMITES.sub);
  criarCampoTexto('inp-cta',    'cnt-cta',    'cta',    LIMITES.cta);

  // Gerar fundo
  document.getElementById('btn-gerar').addEventListener('click', gerarFundo);

  // Exportar
  document.getElementById('btn-png').addEventListener('click', exportarPNG);
  document.getElementById('btn-pdf').addEventListener('click', exportarPDF);
}

function criarCampoTexto(inputId, contadorId, chave, max) {
  const el      = document.getElementById(inputId);
  const counter = document.getElementById(contadorId);
  el.addEventListener('input', () => {
    if (el.value.length > max) el.value = el.value.slice(0, max);
    estado[chave] = el.value;
    counter.textContent = `${el.value.length} / ${max}`;
    counter.classList.toggle('at-limit', el.value.length >= max);
    renderArt();
  });
}

function atualizarMeta() {
  const f = FORMATOS[estado.formato];
  document.getElementById('preview-meta').textContent = `${f.label} · ${f.desc}`;
}

// =============================================================================
// GERAÇÃO DE FUNDO (camada 1 — IA)
// =============================================================================

async function gerarFundo() {
  if (estado.gerando) return;
  estado.gerando = true;

  limparErro();
  setEstadoGerando(true);

  try {
    const res = await fetch('/api/gerar-fundo', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ formato: estado.formato, objetivo: estado.objetivo })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.erro ?? 'Erro ao gerar o fundo. Tente novamente.');
    }

    aplicarFundo(data.imagem);
    estado.fundoGerado = true;
    atualizarBtnGerar();
    atualizarNota();

  } catch (err) {
    mostrarErro(err.message);
  } finally {
    estado.gerando = false;
    setEstadoGerando(false);
  }
}

// Aplica a imagem base64 como fundo com fade-in
function aplicarFundo(base64) {
  const bgImg = document.getElementById('art-bg-img');
  bgImg.classList.remove('loaded');
  bgImg.style.backgroundImage = `url(data:image/png;base64,${base64})`;
  // Dois frames para garantir que o browser processa o novo backgroundImage
  requestAnimationFrame(() => requestAnimationFrame(() => bgImg.classList.add('loaded')));
}

// Remove o fundo gerado (ex.: ao trocar formato)
function resetarFundo() {
  const bgImg = document.getElementById('art-bg-img');
  bgImg.classList.remove('loaded');
  bgImg.style.backgroundImage = '';
  estado.fundoGerado = false;
  atualizarBtnGerar();
  atualizarNota();
}

function setEstadoGerando(gerando) {
  const btn = document.getElementById('btn-gerar');
  const overlay = document.getElementById('loading-overlay');
  btn.disabled = gerando;
  btn.classList.toggle('loading', gerando);
  overlay.hidden = !gerando;
  btn.querySelector('.btn-text').textContent = gerando ? 'Gerando...' : (
    estado.fundoGerado ? 'Gerar Novamente' : 'Gerar Fundo com IA'
  );
}

function atualizarBtnGerar() {
  const btn = document.getElementById('btn-gerar');
  if (!estado.gerando) {
    btn.querySelector('.btn-text').textContent =
      estado.fundoGerado ? 'Gerar Novamente' : 'Gerar Fundo com IA';
  }
}

function atualizarNota() {
  const nota = document.getElementById('preview-note');
  if (estado.fundoGerado) {
    nota.innerHTML = 'Fundo gerado. Ajuste os textos e exporte, ou clique em <strong>Gerar Novamente</strong> para nova variação.';
  } else {
    nota.innerHTML = 'Configure os campos e clique em <strong>Gerar Fundo com IA</strong> para iniciar.';
  }
}

function mostrarErro(msg) {
  const el = document.getElementById('error-msg');
  el.textContent = msg;
  el.hidden = false;
}

function limparErro() {
  document.getElementById('error-msg').hidden = true;
}

// =============================================================================
// RENDERIZAÇÃO DA ARTE (camada 2 — composição)
// =============================================================================

function renderArt() {
  const canvas  = document.getElementById('art-canvas');
  const obj     = OBJETIVOS[estado.objetivo];
  const produto = PRODUTOS[estado.produto];
  const semProd = estado.produto === 0;

  // Classes dinâmicas
  canvas.className = [
    'art',
    `format-${estado.formato}`,
    obj.cls,
    semProd ? 'no-product' : ''
  ].filter(Boolean).join(' ');

  // Badge
  document.getElementById('art-badge').textContent = obj.texto;

  // Textos — título sempre em caixa alta
  const titulo = estado.titulo || 'TÍTULO DA ARTE';
  document.getElementById('art-title').textContent = titulo.toUpperCase();
  document.getElementById('art-sub').textContent   = estado.sub  || 'Subtítulo descritivo da campanha ou produto.';
  document.getElementById('art-cta').textContent   = (estado.cta || 'SAIBA MAIS').toUpperCase();

  // Produto
  const imgWrap = document.getElementById('art-img-wrap');
  if (semProd) {
    document.getElementById('art-pname').textContent = '';
    document.getElementById('art-specs').textContent = '';
    document.getElementById('art-product').src       = '';
    imgWrap.style.display = 'none';
  } else {
    document.getElementById('art-pname').textContent = produto.nome;
    document.getElementById('art-specs').textContent = produto.specs;
    document.getElementById('art-product').src       = produto.foto;
    imgWrap.style.display = '';
  }
}

// =============================================================================
// ESCALA DO PREVIEW
// =============================================================================

function atualizarEscala() {
  const canvas  = document.getElementById('art-canvas');
  const wrapper = document.getElementById('preview-wrapper');
  const stage   = wrapper.parentElement;
  const { width, height } = FORMATOS[estado.formato];

  canvas.style.width  = width  + 'px';
  canvas.style.height = height + 'px';

  const maxW = Math.max(stage.clientWidth - 32, 200);
  const maxH = Math.max(window.innerHeight * 0.70, 300);
  const escala = Math.min(maxW / width, maxH / height, 1);

  canvas.style.transform       = `scale(${escala})`;
  canvas.style.transformOrigin = 'top left';

  wrapper.style.width  = Math.round(width  * escala) + 'px';
  wrapper.style.height = Math.round(height * escala) + 'px';
}

// =============================================================================
// EXPORTAÇÃO
// =============================================================================

async function exportarPNG() {
  const btn = document.getElementById('btn-png');
  definirEstadoBtn(btn, true, 'PNG...');
  try {
    const c = await capturarCanvas();
    const link = document.createElement('a');
    link.download = `delinte-${estado.formato}-arte.png`;
    link.href = c.toDataURL('image/png');
    link.click();
  } catch (e) {
    console.error('[Delinte] Erro PNG:', e);
    mostrarErro('Não foi possível exportar o PNG. Verifique o console.');
  } finally {
    definirEstadoBtn(btn, false, 'PNG');
  }
}

async function exportarPDF() {
  const btn = document.getElementById('btn-pdf');
  definirEstadoBtn(btn, true, 'PDF...');
  try {
    const { width, height } = FORMATOS[estado.formato];
    const c = await capturarCanvas();
    const imgData = c.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: width >= height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [width, height],
      hotfixes: ['px_scaling']
    });
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save(`delinte-${estado.formato}-arte.pdf`);
  } catch (e) {
    console.error('[Delinte] Erro PDF:', e);
    mostrarErro('Não foi possível exportar o PDF. Verifique o console.');
  } finally {
    definirEstadoBtn(btn, false, 'PDF');
  }
}

// ── Captura via clone off-screen ─────────────────────────────────────────────
async function capturarCanvas() {
  const original = document.getElementById('art-canvas');
  const { width, height } = FORMATOS[estado.formato];

  const clone = original.cloneNode(true);
  clone.style.cssText = [
    'position: fixed',
    'top: 0',
    `left: -${width + 400}px`,
    `width: ${width}px`,
    `height: ${height}px`,
    'transform: none',
    'z-index: -9999',
    'pointer-events: none'
  ].join('; ');

  document.body.appendChild(clone);
  await esperarFrames(3);

  let resultado;
  try {
    resultado = await html2canvas(clone, {
      scale:           2,
      useCORS:         true,
      allowTaint:      false,
      width,
      height,
      windowWidth:     width,
      windowHeight:    height,
      backgroundColor: '#000000',
      logging:         false
    });
  } finally {
    document.body.removeChild(clone);
  }

  return resultado;
}

function esperarFrames(n) {
  return new Promise(resolve => {
    let count = 0;
    function tick() { if (++count >= n) resolve(); else requestAnimationFrame(tick); }
    requestAnimationFrame(tick);
  });
}

function definirEstadoBtn(btn, carregando, texto) {
  btn.disabled = carregando;
  const span = btn.querySelector('.btn-text');
  if (span) span.textContent = texto;
}

// =============================================================================
// GERAÇÃO DE PLACEHOLDER (usado em PRODUTOS enquanto não há foto oficial)
// Substitua pela URL real: foto: "https://..."
// =============================================================================

function gerarPlaceholder(nome) {
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">',
    '<rect width="800" height="800" fill="#0c0c0c"/>',
    '<circle cx="400" cy="400" r="340" fill="none" stroke="#FFDB0F" stroke-width="3" opacity="0.15"/>',
    '<circle cx="400" cy="400" r="270" fill="#111111" stroke="#FFDB0F" stroke-width="2.5" opacity="0.3"/>',
    '<circle cx="400" cy="400" r="190" fill="#0c0c0c" stroke="#FFDB0F" stroke-width="2" opacity="0.5"/>',
    '<circle cx="400" cy="400" r="60" fill="#FFDB0F" opacity="0.2"/>',
    `<text x="400" y="418" font-family="Arial Black,Arial,sans-serif" font-size="108"`,
    ` fill="#FFDB0F" text-anchor="middle" dominant-baseline="middle" font-weight="900">${nome}</text>`,
    '</svg>'
  ].join('');
  try {
    return 'data:image/svg+xml;base64,' + btoa(svg);
  } catch (_) {
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }
}
