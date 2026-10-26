// =============================================================================
// TEMPLATES DE PROMPT — HOMOLOGADOS PELA EQUIPE DE MARKETING
//
// REGRA FUNDAMENTAL: o pneu é o herói — o fundo é o palco.
// Nunca descrever veículos ou objetos grandes na zona onde o pneu será sobreposto.
// Veículos (se necessários) = pequenos, distantes, parcialmente visíveis nas bordas.
// =============================================================================

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSIÇÃO POR FORMATO — briefing de art direction para o modelo de IA
// ─────────────────────────────────────────────────────────────────────────────
const COMPOSICAO_LAYOUT = {

  feed: [
    'COMPOSITIONAL BRIEF for a 1080×1080 square advertising campaign photo (not a diagram — do not render any grid, labels, coordinates, or text of any kind, this is purely spatial guidance for you).',
    'This is ONE single, continuous photograph of a real place, lit by one light source — think a low, warm sun or distant light glowing from the right side of the frame. The right side of the scene naturally reads brighter and more dramatic; the left side is calmer and more shadowed, the ordinary way a photograph looks under one directional light — smooth and photographic, never a hard line or a flat painted-on panel. Exact brightness on the left is not critical: a separate darkening layer is added in post-production over that side for text legibility, so focus on making the scene itself feel real and atmospheric.',
    'The right side of the frame (roughly the right half) is the TIRE ZONE — SEE TIRE ZONE RULES BELOW.',

    'TIRE ZONE RULES (right half of the frame): The product tire PNG with transparent background will be composited EXACTLY here.',
    'DO NOT place any vehicle, large object, or main subject in this zone — it will be completely hidden by the tire.',
    'This zone must contain ONLY: atmospheric depth, environmental texture (wet road surface, terrain, dust particles, atmospheric haze), dramatic lighting effects, and far-distant scene elements.',
    'Any vehicle must appear ONLY as a tiny silhouette at the extreme far background, very small, partially cropped by the image edge — never as a prominent element.',

    'PERSPECTIVE: one-point perspective lines (track, road, trail) originate from center-left and converge right, adding depth to the scene.'
  ].join(' '),

  story: [
    'COMPOSITIONAL BRIEF for a 1080×1920 vertical advertising campaign photo (not a diagram — do not render any grid, labels, coordinates, or text of any kind, this is purely spatial guidance for you).',
    'This is ONE single, continuous photograph of a real place. Light descends naturally from above, brightest around the upper-middle of the frame, fading gradually toward the base — the ordinary way ambient light fades with depth and distance, smooth and photographic, never a hard line or a flat painted-on panel. Exact brightness at the very top and very bottom is not critical: a separate darkening layer is added in post-production there for text legibility, so focus on making the scene itself feel real and atmospheric.',
    'The middle of the frame is the TIRE ZONE, the most lit, dramatic part of the scene — SEE TIRE ZONE RULES BELOW.',

    'TIRE ZONE RULES (middle of the frame): The product tire PNG will be composited here, centered horizontally.',
    'DO NOT place any vehicle, animal, person, or large foreground object in this zone.',
    'This zone must contain ONLY: dramatic environmental backdrop (towering cliff faces, dense forest canopy, skyline, dramatic clouds), atmospheric depth, rim-light glow from above, particles (dust, rain drops, mist) — purely the STAGE for the tire, never a competing hero element.',

    'VERTICAL COMPOSITION: strong vertical leading lines (cliff edges, tree trunks, building facades, waterfall) frame the tire zone from both sides, adding depth to the scene.'
  ].join(' '),

  banner: [
    'COMPOSITIONAL BRIEF for a 1440×600 wide panoramic advertising campaign photo (not a diagram — do not render any grid, labels, coordinates, or text of any kind, this is purely spatial guidance for you).',
    'This is ONE single, continuous photograph of a real place, backlit from the right — think a low sun or distant light glowing from the right edge of the frame. The right side of the scene naturally reads warm and bright; the left side is calmer and more shadowed, the ordinary way a photograph looks under one directional light — smooth and photographic, never a hard line or a flat painted-on panel. Exact brightness on the left is not critical: a separate darkening layer is added in post-production over that side for text legibility, so focus on making the scene itself feel real and atmospheric.',
    'The right portion of the frame (roughly the right third) is the TIRE ZONE — SEE TIRE ZONE RULES BELOW.',

    'TIRE ZONE RULES (right third of the frame): The product tire PNG will be composited EXACTLY here.',
    'DO NOT place any vehicle or large object in this zone — it will be hidden by the tire.',
    'This zone must contain ONLY: atmospheric environmental depth (receding road, canyon wall, industrial architecture in far distance), dramatic backlighting effects, motion blur streaks, dust or mist particles — purely environmental atmosphere.',
    'Any vehicle must appear ONLY as a distant tiny silhouette near the far-right edge or horizon line, very small.',

    'HORIZONTAL COMPOSITION: strong one-point-perspective lines (road, track, horizon) run left-to-right across the full canvas, vanishing point toward the right, adding depth to the scene.'
  ].join(' ')

};

