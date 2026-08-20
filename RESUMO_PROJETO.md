# Resumo do Projeto — Delinte/Denali Art Generator v2

> Leitura completa do código-fonte em `C:\Automacao\delinte-art-generator-v2` realizada em 2026-08-13; atualizado em 2026-08-14 após a implementação do suporte à marca Denali.

## O que é

Ferramenta interna da **GP Corp** para gerar artes digitais padronizadas das marcas de pneus **Delinte** e **Denali**. Roda localmente como app Node.js + frontend estático servido pelo próprio Express.

**Arquitetura híbrida em 2 camadas:**
1. **Camada 1 — IA (fundo):** a API OpenAI (`gpt-image-1`) gera apenas o cenário/fundo automotivo — sem logo, texto ou produto. **Agnóstica de marca** — o mesmo prompt/regras vale para Delinte e Denali, já que proíbe explicitamente qualquer logo/marca no fundo.
2. **Camada 2 — Composição (determinística):** o frontend sobrepõe logo oficial, badge, título, subtítulo, CTA, specs e a foto do pneu com posicionamento fixo de template, usando a paleta/tipografia da marca ativa. Esses elementos **nunca** são gerados por IA.

**Multi-marca (desde 2026-08-14):** um seletor "Marca" na UI alterna entre Delinte e Denali. Cada marca tem seu próprio catálogo de produtos, paleta de cores (via CSS custom properties escopadas por `[data-marca]`), logo e fonte de título — tamanhos de arte e lógica de geração de fundo são 100% compartilhados.

## Estrutura de arquivos

```
delinte-art-generator-v2/
├── server.js          # Servidor Express (backend)
├── prompts.js          # Templates de prompt para a IA (homologados por marketing)
├── package.json        # deps: express, openai, dotenv
├── .env.example         # Template de configuração (chave OpenAI)
├── README.md            # Documentação de uso já existente
├── Manual_Denali.pdf     # Brandguide oficial Denali (fonte da paleta/tipografia/linhas)
├── Logo Denali/           # Assets originais fornecidos pelo marketing (logo PNG × 3, fonte Nasalization)
└── public/
    ├── index.html        # Markup da UI (sidebar de controles + preview da arte)
    ├── app.js            # Toda a lógica de frontend (estado, render, export, MARCAS)
    ├── style.css          # Estilos + tokens de marca escopados por [data-marca]
    ├── fonts/               # Nasalization-Rg.otf/.ttf (self-hosted, licenciada, Denali)
    └── assets/denali/       # logo-denali-{colorida,branca,preta}.png
```

## Backend

### `server.js`
- Carrega `.env` via `dotenv`; alerta no boot se `OPENAI_API_KEY` não estiver configurada.
- Serve os arquivos estáticos de `public/`.
- **`POST /api/gerar-fundo`** — recebe `{ formato, objetivo, linha, customPrompt }`, valida contra listas fixas (`FORMATOS_VALIDOS`, `OBJETIVOS_VALIDOS`, `LINHAS_VALIDAS` — agora inclui `'passeio'`, usada pela linha Goldeneagle da Denali), monta o prompt via `montarPrompt()` (em `prompts.js`) e chama `openai.images.generate({ model: 'gpt-image-1', ... })`. Retorna a imagem em base64 (`{ imagem }`). `customPrompt` é limitado a 500 caracteres e nunca executado como código. **Não recebe `marca`** — a escolha de marca é puramente client-side (composição), o backend só lida com o fundo, que é o mesmo para as duas.
- **`GET /api/proxy-img?url=`** — proxy de imagens externas (com CORS liberado) usado na exportação, já que `html2canvas` não consegue capturar recursos cross-origin sem isso.
- A chave da OpenAI nunca é exposta ao frontend — todo acesso à API passa pelo servidor.

