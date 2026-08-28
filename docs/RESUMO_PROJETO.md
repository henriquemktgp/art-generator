# Resumo do Projeto — Delinte/Denali Art Generator

> Leitura completa do código-fonte em `c:\Automacao\art-generator` realizada em 2026-08-13; atualizado em 2026-08-14 (marca Denali) e em 2026-08-20 (migração para Magnific, modos "Arte de Medida" e "carro-herói", tabelas de medida, logo GP).

## O que é

Ferramenta interna da **GP Corp** para gerar artes digitais padronizadas das marcas de pneus **Delinte** e **Denali**. Roda localmente como app Node.js + frontend estático servido pelo próprio Express.

**Arquitetura híbrida em 2 camadas:**
1. **Camada 1 — IA (fundo):** a API **Magnific** (modelo **Mystic**) gera o fundo — cenário puro ou carro-herói, conforme o modelo de arte ativo — sem logo, texto de marca ou (na maioria dos modelos) o produto em si. Nunca gera o pneu real: fotos de produto sempre são PNGs reais compostos na camada 2.
2. **Camada 2 — Composição (determinística):** o frontend sobrepõe logo oficial, badge, título, subtítulo, CTA, specs e as fotos reais do pneu (roda, 45°, perfil ou frontal, conforme o modelo) com posicionamento fixo de template, usando a paleta/tipografia da marca ativa. Esses elementos **nunca** são gerados por IA.

**Multi-marca:** um seletor "Marca" na UI alterna entre Delinte e Denali. Cada marca tem seu próprio catálogo de produtos, paleta de cores (via CSS custom properties escopadas por `[data-marca]`), logo e fonte de título — tamanhos de arte e lógica de geração de fundo são majoritariamente compartilhados.

**Multi-modelo (Tipo de Arte × Modelo):** além da arte de mídia social tradicional, o app hoje cobre uma segunda família inteira de peças — "Arte de Medida" — focada em especificação técnica do pneu, além de dois modelos de carro-herói e um modelo sem IA. Ver seção "Frontend" para o detalhamento completo.

## Estrutura de arquivos

```
art-generator/
├── package.json              # deps: express, dotenv
├── .env.example                # Template de configuração (MAGNIFIC_API_KEY, PORT)
├── README.md                    # Documentação de uso
├── src/                          # Backend (Node.js/Express)
│   ├── server.js                    # Servidor Express — entry point (package.json "main"/scripts aqui)
│   ├── prompts.js                    # Templates de prompt para a IA (3 famílias — livre, medida, carro)
│   └── magnific.js                    # Cliente da API Magnific/Mystic (assíncrono, com polling)
├── docs/
│   └── RESUMO_PROJETO.md              # Este arquivo — leitura completa do código-fonte
└── public/                        # Frontend estático, servido pelo Express a partir da raiz do site
    ├── index.html            # Markup da UI (sidebar de controles + preview da arte, 9 canvases)
    ├── app.js                  # Toda a lógica de frontend (estado, render, export, MARCAS, MODELOS)
    ├── style.css                 # Estilos + tokens de marca + visibilidade condicional por modo/modelo
    ├── fonts/                       # Nasalization-Rg.otf/.ttf (self-hosted, licenciada, Denali)
    └── assets/
        ├── denali/                    # logo-denali-{colorida,branca,preta}.png
        └── gp/                          # logo-gp-{branca,preta}.png — só usada nos modelos de Tabela
```

Reorganizado em 2026-08-28: `server.js`/`prompts.js`/`magnific.js` moveram de raiz para `src/`, e este resumo moveu para `docs/` — a raiz agora só tem o essencial (config + entrypoint de package). `server.js` ajustado (`path.join(__dirname, '..', 'public')`) pra continuar servindo `public/` de fora de `src/`; `dotenv` continua resolvendo `.env` normalmente porque olha o `cwd` do processo (raiz, via `npm start`/`npm run dev`), não o `__dirname` do arquivo.

