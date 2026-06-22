// =============================================================================
// TEMPLATES DE PROMPT — HOMOLOGADOS PELA EQUIPE DE MARKETING
//
// Para refinar um prompt, edite APENAS os valores de CENAS e ESPACOS_NEGATIVOS.
// Não altere a estrutura de montarPrompt() nem remova as negativas do TEMPLATE_BASE.
// Toda mudança aqui afeta todas as gerações futuras — valide antes de publicar.
//
// REGRAS INEGOCIÁVEIS (nunca remover do TEMPLATE_BASE):
//   • Proibições: NO text, NO logos, NO brand names, NO watermarks
//   • O texto do usuário (título, subtítulo, CTA) NUNCA entra aqui
//
// [MULTIMARCA] Para múltiplas marcas no futuro, transforme CENAS e
// ESPACOS_NEGATIVOS em objetos aninhados por marca, ex.:
//   CENAS = { delinte: { promocao: '...', ... }, outraMarca: { ... } }
// =============================================================================

// Descrição da cena por objetivo
const CENAS = {
  promocao:   'wet racetrack at dusk with motion blur, kinetic energy, asphalt reflections, speed sensation',
  lancamento: 'sleek minimalist studio with a single dramatic spotlight, premium product reveal mood',
  aviso:      'clean minimal dark industrial garage with focused directional lighting, precise controlled mood'
};

// Onde a composição de texto e logo será sobreposta
const ESPACOS_NEGATIVOS = {
  feed:   'open negative space on the left half of the image',
  story:  'open negative space on the bottom two-thirds of the image',
  banner: 'open negative space on the right third of the image'
};

// Tamanho da imagem solicitado à API por formato de arte
// Próximo ao aspect ratio de cada formato; o front adapta com background-size: cover
const TAMANHOS_API = {
  feed:   '1024x1024',  // 1:1  → Feed 1080×1080
  story:  '1024x1536',  // 2:3  → Story 1080×1920 (crop)
  banner: '1536x1024'   // 3:2  → Banner 1440×600 (crop)
};

// Template base — alterar apenas com aprovação de marketing
const TEMPLATE_BASE = (cena, espacoNegativo) =>
  `Cinematic automotive background scene, ${cena}, premium high-performance aesthetic, ` +
  `dramatic lighting, dark moody atmosphere, ${espacoNegativo} for text overlay. ` +
  `NO text, NO logos, NO brand names, NO tires in foreground, NO watermarks, NO people, NO faces. ` +
  `Photorealistic, high detail, color palette dominated by deep blacks with subtle warm amber and golden highlights.`;

/**
 * Monta o prompt e o tamanho de imagem para um dado formato e objetivo.
 * @param {'feed'|'story'|'banner'} formato
 * @param {'promocao'|'lancamento'|'aviso'} objetivo
 * @returns {{ prompt: string, tamanho: string }}
 */
function montarPrompt(formato, objetivo) {
  return {
    prompt:  TEMPLATE_BASE(CENAS[objetivo], ESPACOS_NEGATIVOS[formato]),
    tamanho: TAMANHOS_API[formato]
  };
}

module.exports = { montarPrompt };
