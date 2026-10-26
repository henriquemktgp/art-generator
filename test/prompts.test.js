// =============================================================================
// Testes de src/prompts.js — tudo puro, sem chamada de rede, roda em
// milissegundos. Registra comportamentos descobertos/corrigidos nesta sessão:
// detecção de veículo, remoção de marca de fabricante, e a regra mandatória
// de "sem logo" nos 3 templates que podem mostrar carro.
// =============================================================================
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { montarPrompt, montarPromptMedida, montarPromptCarro, pedeVeiculo, removerMarcaFabricante } = require('../src/prompts');

test('pedeVeiculo detecta marca/tipo de veículo em português', () => {
  assert.equal(pedeVeiculo('Fiat Strada 2020 na frente de uma porteira'), true);
  assert.equal(pedeVeiculo('uma picape branca na estrada'), true);
  assert.equal(pedeVeiculo('Toyota Hilux preta na trilha'), true);
  assert.equal(pedeVeiculo('estrada de terra ao entardecer, sem mais nada'), false);
  assert.equal(pedeVeiculo(''), false);
  assert.equal(pedeVeiculo('   '), false);
});

test('pedeVeiculo não confunde substring de outra palavra (word boundary)', () => {
  // "carango" não contém "car"/"carro" como palavra inteira; "vanguarda" não
  // contém "van" como palavra inteira — a regex usa \b nos dois lados.
  assert.equal(pedeVeiculo('um carango véio'), false);
  assert.equal(pedeVeiculo('uma vanguarda tecnológica'), false);
});

test('removerMarcaFabricante tira o nome da montadora mas preserva o resto', () => {
  assert.equal(removerMarcaFabricante('Fiat Strada 2020, pickup branca'), 'Strada 2020, pickup branca');
  assert.equal(removerMarcaFabricante('Toyota Hilux preta, picape robusta'), 'Hilux preta, picape robusta');
  assert.equal(removerMarcaFabricante('Chevrolet Montana branca'), 'Montana branca');
  // Sem marca nenhuma: passa direto, sem alterar espaçamento.
  assert.equal(removerMarcaFabricante('uma picape branca genérica'), 'uma picape branca genérica');
});

test('removerMarcaFabricante lida com string vazia/undefined sem quebrar', () => {
  assert.equal(removerMarcaFabricante(''), '');
  assert.equal(removerMarcaFabricante(undefined), undefined);
});

test('montarPrompt: sem veículo no texto -> temVeiculo false e silhueta distante', () => {
  const r = montarPrompt('feed', 'promocao', 'passeio', 'estrada de terra ao entardecer');
  assert.equal(r.temVeiculo, false);
  assert.match(r.prompt, /tiny distant silhouette only/);
});

test('montarPrompt: com veículo no texto -> temVeiculo true, libera o veículo, e some a marca do texto da IA', () => {
  const r = montarPrompt('feed', 'promocao', 'passeio', 'Fiat Strada 2020 na frente de uma porteira');
  assert.equal(r.temVeiculo, true);
  assert.match(r.prompt, /IS allowed to be a visible/);
  assert.ok(!/\bFiat\b/i.test(r.prompt), 'o nome da marca não deveria chegar no prompt da IA');
  assert.match(r.prompt, /Strada/); // mas o modelo/forma continua descrito
});

test('montarPrompt: aspectRatio correto por formato', () => {
  assert.equal(montarPrompt('feed', 'promocao').aspectRatio, 'square_1_1');
  assert.equal(montarPrompt('story', 'promocao').aspectRatio, 'social_story_9_16');
  assert.equal(montarPrompt('banner', 'promocao').aspectRatio, 'horizontal_2_1');
});

test('montarPromptMedida: carro sempre herói (temVeiculo true) e sem marca no prompt', () => {
  const r = montarPromptMedida('feed', 'passeio', 'Fiat Strada 2020 numa fazenda');
  assert.equal(r.temVeiculo, true);
  assert.ok(!/\bFiat\b/i.test(r.prompt));
});

test('montarPromptCarro: carro sempre herói (temVeiculo true) e sem marca no prompt', () => {
  const r = montarPromptCarro('feed', 'frente', 'passeio', 'Fiat Strada 2020, pickup branca', '');
  assert.equal(r.temVeiculo, true);
  assert.ok(!/\bFiat\b/i.test(r.prompt));
  assert.match(r.prompt, /Strada/);
});

test('os 3 templates que podem mostrar veículo incluem a regra mandatória de "sem logo"', () => {
  const comVeiculo = montarPrompt('feed', 'promocao', 'passeio', 'Fiat Strada numa fazenda');
  const medida      = montarPromptMedida('feed', 'passeio', 'cenário qualquer');
  const carro       = montarPromptCarro('feed', 'frente', 'passeio', 'um SUV qualquer', '');

  for (const r of [comVeiculo, medida, carro]) {
    assert.match(r.prompt, /MANDATORY LEGAL RULE/);
    assert.match(r.prompt, /manufacturer logo/i);
  }
});

test('regressão: o prompt não volta a pedir "preto puro" em nenhuma zona (ver histórico — causava artefato visual)', () => {
  for (const formato of ['feed', 'story', 'banner']) {
    const r = montarPrompt(formato, 'promocao', 'institucional');
    assert.ok(!/pure near-black/i.test(r.prompt), `formato ${formato} não deveria pedir "pure near-black" — isso é responsabilidade do CSS (.art-overlay), não da IA`);
  }
});
