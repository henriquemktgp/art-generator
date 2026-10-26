// =============================================================================
// Testes de src/claude-vision.js — chamada REAL à API da Anthropic (gasta
// tokens de verdade, exige ANTHROPIC_API_KEY no .env). Registra os 3 casos
// testados manualmente na sessão em que essa verificação foi criada:
// 1 imagem com logo de fabricante bem visível (deve reprovar) e 2 imagens
// limpas (devem aprovar) — ver test/fixtures/.
//
// Sem ANTHROPIC_API_KEY configurada, os testes pulam (não falham) — assim a
// suíte continua rodável em qualquer máquina, mesmo sem a chave.
// =============================================================================
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { imagemAprovadaSemLogoVeiculo } = require('../src/claude-vision');

const TEM_CHAVE = Boolean(process.env.ANTHROPIC_API_KEY);
if (!TEM_CHAVE) {
  console.warn('\n  ⚠  ANTHROPIC_API_KEY não configurada — pulando test/claude-vision.test.js.\n');
}

function carregarFixture(nome) {
  return fs.readFileSync(path.join(__dirname, 'fixtures', nome)).toString('base64');
}

test('reprova imagem com logo de fabricante bem visível (FIAT na grade)', { skip: !TEM_CHAVE }, async () => {
  const aprovado = await imagemAprovadaSemLogoVeiculo(carregarFixture('logo-visivel.png'));
  assert.equal(aprovado, false);
});

test('aprova imagem sem nenhum logo aparente (picape #1)', { skip: !TEM_CHAVE }, async () => {
  const aprovado = await imagemAprovadaSemLogoVeiculo(carregarFixture('sem-logo-1.png'));
  assert.equal(aprovado, true);
});

test('aprova imagem sem nenhum logo aparente (picape #2)', { skip: !TEM_CHAVE }, async () => {
  const aprovado = await imagemAprovadaSemLogoVeiculo(carregarFixture('sem-logo-2.png'));
  assert.equal(aprovado, true);
});