// ─────────────────────────────────────────────────────────────────────────────
// CENAS POR LINHA × OBJETIVO — conteúdo ambiental/atmosférico
// REGRA: descrever ambiente e atmosfera, NUNCA veículos como elemento principal.
// Veículos = apenas como silhueta distante opcional, nunca na zona do pneu.
// ─────────────────────────────────────────────────────────────────────────────
const CENAS_POR_LINHA = {

  esportiva: {
    promocao:
      'rain-slicked racing circuit at night — wet asphalt surface dominates the foreground with vivid orange and amber reflections of track lights; mid-ground shows blurred track barriers and pit-lane markings receding into depth; atmosphere is kinetic, humid, electric with speed; a barely-visible racing car silhouette sits tiny at the extreme far background near the horizon',
    lancamento:
      'ultra-modern motorsport facility under intense dramatic spotlights — polished dark floor surface with mirror-like reflections in foreground; carbon-fiber architectural panels and pit-lane structure recede mid-ground into shadow; a single cone of spotlight pierces the atmosphere in the dynamic zone creating a premium product-reveal mood; no large objects in the spotlight area',
    aviso:
      'dark professional racing garage interior — precision tool wall and workbench surface in deep shadow foreground; directional spotlights rake across a carbon-fiber floor mid-ground; the dynamic zone features a clean atmospheric cone of cool-white light against near-black depth'
  },

  offroad: {
    promocao:
      'rugged off-road trail cutting through a dense forest at dusk — thick red clay mud and exposed jagged rocks fill the foreground; dramatic warm amber side-light filters through forest canopy mid-ground casting long shadows across the trail; the dynamic zone features deep forest depth with a dust haze glowing in backlight; no vehicles in the dynamic zone, only atmospheric forest environment',
    lancamento:
      'dramatic sandstone canyon at golden hour — dry cracked clay canyon floor in foreground; towering rust-red vertical cliff walls frame both sides mid-ground; the dynamic zone features a sun-blazed canyon opening with swirling dust particles backlit in brilliant amber-gold; vast, epic, no foreground objects in the open light zone',
    aviso:
      'stormy night on a deep mud track in dense wilderness — rain-pocked muddy ruts fill the foreground; dark tree silhouettes and undergrowth frame the mid-ground under storm light; the dynamic zone features heavy rain streaks and lightning-edge sky glow; moody, raw, powerful atmosphere with no competing objects in the storm-lit zone'
  },

  runflat: {
    promocao:
      'sleek modern urban expressway at night — smooth wet asphalt with crisp lane-marking reflections fills the foreground; evenly-spaced streetlight columns recede into mid-ground depth; the dynamic zone features warm city-glow atmosphere and a glowing urban skyline at distance; calm, confident, safe — no vehicles in the tire zone, only road and atmospheric cityscape',
    lancamento:
      'wide city boulevard at blue hour — immaculate smooth asphalt in foreground with subtle water-film sheen; warm golden streetlight cones illuminate mid-ground sidewalk and tree canopy; the dynamic zone features contemporary glass-tower silhouettes against deep blue twilight sky; premium, aspirational, urban — purely architectural in the tire zone',
    aviso:
      'elevated urban expressway in heavy rain at night — rainwater streaming across road surface in foreground; concrete bridge structure and safety barrier reflectors mid-ground; the dynamic zone features a blurred metropolitan skyline through rain haze and backlit rain streaks; structured, controlled, reliable atmosphere'
  },

  carga: {
    promocao:
      'wide industrial highway at amber sunset — worn lane-marked asphalt stretches from foreground into distance; large freight warehouse silhouettes line the mid-ground horizon; the dynamic zone features a long straight road vanishing into a warm glowing sunset sky; purposeful, robust, hardworking — only road and sky in the tire zone',
    lancamento:
      'modern logistics hub at dusk — clean concrete yard surface with subtle tire-track marks in foreground; tall warehouse façades with loading-dock doors and dock-levelers recede mid-ground; the dynamic zone features industrial floodlights creating dramatic blue-cool pools of light against dark architecture; no vehicles, only architectural environment in the light zone',
    aviso:
      'dark industrial ring-road at night — heavy-duty textured asphalt in foreground under harsh sodium-vapor lighting; warehouse district perimeter wall and security lights mid-ground; the dynamic zone features a long straight industrial road vanishing into night, overhead lamps creating pools of amber-orange light on empty road; serious, no-nonsense atmosphere'
  },

  institucional: {
    promocao:
      'rain-slicked motorsport circuit at dusk — reflective asphalt foreground with amber and cool-blue atmospheric lighting; track barriers and timing-board structures recede mid-ground; the dynamic zone features motion-blurred ambient glow and cinematic depth haze; premium automotive advertising energy with no large competing objects in the dynamic zone',
    lancamento:
      'sleek minimalist automotive brand studio — mirror-polished dark floor in foreground; deep architectural shadow frames the mid-ground; the dynamic zone features a single dramatic spotlight cone illuminating atmospheric smoke haze against near-black depth; no objects in the spotlight zone, only light and atmosphere',
    aviso:
      'dark professional automotive environment — textured industrial concrete floor in foreground; precision directional spotlights rake across mid-ground smoke haze; the dynamic zone features a dramatic atmospheric light cone and architectural depth; authoritative, refined, brand-focused'
  },

  passeio: {
    promocao:
      'sunlit suburban avenue on a calm morning — smooth clean asphalt with soft dappled shade fills the foreground; tree-lined sidewalks and low modern houses recede mid-ground under warm daylight; the dynamic zone features gentle golden sunlight filtering through leaves, calm and reassuring; no vehicles in the dynamic zone, only road and soft daylight atmosphere',
    lancamento:
      'wide modern residential boulevard at golden hour — pristine light-toned asphalt in foreground with a subtle warm sheen; contemporary low-rise architecture and manicured landscaping recede mid-ground; the dynamic zone features soft warm backlight and a serene, aspirational glow; premium everyday comfort, purely architectural and atmospheric in the tire zone',
    aviso:
      'quiet urban street under a light rain shower, daytime — softly wet asphalt with gentle reflections fills the foreground; parked cars and storefronts recede mid-ground, muted and calm; the dynamic zone features a soft grey-blue overcast glow with fine mist, conveying safety and control; no large objects in the dynamic zone'
  },

  semislick: {
    promocao:
      'sun-drenched race track pit-straight at midday — sticky worn asphalt with faint tire-rubber marks fills the foreground; empty grandstands and track-side barriers recede into the mid-ground under bright hard light; the dynamic zone features heat-haze shimmer and a distant apex curve, pure track-day energy with no competing objects in the zone',
    lancamento:
      'dramatic trackside pit-lane at golden hour — smooth race-grade tarmac in the foreground with subtle rubber striping; modern circuit architecture and timing towers recede mid-ground; the dynamic zone features a warm sunset glow raking across the empty track surface, epic and performance-driven',
    aviso:
      'closed race circuit under overcast track-day skies — worn racing line visible on damp-cool asphalt in the foreground; distant runoff gravel trap and safety barriers frame the mid-ground; the dynamic zone features flat, even light and a moody grey sky, serious and focused atmosphere'
  }

};

