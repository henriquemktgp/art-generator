# Gerador de Artes v2 — Delinte & Denali

Ferramenta interna GP Corp para criação de artes digitais padronizadas das marcas **Delinte** e **Denali**.

**Arquitetura híbrida:**
- **Camada 1 — IA:** a API OpenAI gera um fundo automotivo (apenas cenário, sem logo nem texto). O prompt é o mesmo para as duas marcas — proíbe explicitamente logos, marcas e texto no fundo.
- **Camada 2 — Composição:** o app sobrepõe logo oficial, título, specs e CTA com precisão de template, usando a paleta de cores e a tipografia da marca selecionada. Estes elementos nunca são gerados por IA.

---

## Pré-requisitos

- **Node.js 18 ou superior** — [nodejs.org](https://nodejs.org)
- Uma **chave de API da OpenAI** com acesso ao modelo `gpt-image-1` — [platform.openai.com/api-keys](https://platform.openai.com/api-keys)

---

## Configurar e rodar

```bash
# 1. Entre na pasta do projeto
cd delinte-art-generator-v2

# 2. Instale as dependências
npm install

# 3. Configure a chave da API
cp .env.example .env
# Abra o arquivo .env e insira sua chave: OPENAI_API_KEY=sk-...

# 4. Inicie o servidor
npm start
# ou, para reiniciar automaticamente ao salvar:
npm run dev

# 5. Acesse no navegador
# http://localhost:3000
```

---

## Como usar a ferramenta

1. Escolha a **Marca** (Delinte ou Denali) — troca cores, logo, tipografia de título e catálogo de produtos.
2. Escolha **Formato** (Feed 1:1, Story 9:16, Banner Horizontal) — mesmos tamanhos para as duas marcas.
3. Escolha **Objetivo** (Promoção, Lançamento, Aviso).
4. Selecione o **Produto** na lista (ou "Sem produto" para artes institucionais).
5. Preencha **Título**, **Subtítulo** e **CTA**.
6. Clique em **Gerar Fundo com IA** — aguarde alguns segundos.
7. O fundo aparece por trás da composição. Se não gostar, clique em **Gerar Novamente**.
8. Clique em **PNG** ou **PDF** para exportar (o arquivo sai nomeado `<marca>-<formato>-arte`).

> Trocar o Formato descarta o fundo atual e exige nova geração (o prompt de fundo muda conforme o formato). Trocar a Marca **não** descarta o fundo — o fundo gerado por IA nunca contém logo/marca, então serve para qualquer uma das duas.

---

## Identidade visual por marca

| | Delinte | Denali |
|---|---|---|
| Cor de acento | `#FFDB0F` (amarelo, sólido) | gradiente `#FF2C14 → #FF5D1E` |
| Preto / Branco da arte | `#000000` / `#FFFFFF` | `#0B0B0B` / `#F1F1F1` |
| Fonte de título | Anton (Google Fonts) | Nasalization (self-hosted, ver abaixo) |
| Logo | SVG via CDN (`marketing-gp/delinte`) | PNG local em `public/assets/denali/` |

As cores da Denali vêm do `Manual_Denali.pdf` (paleta oficial homologada pelo marketing). As variáveis de marca ficam em `public/style.css`, escopadas por `[data-marca="delinte"]` / `[data-marca="denali"]` — para ajustar uma cor, edite lá.

**Fonte Nasalization:** é uma fonte paga (Adobe Fonts), não disponível via Google Fonts. Os arquivos (`Nasalization-Rg.otf`/`.ttf`) estão em `public/fonts/` e são carregados via `@font-face` em `style.css`. Se precisar trocar o arquivo da fonte, substitua os arquivos nessa pasta mantendo o mesmo nome.

---

## Como editar a lista de produtos

Abra `public/app.js` e localize o bloco da marca desejada:

```
// CADASTRO DE PRODUTOS — EDITE AQUI       (Delinte → PRODUTOS_DELINTE)
// CATÁLOGO DENALI                          (Denali  → PRODUTOS_DENALI)
```

Cada produto segue o formato:

```js
{
  nome:   "DS2",
  specs:  "Ultra-high performance · sulcos assimétricos",
  foto:   "https://url-da-foto-oficial.png",
  titulo: "TECNOLOGIA QIRIN SCALE",
  sub:    "Sulcos assimétricos de alta precisão para máxima aderência em pistas molhadas.",
  cta:    "CONHEÇA O DS2",
  linha:  "esportiva"
},
```

- **Adicionar:** copie um bloco `{ ... },` e cole antes do `]` que fecha a lista da marca.
- **Atualizar foto:** troque a URL do campo `foto` pelo PNG oficial recortado (fundo transparente).
- **Remover:** apague o bloco inteiro (nunca apague o item "Sem produto", sempre o índice 0 de cada marca).
- `linha` é compartilhada entre marcas (`esportiva`, `offroad`, `runflat`, `carga`, `passeio`, `institucional`) — define qual cenário de fundo (`prompts.js`) e qual sugestão de prompt (`SUGESTOES_CENA`) o produto usa.

Salve e recarregue a página — sem reiniciar o servidor.

> **Pendente:** as linhas Denali **SteelWolf** (RunFlat) e **Buffalo** (Carga) ainda estão com specs/CTA de rascunho e sem foto oficial (usam o fallback `gerarPlaceholder()`). Atualize esses dois blocos em `PRODUTOS_DENALI` assim que o marketing Denali enviar os dados definitivos.

---

## Como refinar os prompts de IA

Abra `prompts.js` e edite os valores de `CENAS_POR_LINHA` (cenário por linha × objetivo) e `COMPOSICAO_LAYOUT` (mapa de zonas da UI por formato).
**Não altere** a função `montarPrompt()` nem remova as proibições explícitas do `TEMPLATE_BASE` — são elas que garantem que o fundo gerado nunca traga logo, texto ou marca, para nenhuma das duas marcas.

Reinicie o servidor (`npm start`) após salvar.

---

## Exportação

| Botão | Formato | Resolução |
|-------|---------|-----------|
| PNG   | PNG     | 2× (ex.: 2160×2160 para feed) |
| PDF   | PDF     | Dimensões nativas da arte     |

---

## Segurança

- A chave `OPENAI_API_KEY` fica exclusivamente no arquivo `.env` (no servidor).
- O `.env` está no `.gitignore` e nunca é commitado.
- O frontend se comunica apenas com `/api/gerar-fundo` no próprio servidor — nunca direto com a OpenAI.

---

*Gerador de Artes v2 — GP Corp · Delinte & Denali*