O brandguide oficial da Denali (`Manual_Denali.pdf`) e os mockups de referência de design (`public/artmodel/`, com os PNGs-modelo de cada layout) foram removidos do repositório em 2026-08-28 para mantê-lo enxuto — nenhum dos dois era carregado em runtime, ambos ficam disponíveis no histórico do git. Comentários em `style.css`/`app.js` que citavam esses arquivos foram ajustados para não apontar mais pra um caminho que não existe mais no repo.

## Backend

### `src/server.js`
- Carrega `.env` via `dotenv`; alerta no boot se `MAGNIFIC_API_KEY` não estiver configurada.
- Serve os arquivos estáticos de `public/`.
- **`POST /api/gerar-fundo`** — recebe `{ formato, objetivo, linha, customPrompt, modo, sugestaoCarro }`.
  - `modo` ∈ `MODOS_VALIDOS = {'livre', 'medida', 'carrofrente', 'carrolado'}` (default `'livre'` se inválido). Este `modo` é derivado no frontend a partir de `tipoArte`/`modelo` — não é 1:1 com os 9 "modelos" de UI (ver Frontend).
  - `formato` ∈ `{'feed','story','banner'}` — Banner é aceito em todos os modos exceto `'medida'` e `'carrofrente'` (`MODOS_SEM_BANNER`), que só têm `{'feed','story'}` (`FORMATOS_VALIDOS_SEM_BANNER`).
  - `objetivo` (`{'promocao','lancamento','aviso'}`) só é obrigatório/validado no modo `'livre'` — os demais modos ignoram o campo e sempre usam a variante "promocao" da cena.
  - `linha` ∈ `LINHAS_VALIDAS = {'esportiva','offroad','runflat','carga','passeio','semislick','institucional'}` (default `'institucional'`).
  - `customPrompt` limitado a 500 caracteres; `sugestaoCarro` (usado só em `carrofrente`/`carrolado`) limitado a 200 caracteres. Nenhum dos dois é executado como código.
  - Monta o prompt chamando `montarPromptMedida()` (modo `medida`), `montarPromptCarro()` (modos `carrofrente`/`carrolado`) ou `montarPrompt()` (modo `livre`, default) — todas exportadas de `src/prompts.js`.
  - Chama `gerarImagemMagnific(prompt, aspectRatio)` (`src/magnific.js`), baixa a imagem resultante e devolve `{ imagem: '<base64 PNG>' }` — mantém o mesmo contrato de resposta que o frontend já esperava da época da OpenAI.
  - Erros do Magnific viram `502` com mensagem genérica ao usuário; detalhe do erro só vai para o log do servidor.
  - **Não recebe `marca`** — a escolha de marca é puramente client-side (composição); o backend só lida com o fundo, que é agnóstico de marca.
- **`GET /api/proxy-img?url=`** — proxy de imagens externas (com CORS liberado) usado na exportação, já que `html2canvas` não consegue capturar recursos cross-origin sem isso. Só aceita URLs `http(s)` absolutas.
- A chave do Magnific nunca é exposta ao frontend — todo acesso à API passa pelo servidor.

### `src/magnific.js`
- Substitui o cliente OpenAI usado na v2 original. Diferença fundamental: a API do Magnific (modelo Mystic) é **assíncrona**.
- `gerarImagemMagnific(prompt, aspectRatio)`: `POST https://api.magnific.com/v1/ai/mystic` (body `{ prompt, aspect_ratio, resolution: '2k', model: 'realism' }`, header `x-magnific-api-key`) cria a tarefa e devolve `task_id`. Em seguida faz polling em `GET /v1/ai/mystic/{task_id}` a cada 3s (`POLL_INTERVAL_MS`) até `status === 'COMPLETED'` (retorna `data.generated[0]`, uma URL) ou `'FAILED'`, com timeout total de 2 minutos (`POLL_TIMEOUT_MS`).
- Diferente da OpenAI, não devolve base64 direto — é `src/server.js` quem baixa a URL e converte para base64 antes de responder ao frontend.
- `aspectRatio` é um enum fixo do Magnific (`square_1_1`, `social_story_9_16`, `horizontal_2_1`, `standard_3_2`), não largura×altura em pixels — ver `ASPECT_RATIOS`/`ASPECT_RATIO_MEDIDA` em `src/prompts.js`.