### `prompts.js`
- Contém os templates de prompt "homologados pela equipe de marketing".
- Regra central: **"o pneu é o herói — o fundo é o palco"** — o prompt proíbe explicitamente veículos/objetos grandes na zona onde o PNG do pneu será sobreposto.
- `COMPOSICAO_LAYOUT`: briefing de art direction (mapa de zonas em pixels) para cada formato (`feed` 1080×1080, `story` 1080×1920, `banner` 1440×600), especificando onde ficam logo, badge, coluna de texto e "TIRE ZONE".
- `CENAS_POR_LINHA`: biblioteca de descrições de cenário cruzando **linha de produto** (`esportiva`, `offroad`, `runflat`, `carga`, `passeio`, `institucional`) × **objetivo** (`promocao`, `lancamento`, `aviso`). `passeio` foi adicionada para a linha Goldeneagle da Denali (cenas urbanas/diurnas de conforto — Delinte não tinha linha equivalente).
- `TEMPLATE_BASE`: monta o prompt final combinando cena + composição + restrições rígidas (proíbe texto, logos, pessoas, rostos, mãos e veículos grandes na zona do pneu).
- `montarPrompt(formato, objetivo, linha, customPrompt)`: função exportada; se houver `customPrompt`, ele substitui a cena padrão. Retorna `{ prompt, tamanho }` (tamanho da imagem por formato, ex. `1024x1024`).
- Aviso no README: não alterar `montarPrompt()` nem remover as proibições do `TEMPLATE_BASE`.

## Frontend (`public/`)

### `index.html`
- Layout com **sidebar** de controles (**marca**, formato, objetivo, produto, título, subtítulo, CTA, painel opcional "Personalizar Prompt") e **área de preview** com o canvas da arte (`#art-canvas`). O seletor de Marca é o primeiro controle, acima de Formato.
- `#app-root` (a `.app`) e `#art-canvas` carregam um atributo `data-marca` dinâmico (setado via JS), usado pelo CSS para trocar tema.
- Canvas tem camadas: fundo sólido preto (fallback) → `<img>` do fundo gerado por IA → elemento decorativo (só Delinte) → tira de acento → header (logo + badge) → corpo (textos + imagem do produto).
- Carrega `html2canvas` e `jsPDF` via CDN para exportação, além do próprio `app.js`.
- Logos Delinte vêm de um CDN jsDelivr (`marketing-gp/delinte`); logo Denali vem de `assets/denali/` (arquivo local, servido pelo próprio Express).

### `public/app.js`
- **`PRODUTOS_DELINTE`** / **`PRODUTOS_DENALI`**: um catálogo por marca. Mesma estrutura de item (`nome`, `specs`, `foto`, `titulo`, `sub`, `cta`, `linha`); primeiro item de cada um é sempre "Sem produto". Delinte: DS2/DS3/DS7/DS8 (esportiva), DX-9/DX-10/DX-12 (offroad), DH3/DH6 (runflat), DV2 (carga). Denali: Wolverine A/T 06/09/11 (offroad), Peregrine (esportiva), Golden Eagle/S/+ (passeio) — fotos oficiais de `denalipneus.com.br` —, mais SteelWolf (runflat) e Buffalo (carga) como placeholders (specs/CTA de rascunho, sem foto, pendentes do marketing Denali).
- **`MARCAS`**: `{ delinte: {label, logo, produtos}, denali: {...} }` — ponto único que liga rótulo, URL do logo (branco para Denali, já que sidebar e zona de logo na arte são sempre escuras) e catálogo de cada marca. Cores/fonte por marca **não** ficam aqui — vivem em `style.css`, escopadas por `[data-marca]`.
- **`SUGESTOES_CENA`**: textos em PT-BR mostrados no painel "Personalizar Prompt" — chave por `linha` (não por marca), inclui `passeio`.
- **`FORMATOS`** / **`OBJETIVOS`** / **`LIMITES`**: metadados de UI, compartilhados pelas duas marcas.
- **`estado`**: objeto central (agora inclui `estado.marca`, default `'delinte'`).
- **`produtoAtual()`**: helper que resolve `MARCAS[estado.marca].produtos[estado.produto]` — usado em todo lugar que antes lia o array `PRODUTOS` direto.
- Fluxo principal:
  - `popularProdutos()` / `vincularEventos()` / `renderArt()` / `atualizarEscala()` no `DOMContentLoaded`.
  - `trocarMarca(marca)`: dispara ao clicar no botão de Marca — seta `data-marca` em `#app-root`/`#art-canvas`, troca `src` dos logos, repopula o `<select>` de produtos (reset para índice 0) e re-renderiza. Não mexe no fundo já gerado (é agnóstico de marca).
  - `gerarFundo()`: chama `/api/gerar-fundo`, aplica o resultado via `aplicarFundo()` (fade-in da imagem) e trata erros amigáveis (`mostrarErro`).
  - `renderArt()`: atualiza todo o DOM da arte (classes, `data-marca`, badge, textos, imagem do produto) a partir de `estado`.
  - `atualizarEscala()`: recalcula escala do preview responsivo mantendo a proporção real do formato.
  - **Exportação** (`exportarPNG` / `exportarPDF`): clona o canvas off-screen, resolve imagens externas via `/api/proxy-img` (convertendo SVG para PNG via canvas quando necessário, para evitar taint de CORS), renderiza com `html2canvas` (escala 2×) e exporta como PNG (`toDataURL`) ou PDF (`jsPDF`). `processarImgExport` normaliza `src` para absoluta via `new URL(src, location.href)` antes do proxy — necessário porque o servidor só aceita URLs `http(s)` absolutas, e o logo local da Denali é um caminho relativo. Nome do arquivo exportado usa `estado.marca` (`denali-feed-arte.png`, etc.).
  - `gerarPlaceholder(nome)`: gera um SVG placeholder em base64 para produtos sem foto oficial cadastrada (usado por SteelWolf/Buffalo hoje).

