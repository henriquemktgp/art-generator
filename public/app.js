'use strict';

// =============================================================================
// CADASTRO DE PRODUTOS — EDITE AQUI
//
// Como adicionar um produto:
//   1. Copie um bloco { nome, specs, foto } e cole antes do ] final
//   2. Salve — a mudança reflete automaticamente na interface
//
// Como atualizar a foto:
//   Todas as fotos vêm de public/assets/<marca>/foto_pneus/<Produto>/ (catálogo
//   local, não mais do site). Cada pasta de produto tem até 4 arquivos:
//   pneu_45.png, pneu_45_roda.png (ou pneu_frente_roda.png), pneu_frente.png
//   e pneu_perfil.png. Para trocar a foto de um produto, substitua o arquivo
//   dentro da pasta dele (mantendo o mesmo nome) ou aponte o campo para outra
//   pasta/arquivo.
//
// "Sem produto" deve permanecer como primeiro item (índice 0).
//
// Cada marca tem seu próprio catálogo (PRODUTOS_DELINTE / PRODUTOS_DENALI),
// associado em MARCAS mais abaixo. O campo `linha` é compartilhado entre
// marcas — mapeia para as cenas de fundo de IA em prompts.js.
//
// ── Campos exclusivos do modo "Arte de Medida" (Delinte, por enquanto) ──────
//   apelido:   nome curto exibido no mosaico do topo (ex. "DH6"). Nunca leva
//              o sufixo da linha (isso fica só em `sufixoMedida`).
//   foto45:    foto do pneu em 3/4 (45°), fundo transparente — pneu_45.png.
//              Usada só na Arte de Medida (não é a mesma coisa que `foto`,
//              usado no lugar dela na Arte Livre — ver abaixo).
//   fotoPerfil: foto do pneu de perfil (lateral), fundo transparente —
//              pneu_perfil.png.
//   paragrafo: texto descritivo específico do produto, exibido acima do logo.
//   sufixoMedida: texto opcional mostrado só dentro da caixa MEDIDAS, depois
//              do apelido (ex. "RUN FLAT"). Deixe "" quando não se aplica.
//   fotoFrente: foto do pneu de frente E COM RODA (pneu_frente_roda.png) —
//              usada nos modelos "Pneu + Carro de Frente" e "Arte de Pneu de
//              Frente". Quando o produto não tem essa variante com roda,
//              cai pra pneu_frente.png (sem roda) — ver comentário no
//              produto. ATENÇÃO: no catálogo antigo (URLs do site), esses
//              dois campos (fotoPerfil/fotoFrente) vinham trocados para
//              todos os produtos Delinte (fotoPerfil apontava pra foto de
//              frente e vice-versa) — corrigido na migração pro catálogo
//              local; a Denali já vinha correta.
//
// `foto` (campo principal, fora da lista acima): foto do pneu a 45° COM
// RODA (pneu_45_roda.png) — é a foto de destaque da Arte Livre Padrão E
// também a usada em "Arte com 3 Pneus"/"Arte de Pneu 45°" (ver
// foto45ArteLivre()). Quando o produto não tem variante com roda, cai pra
// pneu_45.png (sem roda).
//
// PENDENTE: SteelWolf e Buffalo (Denali) ainda não têm pasta de fotos —
// campos de foto ficam vazios até a equipe enviar. D7 Thunder, D8+, DX-20
// (Delinte) e Wolverine A/T 11 LB (Denali) são produtos novos cujo
// specs/título/sub/CTA abaixo é RASCUNHO — revisar com marketing antes de
// campanha real.
// =============================================================================