// ─────────────────────────────────────────────────────────────────────────────
// DETECÇÃO DE VEÍCULO NO PROMPT DO USUÁRIO — nos modelos "pneu-herói" (Padrão/
// 3 Pneus/Pneu 45°, todos passam por montarPrompt), o carro só vira um
// elemento visível de verdade na cena SE o usuário pediu um veículo
// explicitamente no prompt personalizado. Sem isso, continua só paisagem (ver
// REGRA FUNDAMENTAL no topo do arquivo) — o pneu segue sendo o único herói.
// Heurística simples por palavra-chave (PT/EN + marcas comuns no Brasil); não
// é NLP de verdade, então pode errar em frases muito indiretas.
// ─────────────────────────────────────────────────────────────────────────────
const MARCAS_FABRICANTES = [
  'fiat', 'volkswagen', 'vw', 'chevrolet', 'gm', 'ford', 'toyota', 'honda', 'hyundai', 'renault', 'nissan',
  'jeep', 'ram', 'mitsubishi', 'peugeot', 'citroen', 'bmw', 'mercedes', 'audi', 'kia', 'troller', 'byd'
];

const PALAVRAS_VEICULO = [
  'carro', 'carros', 'caminhao', 'caminhoes', 'caminhonete', 'picape', 'pickup', 'moto', 'motocicleta',
  'veiculo', 'veiculos', 'van', 'utilitario', 'suv', 'sedan', 'hatch', 'jipe',
  ...MARCAS_FABRICANTES,
  'car', 'truck', 'vehicle', 'motorcycle', 'bike'
];