### `src/prompts.js`
Três famílias de prompt, cada uma com seu próprio template base e mapa de composição — todas compartilham `CENAS_POR_LINHA` (biblioteca de cenários por linha de produto × objetivo) e a regra de ouro "o produto é o herói, o fundo é o palco" (adaptada conforme o caso).

1. **`montarPrompt(formato, objetivo, linha, customPrompt)`** — família original (Arte Livre Padrão, 3 Pneus, Pneu 45°). O pneu nunca é gerado pela IA; `COMPOSICAO_LAYOUT` descreve zonas em pixels (logo, badge, coluna de texto, "TIRE ZONE") por formato (`feed` 1080×1080, `story` 1080×1920, `banner` 1440×600), com regras rígidas proibindo veículos/objetos grandes na zona do pneu. `TEMPLATE_BASE` monta o prompt final combinando cena + composição + restrições (sem texto, logos, pessoas, rostos, mãos, veículos grandes na zona do pneu).
2. **`montarPromptMedida(formato, linha, customPrompt)`** — família "Arte de Medida" (modelo Medida Única): aqui o **carro é o herói visível** (não mais silhueta distante), mas a IA gera só uma faixa central 3:2 da arte (`ASPECT_RATIO_MEDIDA = 'standard_3_2'` para feed e story) — logo, mosaico/cabeçalho, tarja, caixa de medidas e parágrafo são compostos por cima na camada 2. `COMPOSICAO_LAYOUT_MEDIDA` reserva o terço direito da imagem para as fotos reais do pneu (45° + perfil), que serão sobrepostas depois.
3. **`montarPromptCarro(formato, vista, linha, sugestaoCarro, customPrompt)`** — família "Pneu + Carro" (modelos `carrofrente`/`carrolado`): a IA gera o fundo **inteiro** do canvas (não uma faixa), com o carro como herói absoluto — descrito livremente pelo usuário via `sugestaoCarro` (senão usa um fallback genérico). `COMPOSICAO_CARRO` tem uma variante por `vista` (`'frente'`/`'lado'`) × formato, reservando a área onde a foto real do pneu (45° ou perfil) será composta.

`montarPrompt*` nunca deve ser alterada sem cuidado — README já documenta isso. Nenhuma das três funções aceita `marca` como parâmetro (fundo é sempre agnóstico de marca).

## Frontend (`public/`)

A UI tem dois níveis de seleção de layout, não um único "formato de arte":