const PRODUTOS_DELINTE = [
  {
    nome:   "Sem produto",
    specs:  "",  foto:   "",
    titulo: "",  sub:    "",  cta: "",
    linha:  "institucional",
    apelido: "", foto45: "", fotoPerfil: "", paragrafo: "", sufixoMedida: "", fotoFrente: ""
  },
  // ── Linha Passeio ────────────────────────────────────────────────────────
  // titulo/sub/cta/specs abaixo são RASCUNHO (não vieram da lista oficial de
  // fotos enviada pelo marketing) — revisar antes de usar em campanha real.
  {
    nome:   "D1D1 Ultra High Mileage",
    specs:  "Linha passeio · ultra alta quilometragem · durabilidade",
    foto:   "assets/delinte/foto_pneus/D1D1/pneu_45_roda.png",
    titulo: "RODAGEM QUE DURA MAIS",
    sub:    "Tecnologia Ultra High Mileage para milhares de quilômetros extras de vida útil.",
    cta:    "CONHEÇA O D1D1",
    linha:  "passeio",
    apelido: "D1D1",
    foto45:     "assets/delinte/foto_pneus/D1D1/pneu_45.png",
    fotoPerfil: "assets/delinte/foto_pneus/D1D1/pneu_perfil.png",
    paragrafo: "Tecnologia Ultra High Mileage para milhares de quilômetros extras de vida útil.",
    sufixoMedida: "", fotoFrente: "assets/delinte/foto_pneus/D1D1/pneu_frente.png"
  },
  {
    nome:   "DH2 Eco",
    specs:  "Linha passeio · baixa resistência ao rolamento · economia",
    foto:   "assets/delinte/foto_pneus/DH2/pneu_45_roda.png",
    titulo: "ECONOMIA EM CADA QUILÔMETRO",
    sub:    "Baixa resistência ao rolamento para mais economia de combustível no dia a dia.",
    cta:    "CONHEÇA O DH2",
    linha:  "passeio",
    apelido: "DH2 Eco",
    foto45:     "assets/delinte/foto_pneus/DH2/pneu_45.png",
    fotoPerfil: "assets/delinte/foto_pneus/DH2/pneu_perfil.png",
    paragrafo: "Baixa resistência ao rolamento para mais economia de combustível no dia a dia.",
    sufixoMedida: "", fotoFrente: "assets/delinte/foto_pneus/DH2/pneu_frente.png"
  },
  {
    nome:   "DH7 SUV",
    specs:  "Linha passeio · SUV · conforto e estabilidade",
    foto:   "assets/delinte/foto_pneus/DH7/pneu_45_roda.png",
    titulo: "CONFORTO PARA SEU SUV",
    sub:    "Estrutura reforçada e rodagem silenciosa para o peso e porte do seu SUV.",
    cta:    "CONHEÇA O DH7",
    linha:  "passeio",
    apelido: "DH7",
    foto45:     "assets/delinte/foto_pneus/DH7/pneu_45.png",
    fotoPerfil: "assets/delinte/foto_pneus/DH7/pneu_perfil.png",
    paragrafo: "Estrutura reforçada e rodagem silenciosa pensadas para o peso e o porte do seu SUV.",
    sufixoMedida: "", fotoFrente: "assets/delinte/foto_pneus/DH7/pneu_frente.png"
  },
  {
    nome:   "D7 Thunder",
    specs:  "Linha passeio · conforto e durabilidade no dia a dia",
    foto:   "assets/delinte/foto_pneus/D7 Thunder/pneu_45_roda.png",
    titulo: "FORÇA E SILÊNCIO NO ASFALTO",
    sub:    "Equilíbrio entre conforto e resistência para rodar tranquilo em qualquer trajeto urbano.",
    cta:    "CONHEÇA O D7 THUNDER",
    linha:  "passeio",
    apelido: "D7 Thunder",
    foto45:     "assets/delinte/foto_pneus/D7 Thunder/pneu_45.png",
    fotoPerfil: "assets/delinte/foto_pneus/D7 Thunder/pneu_perfil.png",
    paragrafo: "Equilíbrio entre conforto e resistência para rodar tranquilo em qualquer trajeto urbano.",
    sufixoMedida: "", fotoFrente: "assets/delinte/foto_pneus/D7 Thunder/pneu_frente.png"
  },
  {
    nome:   "D8+",
    specs:  "Linha passeio · nova geração · conforto aprimorado",
    foto:   "assets/delinte/foto_pneus/D8+/pneu_45_roda.png",
    titulo: "PRÓXIMO NÍVEL DE CONFORTO",
    sub:    "Evolução da linha passeio com mais conforto e estabilidade para o seu dia a dia.",
    cta:    "CONHEÇA O D8+",
    linha:  "passeio",
    apelido: "D8+",
    foto45:     "assets/delinte/foto_pneus/D8+/pneu_45.png",
    fotoPerfil: "assets/delinte/foto_pneus/D8+/pneu_perfil.png",
    paragrafo: "Evolução da linha passeio com mais conforto e estabilidade para o seu dia a dia.",
    sufixoMedida: "", fotoFrente: "assets/delinte/foto_pneus/D8+/pneu_frente.png"
  },
  {
    nome:   "DS2 Mute Cotton",
    specs:  "Linha passeio · tecnologia Mute Cotton · baixo ruído",
    foto:   "assets/delinte/foto_pneus/DS2 Mute Cotton/pneu_45_roda.png",
    titulo: "SILÊNCIO EM MOVIMENTO",
    sub:    "Tecnologia Mute Cotton reduz o ruído de rodagem para mais silêncio a bordo.",
    cta:    "CONHEÇA O DS2 MUTE",
    linha:  "passeio",
    apelido: "DS2 Mute",
    foto45:     "assets/delinte/foto_pneus/DS2 Mute Cotton/pneu_45.png",
    fotoPerfil: "assets/delinte/foto_pneus/DS2 Mute Cotton/pneu_perfil.png",
    paragrafo: "Tecnologia Mute Cotton reduz o ruído de rodagem para uma experiência mais silenciosa.",
    sufixoMedida: "", fotoFrente: "assets/delinte/foto_pneus/DS2 Mute Cotton/pneu_frente.png"
  },
  {
    nome:   "DS2 SUV",
    specs:  "Linha passeio · SUV · aderência e estabilidade",
    foto:   "assets/delinte/foto_pneus/DS2 SUV/pneu_45_roda.png",
    titulo: "PERFORMANCE PARA SUV",
    sub:    "Aderência e estabilidade sob medida para SUVs no uso urbano e em viagens.",
    cta:    "CONHEÇA O DS2 SUV",
    linha:  "passeio",
    apelido: "DS2 SUV",
    foto45:     "assets/delinte/foto_pneus/DS2 SUV/pneu_45.png",
    fotoPerfil: "assets/delinte/foto_pneus/DS2 SUV/pneu_perfil.png",
    paragrafo: "Aderência e estabilidade sob medida para SUVs no uso urbano e em viagens.",
    sufixoMedida: "", fotoFrente: "assets/delinte/foto_pneus/DS2 SUV/pneu_frente.png"
  },
  // ── Linha Esportiva ──────────────────────────────────────────────────────
  {
    nome:   "DS2 Qirin Scale Technology",
    specs:  "Qirin Scale Technology · sulcos assimétricos · UHP",
    // Mesmas fotos do DS2 Mute Cotton — é o mesmo pneu físico, sem pasta própria.
    foto:   "assets/delinte/foto_pneus/DS2 Mute Cotton/pneu_45_roda.png",
    titulo: "TECNOLOGIA QIRIN SCALE",
    sub:    "Sulcos assimétricos de alta precisão para máxima aderência em pistas molhadas.",
    cta:    "CONHEÇA O DS2",
    linha:  "esportiva",
    apelido: "DS2 Qirin",
    foto45:     "assets/delinte/foto_pneus/DS2 Mute Cotton/pneu_45.png",
    fotoPerfil: "assets/delinte/foto_pneus/DS2 Mute Cotton/pneu_perfil.png",
    paragrafo: "Sulcos assimétricos de alta precisão para máxima aderência em pistas molhadas.",
    sufixoMedida: "", fotoFrente: "assets/delinte/foto_pneus/DS2 Mute Cotton/pneu_frente.png"
  },
  {
    nome:   "DS3 SUV",
    specs:  "Ultra-high performance · padrão direcional",
    // Pasta "DS3" não tem variante com roda — usa o 45° puro como foto principal.
    foto:   "assets/delinte/foto_pneus/DS3/pneu_45.png",
    titulo: "DESEMPENHO SEM LIMITES",
    sub:    "Padrão direcional desenvolvido para quem exige o máximo da pista.",
    cta:    "CONHEÇA O DS3",
    linha:  "esportiva",
    apelido: "DS3",
    foto45:     "assets/delinte/foto_pneus/DS3/pneu_45.png",
    fotoPerfil: "assets/delinte/foto_pneus/DS3/pneu_perfil.png",
    paragrafo: "Padrão direcional desenvolvido para quem exige o máximo da pista.",
    sufixoMedida: "", fotoFrente: "assets/delinte/foto_pneus/DS3/pneu_frente.png"
  },
  {
    nome:   "DS7 Sport",
    specs:  "Tração AA · composto avançado · alta performance",
    foto:   "assets/delinte/foto_pneus/DS7 SPORT/pneu_45_roda.png",
    titulo: "TRAÇÃO MÁXIMA",
    sub:    "Composto avançado com classificação AA entrega controle em qualquer condição.",
    cta:    "CONHEÇA O DS7",
    linha:  "esportiva",
    apelido: "DS7",
    foto45:     "assets/delinte/foto_pneus/DS7 SPORT/pneu_45.png",
    fotoPerfil: "assets/delinte/foto_pneus/DS7 SPORT/pneu_perfil.png",
    paragrafo: "Composto avançado com classificação AA entrega controle em qualquer condição.",
    sufixoMedida: "", fotoFrente: "assets/delinte/foto_pneus/DS7 SPORT/pneu_frente.png"
  },
  {
    nome:   "DS8 Desert Storm",
    specs:  "Ultra-high performance · padrão agressivo · 18\" a 26\"",
    foto:   "assets/delinte/foto_pneus/DS8/pneu_45_roda.png",
    titulo: "DESERT STORM",
    sub:    "Perfil agressivo e altíssima performance para rodas de 18\" a 26\".",
    cta:    "CONHEÇA O DS8",
    linha:  "esportiva",
    apelido: "DS8",
    foto45:     "assets/delinte/foto_pneus/DS8/pneu_45.png",
    fotoPerfil: "assets/delinte/foto_pneus/DS8/pneu_perfil.png",
    paragrafo: "Perfil agressivo e altíssima performance para rodas de 18\" a 26\".",
    sufixoMedida: "DESERT STORM", fotoFrente: "assets/delinte/foto_pneus/DS8/pneu_frente.png"
  },
  // ── Linha Off-Road ───────────────────────────────────────────────────────
  {
    nome:   "DX-9 Bandit M/T",
    specs:  "Mud terrain · off-road extremo · lama e terra",
    foto:   "assets/delinte/foto_pneus/DX-9/pneu_45_roda.png",
    titulo: "DOMINE A LAMA",
    sub:    "Tread mud terrain para trilhas extremas onde o asfalto não chega.",
    cta:    "CONHEÇA O DX-9",
    linha:  "offroad",
    apelido: "DX-9",
    foto45:     "assets/delinte/foto_pneus/DX-9/pneu_45.png",
    fotoPerfil: "assets/delinte/foto_pneus/DX-9/pneu_perfil.png",
    paragrafo: "Tread mud terrain para trilhas extremas onde o asfalto não chega.",
    sufixoMedida: "BANDIT M/T", fotoFrente: "assets/delinte/foto_pneus/DX-9/pneu_frente.png"
  },
  {
    nome:   "DX-10 Bandit A/T",
    specs:  "All-terrain · on e off-road · versatilidade total",
    foto:   "assets/delinte/foto_pneus/DX-10/pneu_45_roda.png",
    titulo: "ON E OFF SEM ESCOLHER",
    sub:    "All-terrain que transita entre asfalto e trilha com igual competência.",
    cta:    "CONHEÇA O DX-10",
    linha:  "offroad",
    apelido: "DX-10",
    foto45:     "assets/delinte/foto_pneus/DX-10/pneu_45.png",
    fotoPerfil: "assets/delinte/foto_pneus/DX-10/pneu_perfil.png",
    paragrafo: "All-terrain que transita entre asfalto e trilha com igual competência.",
    sufixoMedida: "BANDIT A/T", fotoFrente: "assets/delinte/foto_pneus/DX-10/pneu_frente.png"
  },
  {
    nome:   "DX-12 Bandit R/T",
    specs:  "Rugged terrain · tração reforçada · trilhas e asfalto",
    foto:   "assets/delinte/foto_pneus/DX-12/pneu_45_roda.png",
    titulo: "FORÇA RUGGED TERRAIN",
    sub:    "Tração reforçada para enfrentar trilhas pesadas sem abrir mão do asfalto.",
    cta:    "CONHEÇA O DX-12",
    linha:  "offroad",
    apelido: "DX-12",
    foto45:     "assets/delinte/foto_pneus/DX-12/pneu_45.png",
    fotoPerfil: "assets/delinte/foto_pneus/DX-12/pneu_perfil.png",
    paragrafo: "Tração reforçada para enfrentar trilhas pesadas sem abrir mão do asfalto.",
    sufixoMedida: "BANDIT R/T", fotoFrente: "assets/delinte/foto_pneus/DX-12/pneu_frente.png"
  },
  {
    nome:   "DX-20",
    specs:  "Off-road · all-terrain · tração para trilha e asfalto",
    foto:   "assets/delinte/foto_pneus/DX-20/pneu_45_roda.png",
    titulo: "PRONTO PARA QUALQUER TRILHA",
    sub:    "Tração e resistência all-terrain para enfrentar qualquer terreno sem abrir mão do asfalto.",
    cta:    "CONHEÇA O DX-20",
    linha:  "offroad",
    apelido: "DX-20",
    foto45:     "assets/delinte/foto_pneus/DX-20/pneu_45.png",
    fotoPerfil: "assets/delinte/foto_pneus/DX-20/pneu_perfil.png",
    paragrafo: "Tração e resistência all-terrain para enfrentar qualquer terreno sem abrir mão do asfalto.",
    sufixoMedida: "", fotoFrente: "assets/delinte/foto_pneus/DX-20/pneu_frente.png"
  },
  // ── Linha Run Flat ───────────────────────────────────────────────────────
  {
    nome:   "DH3 Run Flat",
    specs:  "Run flat · até 80 km após perda de pressão · segurança",
    foto:   "assets/delinte/foto_pneus/DH3/pneu_45_roda.png",
    titulo: "SEGURANÇA SEM PARAR",
    sub:    "Continue rodando até 80 km mesmo com pneu furado. Sem sustos na estrada.",
    cta:    "CONHEÇA O DH3",
    linha:  "runflat",
    apelido: "DH3",
    foto45:     "assets/delinte/foto_pneus/DH3/pneu_45.png",
    fotoPerfil: "assets/delinte/foto_pneus/DH3/pneu_perfil.png",
    paragrafo: "O pneu ideal para sua segurança! A tecnologia Run Flat oferece maior resistência em situações extremas, nas quais o pneu perde toda a pressão do ar e permite que o motorista chegue a um local seguro para realizar a troca.",
    sufixoMedida: "RUN FLAT", fotoFrente: "assets/delinte/foto_pneus/DH3/pneu_frente.png"
  },
  {
    nome:   "DH6 Run Flat",
    specs:  "Run flat · alta performance · continuidade garantida",
    foto:   "assets/delinte/foto_pneus/DH6/pneu_45_roda.png",
    titulo: "ALTA PERFORMANCE RUN FLAT",
    sub:    "Tecnologia run flat de alto desempenho. Continuidade garantida quando importa.",
    cta:    "CONHEÇA O DH6",
    linha:  "runflat",
    apelido: "DH6",
    foto45:     "assets/delinte/foto_pneus/DH6/pneu_45.png",
    fotoPerfil: "assets/delinte/foto_pneus/DH6/pneu_perfil.png",
    paragrafo: "O pneu ideal para sua segurança! A tecnologia Run Flat oferece maior resistência em situações extremas, nas quais o pneu perde toda a pressão do ar e permite que o motorista chegue a um local seguro para realizar a troca.",
    sufixoMedida: "RUN FLAT", fotoFrente: "assets/delinte/foto_pneus/DH6/pneu_frente.png"
  },
  {
    nome:   "DS2 SUV Run Flat",
    specs:  "Run flat · SUV · continuidade garantida",
    // Mesmas fotos do DS2 SUV — é o mesmo pneu físico, sem pasta própria.
    foto:   "assets/delinte/foto_pneus/DS2 SUV/pneu_45_roda.png",
    titulo: "SUV SEM PARAR",
    sub:    "A segurança Run Flat encontra o desempenho pensado para SUVs.",
    cta:    "CONHEÇA O DS2 SUV RFT",
    linha:  "runflat",

    apelido: "DS2 SUV RF",
    foto45:     "assets/delinte/foto_pneus/DS2 SUV/pneu_45.png",
    fotoPerfil: "assets/delinte/foto_pneus/DS2 SUV/pneu_perfil.png",
    paragrafo: "A segurança Run Flat encontra o desempenho pensado para SUVs.",
    sufixoMedida: "RUN FLAT", fotoFrente: "assets/delinte/foto_pneus/DS2 SUV/pneu_frente.png"
  },
  // ── Linha Semi Slick ─────────────────────────────────────────────────────
  {
    nome:   "Apex King",
    specs:  "Semi slick · uso em pista · aderência extrema",
    foto:   "assets/delinte/foto_pneus/Apex King/pneu_45_roda.png",
    titulo: "NO LIMITE DA PISTA",
    sub:    "Composto semi-slick para máxima aderência em track days e uso esportivo extremo.",
    cta:    "CONHEÇA O APEX KING",
    linha:  "semislick",
    apelido: "Apex King",
    foto45:     "assets/delinte/foto_pneus/Apex King/pneu_45.png",
    fotoPerfil: "assets/delinte/foto_pneus/Apex King/pneu_perfil.png",
    paragrafo: "Composto semi-slick para máxima aderência em track days e uso esportivo extremo.",
    sufixoMedida: "", fotoFrente: "assets/delinte/foto_pneus/Apex King/pneu_frente.png"
  },
  // ── Linha de Carga ───────────────────────────────────────────────────────
  {
    nome:   "DV2 Cargo Tire",
    specs:  "Linha de carga · vans e utilitários · estrutura reforçada",
    foto:   "assets/delinte/foto_pneus/DV2/pneu_45_roda.png",
    titulo: "FEITO PARA TRABALHAR",
    sub:    "Estrutura reforçada para vans e utilitários que não podem parar.",
    cta:    "CONHEÇA O DV2",
    linha:  "carga",
    apelido: "DV2",
    foto45:     "assets/delinte/foto_pneus/DV2/pneu_45.png",
    fotoPerfil: "assets/delinte/foto_pneus/DV2/pneu_perfil.png",
    paragrafo: "Estrutura reforçada para vans e utilitários que não podem parar.",
    sufixoMedida: "", fotoFrente: "assets/delinte/foto_pneus/DV2/pneu_frente.png"
  },
  {
    nome:   "DV2 Plus",
    specs:  "Linha de carga · reforçada · vans e utilitários",
    // Pasta "DV2+" não tem variante com roda — usa o 45° puro como foto principal.
    foto:   "assets/delinte/foto_pneus/DV2+/pneu_45_roda.png",
    titulo: "MAIS RESISTÊNCIA, MAIS CARGA",
    sub:    "Evolução da linha de carga com reforço adicional para rotas pesadas.",
    cta:    "CONHEÇA O DV2 +",
    linha:  "carga",
    apelido: "DV2 Plus",
    foto45:     "assets/delinte/foto_pneus/DV2+/pneu_45.png",
    fotoPerfil: "assets/delinte/foto_pneus/DV2+/pneu_perfil.png",
    paragrafo: "Evolução da linha de carga com reforço adicional para rotas pesadas.",
    sufixoMedida: "", fotoFrente: "assets/delinte/foto_pneus/DV2+/pneu_frente.png"
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// CATÁLOGO DENALI
//
// Fotos oficiais fornecidas pela equipe (denalipneus.com.br). specs/título/
// subtítulo/CTA abaixo são RASCUNHO, escritos a partir dos slogans do
// brandguide oficial da Denali — revisar com o time de marketing Denali
// antes de usar em campanha real.
//
// SteelWolf (runflat) e Buffalo (carga) ainda não têm modelo/foto definidos —
// entram com campos de foto vazios ("") até a equipe enviar specs.
// ─────────────────────────────────────────────────────────────────────────────
// Denali no modo "Arte de Medida": `paragrafo` é compartilhado por toda a
// LINHA (não por produto, como na Delinte) — todos os Wolverine usam o
// mesmo texto entre si, idem Golden Eagle. Por isso o mesmo valor aparece
// repetido nos produtos de uma mesma linha abaixo; é intencional.
// PENDENTE: paragrafo de cada linha é RASCUNHO (não veio da equipe de
// marketing Denali ainda) — revisar antes de campanha real, mesmo padrão
// de aviso já usado no specs/titulo/sub abaixo.
const PARAGRAFO_OFFROAD_DENALI =
  "Onde o asfalto termina, a jornada continua. Tração e controle absolutos em qualquer terreno, com a resistência que o dia a dia off-road exige.";
const PARAGRAFO_ESPORTIVA_DENALI =
  "Precisão que se sente no volante. O Peregrine foi desenvolvido para quem exige controle total nos limites da pista.";
const PARAGRAFO_PASSEIO_DENALI =
  "Conforto que acompanha o seu dia. O Golden Eagle entrega rodagem silenciosa e estabilidade do início ao fim do trajeto urbano.";

const PRODUTOS_DENALI = [
  {
    nome:   "Sem produto",
    specs:  "",  foto:   "",
    titulo: "",  sub:    "",  cta: "",
    linha:  "institucional",
    apelido: "", foto45: "", fotoPerfil: "", paragrafo: "", sufixoMedida: "", fotoFrente: ""
  },
  // ── Wolverine — linha off-road ───────────────────────────────────────────
  {
    nome:   "Wolverine A/T 06",
    specs:  "All-terrain · tração robusta em qualquer piso",
    foto:   "assets/denali/foto_pneus/Wolverine AT 06/pneu_45_roda.png",
    titulo: "DOMINE QUALQUER TERRENO",
    sub:    "Onde a estrada acaba, a Denali começa — tração e controle em qualquer trilha.",
    cta:    "CONHEÇA O A/T 06",
    linha:  "offroad",
    apelido: "WV-06 A/T",
    foto45:     "assets/denali/foto_pneus/Wolverine AT 06/pneu_45.png",
    fotoPerfil: "assets/denali/foto_pneus/Wolverine AT 06/pneu_perfil.png",
    paragrafo: PARAGRAFO_OFFROAD_DENALI,
    sufixoMedida: "", fotoFrente: "assets/denali/foto_pneus/Wolverine AT 06/pneu_frente_roda.png"
  },
  {
    nome:   "Wolverine A/T 09",
    specs:  "All-terrain · banda de rodagem reforçada",
    foto:   "assets/denali/foto_pneus/Wolverine AT 09/pneu_45_roda.png",
    titulo: "DOMINE QUALQUER TERRENO",
    sub:    "Onde a estrada acaba, a Denali começa — resistência para asfalto e trilha.",
    cta:    "CONHEÇA O A/T 09",
    linha:  "offroad",
    apelido: "WV-09 A/T",
    foto45:     "assets/denali/foto_pneus/Wolverine AT 09/pneu_45.png",
    fotoPerfil: "assets/denali/foto_pneus/Wolverine AT 09/pneu_perfil.png",
    paragrafo: PARAGRAFO_OFFROAD_DENALI,
    sufixoMedida: "", fotoFrente: "assets/denali/foto_pneus/Wolverine AT 09/pneu_frente_roda.png"
  },
  {
    nome:   "Wolverine A/T 11",
    specs:  "All-terrain · alta resistência a impacto",
    foto:   "assets/denali/foto_pneus/Wolverine AT 11/pneu_45_roda.png",
    titulo: "DOMINE QUALQUER TERRENO",
    sub:    "Onde a estrada acaba, a Denali começa — firmeza em qualquer condição.",
    cta:    "CONHEÇA O A/T 11",
    linha:  "offroad",
    apelido: "WV-11 A/T",
    foto45:     "assets/denali/foto_pneus/Wolverine AT 11/pneu_45.png",
    fotoPerfil: "assets/denali/foto_pneus/Wolverine AT 11/pneu_perfil.png",
    paragrafo: PARAGRAFO_OFFROAD_DENALI,
    sufixoMedida: "", fotoFrente: "assets/denali/foto_pneus/Wolverine AT 11/pneu_frente_roda.png"
  },
  {
    nome:   "Wolverine A/T 11 Letra Branca",
    specs:  "All-terrain · lateral com letras brancas · visual diferenciado",
    foto:   "assets/denali/foto_pneus/Wolverine AT 11 Letra branca/pneu_45_roda.png",
    titulo: "DOMINE QUALQUER TERRENO",
    sub:    "Onde a estrada acaba, a Denali começa — agora com o visual exclusivo de letras brancas.",
    cta:    "CONHEÇA O A/T 11 LETRA BRANCA",
    linha:  "offroad",
    apelido: "WV-11 A/T LB",
    foto45:     "assets/denali/foto_pneus/Wolverine AT 11 Letra branca/pneu_45.png",
    fotoPerfil: "assets/denali/foto_pneus/Wolverine AT 11 Letra branca/pneu_perfil.png",
    paragrafo: PARAGRAFO_OFFROAD_DENALI,
    sufixoMedida: "", fotoFrente: "assets/denali/foto_pneus/Wolverine AT 11 Letra branca/pneu_frente_roda.png"
  },
  // ── Peregrine — linha esportiva ──────────────────────────────────────────
  {
    nome:   "Peregrine",
    specs:  "Alta performance · precisão e controle na pista",
    foto:   "assets/denali/foto_pneus/Peregrine/pneu_45_roda.png",
    titulo: "DOMINE A PISTA",
    sub:    "Controle no limite: performance e precisão para quem exige o máximo.",
    cta:    "CONHEÇA O PEREGRINE",
    linha:  "esportiva",
    apelido: "Peregrine",
    foto45:     "assets/denali/foto_pneus/Peregrine/pneu_45.png",
    fotoPerfil: "assets/denali/foto_pneus/Peregrine/pneu_perfil.png",
    paragrafo: PARAGRAFO_ESPORTIVA_DENALI,
    sufixoMedida: "", fotoFrente: "assets/denali/foto_pneus/Peregrine/pneu_frente_roda.png"
  },
  // ── Golden Eagle — linha passeio ─────────────────────────────────────────
  {
    nome:   "Golden Eagle S",
    specs:  "Linha passeio · conforto e dirigibilidade urbana",
    foto:   "assets/denali/foto_pneus/Golden Eagle S/pneu_45_roda.png",
    titulo: "MAIS CONFORTO, MAIS ESTRADA",
    sub:    "Sinta a suavidade do controle no dia a dia da cidade.",
    cta:    "CONHEÇA O GOLDEN EAGLE S",
    linha:  "passeio",
    apelido: "GE S",
    foto45:     "assets/denali/foto_pneus/Golden Eagle S/pneu_45.png",
    fotoPerfil: "assets/denali/foto_pneus/Golden Eagle S/pneu_perfil.png",
    paragrafo: PARAGRAFO_PASSEIO_DENALI,
    sufixoMedida: "", fotoFrente: "assets/denali/foto_pneus/Golden Eagle S/pneu_frente_roda.png"
  },
  {
    nome:   "Golden Eagle",
    specs:  "Linha passeio · rodagem suave e silenciosa",
    foto:   "assets/denali/foto_pneus/Golden Eagle/pneu_45_roda.png",
    titulo: "MAIS CONFORTO, MAIS ESTRADA",
    sub:    "Sinta a suavidade do controle em qualquer trajeto.",
    cta:    "CONHEÇA O GOLDEN EAGLE",
    linha:  "passeio",
    apelido: "GE",
    foto45:     "assets/denali/foto_pneus/Golden Eagle/pneu_45.png",
    fotoPerfil: "assets/denali/foto_pneus/Golden Eagle/pneu_perfil.png",
    paragrafo: PARAGRAFO_PASSEIO_DENALI,
    sufixoMedida: "", fotoFrente: "assets/denali/foto_pneus/Golden Eagle/pneu_frente_roda.png"
  },
  {
    nome:   "Golden Eagle +",
    specs:  "Linha passeio · desempenho aprimorado",
    // Pasta "Golden Eagle +" não tem variante com roda — usa o 45° puro.
    foto:   "assets/denali/foto_pneus/Golden Eagle +/pneu_45.png",
    titulo: "MAIS CONFORTO, MAIS ESTRADA",
    sub:    "Sinta a suavidade do controle com ainda mais desempenho.",
    cta:    "CONHEÇA O GOLDEN EAGLE +",
    linha:  "passeio",
    apelido: "GE+",
    foto45:     "assets/denali/foto_pneus/Golden Eagle +/pneu_45.png",
    fotoPerfil: "assets/denali/foto_pneus/Golden Eagle +/pneu_perfil.png",
    paragrafo: PARAGRAFO_PASSEIO_DENALI,
    // Também não tem pneu_frente_roda — usa o frente puro (sem roda) até chegar.
    sufixoMedida: "", fotoFrente: "assets/denali/foto_pneus/Golden Eagle +/pneu_frente.png"
  },
  // ── SteelWolf — linha RunFlat — EDITAR quando specs/foto oficiais chegarem
  {
    nome:   "SteelWolf",
    specs:  "Run flat · continuidade após perda de pressão",
    foto:   "",
    titulo: "SEMPRE NO TOPO",
    sub:    "Tecnologia run flat Denali — segurança que não para no imprevisto.",
    cta:    "CONHEÇA O STEELWOLF",
    linha:  "runflat",
    apelido: "", foto45: "", fotoPerfil: "", paragrafo: "", sufixoMedida: "", fotoFrente: ""
  },
  // ── Buffalo — linha de Carga — EDITAR quando specs/foto oficiais chegarem
  {
    nome:   "Buffalo",
    specs:  "Linha de carga · veículos comerciais",
    foto:   "",
    titulo: "FORÇA PARA O SEU NEGÓCIO",
    sub:    "Pneu que rende tanto quanto você — resistência para o trabalho pesado.",
    cta:    "CONHEÇA O BUFFALO",
    linha:  "carga",
    apelido: "", foto45: "", fotoPerfil: "", paragrafo: "", sufixoMedida: "", fotoFrente: ""
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// CATÁLOGO SENTURY
//
// Marca nova (manual em public/assets/sentury/). Só tem 1 produto com fotos
// prontas hoje — Qirin 990 (UHP esportivo, ver Manual da Marca.pdf, pág. 6-7).
// Pasta "quirin990" tem variante com roda (pneu_45_roda.png) e sem roda de
// frente (só pneu_frente.png — sem "_roda"), então `fotoFrente` cai pro
// mesmo padrão de fallback já usado em outros produtos sem essa variante.
// specs/título/sub/CTA/parágrafo abaixo são RASCUNHO (a marca não enviou
// copy oficial ainda) — revisar com marketing antes de campanha real.
// ─────────────────────────────────────────────────────────────────────────────
const PRODUTOS_SENTURY = [
  {
    nome:   "Sem produto",
    specs:  "",  foto:   "",
    titulo: "",  sub:    "",  cta: "",
    linha:  "institucional",
    apelido: "", foto45: "", fotoPerfil: "", paragrafo: "", sufixoMedida: "", fotoFrente: ""
  },
  {
    nome:   "Qirin 990",
    specs:  "Ultra High Performance · pneu esportivo de alto desempenho",
    foto:   "assets/sentury/foto_pneus/quirin990/pneu_45_roda.png",
    titulo: "SIMPLES ASSIM",
    sub:    "Pneu é isso. Performance de verdade, sem enrolação — simples assim.",
    cta:    "CONHEÇA O QIRIN 990",
    linha:  "esportiva",
    apelido: "Qirin 990",
    foto45:     "assets/sentury/foto_pneus/quirin990/pneu_45.png",
    fotoPerfil: "assets/sentury/foto_pneus/quirin990/pneu_perfil.png",
    paragrafo: "Sem vaidade, sem ostentação: o Qirin 990 foi desenvolvido para entregar aderência e controle de alta performance, na medida certa para o seu dia a dia.",
    sufixoMedida: "", fotoFrente: "assets/sentury/foto_pneus/quirin990/pneu_frente.png"
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// CATÁLOGO SAMSON (pasta de assets "sampson" — grafia usada nos arquivos
// enviados; a marca oficial se chama "Samson Pneus", ver Manual da Marca.pdf)
//
// Marca nova, especializada em pneus de carga pesada (caminhão/ônibus — aros
// 17.5"/22.5", ver medidas gravadas nas próprias fotos). Por isso todo o
// catálogo usa linha:"carga" (mesma categoria/cenas de fundo já usadas para
// picapes e utilitários Delinte — hub logístico, rodovia industrial etc.,
// que também servem bem para caminhão). Nenhuma pasta tem variante "_roda"
// (comum em pneu de aro de aço, sem roda de liga à mostra), então `foto` e
// `fotoFrente` sempre usam a foto simples (mesmo padrão de fallback já usado
// quando um produto não tem a variante com roda). specs/título/sub/CTA/
// parágrafo abaixo são RASCUNHO (a marca não enviou copy oficial, e os
// códigos das linhas — GC-A/GL-S1/GR-A/GL265D etc. — não vieram com
// descrição de posição/aplicação) — revisar com marketing antes de campanha
// real.
// ─────────────────────────────────────────────────────────────────────────────
const PARAGRAFO_CARGA_SAMSON =
  "Depend on Samson: estrutura reforçada e rodagem confiável para quem não pode parar — pensado para a exigência do transporte de carga pesada.";

const PRODUTOS_SAMSON = [
  {
    nome:   "Sem produto",
    specs:  "",  foto:   "",
    titulo: "",  sub:    "",  cta: "",
    linha:  "institucional",
    apelido: "", foto45: "", fotoPerfil: "", paragrafo: "", sufixoMedida: "", fotoFrente: ""
  },
  {
    nome:   "GC-A",
    specs:  "Linha de carga · rodagem em costela · longa distância",
    foto:   "assets/sampson/foto_pneus/Linha GC-A/pneu_45.png",
    titulo: "RODAGEM QUE NÃO PARA",
    sub:    "Banda em costela para rodagem estável e baixo desgaste em longa distância.",
    cta:    "CONHEÇA O GC-A",
    linha:  "carga",
    apelido: "GC-A",
    foto45:     "assets/sampson/foto_pneus/Linha GC-A/pneu_45.png",
    fotoPerfil: "assets/sampson/foto_pneus/Linha GC-A/pneu_perfil.png",
    paragrafo: PARAGRAFO_CARGA_SAMSON,
    sufixoMedida: "", fotoFrente: "assets/sampson/foto_pneus/Linha GC-A/pneu_frente.png"
  },
  {
    nome:   "GL-S1",
    specs:  "Linha de carga · alta quilometragem · rodovia",
    foto:   "assets/sampson/foto_pneus/Linha GL-S1/pneu_45.png",
    titulo: "QUILOMETRAGEM QUE VALE A PENA",
    sub:    "Desenvolvido para rodovia, com foco em alta quilometragem e economia no transporte de carga.",
    cta:    "CONHEÇA O GL-S1",
    linha:  "carga",
    apelido: "GL-S1",
    foto45:     "assets/sampson/foto_pneus/Linha GL-S1/pneu_45.png",
    fotoPerfil: "assets/sampson/foto_pneus/Linha GL-S1/pneu_perfil.png",
    paragrafo: PARAGRAFO_CARGA_SAMSON,
    sufixoMedida: "", fotoFrente: "assets/sampson/foto_pneus/Linha GL-S1/pneu_frente.png"
  },
  {
    nome:   "GL265D",
    specs:  "Linha de carga · tração reforçada",
    foto:   "assets/sampson/foto_pneus/Linha GL265D/pneu_45.png",
    titulo: "TRAÇÃO PARA O TRABALHO PESADO",
    sub:    "Estrutura reforçada para tração confiável mesmo com carga pesada.",
    cta:    "CONHEÇA O GL265D",
    linha:  "carga",
    apelido: "GL265D",
    foto45:     "assets/sampson/foto_pneus/Linha GL265D/pneu_45.png",
    fotoPerfil: "assets/sampson/foto_pneus/Linha GL265D/pneu_perfil.png",
    paragrafo: PARAGRAFO_CARGA_SAMSON,
    sufixoMedida: "", fotoFrente: "assets/sampson/foto_pneus/Linha GL265D/pneu_frente.png"
  },
  {
    nome:   "GL267D",
    specs:  "Linha de carga · tração reforçada",
    foto:   "assets/sampson/foto_pneus/Linha GL267D/pneu_45.png",
    titulo: "TRAÇÃO PARA O TRABALHO PESADO",
    sub:    "Estrutura reforçada para tração confiável mesmo com carga pesada.",
    cta:    "CONHEÇA O GL267D",
    linha:  "carga",
    apelido: "GL267D",
    foto45:     "assets/sampson/foto_pneus/Linha GL267D/pneu_45.png",
    fotoPerfil: "assets/sampson/foto_pneus/Linha GL267D/pneu_perfil.png",
    paragrafo: PARAGRAFO_CARGA_SAMSON,
    sufixoMedida: "", fotoFrente: "assets/sampson/foto_pneus/Linha GL267D/pneu_frente.png"
  },
  {
    nome:   "GL283A",
    specs:  "Linha de carga · versatilidade em rodovia e cidade",
    foto:   "assets/sampson/foto_pneus/Linha GL283A/pneu_45.png",
    titulo: "FEITO PARA A ROTINA PESADA",
    sub:    "Equilíbrio entre durabilidade e desempenho para a rotina do transporte de carga.",
    cta:    "CONHEÇA O GL283A",
    linha:  "carga",
    apelido: "GL283A",
    foto45:     "assets/sampson/foto_pneus/Linha GL283A/pneu_45.png",
    fotoPerfil: "assets/sampson/foto_pneus/Linha GL283A/pneu_perfil.png",
    paragrafo: PARAGRAFO_CARGA_SAMSON,
    sufixoMedida: "", fotoFrente: "assets/sampson/foto_pneus/Linha GL283A/pneu_frente.png"
  },
  {
    nome:   "GL289A",
    specs:  "Linha de carga · versatilidade em rodovia e cidade",
    foto:   "assets/sampson/foto_pneus/Linha GL289A/pneu_45.png",
    titulo: "FEITO PARA A ROTINA PESADA",
    sub:    "Equilíbrio entre durabilidade e desempenho para a rotina do transporte de carga.",
    cta:    "CONHEÇA O GL289A",
    linha:  "carga",
    apelido: "GL289A",
    foto45:     "assets/sampson/foto_pneus/Linha GL289A/pneu_45.png",
    fotoPerfil: "assets/sampson/foto_pneus/Linha GL289A/pneu_perfil.png",
    paragrafo: PARAGRAFO_CARGA_SAMSON,
    sufixoMedida: "", fotoFrente: "assets/sampson/foto_pneus/Linha GL289A/pneu_frente.png"
  },
  {
    nome:   "GL296A",
    specs:  "Linha de carga · versatilidade em rodovia e cidade",
    foto:   "assets/sampson/foto_pneus/Linha GL296A/pneu_45.png",
    titulo: "FEITO PARA A ROTINA PESADA",
    sub:    "Equilíbrio entre durabilidade e desempenho para a rotina do transporte de carga.",
    cta:    "CONHEÇA O GL296A",
    linha:  "carga",
    apelido: "GL296A",
    foto45:     "assets/sampson/foto_pneus/Linha GL296A/pneu_45.png",
    fotoPerfil: "assets/sampson/foto_pneus/Linha GL296A/pneu_perfil.png",
    paragrafo: PARAGRAFO_CARGA_SAMSON,
    sufixoMedida: "", fotoFrente: "assets/sampson/foto_pneus/Linha GL296A/pneu_frente.png"
  },
  {
    nome:   "GR-A",
    specs:  "Linha de carga · rodagem em costela · longa distância",
    foto:   "assets/sampson/foto_pneus/Linha GR-A/pneu_45.png",
    titulo: "RODAGEM QUE NÃO PARA",
    sub:    "Banda em costela para rodagem estável e baixo desgaste em longa distância.",
    cta:    "CONHEÇA O GR-A",
    linha:  "carga",
    apelido: "GR-A",
    foto45:     "assets/sampson/foto_pneus/Linha GR-A/pneu_45.png",
    fotoPerfil: "assets/sampson/foto_pneus/Linha GR-A/pneu_perfil.png",
    paragrafo: PARAGRAFO_CARGA_SAMSON,
    sufixoMedida: "", fotoFrente: "assets/sampson/foto_pneus/Linha GR-A/pneu_frente.png"
  },
  {
    nome:   "GR-D",
    specs:  "Linha de carga · rodagem em costela · longa distância",
    foto:   "assets/sampson/foto_pneus/Linha GR-D/pneu_45.png",
    titulo: "RODAGEM QUE NÃO PARA",
    sub:    "Banda em costela para rodagem estável e baixo desgaste em longa distância.",
    cta:    "CONHEÇA O GR-D",
    linha:  "carga",
    apelido: "GR-D",
    foto45:     "assets/sampson/foto_pneus/Linha GR-D/pneu_45.png",
    fotoPerfil: "assets/sampson/foto_pneus/Linha GR-D/pneu_perfil.png",
    paragrafo: PARAGRAFO_CARGA_SAMSON,
    sufixoMedida: "", fotoFrente: "assets/sampson/foto_pneus/Linha GR-D/pneu_frente.png"
  }
];

// Sugestões de cena exibidas ao usuário no painel "Personalizar Prompt"
// Chave: linha × objetivo — descrição em PT-BR para facilitar edição
const SUGESTOES_CENA = {
  esportiva: {
    promocao:   'Pista de corrida molhada à noite, reflexo de luzes âmbar no asfalto, carro esportivo desfocado ao fundo.',
    lancamento: 'Pavilhão de motorsport com iluminação dramática de holofotes, piso polido, texturas de fibra de carbono.',
    aviso:      'Garagem profissional escura, ferramentas de precisão, componentes de fibra de carbono, iluminação direcional.'
  },
  offroad: {
    promocao:   'Trilha off-road ao entardecer em floresta densa, lama vermelha e pedras expostas, luz lateral dramática.',
    lancamento: 'Cânion rochoso na hora dourada, nuvem de poeira em trilha de terra batida, paisagem épica.',
    aviso:      'Ambiente off-road em tempestade noturna, chuva intensa em ruts fundos, vegetação densa ao fundo.'
  },
  runflat:  {
    promocao:   'Avenida urbana moderna à noite, reflexo de luzes na pista, skyline da cidade ao fundo.',
    lancamento: 'Avenida ampla no blue hour, asfalto impecável, streetlights dourados, arquitetura moderna.',
    aviso:      'Viaduto urbano sob chuva à noite, refletores de segurança, luzes da cidade desfocadas.'
  },
  carga: {
    promocao:   'Rodovia industrial ao pôr do sol, centro de distribuição ao fundo, estrada reta, céu âmbar.',
    lancamento: 'Hub logístico ao entardecer, pátio de asfalto limpo, iluminação de galpões, escala e confiabilidade.',
    aviso:      'Estrada industrial à noite, distrito de armazéns, holofotes superiores, silhueta de veículo pesado.'
  },
  passeio: {
    promocao:   'Avenida residencial arborizada em manhã ensolarada, asfalto limpo, luz suave e acolhedora.',
    lancamento: 'Bairro urbano moderno ao entardecer, ruas largas e bem cuidadas, ambiente sereno e aspiracional.',
    aviso:      'Rua urbana tranquila sob chuva leve, reflexos suaves no asfalto, atmosfera de segurança e controle.'
  },
  semislick: {
    promocao:   'Reta de pista de corrida ao meio-dia, asfalto grudento com marcas de borracha, arquibancadas vazias ao fundo.',
    lancamento: 'Box de pista na hora dourada, asfalto de circuito impecável, arquitetura moderna de autódromo.',
    aviso:      'Circuito fechado sob céu nublado, linha de pista molhada, zebras e brita de escape ao fundo.'
  },
  institucional: {
    promocao:   'Pista de corrida ao entardecer, iluminação âmbar e azul, carro desfocado em movimento.',
    lancamento: 'Estúdio automotivo premium com holofotes, piso polido, sombras profundas, estética minimalista.',
    aviso:      'Ambiente automotivo escuro e profissional, iluminação direcional de precisão.'
  }
};

// =============================================================================
// CONFIGURAÇÃO DAS MARCAS — NÃO EDITAR AS CHAVES, só o conteúdo de cada marca
//
// Cada marca define: rótulo exibido, logo usado na sidebar/cabeçalho da arte
// (Denali usa a versão branca — sidebar e zona de logo na arte são sempre
// escuras) e seu catálogo de produtos. Cores/fonte de cada marca vivem em
// style.css, escopadas por `[data-marca]` — aqui só referenciamos o essencial
// para popular a UI e trocar o asset de logo.
// =============================================================================

const MARCAS = {
  delinte: {
    label: 'Delinte',
    logo:  'https://cdn.jsdelivr.net/gh/marketing-gp/delinte@main/Delinte%20-%20S%20Slogan.svg',
    produtos: PRODUTOS_DELINTE
  },
  denali: {
    label: 'Denali',
    logo:  'assets/denali/logo/logo-denali-branca.png',
    produtos: PRODUTOS_DENALI
  },
  sentury: {
    label: 'Sentury',
    logo:  'assets/sentury/logo/Sentury png branco.png',
    produtos: PRODUTOS_SENTURY
  },
  samson: {
    label: 'Samson',
    logo:  'assets/sampson/logos/Logo Samson Monocormatico.png',
    produtos: PRODUTOS_SAMSON
  }
};

// ─── Formatos disponíveis ────────────────────────────────────────────────────
const FORMATOS = {
  feed:   { label: 'Feed 1:1',          width: 1080, height: 1080, desc: '1080 × 1080 px' },
  story:  { label: 'Story 9:16',        width: 1080, height: 1920, desc: '1080 × 1920 px' },
  // Banner não tem width/height fixo — varia por estado.bannerTamanho (ver
  // BANNER_TAMANHOS abaixo e formatoAtivoInfo()). label aqui é só o texto do
  // botão de formato; a descrição de tamanho exibida ao usuário já vem do
  // tamanho de banner ativo, não daqui.
  banner: { label: 'Banner Horizontal' }
};

// ─── Tamanhos disponíveis do Banner Horizontal ───────────────────────────────
// "grande" é o padrão (tamanho oficial do site) — os outros dois são opções
// adicionais para espaços menores (ex.: banners intermediários/rodapé).
const BANNER_TAMANHOS = {
  grande:  { label: 'Grande (padrão)', width: 1920, height: 664, desc: '1920 × 664 px' },
  medio:   { label: 'Médio',           width: 1920, height: 393, desc: '1920 × 393 px' },
  pequeno: { label: 'Pequeno',         width: 1920, height: 195, desc: '1920 × 195 px' }
};

// Contraparte mobile de cada tamanho de Banner — usada só na exportação (ver
// exportarBannerDuplo()). Não tem select próprio: o usuário escolhe o
// tamanho uma vez (grande/medio/pequeno) e PNG/PDF geram os dois recortes
// (desktop + mobile) juntos. O fundo gerado por IA é o mesmo nos dois — só
// muda o enquadramento (object-fit: cover reagindo à nova proporção).
const BANNER_TAMANHOS_MOBILE = {
  grande:  { width: 562,  height: 750 },
  medio:   { width: 752,  height: 225 },
  pequeno: { width: 1760, height: 358 }
};

// Retorna {label, desc, width, height} do formato/tamanho ativo — único ponto
// que resolve a dimensão real do Banner (que não é fixa, ver BANNER_TAMANHOS)
// para quem precisa do tamanho lógico do canvas (escala de preview, export,
// medição de texto). Use esta função em vez de ler FORMATOS[...] direto
// sempre que precisar de width/height reais.
// Também resolve o recorte mobile quando estado.bannerDispositivo === 'mobile'
// — usado só pela pré-visualização (toggle Desktop/Mobile na sidebar); a
// exportação sempre gera os dois independente desse estado (ver
// exportarBannerDuplo), então esse campo nunca chega no back-end.
function formatoAtivoInfo() {
  if (estado.formato === 'banner') {
    const tamanho = BANNER_TAMANHOS[estado.bannerTamanho];
    if (estado.bannerDispositivo === 'mobile') {
      const dimsMobile = BANNER_TAMANHOS_MOBILE[estado.bannerTamanho];
      return {
        ...dimsMobile,
        label: `${FORMATOS.banner.label} (${tamanho.label} · Mobile)`,
        desc: `${dimsMobile.width} × ${dimsMobile.height} px`
      };
    }
    return { ...tamanho, label: `${FORMATOS.banner.label} (${tamanho.label})` };
  }
  return FORMATOS[estado.formato];
}

// ─── Objetivos disponíveis ───────────────────────────────────────────────────
// "nenhum" some com o selo por completo (sem cls, sem texto) — só afeta a
// camada 2 (composição); a IA continua recebendo um objetivo válido pra
// escolher a cena de fundo (ver objetivoParaFundo() em GERAÇÃO DE FUNDO).
const OBJETIVOS = {
  promocao:   { texto: 'PROMOÇÃO',   cls: 'obj-promocao'   },
  lancamento: { texto: 'LANÇAMENTO', cls: 'obj-lancamento' },
  aviso:      { texto: 'AVISO',      cls: 'obj-aviso'      },
  nenhum:     { texto: '',           cls: ''               }
};

// O backend (e o mapa SUGESTOES_CENA) só conhecem promoção/lançamento/aviso
// — "nenhum" é puramente visual (esconde o selo), então sempre que for pedir
// uma cena de fundo à IA ou montar a sugestão de prompt, cai pra "promocao".
function objetivoParaFundo() {
  return estado.objetivo === 'nenhum' ? 'promocao' : estado.objetivo;
}

// ─── Limites de caracteres ───────────────────────────────────────────────────
const LIMITES = {
  titulo: 40, sub: 80, cta: 25, medida: 30, destaque: 20, sugestaoCarro: 60,
  linhaMedida: 60, linhaValor: 20, validadeTabela: 20, ctaTabela: 80
};

// Marcas com suporte ao modo "Arte de Medida"
const MARCAS_COM_ARTE_MEDIDA = new Set(['delinte', 'denali', 'sentury', 'samson']);

// ─── Modelos disponíveis dentro do modo "Arte Livre" ─────────────────────────
// Cada modelo tem seu próprio <div> de canvas (ids abaixo) e seu próprio
// <img> de fundo de IA (exceto "pneufrente", que não usa IA — fundo fixo da
// marca, ver style.css). "padrao" é o template original, já existente antes
// desta leva de modelos.
const MODELOS = {
  padrao:      { canvas: 'art-canvas',            bgImg: 'art-bg-img'   },
  '3pneus':    { canvas: 'art-canvas-3pneus',     bgImg: 'art3p-bg-img' },
  pneu45:      { canvas: 'art-canvas-pneu45',     bgImg: 'artp45-bg-img'},
  carrofrente: { canvas: 'art-canvas-carrofrente',bgImg: 'artcf-bg-img' },
  carrolado:   { canvas: 'art-canvas-carrolado',  bgImg: 'artcl-bg-img' },
  pneufrente:  { canvas: 'art-canvas-pneufrente', bgImg: null           }
};

// ─── Modelos disponíveis dentro do modo "Arte de Medida" ─────────────────────
// "unica" é o template original (1 produto, fotos do pneu, medida digitada).
// "tabela"/"tabeladupla" não dependem de produto — são só uma lista livre de
// medida+valor (ver estado.linhasTabela) e nunca geram fundo por IA.
const MODELOS_MEDIDA = {
  unica:       { canvas: 'art-canvas-medida',      maxLinhas: 0  },
  tabela:      { canvas: 'art-canvas-tabela',       maxLinhas: 15 },
  tabeladupla: { canvas: 'art-canvas-tabeladupla',  maxLinhas: 30 }
};

// ─── Estado da aplicação ─────────────────────────────────────────────────────
const estado = {
  marca:          'delinte',
  tipoArte:       'livre', // 'livre' | 'medida'
  modelo:         'padrao', // chave de MODELOS — só relevante quando tipoArte === 'livre'
  modeloMedida:   'unica',  // chave de MODELOS_MEDIDA — só relevante quando tipoArte === 'medida'
  formato:        'feed',
  bannerTamanho:  'grande', // chave de BANNER_TAMANHOS — só relevante quando formato === 'banner'
  bannerDispositivo: 'desktop', // 'desktop' | 'mobile' — só afeta a PRÉ-VISUALIZAÇÃO (ver formatoAtivoInfo); a exportação sempre gera os dois juntos, ver exportarBannerDuplo
  filtroMarca:    'nao', // 'sim' | 'nao' — só Denali; sobrepõe o gradiente da marca no fundo de IA (ver classesRealceFundo)
  escurecerFundo: 'nao', // 'sim' | 'nao' — as duas marcas; escurece o fundo de IA pra não brigar com o texto
  objetivo:       'promocao',
  produto:        0,
  pneu1:          0, // modelo "3 pneus"
  pneu2:          0,
  pneu3:          0,
  titulo:         '',
  sub:            '',
  cta:            '',
  destaque:       '', // modelo "3 pneus" — palavra em destaque na caixa inferior
  sugestaoCarro:  '', // modelos "carro de frente"/"carro de lado"
  medida:         '', // digitado livremente pelo usuário (modo "Arte de Medida" / Medida Única)
  linhasTabela: [ // modelos "Tabela de Medidas" / "Tabela Dupla" — { medida, valor }
    { medida: '', valor: '' },
    { medida: '', valor: '' },
    { medida: '', valor: '' }
  ],
  validadeTabela:      '', // "*Válido até ..."
  descontoPorUnidade:  'sim', // 'sim' | 'nao' — controla a nota "*Descontos por unidade"
  ctaTabela:           '', // frase final (ex.: "Entre em contato com o seu vendedor...")
  customPrompt:   '',    // texto digitado pelo usuário; '' = usar sugestão automática
  promptEditado:  false, // true se o usuário editou manualmente o textarea de prompt
  fundoGerado:    false,
  gerando:        false
};

// Id do canvas atualmente visível, conforme o tipo de arte / modelo ativo
function canvasAtivoId() {
  return estado.tipoArte === 'medida'
    ? MODELOS_MEDIDA[estado.modeloMedida].canvas
    : MODELOS[estado.modelo].canvas;
}

// =============================================================================
// INICIALIZAÇÃO
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  vincularEventos();
  atualizarDisponibilidadeTipoArte();
  renderLinhasEditor();
  // trocarMarca (não só popularProdutos+renderTudo) porque também é quem
  // preenche os <img> de logo de cada canvas (art-logo, artm-logo, e os
  // demais modelos de Arte Livre/Arte de Medida) — sem isso eles ficam com
  // src="" até o usuário clicar num botão de marca.
  trocarMarca(estado.marca);
  atualizarEscala();
  window.addEventListener('resize', atualizarEscala);
});

// Renderiza todos os canvases (só o ativo fica visível via CSS) — mais
// simples que rastrear qual função chamar a cada mudança de estado, e o
// custo de renderizar canvases escondidos é irrelevante (poucos nós de DOM).
function renderTudo() {
  renderArt();
  renderArtMedida();
  renderArt3Pneus();
  renderArtPneu45();
  renderArtCarroFrente();
  renderArtCarroLado();
  renderArtPneuFrente();
  renderArtTabela();
  renderArtTabelaDupla();
}

// Retorna o produto atualmente selecionado, dentro do catálogo da marca ativa
function produtoAtual() {
  return MARCAS[estado.marca].produtos[estado.produto];
}

// Foto do pneu a 45° COM roda usada nos modelos de Arte Livre "3 Pneus" e
// "Pneu 45°" (produto.foto — pneu_45_roda.png) — NÃO usada na Arte de
// Medida, que sempre lê produto.foto45 diretamente (pneu_45.png, sem roda).
function foto45ArteLivre(produto) {
  return produto.foto;
}

// Repopula os <select> de produtos (único + os 3 do modelo "3 pneus") com o
// catálogo da marca ativa
function popularProdutos() {
  const sels = [
    { id: 'sel-produto', chave: 'produto' },
    { id: 'sel-pneu1',   chave: 'pneu1'   },
    { id: 'sel-pneu2',   chave: 'pneu2'   },
    { id: 'sel-pneu3',   chave: 'pneu3'   }
  ];
  sels.forEach(({ id, chave }) => {
    const sel = document.getElementById(id);
    sel.innerHTML = '';
    MARCAS[estado.marca].produtos.forEach((p, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = p.nome;
      sel.appendChild(opt);
    });
    sel.value = estado[chave];
  });
}

// Troca a marca ativa: atualiza tema (data-marca), logos, catálogo de
// produtos e textos sugeridos. Não mexe no fundo já gerado — o fundo de IA
// é agnóstico de marca (nunca contém logo/texto), então não precisa refazer.
function trocarMarca(marca) {
  estado.marca   = marca;
  estado.produto = 0;
  estado.pneu1   = 0;
  estado.pneu2   = 0;
  estado.pneu3   = 0;

  document.getElementById('app-root').dataset.marca = marca;
  ['art-canvas', 'art-canvas-medida', 'art-canvas-3pneus', 'art-canvas-pneu45',
   'art-canvas-carrofrente', 'art-canvas-carrolado', 'art-canvas-pneufrente',
   'art-canvas-tabela', 'art-canvas-tabeladupla'
  ].forEach(id => { document.getElementById(id).dataset.marca = marca; });

  const logoUrl = MARCAS[marca].logo;
  ['sidebar-logo', 'art-logo', 'artm-logo', 'art3p-logo', 'artp45-logo',
   'artcf-logo', 'artcl-logo', 'artpf-logo'
  ].forEach(id => { document.getElementById(id).src = logoUrl; });

  popularProdutos();
  preencherSugestoes(produtoAtual());
  if (!estado.promptEditado) atualizarSugestaoPrompt();

  // Arte de Medida ainda só existe para marcas com dados cadastrados
  // (fotos 45°/perfil, apelido, parágrafo) — se a marca não suporta, volta
  // para Arte Livre automaticamente.
  atualizarDisponibilidadeTipoArte();
  if (estado.tipoArte === 'medida' && !MARCAS_COM_ARTE_MEDIDA.has(marca)) {
    trocarTipoArte('livre');
  } else {
    renderTudo();
  }
}

// Habilita/desabilita o botão "Arte de Medida" conforme a marca ativa
function atualizarDisponibilidadeTipoArte() {
  const btn = document.querySelector('.btn-opt[data-field="tipoArte"][data-val="medida"]');
  if (!btn) return;
  btn.disabled = !MARCAS_COM_ARTE_MEDIDA.has(estado.marca);
}

// Alterna entre "Arte Livre" e "Arte de Medida": troca qual canvas fica
// visível, quais campos aparecem na sidebar e garante um formato válido
// para o modo (Arte de Medida não tem Banner ainda).
function trocarTipoArte(tipo) {
  estado.tipoArte = tipo;
  document.getElementById('app-root').dataset.tipoArte = tipo;

  document.querySelectorAll('.btn-opt[data-field="tipoArte"]').forEach(b => {
    const ativo = b.dataset.val === tipo;
    b.classList.toggle('active', ativo);
    b.setAttribute('aria-pressed', String(ativo));
  });

  if (tipo === 'medida' && estado.formato === 'banner') {
    estado.formato = 'feed';
    document.getElementById('app-root').dataset.formato = 'feed';
    document.querySelectorAll('.btn-opt[data-field="formato"]').forEach(b => {
      const ativo = b.dataset.val === 'feed';
      b.classList.toggle('active', ativo);
      b.setAttribute('aria-pressed', String(ativo));
    });
    atualizarMeta();
  }

  renderTudo();
  atualizarEscala();
}

// Troca o modelo ativo dentro de "Arte Livre" (padrão, 3 pneus, pneu 45°,
// carro de frente/lado, pneu de frente). Cada modelo tem seu próprio canvas
// (ver MODELOS) — a visibilidade da sidebar é 100% controlada via CSS
// ([data-modelo="..."] em style.css). Banner existe na maioria dos modelos
// de Arte Livre — só "Pneu de Frente" e "Pneu + Carro de Frente" não têm.
const MODELOS_SEM_BANNER = new Set(['pneufrente', 'carrofrente']);

function trocarModelo(modelo) {
  estado.modelo = modelo;
  document.getElementById('app-root').dataset.modelo = modelo;

  if (MODELOS_SEM_BANNER.has(modelo) && estado.formato === 'banner') {
    estado.formato = 'feed';
    document.getElementById('app-root').dataset.formato = 'feed';
    document.querySelectorAll('.btn-opt[data-field="formato"]').forEach(b => {
      const ativo = b.dataset.val === 'feed';
      b.classList.toggle('active', ativo);
      b.setAttribute('aria-pressed', String(ativo));
    });
    atualizarMeta();
  }

  renderTudo();
  atualizarEscala();
}

// Troca o modelo ativo dentro de "Arte de Medida" (medida única, tabela,
// tabela dupla). Os modelos de tabela compartilham a mesma lista de linhas
// (estado.linhasTabela) — ao trocar para um modelo com limite menor, corta
// o excedente (ex.: 20 linhas cadastradas em "Tabela Dupla" ao voltar para
// "Tabela de Medidas", que só aceita 15).
function trocarModeloMedida(modelo) {
  estado.modeloMedida = modelo;
  document.getElementById('app-root').dataset.modeloMedida = modelo;

  const max = MODELOS_MEDIDA[modelo].maxLinhas;
  if (max > 0 && estado.linhasTabela.length > max) {
    estado.linhasTabela.length = max;
  }

  // Tabela Dupla não existe em Story — se o usuário estava em Story e trocou
  // pra esse modelo, volta pro Feed (mesma lógica do Banner em trocarModelo).
  if (modelo === 'tabeladupla' && estado.formato === 'story') {
    estado.formato = 'feed';
    document.getElementById('app-root').dataset.formato = 'feed';
    document.querySelectorAll('.btn-opt[data-field="formato"]').forEach(b => {
      const ativo = b.dataset.val === 'feed';
      b.classList.toggle('active', ativo);
      b.setAttribute('aria-pressed', String(ativo));
    });
    atualizarMeta();
  }

  renderLinhasEditor();
  renderTudo();
  atualizarEscala();
}

function vincularEventos() {
  // Botões de grupo (tipoArte / formato / objetivo)
  document.querySelectorAll('.btn-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.disabled) return;

      const campo = btn.dataset.field;
      const valor = btn.dataset.val;

      if (campo === 'marca') {
        btn.closest('.btn-group').querySelectorAll('.btn-opt').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        trocarMarca(valor);
        return;
      }

      if (campo === 'tipoArte') {
        trocarTipoArte(valor);
        return;
      }

      btn.closest('.btn-group').querySelectorAll('.btn-opt').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const formatoMudou = campo === 'formato' && valor !== estado.formato;
      estado[campo] = valor;
      if (formatoMudou) {
        document.getElementById('app-root').dataset.formato = valor;
      }
      // bannerDispositivo (toggle Desktop/Mobile) também muda o que
      // formatoAtivoInfo() resolve (ver função) — precisa atualizar o texto
      // de dimensões acima do canvas igual já acontece ao trocar o formato.
      if (formatoMudou || campo === 'bannerDispositivo') atualizarMeta();
      if (!estado.promptEditado) atualizarSugestaoPrompt();
      renderTudo();
      atualizarEscala();
    });
  });

  // Seletor "Modelo" (dentro de Arte Livre)
  document.getElementById('sel-modelo').addEventListener('change', e => {
    trocarModelo(e.target.value);
  });

  // Seletor "Modelo" (dentro de Arte de Medida)
  document.getElementById('sel-modelo-medida').addEventListener('change', e => {
    trocarModeloMedida(e.target.value);
  });

  // Seletor "Tamanho do Banner" — só relevante quando formato === 'banner'
  document.getElementById('sel-banner-tamanho').addEventListener('change', e => {
    estado.bannerTamanho = e.target.value;
    atualizarMeta();
    renderTudo();
    atualizarEscala();
  });

  // Seleção de produto — preenche textos sugeridos (editáveis pelo usuário)
  document.getElementById('sel-produto').addEventListener('change', e => {
    estado.produto = parseInt(e.target.value, 10);
    preencherSugestoes(produtoAtual());
    atualizarSugestaoPrompt();
    renderTudo();
  });

  // Seleção dos 3 pneus (modelo "Arte com 3 Pneus")
  ['pneu1', 'pneu2', 'pneu3'].forEach((chave, i) => {
    document.getElementById(`sel-${chave}`).addEventListener('change', e => {
      estado[chave] = parseInt(e.target.value, 10);
      renderTudo();
    });
  });

  // Campo "Medida" (digitado livremente — não vem de catálogo)
  criarCampoTexto('inp-medida', 'cnt-medida', 'medida', LIMITES.medida, renderArtMedida);

  // Campo "Destaque" (modelo "3 pneus") e "Sugestão de Carro" (modelos com carro-herói)
  criarCampoTexto('inp-destaque', 'cnt-destaque', 'destaque', LIMITES.destaque, renderArt3Pneus);
  document.getElementById('inp-carro').addEventListener('input', e => {
    if (e.target.value.length > LIMITES.sugestaoCarro) e.target.value = e.target.value.slice(0, LIMITES.sugestaoCarro);
    estado.sugestaoCarro = e.target.value;
    const cnt = document.getElementById('cnt-carro');
    cnt.textContent = `${e.target.value.length} / ${LIMITES.sugestaoCarro}`;
    cnt.classList.toggle('at-limit', e.target.value.length >= LIMITES.sugestaoCarro);
  });

  // Campos "Válido até" e "Texto Final" (modelos de tabela)
  criarCampoTexto('inp-validade-tabela', 'cnt-validade-tabela', 'validadeTabela', LIMITES.validadeTabela);
  criarCampoTexto('inp-cta-tabela',      'cnt-cta-tabela',      'ctaTabela',      LIMITES.ctaTabela);

  // Editor de linhas (medida + valor) dos modelos de tabela — delegação de
  // eventos porque as linhas são geradas dinamicamente (podem ser
  // adicionadas/removidas em tempo real, até o limite do modelo ativo).
  document.getElementById('btn-add-linha').addEventListener('click', () => {
    const max = MODELOS_MEDIDA[estado.modeloMedida].maxLinhas;
    if (estado.linhasTabela.length >= max) return;
    estado.linhasTabela.push({ medida: '', valor: '' });
    renderLinhasEditor();
    renderTudo();
  });

  document.getElementById('linhas-tabela-editor').addEventListener('input', e => {
    const idx = parseInt(e.target.dataset.idx, 10);
    if (Number.isNaN(idx) || !estado.linhasTabela[idx]) return;
    if (e.target.classList.contains('linha-medida')) estado.linhasTabela[idx].medida = e.target.value;
    if (e.target.classList.contains('linha-valor'))  estado.linhasTabela[idx].valor  = e.target.value;
    renderTudo();
  });

  document.getElementById('linhas-tabela-editor').addEventListener('click', e => {
    const btn = e.target.closest('.btn-linha-remove');
    if (!btn) return;
    const idx = parseInt(btn.dataset.idx, 10);
    if (Number.isNaN(idx)) return;
    estado.linhasTabela.splice(idx, 1);
    renderLinhasEditor();
    renderTudo();
  });

  // Painel "Personalizar Prompt"
  document.getElementById('btn-prompt-toggle').addEventListener('click', () => {
    const painel = document.getElementById('prompt-painel');
    const aberto = !painel.hidden;
    painel.hidden = aberto;
    document.getElementById('btn-prompt-toggle').setAttribute('aria-expanded', String(!aberto));
    if (!aberto) atualizarSugestaoPrompt(); // preenche ao abrir
  });

  document.getElementById('inp-prompt-custom').addEventListener('input', e => {
    estado.customPrompt  = e.target.value;
    estado.promptEditado = e.target.value.trim() !== '';
    const aviso = document.getElementById('prompt-editado-aviso');
    aviso.hidden = !estado.promptEditado;
  });

  document.getElementById('btn-prompt-reset').addEventListener('click', () => {
    estado.customPrompt  = '';
    estado.promptEditado = false;
    atualizarSugestaoPrompt(true);
    document.getElementById('prompt-editado-aviso').hidden = true;
  });

  // Campos de texto
  criarCampoTexto('inp-titulo', 'cnt-titulo', 'titulo', LIMITES.titulo);
  criarCampoTexto('inp-sub',    'cnt-sub',    'sub',    LIMITES.sub);
  criarCampoTexto('inp-cta',    'cnt-cta',    'cta',    LIMITES.cta);

  // Gerar fundo
  document.getElementById('btn-gerar').addEventListener('click', gerarFundo);

  // Exportar
  document.getElementById('btn-png').addEventListener('click', exportarPNG);
  document.getElementById('btn-pdf').addEventListener('click', exportarPDF);
}

function criarCampoTexto(inputId, contadorId, chave, max, aoAtualizar = renderTudo) {
  const el      = document.getElementById(inputId);
  const counter = document.getElementById(contadorId);
  el.addEventListener('input', () => {
    if (el.value.length > max) el.value = el.value.slice(0, max);
    estado[chave] = el.value;
    counter.textContent = `${el.value.length} / ${max}`;
    counter.classList.toggle('at-limit', el.value.length >= max);
    aoAtualizar();
  });
}

function preencherSugestoes(produto) {
  const campos = [
    { id: 'inp-titulo', cntId: 'cnt-titulo', chave: 'titulo', max: LIMITES.titulo },
    { id: 'inp-sub',    cntId: 'cnt-sub',    chave: 'sub',    max: LIMITES.sub    },
    { id: 'inp-cta',    cntId: 'cnt-cta',    chave: 'cta',    max: LIMITES.cta    }
  ];
  campos.forEach(({ id, cntId, chave, max }) => {
    const val = (produto[chave] ?? '').slice(0, max);
    const el  = document.getElementById(id);
    el.value  = val;
    estado[chave] = val;
    const cnt = document.getElementById(cntId);
    cnt.textContent = `${val.length} / ${max}`;
    cnt.classList.toggle('at-limit', val.length >= max);
  });
}

// Atualiza o textarea de sugestão de prompt com base no produto/objetivo atual
// forcar=true substitui mesmo se o usuário editou (usado pelo botão Restaurar)
function atualizarSugestaoPrompt(forcar = false) {
  if (estado.promptEditado && !forcar) return;
  const linha   = produtoAtual()?.linha ?? 'institucional';
  const obj     = objetivoParaFundo();
  const sugestao = (SUGESTOES_CENA[linha] ?? SUGESTOES_CENA.institucional)[obj] ?? '';
  const textarea = document.getElementById('inp-prompt-custom');
  if (textarea) textarea.value = sugestao;
  if (forcar) estado.customPrompt = '';
}

function atualizarMeta() {
  const f = formatoAtivoInfo();
  document.getElementById('preview-meta').textContent = `${f.label} · ${f.desc}`;
}

// =============================================================================
// GERAÇÃO DE FUNDO (camada 1 — IA)
// =============================================================================

async function gerarFundo() {
  if (estado.gerando) return;
  estado.gerando = true;

  limparErro();
  setEstadoGerando(true);

  try {
    const produto = produtoAtual();
    // "carrofrente"/"carrolado" têm rota de prompt própria (carro-herói,
    // ver prompts.js); os demais modelos de Arte Livre usam a mesma rota
    // "livre" de sempre (o pneu real é sobreposto por cima na camada 2).
    const modoRequisicao = estado.tipoArte === 'medida'
      ? 'medida'
      : (estado.modelo === 'carrofrente' || estado.modelo === 'carrolado')
        ? estado.modelo
        : 'livre';

    const res = await fetch('/api/gerar-fundo', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        modo:          modoRequisicao,
        formato:       estado.formato,
        objetivo:      objetivoParaFundo(),
        linha:         produto?.linha ?? 'institucional',
        customPrompt:  estado.customPrompt,
        sugestaoCarro: estado.sugestaoCarro
      })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.erro ?? 'Erro ao gerar o fundo. Tente novamente.');
    }

    aplicarFundo(data.imagem);
    estado.fundoGerado = true;
    atualizarBtnGerar();
    atualizarNota();

  } catch (err) {
    mostrarErro(err.message);
  } finally {
    estado.gerando = false;
    setEstadoGerando(false);
  }
}