function removerAcentos(texto) {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

// Tira o NOME da montadora do texto que vai pro prompt da IA (nunca do que o
// usuário digitou/vê na tela — só uma cópia interna usada na montagem do
// prompt). Sozinha, a instrução "sem logo" (ver REGRA_SEM_LOGO_VEICULO) não
// é suficiente: o modelo associa fortemente o nome da marca ao emblema dela
// e tende a desenhar o emblema de qualquer jeito mesmo assim (testado — ver
// histórico). Tirar a palavra do prompt reduz bastante esse gatilho,
// mantendo o resto da descrição (modelo, cor, carroceria etc.) intacto.
function removerMarcaFabricante(texto) {
  if (!texto) return texto;
  let resultado = texto;
  MARCAS_FABRICANTES.forEach(marca => {
    resultado = resultado.replace(new RegExp(`\\b${marca}\\b`, 'gi'), '');
  });
  return resultado.replace(/\s{2,}/g, ' ').trim();
}

function pedeVeiculo(customPrompt) {
  if (!customPrompt || !customPrompt.trim()) return false;
  const normalizado = removerAcentos(customPrompt.toLowerCase());
  return PALAVRAS_VEICULO.some(palavra => new RegExp(`\\b${palavra}\\b`).test(normalizado));
}

// Variante de COMPOSICAO_LAYOUT usada quando o usuário pediu um veículo —
// mesma geometria de TIRE ZONE (pra não conflitar com a foto real do pneu),
// mas o veículo pode aparecer como elemento visível de verdade na parte
// restante do quadro, em vez de só silhueta distante.
const COMPOSICAO_LAYOUT_CARRO = {
  feed: [
    'COMPOSITIONAL BRIEF for a 1080×1080 square advertising campaign photo (not a diagram — do not render any grid, labels, coordinates, or text of any kind, this is purely spatial guidance for you).',
    'The user specifically described a vehicle for this scene — it should be a real, clearly visible subject in the photo (not hidden or reduced to a tiny speck), positioned in the LEFT half of the frame, sharp and well-lit.',
    'This is ONE single, continuous photograph of a real place, lit by one light source — think a low, warm sun or distant light glowing from the right side of the frame. The right side of the scene naturally reads brighter and more dramatic; the left side is calmer and more shadowed — smooth and photographic, never a hard line or a flat painted-on panel. Exact brightness on the left is not critical: a separate darkening layer is added in post-production over that side for text legibility.',
    'The right side of the frame (roughly the right half) is the TIRE ZONE — SEE TIRE ZONE RULES BELOW.',

    'TIRE ZONE RULES (right half of the frame): A real product tire photo will be composited EXACTLY here, on top of this image — keep the vehicle and any other large object out of this half, it would be hidden behind the tire photo.',
    'This zone must contain ONLY: atmospheric depth, environmental texture (wet road surface, terrain, dust particles, atmospheric haze), dramatic lighting effects, and far-distant scene elements.',

    'PERSPECTIVE: one-point perspective lines (track, road, trail) originate from center-left and converge right, adding depth to the scene.'
  ].join(' '),

  story: [
    'COMPOSITIONAL BRIEF for a 1080×1920 vertical advertising campaign photo (not a diagram — do not render any grid, labels, coordinates, or text of any kind, this is purely spatial guidance for you).',
    'The user specifically described a vehicle for this scene — it should be a real, clearly recognizable presence in the photo (not a tiny silhouette), positioned in the upper portion of the frame, above the tire zone described below.',
    'This is ONE single, continuous photograph of a real place. Light descends naturally from above, brightest around the upper-middle of the frame, fading gradually toward the base — smooth and photographic, never a hard line or a flat painted-on panel. Exact brightness at the very top and very bottom is not critical: a separate darkening layer is added in post-production there for text legibility.',
    'The middle of the frame is the TIRE ZONE — SEE TIRE ZONE RULES BELOW.',

    'TIRE ZONE RULES (middle of the frame): A real product tire photo will be composited here, centered horizontally, on top of this image — keep the vehicle and any other large foreground object out of this band, it would be hidden behind the tire photo.',
    'This zone must contain ONLY: dramatic environmental backdrop, atmospheric depth, rim-light glow from above, particles (dust, rain drops, mist) — purely the STAGE for the tire there.',

    'VERTICAL COMPOSITION: strong vertical leading lines frame the tire zone from both sides, adding depth to the scene.'
  ].join(' '),

  banner: [
    'COMPOSITIONAL BRIEF for a 1440×600 wide panoramic advertising campaign photo (not a diagram — do not render any grid, labels, coordinates, or text of any kind, this is purely spatial guidance for you).',
    'The user specifically described a vehicle for this scene — it should be a real, clearly visible subject in the photo (not hidden or reduced to a tiny speck), positioned in the left two-thirds of the frame, sharp and well-lit.',
    'This is ONE single, continuous photograph of a real place, backlit from the right — think a low sun or distant light glowing from the right edge of the frame. The right side of the scene naturally reads warm and bright; the left side is calmer and more shadowed — smooth and photographic, never a hard line or a flat painted-on panel. Exact brightness on the left is not critical: a separate darkening layer is added in post-production over that side for text legibility.',
    'The right portion of the frame (roughly the right third) is the TIRE ZONE — SEE TIRE ZONE RULES BELOW.',

    'TIRE ZONE RULES (right third of the frame): A real product tire photo will be composited EXACTLY here, on top of this image — keep the vehicle and any other large object out of this third, it would be hidden behind the tire photo.',
    'This zone must contain ONLY: atmospheric environmental depth, dramatic backlighting effects, motion blur streaks, dust or mist particles — purely environmental atmosphere.',

    'HORIZONTAL COMPOSITION: strong one-point-perspective lines run left-to-right across the full canvas, vanishing point toward the right, adding depth to the scene.'
  ].join(' ')
};

// Aspect ratio pedido à API (Magnific/Mystic) por formato — o Magnific não
// aceita largura×altura em pixels, só um enum fixo de proporções.
const ASPECT_RATIOS = {
  feed:   'square_1_1',
  story:  'social_story_9_16',
  banner: 'horizontal_2_1'
};

// Template base
// ─────────────────────────────────────────────────────────────────────────────
// REGRA MANDATÓRIA — NENHUM LOGO/EMBLEMA DE FABRICANTE DE VEÍCULO
// Vale em TODO template que pode mostrar um veículo (TEMPLATE_BASE quando
// comVeiculo=true, TEMPLATE_BASE_MEDIDA, TEMPLATE_BASE_CARRO): o usuário pode
// pedir uma marca/modelo específico (ex.: "Fiat Strada") — a IA deve gerar o
// formato/silhueta correspondente, mas SEM nenhum logo, emblema ou nome da
// montadora visível no veículo, por questão de direito de marca. Isso é
// diferente da proibição geral de "logos" já existente nos templates (que
// fala do logo da MARCA DE PNEU/empresa, composto na camada 2) — esta regra
// é especificamente sobre o emblema do FABRICANTE DO CARRO na grade, capô,
// rodas, volante etc., que a IA tende a desenhar sozinha ao reconhecer a
// marca pedida.
// ─────────────────────────────────────────────────────────────────────────────
const REGRA_SEM_LOGO_VEICULO =
  'MANDATORY LEGAL RULE, applies if any vehicle appears anywhere in this image: the vehicle must NOT show any visible manufacturer logo, badge, emblem, nameplate, or brand marking anywhere on it — not on the grille, hood, trunk, wheels/hubcaps, steering wheel, seats, or body. This applies even when a specific make or model was described above: reproduce its general body shape, proportions and color, but render it as a completely generic, unbranded vehicle — omit, blank out, or blur any manufacturer badge that would otherwise appear. This rule is non-negotiable (trademark/rights reasons) and overrides any instinct to add a realistic badge for a named brand.';

const TEMPLATE_BASE = (cena, composicao, comVeiculo = false) =>
  `You are a world-class automotive advertising art director creating a photorealistic background plate ` +
  `that will have product UI elements composited on top in post-production. ` +
  `The tire product is the hero — the background is purely the stage. ` +
  `\n\nENVIRONMENTAL SCENE: ${cena}. ` +
  `\n\n${composicao}. ` +
  `\n\nCOLOR: natural, moody, cinematic color grading with good dynamic range; avoid flat, overly bright, or uniformly lit scenes. ` +
  `HARD RESTRICTIONS — violating these ruins the composite: absolutely NO text, NO letters, NO numbers, NO labels, NO diagrams, NO grids, NO logos, NO brand markings, NO watermarks, NO people, NO faces, NO hands — the compositional brief above is spatial guidance for you only, never content to render. This must be ONE single continuous photograph — NO seams, NO hard dividing lines, NO grid or quadrant split, NO flat solid-color panels. ` +
  (comVeiculo
    ? `The vehicle described above IS allowed to be a visible, realistic part of the scene — do not reduce it to a tiny silhouette. It must still stay out of the TIRE ZONE mentioned above — a real product photo will be composited exactly on top of that area. `
    : `NO prominent vehicle or large object placed in the tire zone mentioned above — any vehicle must be a tiny distant silhouette only. `
  ) +
  `${REGRA_SEM_LOGO_VEICULO} ` +
  `Deliver ultra-high-detail photographic realism suitable as a professional advertising background plate.`;

/**
 * @param {'feed'|'story'|'banner'} formato
 * @param {'promocao'|'lancamento'|'aviso'} objetivo
 * @param {string} linha
 * @param {string} customPrompt
 * @returns {{ prompt: string, aspectRatio: string }}
 */
function montarPrompt(formato, objetivo, linha = 'institucional', customPrompt = '') {
  const cenasLinha = CENAS_POR_LINHA[linha] ?? CENAS_POR_LINHA.institucional;
  const comVeiculo = pedeVeiculo(customPrompt);
  // Só mexe no texto quando tem veículo pedido — não vale a pena arriscar
  // alterar uma descrição de cenário comum à toa.
  const cena       = (comVeiculo ? removerMarcaFabricante(customPrompt.trim()) : customPrompt.trim())
    || cenasLinha[objetivo] || cenasLinha.promocao;
  const composicao = (comVeiculo ? COMPOSICAO_LAYOUT_CARRO : COMPOSICAO_LAYOUT)[formato];
  return {
    prompt:      TEMPLATE_BASE(cena, composicao, comVeiculo),
    aspectRatio: ASPECT_RATIOS[formato],
    // Só true quando o usuário pediu um veículo (ver pedeVeiculo) — usado em
    // server.js pra decidir se roda a checagem de logo (Claude Vision);
    // poupa a checagem (custo + latência) nos casos sem veículo nenhum.
    temVeiculo:  comVeiculo
  };
}

// =============================================================================
// MODELO "ARTE DE MEDIDA"
//
// Diferença fundamental do modelo acima: aqui o carro é o herói visível da
// imagem (não mais silhueta distante) — a IA gera só a faixa central da arte
// (entre o mosaico de topo e a tarja amarela). Logo, mosaico, tarja, caixa de
// medidas e parágrafo são compostos por cima na camada 2, nunca pela IA.
// A faixa direita da imagem fica reservada para as FOTOS REAIS do pneu
// (45° + perfil), então deve continuar visualmente simples ali.
// =============================================================================
const COMPOSICAO_LAYOUT_MEDIDA = {
  feed: [
    'COMPOSITIONAL BRIEF — this image fills a wide horizontal band (not a full square) that will be cropped into an advertising layout.',
    'The car is the hero of this shot and MUST be fully visible, sharp and well-lit — three-quarter or side angle, occupying the LEFT and CENTER of the frame.',
    'The RIGHT THIRD of the frame must stay visually simple and uncluttered (clean road/ground, soft atmospheric background, gentle bokeh) — two real tire product photos will be composited on top of that area, so avoid placing the car body, wheels, or any busy detail there.',
    'Photorealistic advertising photography, natural but dramatic lighting, shallow depth of field, premium automotive campaign look.'
  ].join(' '),
  story: [
    'COMPOSITIONAL BRIEF — this image fills a wide horizontal band that will be cropped into a vertical advertising layout.',
    'The car is the hero of this shot and MUST be fully visible, sharp and well-lit — three-quarter or side angle, occupying the LEFT and CENTER of the frame.',
    'The RIGHT THIRD of the frame must stay visually simple and uncluttered (clean road/ground, soft atmospheric background, gentle bokeh) — two real tire product photos will be composited on top of that area, so avoid placing the car body, wheels, or any busy detail there.',
    'Photorealistic advertising photography, natural but dramatic lighting, shallow depth of field, premium automotive campaign look.'
  ].join(' ')
};

const TEMPLATE_BASE_MEDIDA = (cena, composicao) =>
  `You are a world-class automotive advertising photographer creating a photorealistic background plate ` +
  `that will have UI elements (logo, tire size, marquee text) composited around it in post-production — ` +
  `but the vehicle itself must stay fully visible and be the hero of this specific image. ` +
  `\n\nSCENE: ${cena}. ` +
  `\n\n${composicao}. ` +
  `\n\nCOLOR: photorealistic, natural contrast, cinematic automotive-advertising color grade. ` +
  `HARD RESTRICTIONS — violating these ruins the composite: NO text, NO logos, NO brand markings, NO watermarks, NO people, NO faces, NO hands, NO tire shown large in the right third of the frame (real product photos will be placed there in post-production). ` +
  `${REGRA_SEM_LOGO_VEICULO} ` +
  `Deliver ultra-high-detail photographic realism suitable as a professional advertising background plate.`;

// Sempre um retângulo horizontal (proporção 3:2) — só a faixa central da
// arte recebe a foto da IA, então o aspect ratio pedido à API independe do
// formato final do canvas (feed = quadrado, story = vertical).
const ASPECT_RATIO_MEDIDA = { feed: 'standard_3_2', story: 'standard_3_2' };

/**
 * @param {'feed'|'story'} formato
 * @param {string} linha
 * @param {string} customPrompt
 * @returns {{ prompt: string, aspectRatio: string }}
 */
function montarPromptMedida(formato, linha = 'institucional', customPrompt = '') {
  const cenasLinha = CENAS_POR_LINHA[linha] ?? CENAS_POR_LINHA.institucional;
  // Carro é sempre o herói aqui — tira o nome da montadora sempre, não só
  // quando detectado (ver removerMarcaFabricante).
  const cena       = removerMarcaFabricante(customPrompt.trim()) || cenasLinha.promocao;
  const composicao = COMPOSICAO_LAYOUT_MEDIDA[formato] ?? COMPOSICAO_LAYOUT_MEDIDA.feed;
  return {
    prompt:      TEMPLATE_BASE_MEDIDA(cena, composicao),
    aspectRatio: ASPECT_RATIO_MEDIDA[formato] ?? ASPECT_RATIO_MEDIDA.feed,
    temVeiculo:  true // carro é sempre o herói visível neste modelo
  };
}

// =============================================================================
// MODELOS "ARTE LIVRE" COM CARRO-HERÓI (Pneu + Carro de Frente / de Lado)
//
// Diferente do modelo "Arte de Medida", aqui a IA gera o fundo INTEIRO do
// canvas (não uma faixa central) — o carro é o herói visível, sugerido em
// texto livre pelo usuário. Uma foto real do pneu (45° ou perfil) é
// sobreposta por cima na camada 2, então a zona onde ela cai deve continuar
// visualmente simples na imagem gerada.
// =============================================================================
const COMPOSICAO_CARRO = {
  feed: {
    frente:
      'COMPOSITIONAL BRIEF (1080×1080, square): the car is the absolute hero, seen head-on (front or front three-quarter view), filling most of the frame, sharp focus, dramatic lighting. Leave the BOTTOM-CENTER third of the frame (around the front wheel/tire, at ground level) relatively uncluttered — a real tire product photo will be composited directly over that area in post-production, so keep it simple (clean ground/road, no extra objects there). Headline text will be placed in the upper portion of the frame — keep that area atmospheric but not overly busy.',
    lado:
      'COMPOSITIONAL BRIEF (1080×1080, square): a vehicle is visible driving at a distance in the upper-left background, small and partially cropped — a supporting element, NOT filling the frame. The BOTTOM-RIGHT two-thirds of the frame must stay clean and simple (soft road/ground, atmospheric bokeh, diagonal light streaks) because a huge real tire product photo (side profile, extreme close-up) will be composited directly over that entire area in post-production. Headline text sits in the upper-left — keep that region atmospheric but readable.'
  },
  story: {
    frente:
      'COMPOSITIONAL BRIEF (1080×1920, vertical): the car is the absolute hero, seen head-on (front or front three-quarter view), centered in the upper two-thirds of the frame, sharp focus, dramatic lighting. Leave the BOTTOM third of the frame relatively uncluttered at ground level — a real tire product photo will be composited directly over the car\'s front wheel/tire area in post-production. Headline text sits near the top — keep that region atmospheric but readable.',
    lado:
      'COMPOSITIONAL BRIEF (1080×1920, vertical): a vehicle is visible driving at a distance in the upper background, small and partially cropped — a supporting element, NOT filling the frame. The LOWER two-thirds of the frame must stay clean and simple (soft road/ground, atmospheric bokeh, diagonal light streaks) because a huge real tire product photo (side profile, extreme close-up) will be composited directly over that area in post-production. Headline text sits near the top.'
  },
  // Banner (1920×664/393/195 — a IA sempre gera na proporção 2:1, cropada
  // igual para os 3 tamanhos): só existe pra "carrolado" ("carrofrente" não
  // tem Banner). Texto fica à esquerda, pneu vaza pela borda direita — igual
  // ao layout de "padrao"/"pneu45" no banner.
  banner: {
    lado:
      'COMPOSITIONAL BRIEF (1920×664, wide panoramic banner): a vehicle is visible driving at a distance on the left side of the frame, small and partially cropped — a supporting element, NOT filling the frame. The RIGHT two-thirds of the frame must stay clean and simple (soft road/ground, atmospheric bokeh, diagonal light streaks) because a huge real tire product photo (side profile, extreme close-up) will be composited directly over that area in post-production. Headline text sits on the far left.'
  }
};

const TEMPLATE_BASE_CARRO = (cena, composicao, sugestaoCarro) =>
  `You are a world-class automotive advertising photographer creating a photorealistic background plate ` +
  `that will have UI elements (headline text, brand logo) composited on top in post-production, plus a real ` +
  `tire product photo composited directly over part of the scene. ` +
  `\n\nVEHICLE: ${sugestaoCarro || 'a modern SUV or sedan, dark metallic paint'} — a generic, unbranded vehicle of this body style, with a completely blank/badge-free grille, hood, and wheels (no manufacturer logo or nameplate anywhere on it, see mandatory rule below). ` +
  `\n\nSCENE & ATMOSPHERE: ${cena}. ` +
  `\n\n${composicao}. ` +
  `\n\nCOLOR: photorealistic, natural contrast, cinematic automotive-advertising color grade. ` +
  `HARD RESTRICTIONS — violating these ruins the composite: NO text, NO logos, NO brand markings, NO watermarks, NO people, NO faces, NO hands. ` +
  `${REGRA_SEM_LOGO_VEICULO} ` +
  `Deliver ultra-high-detail photographic realism suitable as a professional advertising background plate.`;

/**
 * @param {'feed'|'story'|'banner'} formato
 * @param {'frente'|'lado'} vista
 * @param {string} linha
 * @param {string} sugestaoCarro texto livre do usuário descrevendo o carro
 * @param {string} customPrompt
 * @returns {{ prompt: string, aspectRatio: string }}
 */
function montarPromptCarro(formato, vista, linha = 'institucional', sugestaoCarro = '', customPrompt = '') {
  const cenasLinha = CENAS_POR_LINHA[linha] ?? CENAS_POR_LINHA.institucional;
  const cena            = customPrompt.trim() || cenasLinha.promocao;
  const composicao      = (COMPOSICAO_CARRO[formato] ?? COMPOSICAO_CARRO.feed)[vista] ?? COMPOSICAO_CARRO.feed.frente;
  const veiculoSemMarca = removerMarcaFabricante(sugestaoCarro);
  return {
    prompt:      TEMPLATE_BASE_CARRO(cena, composicao, veiculoSemMarca),
    aspectRatio: ASPECT_RATIOS[formato] ?? ASPECT_RATIOS.feed,
    temVeiculo:  true // carro é sempre o herói visível neste modelo
  };
}

module.exports = {
  montarPrompt,
  montarPromptMedida,
  montarPromptCarro,
  // Exportadas só pra teste (ver test/prompts.test.js) — são puras.
  pedeVeiculo,
  removerMarcaFabricante
};