- **Nível 1 — Tipo de Arte** (`estado.tipoArte`, botões `data-field="tipoArte"`): `livre` | `medida`. "Arte de Medida" só fica habilitada para marcas em `MARCAS_COM_ARTE_MEDIDA = new Set(['delinte','denali'])` (hoje, as duas).
- **Nível 2 — Modelo**, um `<select>` diferente por tipo de arte, cada um com seu próprio `<div>` de canvas dedicado (9 canvases no total em `index.html`):

  **`MODELOS` (Arte Livre)** — select `#sel-modelo`:
  | value | Canvas / `bgImg` | Resumo |
  |---|---|---|
  | `padrao` | `art-canvas` / `art-bg-img` | Layout original: badge de objetivo, título/subtítulo/CTA, foto (roda) do produto. |
  | `3pneus` | `art-canvas-3pneus` / `art3p-bg-img` | Até 3 produtos (`pneu1/2/3`) lado a lado, foto 45° + apelido de cada, campo "Destaque". Sem título/CTA — usa `estado.sub` como rodapé. |
  | `pneu45` | `art-canvas-pneu45` / `artp45-bg-img` | Pneu único a 45°, título+subtítulo, specs como "pills" (`produto.specs.split('·')`). |
  | `carrofrente` | `art-canvas-carrofrente` / `artcf-bg-img` | Carro-herói de frente (IA) + `produto.foto45` sobreposta. Só título; campo "Sugestão de Carro". |
  | `carrolado` | `art-canvas-carrolado` / `artcl-bg-img` | Carro-herói de lado (IA) + `produto.fotoPerfil` em destaque. |
  | `pneufrente` | `art-canvas-pneufrente` / `bgImg: null` | **Sem IA** — fundo fixo por CSS conforme a marca; usa `produto.fotoFrente`. Botão "Gerar Fundo" e painel de prompt somem via CSS (`.app[data-modelo="pneufrente"] #btn-gerar { display:none }`). |

  **`MODELOS_MEDIDA` (Arte de Medida)** — select `#sel-modelo-medida`:
  | value | Canvas | `maxLinhas` | Resumo |
  |---|---|---|---|
  | `unica` | `art-canvas-medida` / `artm-bg-img` | 0 | Fundo IA (faixa central) + `foto45`/`fotoPerfil` do produto, medida digitada, apelido, `sufixoMedida`, parágrafo. Delinte: mosaico repetido "MARCA + apelido" via `montarMarquee()` (`REPETICOES_MOSAICO=10`). Denali: cabeçalho estático com logo colorida. Sem fotos de pneu → classe `.sem-foto` some a área automaticamente. |
  | `tabela` | `art-canvas-tabela` | 15 | **Sem IA, sem produto.** Lista editável `estado.linhasTabela[]` (`{medida, valor}`), nota de desconto por unidade, validade, CTA de rodapé. Logos marca + GP no rodapé. |
  | `tabeladupla` | `art-canvas-tabeladupla` | 30 | Igual à tabela, mas `linhasTabela` é dividida em duas colunas (`Math.ceil(linhas.length/2)`). |

  O `modo` enviado a `/api/gerar-fundo` é derivado, não 1:1 com o `modelo` de UI:
  ```js
  const modoRequisicao = estado.tipoArte === 'medida'
    ? 'medida'
    : (estado.modelo === 'carrofrente' || estado.modelo === 'carrolado')
      ? estado.modelo
      : 'livre';
  ```
  Ou seja: `padrao`, `3pneus`, `pneu45` usam a rota de prompt `livre`; `pneufrente`/`tabela`/`tabeladupla` nunca chamam a API (não têm botão "Gerar" — escondido via CSS).

  Visibilidade de cada bloco de controle/canvas é 100% via CSS, com seletores de atributo no `#app-root` (`[data-tipo-arte]`, `[data-modelo]`, `[data-modelo-medida]`) em `style.css`.

### `index.html`
- Sidebar de controles (Marca → Tipo de Arte → Modelo → Formato/Objetivo → campos do modelo → painel opcional "Personalizar Prompt") + área de preview com os 9 `<div>` de canvas (só um visível por vez, controlado por CSS).
- `#app-root` carrega atributos dinâmicos `data-marca`, `data-tipo-arte`, `data-modelo`, `data-modelo-medida` (setados via JS), usados pelo CSS para trocar tema e mostrar/esconder controles e canvases.
- Carrega `html2canvas` e `jsPDF` via CDN (cdnjs) para exportação, além do próprio `app.js`.
- Logos Delinte vêm de CDN jsDelivr (`marketing-gp/delinte`); logo Denali e logo GP vêm de `public/assets/` (arquivos locais, servidos pelo próprio Express).

### `public/app.js` (1791 linhas)