// Id do <img> de fundo do canvas atualmente ativo (null se o modelo não usa
// fundo gerado por IA — ex.: "pneu de frente")
function bgImgAtivoId() {
  if (estado.tipoArte === 'medida') {
    return estado.modeloMedida === 'unica' ? 'artm-bg-img' : null;
  }
  return MODELOS[estado.modelo].bgImg;
}

// Aplica a imagem base64 como fundo com fade-in via <img> onload
function aplicarFundo(base64) {
  const id = bgImgAtivoId();
  if (!id) return;
  const bgImg = document.getElementById(id);
  bgImg.classList.remove('loaded');
  bgImg.onload = () => {
    requestAnimationFrame(() => bgImg.classList.add('loaded'));
  };
  bgImg.src = `data:image/png;base64,${base64}`;
}

// Remove o fundo gerado (ex.: ao trocar formato)
function resetarFundo() {
  const id = bgImgAtivoId();
  if (!id) return;
  const bgImg = document.getElementById(id);
  bgImg.classList.remove('loaded');
  bgImg.src = '';
  estado.fundoGerado = false;
  atualizarBtnGerar();
  atualizarNota();
}

function setEstadoGerando(gerando) {
  const btn = document.getElementById('btn-gerar');
  const overlay = document.getElementById('loading-overlay');
  btn.disabled = gerando;
  btn.classList.toggle('loading', gerando);
  overlay.hidden = !gerando;
  btn.querySelector('.btn-text').textContent = gerando ? 'Gerando...' : (
    estado.fundoGerado ? 'Gerar Novamente' : 'Gerar Fundo com IA'
  );
}

