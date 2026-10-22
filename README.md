# Gerador de Artes v2 — Delinte, Denali, Sentury, Samson & Iron Head

Ferramenta interna GP Corp para criação de artes digitais padronizadas das marcas **Delinte**, **Denali**, **Sentury**, **Samson** e **Iron Head**.

**Arquitetura híbrida:**
- **Camada 1 — IA:** a API Magnific (modelo Mystic) gera o fundo automotivo (cenário, ou carro-herói, conforme o modelo escolhido) — sem logo nem texto de marca. O prompt varia conforme o modelo de arte, mas todos proíbem explicitamente logos, marcas e texto no fundo.
- **Camada 2 — Composição:** o app sobrepõe logo oficial, título, specs, fotos reais do pneu e CTA com precisão de template, usando a paleta de cores e a tipografia da marca selecionada. Estes elementos nunca são gerados por IA.

---

## Pré-requisitos

- **Node.js 18 ou superior** — [nodejs.org](https://nodejs.org)
- Uma **chave de API do Magnific** — [magnific.com](https://www.magnific.com) (Settings → API Keys)

---

## Configurar e rodar

```bash
# 1. Entre na pasta do projeto
cd art-generator

# 2. Instale as dependências
npm install

# 3. Configure a chave da API
cp .env.example .env
# Abra o arquivo .env e insira sua chave: MAGNIFIC_API_KEY=...

# 4. Inicie o servidor
npm start
# ou, para reiniciar automaticamente ao salvar:
npm run dev

# 5. Acesse no navegador
# http://localhost:3000
```

---

## Como usar a ferramenta

1. Escolha a **Marca** (Delinte, Denali, Sentury, Samson ou Iron Head) — troca cores, logo, tipografia de título e catálogo de produtos.
2. Escolha o **Tipo de Arte**: **Arte Livre** ou **Arte de Medida**.
3. Escolha o **Modelo** dentro do tipo de arte selecionado (ver seções abaixo).
4. Escolha **Formato** (Feed 1:1, Story 9:16, Banner Horizontal — com 2 tamanhos selecionáveis: **Header** 1920×400 e **Médio** 1200×250; a exportação gera também o recorte mobile de cada um automaticamente, 700×400 e 400×280) e, quando aplicável, **Objetivo** (Promoção, Lançamento, Aviso, ou Nenhum para não exibir selo). Banner existe em "Arte Livre Padrão", "Arte com 3 Pneus", "Arte de Pneu 45°" e "Pneu + Carro de Lado" — "Pneu + Carro de Frente", "Arte de Pneu de Frente" e todos os modelos de Arte de Medida ficam só com Feed/Story.
5. Selecione o(s) **Produto(s)** e preencha os campos de texto do modelo (título, subtítulo, CTA, medida, destaque, sugestão de carro etc. — os campos disponíveis mudam conforme o modelo). Nos modelos "Padrão", "3 Pneus", "Pneu 45°" e "Medida Única" aparece também o controle **Pneu com roda / Sem roda**, que troca a foto do pneu mantendo a mesma posição — só tem efeito visual se o produto tiver cadastradas as duas fotos (`foto`/`foto45`, ver seção de catálogo abaixo). No modelo "3 Pneus" existe ainda o controle **Apelido / Nome completo**, que troca o texto exibido abaixo de cada foto (só em Feed/Story — no Banner é sempre o apelido).
6. Nos modelos com IA, clique em **Gerar Fundo com IA** — aguarde alguns segundos (a geração é assíncrona e pode levar até ~2 minutos). Se não gostar do resultado, clique em **Gerar Novamente**.
7. Clique em **PNG** ou **PDF** para exportar (o arquivo sai nomeado `<marca>-<formato>-<modelo>-arte`).

> Trocar o Formato ou o Modelo descarta o fundo gerado (o prompt muda conforme cada um) e exige nova geração. Trocar a Marca **não** descarta o fundo — o fundo gerado por IA nunca contém logo/marca, então serve para qualquer uma das marcas.

### Modelos de Arte Livre

| Modelo | O que gera | Observações |
|---|---|---|
| **Arte Livre Padrão** | Cenário de fundo + logo, badge, título, subtítulo, CTA e a foto (roda) do produto | Objetivo define o cenário e o badge |
| **Arte com 3 Pneus** | Cenário de fundo + até 3 produtos lado a lado (foto 45°) com apelido (ou nome completo) e um campo "Destaque" | Sem título/CTA — usa o Subtítulo como texto de rodapé; nome completo quebra linha automaticamente se não couber |
| **Arte de Pneu 45°** | Cenário de fundo + foto do pneu a 45° + título/subtítulo + specs em formato de "pills" | No Banner o layout muda: dois pneus lado a lado (cortados, foco na banda de rodagem) e CTA no lugar das pills |
| **Pneu + Carro de Frente** | Carro-herói (visto de frente) gerado por IA + foto real do pneu (45°) sobreposta | Só título; campo "Sugestão de Carro" descreve o veículo desejado à IA; sem Banner |
| **Pneu + Carro de Lado** | Carro-herói (visto de lado, ao fundo) + foto real do pneu de perfil, em destaque | Mesma lógica do anterior, ângulo lateral; no Banner o pneu vaza a borda esquerda, logo fica centralizada embaixo, e ganha um CTA ao lado do título |
| **Arte de Pneu de Frente** | Fundo fixo (sem IA) por marca + foto frontal do produto | Sem botão "Gerar Fundo" nem painel de prompt — não usa a API; sem Banner |

### Modelos de Arte de Medida

Foco em especificação técnica do pneu (medida/dimensão), não em estilo de vida.

| Modelo | O que gera | Observações |
|---|---|---|
| **Medida Única** | Cenário de fundo (IA) + fotos reais do pneu (45° e perfil) + medida em destaque, nome completo do produto e parágrafo descritivo | Delinte (e demais marcas no mesmo padrão) usa um mosaico repetido "marca + apelido"; Denali usa cabeçalho estático com logo colorida. Medida digitada acima de 35 caracteres quebra para uma 2ª linha automaticamente (fonte reduz um pouco quando isso acontece) |
| **Tabela de Medidas** | Layout fixo (sem IA) com uma lista editável de medida → valor (até 15 linhas), nota de desconto, validade e CTA de rodapé | Sem produto/pneu — usado para catálogos de promoção |
| **Tabela Dupla** | Igual à Tabela de Medidas, mas com até 30 linhas divididas em duas colunas | |

---

## Identidade visual por marca

| | Delinte | Denali | Sentury | Samson | Iron Head |
|---|---|---|---|---|---|
| Cor de acento | `#FFDB0F` (amarelo, sólido) | gradiente `#FF2C14 → #FF5D1E` | `#FFFFFF` (sem cor de apoio — brandbook define só preto+branco) | `#EC2127` (vermelho, sólido) | `#52AA65` (verde, sólido) |
| Preto / Branco da arte | `#000000` / `#FFFFFF` | `#0B0B0B` / `#F1F1F1` | `#000000` / `#FFFFFF` | `#000000` / `#FFFFFF` | `#000000` / `#FFFFFF` |
| Fonte de título | Anton (Google Fonts) | Nasalization (self-hosted, ver abaixo) | Akira Expanded (self-hosted) | Montserrat Black/900 (Google Fonts) | Kensmark (self-hosted, só corte Bold) |
| Logo | SVG via CDN (`marketing-gp/delinte`) | PNG local em `public/assets/denali/` | PNG local em `public/assets/sentury/` | PNG local em `public/assets/sampson/` (pasta de assets ainda com o nome antigo "sampson"; a chave de marca no código é `samson`) | PNG local em `public/assets/ironhead/` |
| Origem das cores | — | Brandguide oficial homologado pelo marketing | Manual da marca oficial | PDF "Cores da marca" oficial | **Ainda sem brandbook** — extraídas à mão da logo; ajustar quando o oficial chegar |

As variáveis de marca ficam em `public/style.css`, escopadas por `[data-marca="delinte"|"denali"|"sentury"|"samson"|"ironhead"]` — para ajustar uma cor, edite lá.

**Fontes pagas/self-hosted:** Nasalization (Denali), Akira Expanded (Sentury) e Kensmark (Iron Head) são fontes compradas, não disponíveis via Google Fonts. Os arquivos ficam em `public/fonts/` e são carregados via `@font-face` em `style.css`. Se precisar trocar o arquivo de alguma, substitua o arquivo nessa pasta mantendo o mesmo nome. Samson usa Montserrat (Google Fonts) forçada no peso 900 (Black) nos textos de destaque — ver comentário em `style.css` perto de `[data-marca="samson"]`.

Os modelos de **Tabela de Medidas** e **Tabela Dupla** também exibem a logo GP (`public/assets/gp/`) ao lado da logo da marca, no rodapé.

---

## Como editar a lista de produtos

Abra `public/app.js` e localize o bloco da marca desejada (comentário `// CATÁLOGO <MARCA>` acima de cada lista):

| Marca | Variável |
|---|---|
| Delinte | `PRODUTOS_DELINTE` |
| Denali | `PRODUTOS_DENALI` |
| Sentury | `PRODUTOS_SENTURY` |
| Samson | `PRODUTOS_SAMSON` |
| Iron Head | `PRODUTOS_IRONHEAD` |

Cada produto segue o formato:

```js
{
  nome:         "DS2",
  apelido:      "DS2",                          // nome curto usado no mosaico e na Arte de Medida
  specs:        "Ultra-high performance · sulcos assimétricos",
  foto:         "https://url-da-foto-roda.png",  // 45° COM roda — par do campo abaixo, ver nota sobre o toggle
  foto45:       "https://url-da-foto-45.png",     // 45° SEM roda — par do campo acima, ver nota sobre o toggle
  fotoPerfil:   "https://url-da-foto-perfil.png", // foto de perfil, usada em Pneu + Carro de Lado / Medida
  fotoFrente:   "https://url-da-foto-frente.png", // foto frontal, usada em Arte de Pneu de Frente
  titulo:       "TECNOLOGIA QIRIN SCALE",
  sub:          "Sulcos assimétricos de alta precisão para máxima aderência em pistas molhadas.",
  cta:          "CONHEÇA O DS2",
  paragrafo:    "Texto descritivo usado na Arte de Medida.",
  sufixoMedida: "95W",                            // complemento da medida (ex.: índice de carga/velocidade)
  linha:        "esportiva"
},
```

- **Adicionar:** copie um bloco `{ ... },` e cole antes do `]` que fecha a lista da marca.
- **Atualizar foto:** troque a URL do campo correspondente pelo PNG oficial recortado (fundo transparente). Um produto sem `foto45`/`fotoPerfil` some automaticamente as fotos de pneu na Arte de Medida.
- **Remover:** apague o bloco inteiro (nunca apague o item "Sem produto", sempre o índice 0 de cada marca).
- **Par `foto`/`foto45` (com roda / sem roda):** o controle "Pneu com roda / Sem roda" da sidebar troca entre esses dois campos (ver `foto45ArteLivre()` em `app.js`). Se um produto só tiver um dos dois, o toggle cai automaticamente pro que existir — nada quebra, só não há efeito visual até a foto que falta ser cadastrada. Nem todo produto/marca tem as duas fotos ainda (ex.: a marca Samson hoje não tem nenhuma foto "com roda" cadastrada).
- `linha` é compartilhada entre marcas (`esportiva`, `offroad`, `runflat`, `carga`, `passeio`, `semislick`, `institucional`) — define qual cenário de fundo (`src/prompts.js`) e qual sugestão de prompt (`SUGESTOES_CENA`) o produto usa.

Salve e recarregue a página — sem reiniciar o servidor.

> **Pendente:** vários produtos (principalmente Denali, e algumas linhas Delinte) ainda estão com fotos (`foto45`/`fotoPerfil`/`fotoFrente`), specs, CTA ou parágrafo marcados como rascunho/placeholder no próprio `app.js`. Procure os comentários `// PENDENTE` e `// RASCUNHO` no arquivo para a lista atualizada e atualize assim que o marketing enviar os dados definitivos.

---

## Como refinar os prompts de IA

Abra `src/prompts.js`. Há três famílias de prompt, uma por família de modelo:

- `montarPrompt()` — Arte Livre Padrão, 3 Pneus e Pneu 45° (fundo ambiental, pneu é o herói por padrão).
- `montarPromptMedida()` — Medida Única (carro é o herói, mas só na faixa central da arte).
- `montarPromptCarro()` — Pneu + Carro de Frente/Lado (carro é o herói do fundo inteiro).

Edite `CENAS_POR_LINHA` (cenário por linha × objetivo) e os mapas `COMPOSICAO_*` (zonas da UI por formato/modelo) conforme necessário.
**Não altere** as funções `montarPrompt*` nem remova as proibições explícitas dos templates `TEMPLATE_BASE*` — são elas que garantem que o fundo gerado nunca traga logo, texto ou marca, para nenhuma marca.

Reinicie o servidor (`npm start`) após salvar — `prompts.js`/`magnific.js`/`server.js` são carregados em memória pelo Node, diferente de `app.js`/`style.css`/`index.html` (que recarregam só com F5 no navegador).

### Modelo da IA (Mystic): "fluid", não "realism"

`src/magnific.js` pede o modelo `fluid` à API do Magnific (ver parâmetro `model` em `gerarImagemMagnific`). Já foi `realism`, mas a própria documentação do Magnific avisa que `realism` segue mal o prompt fora de cenas genéricas — isso fazia a IA ignorar os limites de composição (TIRE ZONE) e inventar veículos genéricos em vez do que era pedido. `fluid` é o preset com melhor aderência ao prompt. Se for trocar o modelo de novo, teste bastante antes — `fluid` segue instruções de forma muito literal, o que exigiu os dois cuidados abaixo.

### Por que o prompt não pede mais "preto puro" em nenhuma zona

Versões antigas pediam pra IA pintar a área do logo/texto como "pure near-black, featureless". Como `fluid` segue instruções ao pé da letra, isso às vezes virava um bloco sólido literalmente desconectado do resto da cena (ou até as coordenadas do próprio briefing aparecendo como texto na imagem). A solução foi tirar essa responsabilidade da IA: a IA só precisa gerar uma foto bonita e natural: o escurecimento da área de texto/logo é feito por uma camada CSS por cima (`.art-overlay` em `style.css`, mesma técnica que já existia em `.artp45-overlay`/`.artcf-overlay`/`.artcl-overlay`). **Não reintroduza instruções do tipo "essa área deve ser preto puro/sem textura" no prompt** — isso tende a voltar o problema. Se a arte final parecer escura/clara demais numa área, ajuste o gradiente CSS, não o texto do prompt.

### Veículo como herói nos modelos "pneu-herói" — só se o usuário pedir

Por padrão, `montarPrompt()` esconde qualquer veículo (silhueta distante, nunca em destaque) — é a regra fundamental do arquivo, pneu é o herói. Mas se o usuário descrever um veículo no campo "Personalizar Prompt de Fundo" (ex.: "Fiat Strada", "caminhão", "picape"), a função `pedeVeiculo()` detecta isso por palavra-chave (lista `PALAVRAS_VEICULO`, PT/EN + marcas comuns no Brasil) e troca para `COMPOSICAO_LAYOUT_CARRO`, que libera o veículo como elemento visível de verdade na cena — mas sempre fora da TIRE ZONE, porque a foto real do pneu continua sendo colada ali por cima. É uma heurística simples por palavra, não NLP de verdade — para ampliar a detecção, edite a lista `PALAVRAS_VEICULO` em `prompts.js`.

---

## Referências visuais

Os layouts (Arte Livre, Arte de Medida, Tabela) foram recriados em CSS pixel a pixel a partir de mockups de design fornecidos pelo marketing. Os PNGs de referência viviam em `public/artmodel/` mas foram removidos do repositório para mantê-lo enxuto (nunca foram carregados pela aplicação — só serviam de documentação visual); ainda estão disponíveis no histórico do git, se precisar consultá-los de novo. Comentários em `style.css` apontam qual trecho de layout veio de qual mockup.

---

## Exportação

| Botão | Formato | Resolução |
|-------|---------|-----------|
| PNG   | PNG     | 2× (ex.: 2160×2160 para feed) |
| PDF   | PDF     | Dimensões nativas da arte     |

---

## Segurança

- A chave `MAGNIFIC_API_KEY` fica exclusivamente no arquivo `.env` (no servidor).
- O `.env` está no `.gitignore` e nunca é commitado.
- O frontend se comunica apenas com `/api/gerar-fundo` no próprio servidor — nunca direto com o Magnific.

---

*Gerador de Artes v2 — GP Corp · Delinte, Denali, Sentury, Samson & Iron Head*