### `public/style.css`
- Tokens de marca como CSS custom properties: `--brand-accent`, `--brand-accent-2`, `--brand-black`, `--brand-white`, `--font-display` (+ `--accent-rgb`/`--white-rgb` para uso em `rgba()`). Definidos com os valores da Delinte em `:root` e sobrescritos por `.app[data-marca="denali"], .art[data-marca="denali"]`.
- **Importante:** a regra de override é duplicada em `.app[...]` **e** `.art[...]` (não só no wrapper `.app`) porque a exportação clona `#art-canvas` para fora de `.app` antes de rasterizar — sem essa duplicação, o export perde o tema e sai sempre com as cores da Delinte.
- Gradiente de marca é escrito inline (`linear-gradient(135deg, var(--brand-accent), var(--brand-accent-2))`) nos 3 pontos de uso (`art-stripe`, `art-cta`, badge de promoção) — **não** via uma variável `--brand-gradient` intermediária, porque `var()` aninhado dentro de outra custom property resolve no elemento onde foi *declarado* (`:root`), não em cada descendente que sobrescreve as variáveis internas.
- `@font-face` para Nasalization (`public/fonts/`), usada só quando `--font-display` resolve para ela (Denali).
- `.format-{feed,story,banner}[data-marca="denali"] .art-title` reduz o `font-size` do título só para Denali — Nasalization é mais larga que Anton no mesmo tamanho e quebrava palavras ao meio.
- `.art[data-marca="denali"] .art-elem { display: none; }` — o elemento decorativo xadrez é um asset exclusivo Delinte, sem equivalente Denali ainda.
- Suporte a `prefers-reduced-motion`.

## Segurança (já documentada no README)
- `OPENAI_API_KEY` fica só no `.env` do servidor (nunca no frontend).
- `.env` está no `.gitignore`.
- Frontend só fala com `/api/gerar-fundo` local — nunca direto com a OpenAI.
- `customPrompt` validado (string, ≤500 chars) e nunca executado.

## Pontos de extensão já mapeados no próprio código
- Adicionar produto: editar `PRODUTOS_DELINTE` ou `PRODUTOS_DENALI` em `app.js`.
- Ajustar cenários de IA: editar `CENAS_POR_LINHA` / `COMPOSICAO_LAYOUT` em `prompts.js` (sem tocar em `montarPrompt()` ou nas proibições do `TEMPLATE_BASE`).
- Adicionar uma 3ª marca: seguir o padrão de `MARCAS` em `app.js` (novo catálogo `PRODUTOS_<MARCA>` + entrada em `MARCAS`) e replicar o bloco `.app[data-marca="..."], .art[data-marca="..."] { --brand-*: ... }` em `style.css`.

## Pendências conhecidas (Denali)
- **SteelWolf** (RunFlat) e **Buffalo** (Carga): specs, título/sub/CTA e foto ainda são placeholder/rascunho em `PRODUTOS_DENALI` — aguardando dados oficiais do marketing Denali.
- Não há versão do decorativo "elemento xadrez" para Denali (fica oculto para essa marca).
- Cópia (título/subtítulo) dos produtos Denali já cadastrados foi redigida a partir dos slogans oficiais do `Manual_Denali.pdf`, mas não foi validada linha a linha pelo marketing — vale revisão antes de uso em campanha real.

## Estado do repositório
- Git inicializado, branch `master`.
- Dependências já instaladas (`node_modules` presente): `express`, `openai`, `dotenv` (+ `@types/node` como dependência transitiva/dev).
- Assets Denali (logo × 3 versões, fonte Nasalization) foram fornecidos pelo usuário na pasta `Logo Denali/` e copiados para `public/assets/denali/` e `public/fonts/`.