function atualizarBtnGerar() {
  const btn = document.getElementById('btn-gerar');
  if (!estado.gerando) {
    btn.querySelector('.btn-text').textContent =
      estado.fundoGerado ? 'Gerar Novamente' : 'Gerar Fundo com IA';
  }
}

function atualizarNota() {
  const nota = document.getElementById('preview-note');
  if (estado.fundoGerado) {
    nota.innerHTML = 'Fundo gerado. Ajuste os textos e exporte, ou clique em <strong>Gerar Novamente</strong> para nova variação.';
  } else {
    nota.innerHTML = 'Configure os campos e clique em <strong>Gerar Fundo com IA</strong> para iniciar.';
  }
}

function mostrarErro(msg) {
  const el = document.getElementById('error-msg');
  el.textContent = msg;
  el.hidden = false;
}

function limparErro() {
  document.getElementById('error-msg').hidden = true;
}

// =============================================================================
// RENDERIZAÇÃO DA ARTE (camada 2 — composição)
// =============================================================================

// Classes de formato compartilhadas por todos os canvases de Arte Livre —
// `format-<formato>` sempre, mais `banner-<tamanho>` quando o formato ativo
// for Banner (Grande/Médio/Pequeno), para o CSS conseguir ajustar posição/
// fonte por tamanho igual já é feito na Arte Livre Padrão. `banner-mobile`
// entra também quando o toggle Desktop/Mobile da sidebar está em "Mobile" —
// é a MESMA classe que capturarCanvas() adiciona no clone durante a
// exportação (ver exportarBannerDuplo), então a pré-visualização mostra
// fielmente o recorte mobile antes de exportar.
function classesFormatoLivre() {
  return [
    `format-${estado.formato}`,
    estado.formato === 'banner' ? `banner-${estado.bannerTamanho}` : '',
    (estado.formato === 'banner' && estado.bannerDispositivo === 'mobile') ? 'banner-mobile' : '',
    ...classesRealceFundo()
  ];
}

