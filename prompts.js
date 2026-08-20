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
    'COMPOSITIONAL BRIEF — UI overlay map (1080×1080 canvas):',

    '| ZONE          | X pixels    | Y pixels  | UI element              | What background must do here                              |',
    '| Logo          | 20–320      | 40–130    | Delinte logo            | Pure near-black, featureless — zero texture               |',
    '| Badge         | 700–1080    | 40–130    | Campaign badge          | Subtle atmospheric haze, very dark                        |',
    '| Text column   | 0–540       | 130–1080  | Title, body copy, CTA   | Very dark moody gradient, minimal texture, max legibility |',
    '| TIRE ZONE     | 540–1080    | 100–1000  | *** TIRE PNG HERE ***   | SEE TIRE ZONE RULES BELOW                                 |',

    'TIRE ZONE RULES (x 540-1080, y 100-1000): The product tire PNG with transparent background will be composited EXACTLY here.',
    'DO NOT place any vehicle, large object, or main subject in this zone — it will be completely hidden by the tire.',
    'This zone must contain ONLY: atmospheric depth, environmental texture (wet road surface, terrain, dust particles, atmospheric haze), dramatic lighting effects, and far-distant scene elements.',
    'Any vehicle must appear ONLY as a tiny silhouette at the extreme far background, very small, partially cropped by the image edge — never as a prominent element.',

    'PERSPECTIVE & LIGHTING: one-point perspective lines (track, road, trail) originate from center-left and converge right.',
    'Key light source is rear-right, creating a natural rim-light glow in the tire zone and falling into shadow toward the text column.',
    'This dark-left / lit-right gradient must happen organically through the scene lighting — not through post-processing vignettes.'
  ].join(' '),

  story: [
    'COMPOSITIONAL BRIEF — UI overlay map (1080×1920 canvas, vertical):',

    '| ZONE          | X pixels  | Y pixels    | UI element              | What background must do here                              |',
    '| Logo          | 64–400    | 64–160      | Delinte logo            | Pure near-black, featureless                              |',
    '| Badge         | 650–1016  | 64–160      | Campaign badge          | Very dark, subtle atmospheric haze                        |',
    '| TIRE ZONE     | 80–1000   | 140–1050    | *** TIRE PNG HERE ***   | SEE TIRE ZONE RULES BELOW                                 |',
    '| Text column   | 64–1016   | 1050–1800   | Title, body copy, CTA   | Progressively darkens top-to-bottom, near-black at base   |',

    'TIRE ZONE RULES (x 80-1000, y 140-1050): The product tire PNG will be composited here, centered horizontally.',
    'DO NOT place any vehicle, animal, person, or large foreground object in this zone.',
    'This zone must contain ONLY: dramatic environmental backdrop (towering cliff faces, dense forest canopy, skyline, dramatic clouds), atmospheric depth, rim-light glow from above, particles (dust, rain drops, mist) — purely the STAGE for the tire, never a competing hero element.',

    'VERTICAL COMPOSITION: strong vertical leading lines (cliff edges, tree trunks, building facades, waterfall) frame the tire zone from both sides.',
    'Key light descends from above-right, creating a natural spotlight effect in the tire zone.',
    'Lower zone (y 1050-1920) must transition organically to near-black for text legibility — achieved through natural environmental shadow, not artificial fading.'
  ].join(' '),

  banner: [
    'COMPOSITIONAL BRIEF — UI overlay map (1440×600 canvas, panoramic):',

    '| ZONE          | X pixels  | Y pixels  | UI element              | What background must do here                              |',
    '| Stripe        | 0–12      | 0–600     | Yellow accent stripe    | Pure black, zero texture                                  |',
    '| Logo+Badge    | 12–380    | 0–600     | Logo top, badge below   | Deepest black zone, near-featureless                      |',
    '| Text column   | 380–920   | 0–600     | Title, body copy, CTA   | Dark moody mid-tone, max legibility for white type        |',
    '| TIRE ZONE     | 920–1440  | 0–600     | *** TIRE PNG HERE ***   | SEE TIRE ZONE RULES BELOW                                 |',

    'TIRE ZONE RULES (x 920-1440, y 0-600): The product tire PNG will be composited EXACTLY here.',
    'DO NOT place any vehicle or large object in this zone — it will be hidden by the tire.',
    'This zone must contain ONLY: atmospheric environmental depth (receding road, canyon wall, industrial architecture in far distance), dramatic backlighting effects, motion blur streaks, dust or mist particles — purely environmental atmosphere.',
    'Any vehicle must appear ONLY as a distant tiny silhouette near the far-right edge or horizon line, very small.',

    'HORIZONTAL COMPOSITION: strong one-point-perspective lines (road, track, horizon) run left-to-right across the full canvas, vanishing point at x ~1300.',
    'Key light source is far-right, backlighting the entire scene — creates natural darkness on the left (logo zone) and warm rim-light glow on the right (tire zone).',
    'This left-dark / right-lit gradient is fundamental to the composition.'
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

// Aspect ratio pedido à API (Magnific/Mystic) por formato — o Magnific não
// aceita largura×altura em pixels, só um enum fixo de proporções.
const ASPECT_RATIOS = {
  feed:   'square_1_1',
  story:  'social_story_9_16',
  banner: 'horizontal_2_1'
};

// Template base
const TEMPLATE_BASE = (cena, composicao) =>
  `You are a world-class automotive advertising art director creating a photorealistic background plate ` +
  `that will have product UI elements composited on top in post-production. ` +
  `The tire product is the hero — the background is purely the stage. ` +
  `\n\nENVIRONMENTAL SCENE: ${cena}. ` +
  `\n\n${composicao}. ` +
  `\n\nCOLOR: deep blacks and dark charcoals dominate; warm amber/golden accents only in dynamically lit zones. No flat, bright, or uniformly lit backgrounds. ` +
  `HARD RESTRICTIONS — violating these ruins the composite: NO text, NO logos, NO brand markings, NO watermarks, NO people, NO faces, NO hands. NO prominent vehicle or large object placed in the tire zone coordinates listed above — any vehicle must be a tiny distant silhouette only. ` +
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
  const cena       = customPrompt.trim() || cenasLinha[objetivo] || cenasLinha.promocao;
  const composicao = COMPOSICAO_LAYOUT[formato];
  return {
    prompt:      TEMPLATE_BASE(cena, composicao),
    aspectRatio: ASPECT_RATIOS[formato]
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
  const cena       = customPrompt.trim() || cenasLinha.promocao;
  const composicao = COMPOSICAO_LAYOUT_MEDIDA[formato] ?? COMPOSICAO_LAYOUT_MEDIDA.feed;
  return {
    prompt:      TEMPLATE_BASE_MEDIDA(cena, composicao),
    aspectRatio: ASPECT_RATIO_MEDIDA[formato] ?? ASPECT_RATIO_MEDIDA.feed
  };
}

module.exports = { montarPrompt, montarPromptMedida, CENAS_POR_LINHA };
