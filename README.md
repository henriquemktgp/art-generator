# Delinte — Gerador de Artes v2

Ferramenta interna GP Corp para criação de artes digitais padronizadas da marca Delinte.

**Arquitetura híbrida:**
- **Camada 1 — IA:** a API OpenAI gera um fundo automotivo (apenas cenário, sem logo nem texto).
- **Camada 2 — Composição:** o app sobrepõe logo oficial, título, specs e CTA com precisão de template. Estes elementos nunca são gerados por IA.

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

1. Escolha **Formato** (Feed 1:1, Story 9:16, Banner Horizontal).
2. Escolha **Objetivo** (Promoção, Lançamento, Aviso).
3. Selecione o **Produto** na lista (ou "Sem produto" para artes institucionais).
4. Preencha **Título**, **Subtítulo** e **CTA**.
5. Clique em **Gerar Fundo com IA** — aguarde alguns segundos.
6. O fundo aparece por trás da composição. Se não gostar, clique em **Gerar Novamente**.
7. Clique em **PNG** ou **PDF** para exportar.

> Trocar o Formato descarta o fundo atual e exige nova geração (o prompt de fundo muda conforme o formato).

---

## Como editar a lista de produtos

Abra `public/app.js` e localize o bloco marcado com:

```
// CADASTRO DE PRODUTOS — EDITE AQUI
```

Cada produto segue o formato:

```js
{
  nome: "DS2",
  specs: "Ultra-high performance · sulcos assimétricos",
  foto: "https://url-da-foto-oficial.png"
},
```

- **Adicionar:** copie um bloco `{ ... },` e cole antes do `]` que fecha a lista.
- **Atualizar foto:** substitua `gerarPlaceholder("XX")` pela URL do PNG recortado.
- **Remover:** apague o bloco inteiro (nunca apague o item "Sem produto").

Salve e recarregue a página — sem reiniciar o servidor.

---

## Como refinar os prompts de IA

Abra `prompts.js` e edite os valores de `CENAS` e `ESPACOS_NEGATIVOS`.  
**Não altere** a função `montarPrompt()` nem remova as proibições explícitas do `TEMPLATE_BASE`.

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

*Gerador de Artes v2 — GP Corp · Piloto Delinte*