// Classes de realce do fundo gerado por IA — "filtro-marca" (só Denali,
// sobrepõe o gradiente da marca pra puxar a cor do fundo pro tom oficial) e
// "escurecer-fundo" (as duas marcas, escurece o fundo pra não brigar com o
// texto). Compartilhada entre classesFormatoLivre() (Arte Livre) e
// renderArtMedida (Medida Única) — os únicos modelos com fundo de IA.
// "pneufrente" fica de fora: usa fundo fixo da marca, sem IA (ver README).
function classesRealceFundo() {
  if (estado.modelo === 'pneufrente') return [];
  return [
    (estado.marca === 'denali' && estado.filtroMarca === 'sim') ? 'filtro-marca' : '',
    estado.escurecerFundo === 'sim' ? 'escurecer-fundo' : ''
  ];
}

function renderArt() {
  const canvas  = document.getElementById('art-canvas');
  const obj     = OBJETIVOS[estado.objetivo];
  const produto = produtoAtual();
  const semProd = estado.produto === 0;

  // Classes dinâmicas
  canvas.className = [
    'art',
    ...classesFormatoLivre(),
    obj.cls,
    semProd ? 'no-product' : ''
  ].filter(Boolean).join(' ');
  canvas.dataset.marca = estado.marca;

  // Badge — "nenhum" (obj.texto vazio) some com o selo por completo, em vez
  // de deixar uma pílula vazia (sem cor de fundo, já que nenhum obj-cls bate).
  const badge = document.getElementById('art-badge');
  badge.textContent = obj.texto;
  badge.hidden = !obj.texto;

  // Textos — título sempre em caixa alta
  const titulo = estado.titulo || 'TÍTULO DA ARTE';
  document.getElementById('art-title').textContent = titulo.toUpperCase();
  document.getElementById('art-sub').textContent   = estado.sub  || 'Subtítulo descritivo da campanha ou produto.';
  document.getElementById('art-cta').textContent   = (estado.cta || 'SAIBA MAIS').toUpperCase();

  // Produto
  const imgWrap = document.getElementById('art-img-wrap');
  if (semProd) {
    document.getElementById('art-pname').textContent = '';
    document.getElementById('art-specs').textContent = '';
    document.getElementById('art-product').src       = '';
    imgWrap.style.display = 'none';
  } else {
    document.getElementById('art-pname').textContent = produto.nome;
    document.getElementById('art-specs').textContent = produto.specs;
    document.getElementById('art-product').src       = produto.foto;
    imgWrap.style.display = '';
  }
}