**Catálogos e estruturas de dados:**
- **`PRODUTOS_DELINTE`** / **`PRODUTOS_DENALI`**: um array por marca. Campos por item: `nome, apelido, specs, foto, foto45, fotoPerfil, fotoFrente, titulo, sub, cta, paragrafo, sufixoMedida, linha`. `apelido` é o nome curto usado no mosaico/Arte de Medida; `foto`/`foto45`/`fotoPerfil`/`fotoFrente` são fotos reais do mesmo produto em ângulos diferentes, cada uma usada por um subconjunto de modelos (ver README). Primeiro item de cada array é sempre "Sem produto".
- Denali também define `PARAGRAFO_OFFROAD_DENALI`, `PARAGRAFO_ESPORTIVA_DENALI`, `PARAGRAFO_PASSEIO_DENALI` — texto de parágrafo compartilhado por linha inteira (diferente da Delinte, que define por produto).
- **`MARCAS`**: `{ delinte: {label, logo, produtos}, denali: {...} }`.
- **`MARCAS_COM_ARTE_MEDIDA`**: `Set(['delinte','denali'])` — controla se o botão "Arte de Medida" fica habilitado para a marca ativa.
- **`MODELOS`** / **`MODELOS_MEDIDA`**: mapas modelo → `{canvas, bgImg}` / `{canvas, maxLinhas}` (ver tabelas acima).
- **`FORMATOS`** / **`OBJETIVOS`**: metadados de UI (width/height/desc; promocao/lancamento/aviso).
- **`LIMITES`**: tamanho máximo de cada campo de texto — inclui `titulo, sub, cta` (herdados) + `medida, destaque, sugestaoCarro, linhaMedida, linhaValor, validadeTabela, ctaTabela`.
- **`SUGESTOES_CENA`**: textos PT-BR por `linha` (não por marca), mostrados no painel "Personalizar Prompt".
- **`estado`**: objeto central único. Além dos campos herdados (`marca, formato, objetivo, produto, titulo, sub, cta, customPrompt`), inclui `tipoArte, modelo, modeloMedida, pneu1, pneu2, pneu3, destaque, sugestaoCarro, medida, linhasTabela[], validadeTabela, descontoPorUnidade, ctaTabela`.

**Fluxo principal (`DOMContentLoaded`):** `popularProdutos()` / `vincularEventos()` / `renderTudo()` / `atualizarEscala()`.

**Funções-chave** (nomes exatos, para localizar rápido no arquivo):
- `canvasAtivoId()` — resolve qual dos 9 canvases está visível, a partir de `tipoArte`/`modelo`/`modeloMedida`.
- `renderTudo()` — chama todos os `renderArt*` (só o ativo aparece, por CSS).
- `produtoAtual()` — resolve `MARCAS[estado.marca].produtos[estado.produto]`.
- `trocarMarca(marca)` — troca marca/logos/catálogo, reseta seleção de produto, força saída de "medida" se a marca não suportar.
- `atualizarDisponibilidadeTipoArte()` — habilita/desabilita o botão "Arte de Medida" conforme `MARCAS_COM_ARTE_MEDIDA`.
- `trocarTipoArte(tipo)` / `trocarModelo(modelo)` / `trocarModeloMedida(modelo)` — trocam nível 1/nível 2 da UI; corrigem Formato de volta pra `feed` se estava em Banner num contexto que não suporta (`trocarTipoArte` ao entrar em "medida"; `trocarModelo` ao entrar em `pneufrente`/`carrofrente`, ver `MODELOS_SEM_BANNER`; `trocarModeloMedida` ao entrar em Tabela Dupla vindo de Story). `trocarModeloMedida` também corta `linhasTabela` se exceder o novo `maxLinhas`.
- `gerarFundo()` — monta o body e chama `POST /api/gerar-fundo`; trata loading/erro amigável (`mostrarErro`).
- `bgImgAtivoId()` / `aplicarFundo()` / `resetarFundo()` — resolvem qual `<img>` de fundo atualizar e aplicam o base64 recebido (fade-in via classe `.loaded`); retornam cedo (`null`) para os 3 modelos sem IA.
- `renderArt()`, `renderArtMedida()`, `renderArt3Pneus()`, `renderArtPneu45()`, `renderArtCarroFrente()`, `renderArtCarroLado()`, `renderArtPneuFrente()`, `renderArtTabela()`, `renderArtTabelaDupla()` — um renderizador por canvas/modelo.
- `montarMarquee(apelido)` — gera o mosaico repetido "MARCA + apelido" (Medida Única, Delinte).
- `renderLinhasEditor()` / `criarLinhaTabelaEl()` / `preencherTabelaBody()` — editor dinâmico e preenchimento das linhas de medida→valor (Tabela/Tabela Dupla).
- `ajustarFonteTabela()` — mede o texto real via Canvas 2D (após `document.fonts.ready`) e reduz a fonte da tabela para nunca estourar a coluna (compensa a falta de suporte confiável de `text-overflow:ellipsis` no `html2canvas`).
- `logoMarcaTabela()` / `logoGpTabela()` — resolvem qual PNG de logo (marca/GP) usar conforme `estado.marca`, só nos modelos de tabela.
- `atualizarEscala()` — escala o preview mantendo a proporção lógica do formato.
- `sufixoArquivo()` — sufixo do nome do arquivo exportado, reflete modelo/modeloMedida ativo.
- `exportarPNG()` / `exportarPDF()` / `capturarCanvas()` / `processarImgExport()` / `imagemParaPngComFit()` — pipeline de exportação (ver abaixo).

