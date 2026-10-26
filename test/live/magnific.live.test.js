// =============================================================================
// Teste "ao vivo" — gera uma arte DE VERDADE no Magnific (custa dinheiro, leva
// 30-90s+) e confirma que o pipeline completo (geração + checagem de logo via
// Claude Vision) entrega uma imagem aprovada. Registra o teste manual feito
// na sessão em que a regra "sem logo de fabricante" foi criada.
//
// NÃO roda em "npm test" — só em "npm run test:live", de propósito (custo e
// latência). Pula sozinho se faltar MAGNIFIC_API_KEY ou ANTHROPIC_API_KEY.
// =============================================================================
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { montarPromptCarro } = require('../../src/prompts');
const { gerarImagemMagnific } = require('../../src/magnific');
const { imagemAprovadaSemLogoVeiculo } = require('../../src/claude-vision');

const TEM_CHAVES = Boolean(process.env.MAGNIFIC_API_KEY) && Boolean(process.env.ANTHROPIC_API_KEY);
if (!TEM_CHAVES) {
  console.warn('\n  ⚠  MAGNIFIC_API_KEY/ANTHROPIC_API_KEY ausente — pulando magnific.live.test.js.\n');
}

test(
  'pipeline completo: gera um veículo de marca específica e confirma aprovação sem logo',
  { skip: !TEM_CHAVES, timeout: 150_000 },
  async () => {
    const { prompt, aspectRatio } = montarPromptCarro(
      'feed', 'frente', 'passeio',
      'Fiat Strada 2020, pickup branca',
      'em frente a uma porteira rural, estrada de chão, dia ensolarado'
    );

    const imagemUrl = await gerarImagemMagnific(prompt, aspectRatio);
    const resp = await fetch(imagemUrl);
    assert.ok(resp.ok, 'download da imagem gerada deveria funcionar');

    const buffer = Buffer.from(await resp.arrayBuffer());
    const aprovado = await imagemAprovadaSemLogoVeiculo(buffer.toString('base64'));

    assert.equal(aprovado, true, 'a imagem gerada deveria passar na checagem de logo (ver REGRA_SEM_LOGO_VEICULO)');
  }
);