// ── Faixa mosaico "DELINTE / apelido" ────────────────────────────────────────
// Gera repetições suficientes para sempre estourar a largura do canvas —
// igual ao modelo de referência, onde as palavras das pontas ficam cortadas.
const REPETICOES_MOSAICO = 10;

function montarMarquee(apelido) {
  const wrap = document.getElementById('artm-marquee');
  wrap.innerHTML = '';
  const temApelido = Boolean(apelido);
  const nomeMarca = MARCAS[estado.marca].label.toUpperCase();

  for (let i = 0; i < REPETICOES_MOSAICO; i++) {
    const item = document.createElement('div');
    item.className = 'artm-marquee-item';
    item.innerHTML = `
      <span class="artm-marquee-brand">${nomeMarca}</span>
      <span class="artm-marquee-icon"><span></span><span></span></span>
    `;
    wrap.appendChild(item);

    if (temApelido) {
      const nick = document.createElement('div');
      nick.className = 'artm-marquee-item';
      nick.innerHTML = `<span class="artm-marquee-nick">${apelido}</span>`;
      wrap.appendChild(nick);
    }
  }
}

// Renderiza o canvas do modo "Arte de Medida"
function renderArtMedida() {
  const canvas  = document.getElementById('art-canvas-medida');
  const produto = produtoAtual();
  const semProd = estado.produto === 0;

  canvas.className = ['artm', `artm-${estado.formato}`, ...classesRealceFundo()].filter(Boolean).join(' ');
  canvas.dataset.marca = estado.marca;

  montarMarquee(semProd ? '' : produto.apelido);

  // Cabeçalho estático da Denali usa sempre a versão colorida da logo (o
  // fundo dessa arte é claro — a versão branca, usada no resto do app,
  // ficaria invisível aqui).
  document.getElementById('artm-logo-header').src =
    estado.marca === 'denali' ? 'assets/denali/logo/logo-denali-colorida.png' : '';

  // "MEDIDA" (Denali) vs "MEDIDAS" (Delinte)
  document.getElementById('artm-specs-label').textContent =
    estado.marca === 'denali' ? 'MEDIDA' : 'MEDIDAS';

  // Fotos do pneu (45° + perfil) — some com a faixa se ainda não há foto
  // cadastrada para o produto (dados pendentes, ver comentário do catálogo).
  const tiresWrap = document.getElementById('artm-tires');
  const tem45     = !semProd && Boolean(produto.foto45);
  const temPerfil = !semProd && Boolean(produto.fotoPerfil);
  document.getElementById('artm-tire-45').src     = tem45     ? produto.foto45     : '';
  document.getElementById('artm-tire-perfil').src = temPerfil ? produto.fotoPerfil : '';
  tiresWrap.classList.toggle('sem-foto', !tem45 && !temPerfil);

  // Caixa MEDIDAS
  document.getElementById('artm-specs-value').textContent  = estado.medida || 'MEDIDA';
  document.getElementById('artm-specs-nick').textContent   = semProd ? '' : produto.apelido;
  document.getElementById('artm-specs-suffix').textContent = semProd ? '' : (produto.sufixoMedida || '');

  // Parágrafo descritivo
  document.getElementById('artm-paragrafo').textContent =
    semProd ? '' : (produto.paragrafo || '');
}

// Renderiza o canvas do modelo "Arte com 3 Pneus" (sempre foto a 45°, uma
// ao lado da outra, separadas por uma faixa na cor da marca)
function renderArt3Pneus() {
  const canvas = document.getElementById('art-canvas-3pneus');
  canvas.className = ['art3p', ...classesFormatoLivre()].filter(Boolean).join(' ');
  canvas.dataset.marca = estado.marca;

  const produtos = MARCAS[estado.marca].produtos;
  document.getElementById('art3p-headline-lg').textContent = `${MARCAS[estado.marca].label.toUpperCase()}?`;

  [estado.pneu1, estado.pneu2, estado.pneu3].forEach((idx, i) => {
    const p = produtos[idx] ?? produtos[0];
    const semP = idx === 0;
    document.getElementById(`art3p-nome-${i + 1}`).textContent = semP ? '' : (p.apelido || p.nome);
    document.getElementById(`art3p-foto-${i + 1}`).src = semP ? '' : (foto45ArteLivre(p) || '');
  });

  // No Banner, a caixa esquerda do rodapé vira uma CTA editável (reaproveita
  // estado.cta, o mesmo campo usado no modelo Padrão) em vez do "Exclusivo
  // para / <Destaque>" fixo de Feed/Story — ver troca de campos na sidebar
  // em style.css (#grupo-cta / #grupo-destaque por formato).
  document.getElementById('art3p-destaque').textContent = estado.formato === 'banner'
    ? (estado.cta || 'SAIBA MAIS').toUpperCase()
    : (estado.destaque || 'LOJISTAS').toUpperCase();

  // Texto padrão quebra em duas frases (uma por linha) — usa .append() com
  // nó <br> real em vez de innerHTML, então não precisa escapar o texto
  // livre do usuário (estado.sub) nem arriscar HTML injetado por ele.
  const footerTexto = document.getElementById('art3p-footer-texto');
  footerTexto.textContent = '';
  if (estado.sub) {
    footerTexto.textContent = estado.sub;
  } else {
    footerTexto.append(
      'A marca só cresce com você.',
      document.createElement('br'),
      'Nosso cliente é o centro de tudo.'
    );
  }
}