**Exportação (PNG/PDF):** mesma arquitetura desde a v2 original, sem mudança estrutural — `html2canvas` (via clone off-screen) + `jsPDF`, ambos via CDN.
1. `capturarCanvas()` clona o canvas ativo, reposiciona fora da tela, força `display` manualmente (o clone sai de `#app-root` e perde as regras de visibilidade por atributo).
2. `processarImgExport()` roda em cada `<img>` do clone: imagens externas passam pelo proxy `/api/proxy-img`; `object-fit: cover/contain` é resolvido manualmente via canvas offscreen (`imagemParaPngComFit`), já que `html2canvas` ignora `object-fit` nativamente.
3. `html2canvas(clone, {scale:2, ...})` gera o canvas final; PNG via `toDataURL`, PDF via `jsPDF({unit:'px', format:[width,height]})`.
4. Nome do arquivo via `sufixoArquivo()` (ex.: `delinte-feed-carrofrente-arte.png`, `delinte-feed-tabeladupla-arte.png`).

### `public/style.css` (1847 linhas)
- Tokens de marca como CSS custom properties (`--brand-accent`, `--brand-accent-2`, `--brand-black`, `--brand-white`, `--font-display`, `--accent-rgb`/`--white-rgb`), definidos com valores Delinte em `:root` e sobrescritos por `.app[data-marca="denali"], .art[data-marca="denali"]` — duplicado propositalmente nos dois seletores porque a exportação clona `#art-canvas*` para fora de `.app` antes de rasterizar.
- Gradiente de marca escrito inline nos pontos de uso (não via variável intermediária) — `var()` aninhado dentro de outra custom property resolve no elemento onde foi *declarado*, não em cada descendente que sobrescreve as variáveis internas.
- Visibilidade condicional de controles/canvases por `[data-tipo-arte]`/`[data-modelo]`/`[data-modelo-medida]` no `#app-root` — é o mecanismo central que faz o "roteamento" de UI entre os 9 modelos.
- `@font-face` para Nasalization, usada só quando `--font-display` resolve para ela (Denali); ajuste de `font-size` do título só para Denali (Nasalization é mais larga que Anton).
- Comentários (linhas ~957, 1254, 1367, 1442, 1521) documentam que os layouts de Arte de Medida (Denali), Tabela/Tabela Dupla e os 5 modelos novos de Arte Livre foram recriados **pixel a pixel** a partir de mockups de design fornecidos pelo marketing (os PNGs originais viviam em `public/artmodel/`, removido do repo — ver seção abaixo).
- Suporte a `prefers-reduced-motion`.

## `public/artmodel/` — referências de design (removido em 2026-08-28)

Essa pasta guardava os mockups/PNGs de design que serviram de referência para recriar cada layout em CSS pixel a pixel (Arte Livre, Arte de Medida, Tabela). Confirmado por busca em todo o projeto antes da remoção: **nenhum arquivo dentro de `artmodel/` era carregado em runtime** (sem `<img src="artmodel/...">`, sem `fetch` a esses caminhos) — só citado em comentários (`app.js:1309`, `style.css:957/1254/1367/1442/1521`) como a origem visual/mockup de cada layout:
- `arteLivre/*.png` — os 5 modelos novos de Arte Livre (3 Pneus, Pneu 45°, Carro de Frente/Lado, Pneu de Frente).
- `artemedida/{tabela.png,tabeladupla.jpg}` — Tabela de Medidas e Tabela Dupla.
- `delinte/` / `denali/` — modelo e versão "empty" (sem conteúdo) da Arte de Medida por marca.