// Renderiza o canvas do modelo "Arte de Pneu 45°" (pneu único a 45°, título/
// subtítulo do produto, specs viram "pills" — cada trecho separado por "·")
function renderArtPneu45() {
  const canvas  = document.getElementById('art-canvas-pneu45');
  const produto = produtoAtual();
  const semProd = estado.produto === 0;

  canvas.className = ['artp45', ...classesFormatoLivre()].filter(Boolean).join(' ');
  canvas.dataset.marca = estado.marca;

  // Apelido só é exibido no Banner (ver style.css) — vem acima do título.
  document.getElementById('artp45-apelido').textContent = semProd ? '' : (produto.apelido || produto.nome || '');
  document.getElementById('artp45-titulo').textContent = (estado.titulo || 'TÍTULO DA ARTE').toUpperCase();
  document.getElementById('artp45-sub').textContent    = estado.sub || '';
  const fotoTire = semProd ? '' : (foto45ArteLivre(produto) || '');
  document.getElementById('artp45-tire').src   = fotoTire;
  // artp45-tire-2 só aparece no Banner (ver style.css) — mesma foto do pneu
  // duplicada lado a lado, igual ao mockup de referência.
  document.getElementById('artp45-tire-2').src = fotoTire;

  // No Banner, as pills de specs (que empilham verticalmente) não cabem num
  // formato tão baixo — no lugar delas mostra uma CTA editável (reaproveita
  // estado.cta, o mesmo campo usado no modelo Padrão e no "3 Pneus" banner).
  const pillsWrap = document.getElementById('artp45-pills');
  pillsWrap.innerHTML = '';
  if (estado.formato === 'banner') {
    const cta = document.createElement('span');
    cta.className = 'artp45-cta';
    cta.textContent = (estado.cta || 'SAIBA MAIS').toUpperCase();
    pillsWrap.appendChild(cta);
  } else {
    const specsTexto = semProd ? '' : (produto.specs || '');
    specsTexto.split('·').map(s => s.trim()).filter(Boolean).forEach(txt => {
      const pill = document.createElement('span');
      pill.className = 'artp45-pill';
      pill.textContent = txt;
      pillsWrap.appendChild(pill);
    });
  }
}

// Renderiza o canvas do modelo "Pneu + Carro de Frente" (carro gerado por IA
// visto de frente, pneu de frente sobreposto na parte inferior)
function renderArtCarroFrente() {
  const canvas  = document.getElementById('art-canvas-carrofrente');
  const produto = produtoAtual();
  const semProd = estado.produto === 0;

  canvas.className = ['artcf', ...classesFormatoLivre()].filter(Boolean).join(' ');
  canvas.dataset.marca = estado.marca;

  document.getElementById('artcf-titulo').textContent = (estado.titulo || 'TÍTULO DA ARTE').toUpperCase();
  document.getElementById('artcf-tire').src           = semProd ? '' : (produto.fotoFrente || '');
}

// Renderiza o canvas do modelo "Pneu + Carro de Lado" (carro gerado por IA
// visto de lado ao fundo, pneu de perfil em destaque, bem grande)
function renderArtCarroLado() {
  const canvas  = document.getElementById('art-canvas-carrolado');
  const produto = produtoAtual();
  const semProd = estado.produto === 0;

  canvas.className = ['artcl', ...classesFormatoLivre()].filter(Boolean).join(' ');
  canvas.dataset.marca = estado.marca;

  document.getElementById('artcl-titulo').textContent = (estado.titulo || 'TÍTULO DA ARTE').toUpperCase();
  document.getElementById('artcl-tire').src           = semProd ? '' : (produto.fotoPerfil || '');
  document.getElementById('artcl-cta').textContent    = (estado.cta || 'SAIBA MAIS').toUpperCase();
}

// Renderiza o canvas do modelo "Arte de Pneu de Frente" (pneu centralizado,
// fundo fixo com cores/fonte/logo da marca — sem geração por IA)
function renderArtPneuFrente() {
  const canvas  = document.getElementById('art-canvas-pneufrente');
  const produto = produtoAtual();
  const semProd = estado.produto === 0;

  canvas.className = ['artpf', ...classesFormatoLivre()].filter(Boolean).join(' ');
  canvas.dataset.marca = estado.marca;

  document.getElementById('artpf-titulo').textContent = (estado.titulo || 'TÍTULO DA ARTE').toUpperCase();
  document.getElementById('artpf-tire').src           = semProd ? '' : (produto.fotoFrente || '');
}

// ── Modelos "Tabela de Medidas" / "Tabela Dupla" ─────────────────────────────
// Frase padrão do rodapé quando o usuário não digitou nada (mesmo texto do
// mockup "tabela" de referência do marketing, removido do repo — ver
// histórico do git)
const CTA_TABELA_PADRAO = 'Entre em contato com o seu vendedor e aproveite!';

// Reconstrói a lista de linhas (medida + valor) no editor da sidebar. Só
// deve ser chamada ao adicionar/remover uma linha ou trocar de modelo — a
// digitação em si (evento "input") atualiza só o estado + o canvas
// (renderTudo), sem recriar os <input>, senão o cursor/foco se perderia a
// cada tecla.
function renderLinhasEditor() {
  const wrap = document.getElementById('linhas-tabela-editor');
  wrap.innerHTML = '';

  estado.linhasTabela.forEach((linha, idx) => {
    const row = document.createElement('div');
    row.className = 'linha-tabela-row';

    const inpMedida = document.createElement('input');
    inpMedida.type = 'text';
    inpMedida.className = 'ctrl-input linha-medida';
    inpMedida.placeholder = 'Ex: 195 55 ZR15 86W XL AK01 APEX King';
    inpMedida.maxLength = LIMITES.linhaMedida;
    inpMedida.value = linha.medida;
    inpMedida.dataset.idx = String(idx);

    const inpValor = document.createElement('input');
    inpValor.type = 'text';
    inpValor.className = 'ctrl-input linha-valor';
    inpValor.placeholder = 'R$ 529,90';
    inpValor.maxLength = LIMITES.linhaValor;
    inpValor.value = linha.valor;
    inpValor.dataset.idx = String(idx);

    const btnRemove = document.createElement('button');
    btnRemove.type = 'button';
    btnRemove.className = 'btn-linha-remove';
    btnRemove.textContent = '×';
    btnRemove.dataset.idx = String(idx);
    btnRemove.setAttribute('aria-label', 'Remover linha');

    row.append(inpMedida, inpValor, btnRemove);
    wrap.appendChild(row);
  });

  const max = MODELOS_MEDIDA[estado.modeloMedida].maxLinhas || 15;
  const cnt = document.getElementById('cnt-linhas-tabela');
  cnt.textContent = `${estado.linhasTabela.length} / ${max}`;
  cnt.classList.toggle('at-limit', estado.linhasTabela.length >= max);

  document.getElementById('btn-add-linha').disabled = estado.linhasTabela.length >= max;
}

// Cria a linha (medida + valor) exibida na arte — via createElement/
// textContent (não innerHTML) porque medida/valor vêm de texto livre do
// usuário.
function criarLinhaTabelaEl(linha) {
  const el = document.createElement('div');
  el.className = 'artt-linha';

  const colMedida = document.createElement('span');
  colMedida.className = 'artt-col-medida';
  colMedida.textContent = linha.medida;

  const colValor = document.createElement('span');
  colValor.className = 'artt-col-valor';
  colValor.textContent = linha.valor;

  el.append(colMedida, colValor);
  return el;
}

function preencherTabelaBody(bodyEl, linhas) {
  bodyEl.innerHTML = '';
  linhas.forEach(linha => bodyEl.appendChild(criarLinhaTabelaEl(linha)));
}

// A tabela "se ajusta ao tanto de medidas": cada linha de dados já reparte a
// altura disponível entre si via flex (flex:1 1 0 em .artt-linha — CSS
// puro, sem JS), então só falta escalar a FONTE proporcionalmente à altura
// real que cada linha acabou ganhando (senão o texto fica desproporcional —
// pequeno demais com poucas linhas, ou grande/cortado demais com muitas).
function ajustarFonteTabela(tabelaEl) {
  // Espera as fontes (Poppins/Anton) terminarem de carregar antes de medir —
  // sem isso, o Canvas 2D mede com a fonte de fallback do sistema (mais
  // estreita que o Poppins bold real), subestima a largura necessária, e o
  // texto acaba maior do que cabe de verdade quando a fonte web carrega.
  const aguardarFontes = (document.fonts && document.fonts.ready) || Promise.resolve();
  aguardarFontes.then(() => requestAnimationFrame(() => {
    const linhas = tabelaEl.querySelectorAll('.artt-tabela-body .artt-linha');
    if (!linhas.length) { tabelaEl.style.fontSize = ''; return; }

    // O preview na tela fica encolhido por um transform:scale() (Story, bem
    // mais alto que largo, encolhe MUITO mais que Feed pra caber na mesma
    // área) — getBoundingClientRect() sempre mede esse tamanho JÁ visual,
    // não o tamanho lógico real do canvas (1080×1920/1080×1080). Convertemos
    // TUDO pra unidade lógica logo na medição (não só no final) — aplicar
    // teto/piso em unidade visual e só converter no fim distorce esses
    // limites por um fator que depende do zoom do navegador do usuário, o
    // que é frágil e foi a causa de tamanhos errados em telas diferentes.
    const canvasEl = tabelaEl.closest('.artt, .arttd');
    const larguraLogica = formatoAtivoInfo().width || 0;
    const larguraVisual = canvasEl ? canvasEl.getBoundingClientRect().width : 0;
    const escalaPreview = (larguraLogica && larguraVisual) ? (larguraVisual / larguraLogica) : 1;

    const altura = linhas[0].getBoundingClientRect().height / escalaPreview;
    if (!altura) return;

    // Ponto de partida: quanto menos linhas, mais alta cada uma fica, maior
    // a fonte — poucas medidas devem ficar bem grandes e fáceis de ler. No
    // Story o canvas é bem mais alto (1920px) para a mesma largura de
    // sempre (1080px) — cada linha ganha mais altura disponível, então usa
    // um multiplicador um pouco maior, mas com teto conservador: o fator
    // real que limita a leitura é a LARGURA (1080px em ambos os formatos),
    // não a altura, então um teto alto demais só é cortado depois pelo
    // ajuste de largura abaixo — melhor already começar num teto realista.
    const ehStory = Boolean(tabelaEl.closest('.format-story'));
    const multiplicador = ehStory ? 0.34 : 0.30;
    const tetoMaximo    = ehStory ? 46 : 40;
    let fonte = Math.max(15, Math.min(tetoMaximo, altura * multiplicador));

    // Mas nunca a ponto de o texto (medida ou valor) estourar a largura da
    // própria coluna — text-overflow:ellipsis não é confiável no
    // html2canvas (a exportação só corta o texto, sem mostrar "…"), então
    // a defesa real é medir com Canvas 2D e reduzir a fonte proporcional-
    // mente ANTES de exportar, não confiar no corte automático do CSS.
    // Margem de segurança (0.85) porque a métrica do Canvas 2D nunca é
    // 100% idêntica ao layout real do navegador, e o ajuste é feito numa
    // única passada (proporcional, não iterativo).
    const ctx = document.createElement('canvas').getContext('2d');
    let fator = 1;
    linhas.forEach(linha => {
      linha.querySelectorAll('.artt-col-medida, .artt-col-valor').forEach(col => {
        const texto = col.textContent;
        const disponivel = col.getBoundingClientRect().width / escalaPreview;
        if (!texto || !disponivel) return;
        ctx.font = `700 ${fonte}px Poppins, sans-serif`;
        const necessario = ctx.measureText(texto).width;
        if (necessario > disponivel) {
          fator = Math.min(fator, (disponivel / necessario) * 0.85);
        }
      });
    });
    fonte = Math.max(15, fonte * fator);

    tabelaEl.style.fontSize = `${fonte}px`;
  }));
}

// Logo da marca no rodapé — Denali usa a versão colorida (o fundo destes
// dois modelos vira claro só para ela, ver style.css); Delinte mantém sua
// logo padrão, que já funciona bem sobre fundo escuro.
function logoMarcaTabela() {
  return estado.marca === 'denali' ? 'assets/denali/logo/logo-denali-colorida.png' : MARCAS[estado.marca].logo;
}

// Logo GP no rodapé — mesmo princípio: recortada em branco do modelo de
// referência, troca para a versão escura quando o fundo vira claro (Denali).
function logoGpTabela() {
  return estado.marca === 'denali' ? 'assets/gp/logo-gp-preta.png' : 'assets/gp/logo-gp-branca.png';
}

function renderArtTabela() {
  const canvas = document.getElementById('art-canvas-tabela');
  canvas.className = ['artt', `format-${estado.formato}`].filter(Boolean).join(' ');
  canvas.dataset.marca = estado.marca;

  const tabelaEl = document.getElementById('artt-tabela');
  preencherTabelaBody(
    document.getElementById('artt-tabela-body'),
    estado.linhasTabela.slice(0, MODELOS_MEDIDA.tabela.maxLinhas)
  );
  ajustarFonteTabela(tabelaEl);

  document.getElementById('artt-nota-desconto').textContent =
    estado.descontoPorUnidade === 'sim' ? '*Descontos por unidade' : '';
  document.getElementById('artt-nota-validade').textContent =
    estado.validadeTabela ? `*Válido até ${estado.validadeTabela}` : '';
  document.getElementById('artt-cta').textContent = estado.ctaTabela || CTA_TABELA_PADRAO;
  document.getElementById('artt-logo-marca').src  = logoMarcaTabela();
  document.getElementById('artt-logo-gp').src     = logoGpTabela();
}

function renderArtTabelaDupla() {
  const canvas = document.getElementById('art-canvas-tabeladupla');
  canvas.className = ['arttd', `format-${estado.formato}`].filter(Boolean).join(' ');
  canvas.dataset.marca = estado.marca;

  const linhas = estado.linhasTabela.slice(0, MODELOS_MEDIDA.tabeladupla.maxLinhas);
  const meio   = Math.ceil(linhas.length / 2);

  const tabela1 = document.getElementById('arttd-tabela-1');
  const tabela2 = document.getElementById('arttd-tabela-2');
  preencherTabelaBody(document.getElementById('arttd-tabela-1-body'), linhas.slice(0, meio));
  preencherTabelaBody(document.getElementById('arttd-tabela-2-body'), linhas.slice(meio));
  ajustarFonteTabela(tabela1);
  ajustarFonteTabela(tabela2);

  document.getElementById('arttd-nota-desconto').textContent =
    estado.descontoPorUnidade === 'sim' ? '*Descontos por unidade' : '';
  document.getElementById('arttd-nota-validade').textContent =
    estado.validadeTabela ? `*Válido até ${estado.validadeTabela}` : '';
  document.getElementById('arttd-cta').textContent = estado.ctaTabela || CTA_TABELA_PADRAO;
  document.getElementById('arttd-logo-marca').src  = logoMarcaTabela();
  document.getElementById('arttd-logo-gp').src     = logoGpTabela();
}

// =============================================================================
// ESCALA DO PREVIEW
// =============================================================================

function atualizarEscala() {
  const canvas  = document.getElementById(canvasAtivoId());
  const wrapper = document.getElementById('preview-wrapper');
  const stage   = wrapper.parentElement;
  const { width, height } = formatoAtivoInfo();

  canvas.style.width  = width  + 'px';
  canvas.style.height = height + 'px';

  const maxW = Math.max(stage.clientWidth - 32, 200);
  const maxH = Math.max(window.innerHeight * 0.70, 300);
  const escala = Math.min(maxW / width, maxH / height, 1);

  canvas.style.transform       = `scale(${escala})`;
  canvas.style.transformOrigin = 'top left';

  wrapper.style.width  = Math.round(width  * escala) + 'px';
  wrapper.style.height = Math.round(height * escala) + 'px';
}

// =============================================================================
// EXPORTAÇÃO
// =============================================================================

// Fator de super-amostragem do html2canvas (ver capturarCanvas) — também usado
// por processarImgExport/imagemParaPngComFit para pré-renderizar logo/fotos
// já na resolução final. Sem isso, a pré-renderização usa o tamanho CSS do
// container e o html2canvas amplia esse bitmap depois (na hora de aplicar o
// scale), borrando qualquer imagem cujo container seja pequeno na tela —
// mais perceptível quanto menor o container (ex.: logo/pneu do Banner Médio
// mobile, com containers bem menores que os do Banner desktop).
const EXPORT_SCALE = 2;

// Sufixo do nome do arquivo exportado, conforme tipo de arte / modelo ativo
function sufixoArquivo() {
  if (estado.tipoArte === 'medida') {
    return estado.modeloMedida !== 'unica' ? `-${estado.modeloMedida}` : '-medida';
  }
  return estado.modelo !== 'padrao' ? `-${estado.modelo}` : '';
}

async function exportarPNG() {
  const btn = document.getElementById('btn-png');
  definirEstadoBtn(btn, true, 'PNG...');
  try {
    if (estado.formato === 'banner') {
      await exportarBannerDuplo('png');
    } else {
      const c = await capturarCanvas();
      baixarPNG(c, `${estado.marca}-${estado.formato}${sufixoArquivo()}-arte.png`);
    }
  } catch (e) {
    console.error('[Delinte] Erro PNG:', e);
    mostrarErro('Não foi possível exportar o PNG. Verifique o console.');
  } finally {
    definirEstadoBtn(btn, false, 'PNG');
  }
}

async function exportarPDF() {
  const btn = document.getElementById('btn-pdf');
  definirEstadoBtn(btn, true, 'PDF...');
  try {
    if (estado.formato === 'banner') {
      await exportarBannerDuplo('pdf');
    } else {
      const { width, height } = formatoAtivoInfo();
      const c = await capturarCanvas();
      baixarPDF(c, width, height, `${estado.marca}-${estado.formato}${sufixoArquivo()}-arte.pdf`);
    }
  } catch (e) {
    console.error('[Delinte] Erro PDF:', e);
    mostrarErro('Não foi possível exportar o PDF. Verifique o console.');
  } finally {
    definirEstadoBtn(btn, false, 'PDF');
  }
}

function baixarPNG(canvas, nomeArquivo) {
  const link = document.createElement('a');
  link.download = nomeArquivo;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function baixarPDF(canvas, width, height, nomeArquivo) {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({
    orientation: width >= height ? 'landscape' : 'portrait',
    unit: 'px',
    format: [width, height],
    hotfixes: ['px_scaling']
  });
  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, width, height);
  pdf.save(nomeArquivo);
}

// Banner gera desktop + mobile juntos, num único clique — 2 arquivos (o
// mobile reaproveita o mesmo fundo de IA, só re-enquadrado via CSS/
// object-fit: cover; nenhuma nova chamada à API). Ver BANNER_TAMANHOS_MOBILE.
async function exportarBannerDuplo(tipo) {
  const base = `${estado.marca}-banner-${estado.bannerTamanho}${sufixoArquivo()}-arte`;
  const desktop = BANNER_TAMANHOS[estado.bannerTamanho];
  const mobile  = BANNER_TAMANHOS_MOBILE[estado.bannerTamanho];

  const versoes = [
    { device: 'desktop', ...desktop, extraClass: '' },
    { device: 'mobile',  ...mobile,  extraClass: 'banner-mobile' }
  ];

  for (const v of versoes) {
    const c = await capturarCanvas({ width: v.width, height: v.height, extraClass: v.extraClass });
    if (tipo === 'png') {
      baixarPNG(c, `${base}-${v.device}.png`);
    } else {
      baixarPDF(c, v.width, v.height, `${base}-${v.device}.pdf`);
    }
  }
}

// ── Captura via clone off-screen ─────────────────────────────────────────────
// overrides: { width, height, extraClass } — usado pela exportação dupla de
// Banner para capturar o recorte mobile do MESMO canvas/estado (ver
// exportarBannerDuplo). Sem overrides, comportamento idêntico ao anterior.
async function capturarCanvas(overrides = {}) {
  const original = document.getElementById(canvasAtivoId());
  const info = formatoAtivoInfo();
  const width  = overrides.width  ?? info.width;
  const height = overrides.height ?? info.height;

  const clone = original.cloneNode(true);
  // Remove primeiro, independente do que for pedido — o canvas ORIGINAL pode
  // já estar com "banner-mobile" (usuário deixou o toggle Desktop/Mobile da
  // sidebar em "Mobile" antes de exportar) e cloneNode copia essa classe
  // junto; sem este remove, a passada "desktop" de exportarBannerDuplo
  // herdaria o layout mobile por engano.
  clone.classList.remove('banner-mobile');
  if (overrides.extraClass) clone.classList.add(overrides.extraClass);
  // O clone vai direto para o <body>, fora de #app-root — então não herda as
  // regras de visibilidade que dependem de .app[data-tipo-arte]/[data-modelo].
  // "display" e "hidden" precisam ser forçados aqui (estilo inline sempre
  // vence). Todo canvas exceto o padrão (.art) empilha suas faixas com
  // flex-direction:column, então precisa de display:flex — display:block
  // quebraria o layout.
  const displayAtivo = (estado.tipoArte === 'medida' || estado.modelo !== 'padrao') ? 'flex' : 'block';
  clone.hidden = false;
  clone.style.cssText = [
    `display: ${displayAtivo}`,
    'position: fixed', 'top: 0',
    `left: -${width + 400}px`,
    `width: ${width}px`, `height: ${height}px`,
    'transform: none', 'z-index: -9999', 'pointer-events: none'
  ].join('; ');

  document.body.appendChild(clone);
  await esperarFrames(2); // deixa o browser computar o layout do clone

  // Garante que cada <img> já decodificou antes de medir offsetWidth/Height
  // (processarImgExport usa esses valores pra calcular o object-fit) — um
  // <img> clonado com width:auto (só height explícito, ex.: a logo) reporta
  // offsetWidth 0 até o navegador conhecer as dimensões intrínsecas da
  // imagem. Normalmente esperarFrames(2) já é tempo suficiente (cache HTTP
  // resolve rápido), mas em exportarBannerDuplo (2 capturas em sequência) a
  // segunda passada às vezes lê 0 antes do decode terminar — offsetWidth 0
  // caía no fallback de emergência (|| 400), calculando o "contain" numa
  // caixa errada e esticando a imagem (mais visível em imagens bem
  // "anisotrópicas", como uma logo bem mais larga que alta). decode() é a
  // forma correta/garantida de esperar isso, ao contrário de contar frames.
  await Promise.all(
    Array.from(clone.querySelectorAll('img')).map(img =>
      img.decode ? img.decode().catch(() => {}) : Promise.resolve()
    )
  );

  await Promise.all(
    Array.from(clone.querySelectorAll('img')).map(img => processarImgExport(img))
  );

  await esperarFrames(3);

  let resultado;
  try {
    resultado = await html2canvas(clone, {
      scale:           EXPORT_SCALE,
      useCORS:         false,
      allowTaint:      false,
      width,
      height,
      windowWidth:     width,
      windowHeight:    height,
      backgroundColor: '#000000',
      logging:         false
    });
  } finally {
    document.body.removeChild(clone);
  }

  return resultado;
}

// Converte uma imagem no clone para data URL PNG (sem tainting, falhas de
// SVG, ou distorção de object-fit — ver comentário de imagemParaPngComFit)
async function processarImgExport(img) {
  const src = img.getAttribute('src');
  if (!src) return;

  const containerW = img.offsetWidth  || 400;
  const containerH = img.offsetHeight || 100;
  const objFit  = window.getComputedStyle(img).objectFit || 'fill';
  const objPos  = window.getComputedStyle(img).objectPosition || 'center center';
  let dataUrl   = src;
  let ehSvg     = src.includes('.svg');
  let svgText   = null;

  // Normaliza para absoluta (ex.: logos locais em /assets/denali/...) — o
  // servidor só aceita URLs http(s) absolutas em /api/proxy-img.
  const srcAbsoluto = (src.startsWith('data:') || src.startsWith('blob:'))
    ? src
    : new URL(src, location.href).href;

  // Busca imagens externas via proxy (evita taint de CORS). Imagens que já
  // chegam como data:/blob: (ex.: fundo gerado por IA, que vem em base64 da
  // nossa própria API) não precisam disso — pulam direto pro passo de baixo.
  if (!srcAbsoluto.startsWith('data:') && !srcAbsoluto.startsWith('blob:')) {
    try {
      const res = await fetch(`/api/proxy-img?url=${encodeURIComponent(srcAbsoluto)}`);
      if (!res.ok) return;
      const ct   = res.headers.get('content-type') || '';
      const blob = await res.blob();
      ehSvg = ehSvg || ct.includes('svg');
      if (ehSvg) {
        svgText = await blob.text();
        dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgText);
      } else {
        dataUrl = await blobParaDataURL(blob);
      }
    } catch (e) {
      console.warn('[export] imagem ignorada:', src);
      return;
    }
  }

  // html2canvas não respeita object-fit em elementos <img> — sempre estica a
  // imagem crua pra caber na caixa, ignorando cover/contain. Isso é invisível
  // na pré-visualização (o navegador aplica object-fit normalmente), mas
  // aparece na exportação como um fundo "achatado"/esticado, sempre que a
  // proporção da caixa é diferente da proporção da imagem original — é
  // exatamente o caso do fundo gerado por IA (art-bg-img/artm-bg-img, ambos
  // object-fit:cover). Pré-renderiza num canvas offscreen já com o
  // corte/enquadramento certo antes do html2canvas varrer o clone.
  if (ehSvg || objFit === 'cover' || objFit === 'contain') {
    const fit = objFit === 'cover' ? 'cover' : 'contain';
    dataUrl = await imagemParaPngComFit(
      dataUrl, containerW * EXPORT_SCALE, containerH * EXPORT_SCALE, objPos, fit, svgText
    );
  }

  // Aplica e aguarda o carregamento completo antes do html2canvas varrer o clone
  await new Promise(resolve => {
    if (img.src === dataUrl) { resolve(); return; }
    img.onload  = resolve;
    img.onerror = resolve;
    img.src = dataUrl;
    if (img.complete && img.naturalWidth) resolve();
  });
}

// Pré-renderiza qualquer imagem (PNG/JPEG/SVG, data: URL ou blob) num canvas
// offscreen já recortada/enquadrada como object-fit:cover ou contain faria —
// entrega um bitmap plano, sem nenhuma ambiguidade de enquadramento restando
// para o html2canvas resolver (ou errar) na hora da exportação.
function imagemParaPngComFit(imgSrc, containerW, containerH, objectPosition, fit, svgText) {
  return new Promise((resolve, reject) => {
    const tmp = new Image();
    tmp.onload = () => {
      // Para SVG, lê o tamanho intrínseco direto do markup (width/height ou
      // viewBox) em vez de confiar em naturalWidth/naturalHeight: um <img>
      // recém-criado apontando pra um SVG sem width/height (só viewBox) pode
      // não reportar essas propriedades de forma confiável em todos os
      // navegadores. Se isso falhasse silenciosamente, caía no fallback
      // containerW/containerH abaixo — e como a caixa raramente tem a mesma
      // proporção do SVG original, isso forçava scale=1 e esticava a imagem
      // pra preencher a caixa inteira (ex.: letras da logo "achatadas").
      const svgSize = svgText ? extrairTamanhoSvg(svgText) : null;
      const natW = svgSize?.w || tmp.naturalWidth  || containerW;
      const natH = svgSize?.h || tmp.naturalHeight || containerH;

      // cover: preenche a caixa inteira, cortando o excesso (Math.max).
      // contain: cabe inteira dentro da caixa, sem cortar (Math.min).
      const scale  = fit === 'cover'
        ? Math.max(containerW / natW, containerH / natH)
        : Math.min(containerW / natW, containerH / natH);
      const drawW  = natW * scale;
      const drawH  = natH * scale;

      // Interpreta object-position (ex: 'left center', '50% 50%')
      const parts  = (objectPosition || 'center center').split(' ');
      const px     = parts[0] || 'center';
      const py     = parts[1] || 'center';
      const offsetX = px === 'left'   ? 0
                    : px === 'right'  ? containerW - drawW
                    : (containerW - drawW) / 2;
      const offsetY = py === 'top'    ? 0
                    : py === 'bottom' ? containerH - drawH
                    : (containerH - drawH) / 2;

      // Desenhar fora de [0,containerW]x[0,containerH] é simplesmente
      // cortado pelo próprio canvas (dimensões fixas abaixo) — não precisa
      // de clip manual, mesmo quando "cover" faz a imagem exceder a caixa.
      const c = document.createElement('canvas');
      c.width  = containerW;
      c.height = containerH;
      c.getContext('2d').drawImage(tmp, offsetX, offsetY, drawW, drawH);
      resolve(c.toDataURL('image/png'));
    };
    tmp.onerror = reject;
    tmp.src = imgSrc;
  });
}

// Lê o tamanho intrínseco de um SVG a partir do próprio markup — tenta
// width/height do elemento raiz primeiro, depois viewBox. Retorna null se
// não achar nenhum dos dois (aí quem chamou cai no fallback de naturalWidth/
// naturalHeight ou containerW/H).
function extrairTamanhoSvg(svgText) {
  const svgTag = svgText.match(/<svg\b[^>]*>/);
  if (!svgTag) return null;
  const attrs = svgTag[0];

  const w = attrs.match(/\bwidth="([\d.]+)"/);
  const h = attrs.match(/\bheight="([\d.]+)"/);
  if (w && h) return { w: parseFloat(w[1]), h: parseFloat(h[1]) };

  const vb = attrs.match(/\bviewBox="[\d.\-]+\s+[\d.\-]+\s+([\d.]+)\s+([\d.]+)"/);
  if (vb) return { w: parseFloat(vb[1]), h: parseFloat(vb[2]) };

  return null;
}

// Blob → data URL
function blobParaDataURL(blob) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

function esperarFrames(n) {
  return new Promise(resolve => {
    let count = 0;
    function tick() { if (++count >= n) resolve(); else requestAnimationFrame(tick); }
    requestAnimationFrame(tick);
  });
}

function definirEstadoBtn(btn, carregando, texto) {
  btn.disabled = carregando;
  const span = btn.querySelector('.btn-text');
  if (span) span.textContent = texto;
}