A pasta foi removida do repositório pra mantê-lo enxuto (22MB de imagens não usadas em runtime); os arquivos continuam disponíveis no histórico do git caso alguém precise consultá-los ao ajustar um layout existente.

## Segurança (já documentada no README)
- `MAGNIFIC_API_KEY` fica só no `.env` do servidor (nunca no frontend).
- `.env` está no `.gitignore`.
- Frontend só fala com `/api/gerar-fundo` e `/api/proxy-img` locais — nunca direto com o Magnific.
- `customPrompt` (≤500 chars) e `sugestaoCarro` (≤200 chars) validados como string e nunca executados como código.

## Pontos de extensão já mapeados no próprio código
- Adicionar produto: editar `PRODUTOS_DELINTE` ou `PRODUTOS_DENALI` em `app.js`, preenchendo os campos de foto relevantes para os modelos que ele deve suportar.
- Ajustar cenários de IA: editar `CENAS_POR_LINHA` (compartilhado pelas 3 famílias de prompt) e os mapas `COMPOSICAO_*` em `src/prompts.js` — sem tocar nas funções `montarPrompt*` ou nas restrições dos templates `TEMPLATE_BASE*`.
- Adicionar uma 3ª marca: seguir o padrão de `MARCAS` em `app.js` (novo catálogo + entrada em `MARCAS`), replicar os blocos `[data-marca="..."]` em `style.css`, e decidir se ela entra em `MARCAS_COM_ARTE_MEDIDA`.
- Adicionar um novo modelo de Arte Livre/Medida: seguir o padrão de `MODELOS`/`MODELOS_MEDIDA` (novo canvas em `index.html`, entrada no mapa, `renderArt*` dedicado, regras de visibilidade `[data-modelo="..."]` em `style.css`) — usar o mockup de design fornecido pelo marketing como referência visual, se houver.

## Pendências conhecidas
- **Dados de catálogo em rascunho:** vários produtos (principalmente Denali, mas também algumas linhas Delinte) têm `foto45`/`fotoPerfil`/`fotoFrente`, specs, CTA ou parágrafo marcados no próprio `app.js` como `// PENDENTE` (placeholder aguardando dados reais) ou `// RASCUNHO` (texto não validado pelo marketing) — inclui, notavelmente, o bloco inteiro de produtos Denali (redigido a partir de slogans do brandguide oficial da Denali, não linha a linha pelo marketing) e os produtos Denali `SteelWolf`/`Buffalo`, ainda sem foto nem specs oficiais (campos de foto ficam `""` até a equipe enviar o material).
- Não há versão do decorativo "elemento xadrez" (Arte Livre Padrão) para Denali — fica oculto para essa marca via CSS.
- `MODELOS_MEDIDA.unica.maxLinhas = 0` é um valor arbitrário (esse modelo não tem tabela; funciona só porque nenhum código dispara a lógica de limite de linhas para ele) — vale documentar isso no código se o modelo ganhar alguma lista no futuro.

## Estado do repositório
- Git inicializado, branch `master`.
- Dependências Node já instaladas (`node_modules` presente): `express`, `dotenv` (não há mais dependência de SDK da OpenAI — a chamada ao Magnific é feita via `fetch` nativo do Node 18+).
- Não há dependências Python — qualquer `requirements.txt`/`venv` encontrado na pasta não faz parte do projeto (removidos em 2026-08-20).
- Assets Denali (logo × 3 versões, fonte Nasalization) e logo GP (branca/preta) já estão em `public/assets/` e `public/fonts/`.
- `Manual_Denali.pdf`, a pasta `Logo Denali/` (assets originais duplicados dos já organizados em `public/`) e `public/artmodel/` (mockups de referência) foram removidos do repositório em 2026-08-28 para mantê-lo enxuto — nenhum era carregado em runtime; todos continuam disponíveis no histórico do git.
