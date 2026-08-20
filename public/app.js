'use strict';

// =============================================================================
// CADASTRO DE PRODUTOS — EDITE AQUI
//
// Como adicionar um produto:
//   1. Copie um bloco { nome, specs, foto } e cole antes do ] final
//   2. Salve — a mudança reflete automaticamente na interface
//
// Como atualizar a foto:
//   Substitua gerarPlaceholder("XX") pela URL do PNG oficial recortado:
//   foto: "https://url-da-foto-oficial.png"
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
//   foto45:    foto do pneu em 3/4 (45°), fundo transparente.
//   fotoPerfil: foto do pneu de perfil (lateral), fundo transparente.
//   paragrafo: texto descritivo específico do produto, exibido acima do logo.
//   sufixoMedida: texto opcional mostrado só dentro da caixa MEDIDAS, depois
//              do apelido (ex. "RUN FLAT"). Deixe "" quando não se aplica.
// PENDENTE: foto45/fotoPerfil/paragrafo/sufixoMedida ainda são placeholder —
// aguardando os caminhos/textos reais produto a produto.
// =============================================================================

const PRODUTOS_DELINTE = [
  {
    nome:   "Sem produto",
    specs:  "",  foto:   "",
    titulo: "",  sub:    "",  cta: "",
    linha:  "institucional",
    apelido: "", foto45: "", fotoPerfil: "", paragrafo: "", sufixoMedida: ""
  },
  // ── Linha Passeio ────────────────────────────────────────────────────────
  // titulo/sub/cta/specs abaixo são RASCUNHO (não vieram da lista oficial de
  // fotos enviada pelo marketing) — revisar antes de usar em campanha real.
  {
    nome:   "D1D1 Ultra High Mileage",
    specs:  "Linha passeio · ultra alta quilometragem · durabilidade",
    foto:   "https://delinte.com.br/wp-content/webp-express/webp-images/uploads/2024/01/D1D1-Roda.png.webp",
    titulo: "RODAGEM QUE DURA MAIS",
    sub:    "Tecnologia Ultra High Mileage para milhares de quilômetros extras de vida útil.",
    cta:    "CONHEÇA O D1D1",
    linha:  "passeio",
    apelido: "D1D1",
    foto45:     "https://delinte.com.br/wp-content/uploads/2023/08/D1D1-195-55-15-45%C2%B0.png",
    fotoPerfil: "https://delinte.com.br/wp-content/uploads/2023/08/D1D1-195-55-15-Frente.png",
    paragrafo: "Tecnologia Ultra High Mileage para milhares de quilômetros extras de vida útil.",
    sufixoMedida: ""
  },
  {
    nome:   "DH2 Eco",
    specs:  "Linha passeio · baixa resistência ao rolamento · economia",
    foto:   "https://delinte.com.br/wp-content/webp-express/webp-images/uploads/2024/01/DH2-Roda.png.webp",
    titulo: "ECONOMIA EM CADA QUILÔMETRO",
    sub:    "Baixa resistência ao rolamento para mais economia de combustível no dia a dia.",
    cta:    "CONHEÇA O DH2",
    linha:  "passeio",
    apelido: "DH2",
    foto45:     "https://delinte.com.br/wp-content/uploads/2023/08/DH-2-45%C2%B0.png",
    fotoPerfil: "https://delinte.com.br/wp-content/uploads/2023/08/DH-2-Frente.png",
    paragrafo: "Baixa resistência ao rolamento para mais economia de combustível no dia a dia.",
    sufixoMedida: ""
  },
  {
    nome:   "DH7 SUV",
    specs:  "Linha passeio · SUV · conforto e estabilidade",
    foto:   "https://delinte.com.br/wp-content/uploads/2024/07/DH7-SUV.webp",
    titulo: "CONFORTO PARA SEU SUV",
    sub:    "Estrutura reforçada e rodagem silenciosa pensadas para o peso e o porte do seu SUV.",
    cta:    "CONHEÇA O DH7",
    linha:  "passeio",
    apelido: "DH7",
    foto45:     "https://delinte.com.br/wp-content/uploads/2023/08/DH-7-45%C2%B0.png",
    fotoPerfil: "https://delinte.com.br/wp-content/uploads/2023/08/DH-7-Frente.png",
    paragrafo: "Estrutura reforçada e rodagem silenciosa pensadas para o peso e o porte do seu SUV.",
    sufixoMedida: ""
  },
  {
    nome:   "DS2 Mute Cotton",
    specs:  "Linha passeio · tecnologia Mute Cotton · baixo ruído",
    foto:   "https://delinte.com.br/wp-content/webp-express/webp-images/uploads/2024/01/DS2-Roda.png.webp",
    titulo: "SILÊNCIO EM MOVIMENTO",
    sub:    "Tecnologia Mute Cotton reduz o ruído de rodagem para uma experiência mais silenciosa.",
    cta:    "CONHEÇA O DS2 MUTE",
    linha:  "passeio",
    apelido: "DS2 Mute",
    foto45:     "https://delinte.com.br/wp-content/uploads/2024/11/ds2-png.png",
    fotoPerfil: "https://delinte.com.br/wp-content/uploads/2023/08/DS2-205-55-17-Frente-2.png",
    paragrafo: "Tecnologia Mute Cotton reduz o ruído de rodagem para uma experiência mais silenciosa.",
    sufixoMedida: ""
  },
  {
    nome:   "DS2 SUV",
    specs:  "Linha passeio · SUV · aderência e estabilidade",
    foto:   "https://delinte.com.br/wp-content/uploads/2024/03/DS2-SUV-Roda-2048x2048.webp",
    titulo: "PERFORMANCE PARA SUV",
    sub:    "Aderência e estabilidade sob medida para SUVs no uso urbano e em viagens.",
    cta:    "CONHEÇA O DS2 SUV",
    linha:  "passeio",
    apelido: "DS2 SUV",
    foto45:     "https://delinte.com.br/wp-content/uploads/2024/03/DS2-SUV-45%C2%B0.png",
    fotoPerfil: "https://delinte.com.br/wp-content/uploads/2024/03/DS2-SUV-Frente.png",
    paragrafo: "Aderência e estabilidade sob medida para SUVs no uso urbano e em viagens.",
    sufixoMedida: ""
  },
  // ── Linha Esportiva ──────────────────────────────────────────────────────
  {
    nome:   "DS2 Qirin Scale Technology",
    specs:  "Qirin Scale Technology · sulcos assimétricos · UHP",
    foto:   "https://delinte.com.br/wp-content/uploads/2024/01/DS2-Roda.png",
    titulo: "TECNOLOGIA QIRIN SCALE",
    sub:    "Sulcos assimétricos de alta precisão para máxima aderência em pistas molhadas.",
    cta:    "CONHEÇA O DS2",
    linha:  "esportiva",
    apelido: "DS2 Qirin",
    foto45:     "https://delinte.com.br/wp-content/uploads/2023/08/DS2-205-55-17-45%C2%B0-3.png",
    fotoPerfil: "https://delinte.com.br/wp-content/uploads/2023/08/DS2-205-55-17-Frente-2.png",
    paragrafo: "Sulcos assimétricos de alta precisão para máxima aderência em pistas molhadas.",
    sufixoMedida: ""
  },
  {
    nome:   "DS3 SUV",
    specs:  "Ultra-high performance · padrão direcional",
    foto:   "https://delinte.com.br/wp-content/uploads/2026/02/Prancheta-1.png",
    titulo: "DESEMPENHO SEM LIMITES",
    sub:    "Padrão direcional desenvolvido para quem exige o máximo da pista.",
    cta:    "CONHEÇA O DS3",
    linha:  "esportiva",
    apelido: "DS3",
    foto45:     "https://delinte.com.br/wp-content/uploads/2026/02/45.png",
    fotoPerfil: "https://delinte.com.br/wp-content/uploads/2026/02/%7Fbanda.png",
    paragrafo: "Padrão direcional desenvolvido para quem exige o máximo da pista.",
    sufixoMedida: ""
  },
  {
    nome:   "DS7 Sport",
    specs:  "Tração AA · composto avançado · alta performance",
    foto:   "https://delinte.com.br/wp-content/uploads/2024/01/DS7-Roda.png",
    titulo: "TRAÇÃO MÁXIMA",
    sub:    "Composto avançado com classificação AA entrega controle em qualquer condição.",
    cta:    "CONHEÇA O DS7",
    linha:  "esportiva",
    apelido: "DS7",
    foto45:     "https://delinte.com.br/wp-content/uploads/2023/08/DS7-225-45-18-45%C2%B0.png",
    fotoPerfil: "https://delinte.com.br/wp-content/uploads/2023/08/DS7-225-45-18-Frente.png",
    paragrafo: "Composto avançado com classificação AA entrega controle em qualquer condição.",
    sufixoMedida: ""
  },
  {
    nome:   "DS8 Desert Storm",
    specs:  "Ultra-high performance · padrão agressivo · 18\" a 26\"",
    foto:   "https://delinte.com.br/wp-content/uploads/2024/01/DS8-Roda.png",
    titulo: "DESERT STORM",
    sub:    "Perfil agressivo e altíssima performance para rodas de 18\" a 26\".",
    cta:    "CONHEÇA O DS8",
    linha:  "esportiva",
    apelido: "DS",
    foto45:     "https://delinte.com.br/wp-content/uploads/2023/08/DS8-245-45-19-45%C2%B0.png",
    fotoPerfil: "https://delinte.com.br/wp-content/uploads/2023/08/DS8-245-45-19-Frente.png",
    paragrafo: "Perfil agressivo e altíssima performance para rodas de 18\" a 26\".",
    sufixoMedida: "DESERT STORM"
  },
  // ── Linha Off-Road ───────────────────────────────────────────────────────
  {
    nome:   "DX-9 Bandit M/T",
    specs:  "Mud terrain · off-road extremo · lama e terra",
    foto:   "https://delinte.com.br/wp-content/uploads/2024/01/DX-9-Roda.png",
    titulo: "DOMINE A LAMA",
    sub:    "Tread mud terrain para trilhas extremas onde o asfalto não chega.",
    cta:    "CONHEÇA O DX-9",
    linha:  "offroad",
    apelido: "DX-9",
    foto45:     "https://delinte.com.br/wp-content/uploads/2023/08/DX-9-45%C2%B0.png",
    fotoPerfil: "https://delinte.com.br/wp-content/uploads/2023/08/DX-9-Frente.png",
    paragrafo: "Tread mud terrain para trilhas extremas onde o asfalto não chega.",
    sufixoMedida: "BANDIT M/T"
  },
  {
    nome:   "DX-10 Bandit A/T",
    specs:  "All-terrain · on e off-road · versatilidade total",
    foto:   "https://delinte.com.br/wp-content/uploads/2024/01/DX-10-Roda.png",
    titulo: "ON E OFF SEM ESCOLHER",
    sub:    "All-terrain que transita entre asfalto e trilha com igual competência.",
    cta:    "CONHEÇA O DX-10",
    linha:  "offroad",
    apelido: "DX-10",
    foto45:     "https://delinte.com.br/wp-content/uploads/2023/08/DX-10-45%C2%B0-e1695038873657.png",
    fotoPerfil: "https://delinte.com.br/wp-content/uploads/2023/08/DX-10-Frente.png",
    paragrafo: "All-terrain que transita entre asfalto e trilha com igual competência.",
    sufixoMedida: "BANDIT A/T"
  },
  {
    nome:   "DX-12 Bandit R/T",
    specs:  "Rugged terrain · tração reforçada · trilhas e asfalto",
    foto:   "https://delinte.com.br/wp-content/uploads/2024/01/DX-12-Roda.png",
    titulo: "FORÇA RUGGED TERRAIN",
    sub:    "Tração reforçada para enfrentar trilhas pesadas sem abrir mão do asfalto.",
    cta:    "CONHEÇA O DX-12",
    linha:  "offroad",
    apelido: "DX-12",
    foto45:     "https://delinte.com.br/wp-content/uploads/2023/08/DX-12-45%C2%B0.png",
    fotoPerfil: "https://delinte.com.br/wp-content/uploads/2023/08/DX-12-Frente.png",
    paragrafo: "Tração reforçada para enfrentar trilhas pesadas sem abrir mão do asfalto.",
    sufixoMedida: "BANDIT R/T"
  },
  // ── Linha Run Flat ───────────────────────────────────────────────────────
  {
    nome:   "DH3 Run Flat",
    specs:  "Run flat · até 80 km após perda de pressão · segurança",
    foto:   "https://delinte.com.br/wp-content/uploads/2024/01/DH-3-Roda.png",
    titulo: "SEGURANÇA SEM PARAR",
    sub:    "Continue rodando até 80 km mesmo com pneu furado. Sem sustos na estrada.",
    cta:    "CONHEÇA O DH3",
    linha:  "runflat",
    apelido: "DH3",
    foto45:     "https://delinte.com.br/wp-content/uploads/2023/08/DH-3-45%C2%B0.png",
    fotoPerfil: "https://delinte.com.br/wp-content/uploads/2023/08/DH-3-Frente.png",
    paragrafo: "O pneu ideal para sua segurança! A tecnologia Run Flat oferece maior resistência em situações extremas, nas quais o pneu perde toda a pressão do ar e permite que o motorista chegue a um local seguro para realizar a troca.",
    sufixoMedida: "RUN FLAT"
  },
  {
    nome:   "DH6 Run Flat",
    specs:  "Run flat · alta performance · continuidade garantida",
    foto:   "https://delinte.com.br/wp-content/uploads/2024/01/DH-6-Roda.png",
    titulo: "ALTA PERFORMANCE RUN FLAT",
    sub:    "Tecnologia run flat de alto desempenho. Continuidade garantida quando importa.",
    cta:    "CONHEÇA O DH6",
    linha:  "runflat",
    apelido: "DH6",
    foto45:     "https://delinte.com.br/wp-content/uploads/2023/08/DH-6-45%C2%B0.png",
    fotoPerfil: "https://delinte.com.br/wp-content/uploads/2023/08/DH-6-Frente.png",
    paragrafo: "O pneu ideal para sua segurança! A tecnologia Run Flat oferece maior resistência em situações extremas, nas quais o pneu perde toda a pressão do ar e permite que o motorista chegue a um local seguro para realizar a troca.",
    sufixoMedida: "RUN FLAT"
  },
  {
    nome:   "DS2 SUV Run Flat",
    specs:  "Run flat · SUV · continuidade garantida",
    foto:   "https://delinte.com.br/wp-content/uploads/2024/03/DS2-SUV-RF-Roda-2048x2048.webp",
    titulo: "SUV SEM PARAR",
    sub:    "A segurança Run Flat encontra o desempenho pensado para SUVs.",
    cta:    "CONHEÇA O DS2 SUV RFT",
    linha:  "runflat",
    apelido: "DS2 SUV",
    foto45:     "https://delinte.com.br/wp-content/uploads/2024/03/DS2-SUV-RFT-45%C2%B0.png",
    fotoPerfil: "https://delinte.com.br/wp-content/uploads/2024/03/DS2-SUV-RFT-Frente.png",
    paragrafo: "A segurança Run Flat encontra o desempenho pensado para SUVs.",
    sufixoMedida: "RUN FLAT"
  },
  // ── Linha Semi Slick ─────────────────────────────────────────────────────
  {
    nome:   "Apex King",
    specs:  "Semi slick · uso em pista · aderência extrema",
    foto:   "https://delinte.com.br/wp-content/webp-express/webp-images/uploads/2023/09/Apex-King-Marcacoes-1.png.webp",
    titulo: "NO LIMITE DA PISTA",
    sub:    "Composto semi-slick para máxima aderência em track days e uso esportivo extremo.",
    cta:    "CONHEÇA O APEX KING",
    linha:  "semislick",
    apelido: "Apex King",
    foto45:     "https://delinte.com.br/wp-content/uploads/2023/08/Apex-King-45%C2%B0-2.png",
    fotoPerfil: "https://delinte.com.br/wp-content/uploads/2023/08/Apex-King-Frente-1.png",
    paragrafo: "Composto semi-slick para máxima aderência em track days e uso esportivo extremo.",
    sufixoMedida: ""
  },
  // ── Linha de Carga ───────────────────────────────────────────────────────
  {
    nome:   "DV2 Cargo Tire",
    specs:  "Linha de carga · vans e utilitários · estrutura reforçada",
    foto:   "https://delinte.com.br/wp-content/uploads/2024/01/DV2-Roda.png",
    titulo: "FEITO PARA TRABALHAR",
    sub:    "Estrutura reforçada para vans e utilitários que não podem parar.",
    cta:    "CONHEÇA O DV2",
    linha:  "carga",
    apelido: "DV2",
    foto45:     "https://delinte.com.br/wp-content/uploads/2023/08/DV2-185-14-45%C2%B0.png",
    fotoPerfil: "https://delinte.com.br/wp-content/uploads/2023/08/DV2-185-14-Frente.png",
    paragrafo: "Estrutura reforçada para vans e utilitários que não podem parar.",
    sufixoMedida: ""
  },
  {
    nome:   "DV2 Plus",
    specs:  "Linha de carga · reforçada · vans e utilitários",
    foto:   "https://delinte.com.br/wp-content/webp-express/webp-images/uploads/elementor/thumbs/Prancheta-1-r7fu9tf6oxz1cue1mlpsag5spn8ivbgbl5vcyzspqc.png.webp",
    titulo: "MAIS RESISTÊNCIA, MAIS CARGA",
    sub:    "Evolução da linha de carga com reforço adicional para rotas pesadas.",
    cta:    "CONHEÇA O DV2 +",
    linha:  "carga",
    apelido: "DV2 Plus",
    foto45:     "https://delinte.com.br/wp-content/uploads/2025/05/Prancheta-1-3.png",
    fotoPerfil: "https://delinte.com.br/wp-content/uploads/2025/05/Prancheta-2-2.png",
    paragrafo: "Evolução da linha de carga com reforço adicional para rotas pesadas.",
    sufixoMedida: ""
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// CATÁLOGO DENALI
//
// Fotos oficiais fornecidas pela equipe (denalipneus.com.br). specs/título/
// subtítulo/CTA abaixo são RASCUNHO, escritos a partir dos slogans oficiais
// do Manual_Denali.pdf — revisar com o time de marketing Denali antes de usar
// em campanha real.
//
// SteelWolf (runflat) e Buffalo (carga) ainda não têm modelo/foto definidos —
// entram como placeholder (usa gerarPlaceholder()) até a equipe enviar specs.
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
    apelido: "", foto45: "", fotoPerfil: "", paragrafo: "", sufixoMedida: ""
  },
  // ── Wolverine — linha off-road ───────────────────────────────────────────
  {
    nome:   "Wolverine A/T 06",
    specs:  "All-terrain · tração robusta em qualquer piso",
    foto:   "https://denalipneus.com.br/wp-content/uploads/2026/05/Wolverine-AT-06-45.png",
    titulo: "DOMINE QUALQUER TERRENO",
    sub:    "Onde a estrada acaba, a Denali começa — tração e controle em qualquer trilha.",
    cta:    "CONHEÇA O A/T 06",
    linha:  "offroad",
    apelido: "WV-06 A/T",
    foto45:     "https://denalipneus.com.br/wp-content/uploads/elementor/thumbs/Wolverine-AT-06-45-rn29dxt6rcse94i498spm8yme7k4vokg7hpit8g4ug.png",
    fotoPerfil: "https://denalipneus.com.br/wp-content/uploads/elementor/thumbs/Wolverine-AT-06-Perfil-rn29dzov50uywcfdy9lyr8hjkzavb2rwvr0hrsdci0.png",
    paragrafo: PARAGRAFO_OFFROAD_DENALI,
    sufixoMedida: ""
  },
  {
    nome:   "Wolverine A/T 09",
    specs:  "All-terrain · banda de rodagem reforçada",
    foto:   "https://denalipneus.com.br/wp-content/uploads/2026/05/Wolverine-AT-09-45.png",
    titulo: "DOMINE QUALQUER TERRENO",
    sub:    "Onde a estrada acaba, a Denali começa — resistência para asfalto e trilha.",
    cta:    "CONHEÇA O A/T 09",
    linha:  "offroad",
    apelido: "WV-09 A/T",
    foto45:     "https://denalipneus.com.br/wp-content/uploads/elementor/thumbs/Wolverine-AT-09-45-rn29ozex29woo6gkrinweymlo74ebnewq5nwta2lqg.png",
    fotoPerfil: "https://denalipneus.com.br/wp-content/uploads/elementor/thumbs/Wolverine-AT-09-Perfil-rn29p1alfxz9bedugjh5jy5iuyv4r1mdeeyvrtzte0.png",
    paragrafo: PARAGRAFO_OFFROAD_DENALI,
    sufixoMedida: ""
  },
  {
    nome:   "Wolverine A/T 11",
    specs:  "All-terrain · alta resistência a impacto",
    foto:   "https://denalipneus.com.br/wp-content/uploads/2026/05/Wolverine-AT-11-45.png",
    titulo: "DOMINE QUALQUER TERRENO",
    sub:    "Onde a estrada acaba, a Denali começa — firmeza em qualquer condição.",
    cta:    "CONHEÇA O A/T 11",
    linha:  "offroad",
    apelido: "WV-11 A/T",
    foto45:     "https://denalipneus.com.br/wp-content/uploads/elementor/thumbs/Wolverine-AT-11-45-rn29rzicw80nrc3k8bdzvpclziblwuc1h0or03mbuw.png",
    fotoPerfil: "https://denalipneus.com.br/wp-content/uploads/elementor/thumbs/Wolverine-AT-11-Perfil-rn29s1e19w38ek0txc790ovj6a2cc8ji59zpynjjig.png",
    paragrafo: PARAGRAFO_OFFROAD_DENALI,
    sufixoMedida: ""
  },
  // ── Peregrine — linha esportiva ──────────────────────────────────────────
  {
    nome:   "Peregrine",
    specs:  "Alta performance · precisão e controle na pista",
    foto:   "https://denalipneus.com.br/wp-content/uploads/2026/05/Peregrine-1000x1000-1.png",
    titulo: "DOMINE A PISTA",
    sub:    "Controle no limite: performance e precisão para quem exige o máximo.",
    cta:    "CONHEÇA O PEREGRINE",
    linha:  "esportiva",
    apelido: "Peregrine",
    foto45:     "https://denalipneus.com.br/wp-content/uploads/elementor/thumbs/Peregrine-45o-scaled-rn0vd2ssy7jmo8cs0t8iiouaibrxnv9ty1zykilpxk.png",
    fotoPerfil: "https://denalipneus.com.br/wp-content/uploads/elementor/thumbs/Peregrine-Perfil-1-scaled-rn0vf36dkgapi7fna6iscoks8zv74k95w08citmemg.png",
    paragrafo: PARAGRAFO_ESPORTIVA_DENALI,
    sufixoMedida: ""
  },
  // ── Golden Eagle — linha passeio ─────────────────────────────────────────
  // PENDENTE: foto45/fotoPerfil de "Golden Eagle" e "Golden Eagle +" ainda
  // não foram enviadas — arte de medida some as fotos do pneu até chegarem
  // (mesmo comportamento já usado para SteelWolf/Buffalo).
  {
    nome:   "Golden Eagle S",
    specs:  "Linha passeio · conforto e dirigibilidade urbana",
    foto:   "https://denalipneus.com.br/wp-content/uploads/2026/05/Golden-Eagle-45.png",
    titulo: "MAIS CONFORTO, MAIS ESTRADA",
    sub:    "Sinta a suavidade do controle no dia a dia da cidade.",
    cta:    "CONHEÇA O GOLDEN EAGLE S",
    linha:  "passeio",
    apelido: "GE S",
    // link de perfil recebido terminava em ".pngv" — "v" removido (típico
    // resíduo de copia/cola); ajustar aqui se a URL oficial for diferente.
    foto45:     "https://denalipneus.com.br/wp-content/uploads/elementor/thumbs/Golden-Eagle-45-rmytv18pxxb7prvp21msfer5ntsb9onxhcv1oxx1u0.png",
    fotoPerfil: "https://denalipneus.com.br/wp-content/uploads/elementor/thumbs/Golden-Eagle-Perfil-rmytv7tl9rk7z1m4zmh6ev3dtivvrke1u9fg1vnamg.png",
    paragrafo: PARAGRAFO_PASSEIO_DENALI,
    sufixoMedida: ""
  },
  {
    nome:   "Golden Eagle",
    specs:  "Linha passeio · rodagem suave e silenciosa",
    foto:   "https://denalipneus.com.br/wp-content/uploads/2026/05/Golden-Eagle-45o-1000x1000-ok.png",
    titulo: "MAIS CONFORTO, MAIS ESTRADA",
    sub:    "Sinta a suavidade do controle em qualquer trajeto.",
    cta:    "CONHEÇA O GOLDEN EAGLE",
    linha:  "passeio",
    apelido: "GE",
    foto45: "", fotoPerfil: "",
    paragrafo: PARAGRAFO_PASSEIO_DENALI,
    sufixoMedida: ""
  },
  {
    nome:   "Golden Eagle +",
    specs:  "Linha passeio · desempenho aprimorado",
    foto:   "https://denalipneus.com.br/wp-content/uploads/2026/05/GOLDEN-SITE.png",
    titulo: "MAIS CONFORTO, MAIS ESTRADA",
    sub:    "Sinta a suavidade do controle com ainda mais desempenho.",
    cta:    "CONHEÇA O GOLDEN EAGLE +",
    linha:  "passeio",
    apelido: "GE+",
    foto45: "", fotoPerfil: "",
    paragrafo: PARAGRAFO_PASSEIO_DENALI,
    sufixoMedida: ""
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
    apelido: "", foto45: "", fotoPerfil: "", paragrafo: "", sufixoMedida: ""
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
    apelido: "", foto45: "", fotoPerfil: "", paragrafo: "", sufixoMedida: ""
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
    logo:  'assets/denali/logo-denali-branca.png',
    produtos: PRODUTOS_DENALI
  }
};

// ─── Formatos disponíveis ────────────────────────────────────────────────────
const FORMATOS = {
  feed:   { label: 'Feed 1:1',          width: 1080, height: 1080, desc: '1080 × 1080 px' },
  story:  { label: 'Story 9:16',        width: 1080, height: 1920, desc: '1080 × 1920 px' },
  banner: { label: 'Banner Horizontal', width: 1440, height: 600,  desc: '1440 × 600 px'  }
};

// ─── Objetivos disponíveis ───────────────────────────────────────────────────
const OBJETIVOS = {
  promocao:   { texto: 'PROMOÇÃO',   cls: 'obj-promocao'   },
  lancamento: { texto: 'LANÇAMENTO', cls: 'obj-lancamento' },
  aviso:      { texto: 'AVISO',      cls: 'obj-aviso'      }
};

// ─── Limites de caracteres ───────────────────────────────────────────────────
const LIMITES = { titulo: 40, sub: 80, cta: 25, medida: 30 };

// Marcas com suporte ao modo "Arte de Medida"
const MARCAS_COM_ARTE_MEDIDA = new Set(['delinte', 'denali']);

// ─── Estado da aplicação ─────────────────────────────────────────────────────
const estado = {
  marca:          'delinte',
  tipoArte:       'livre', // 'livre' | 'medida'
  formato:        'feed',
  objetivo:       'promocao',
  produto:        0,
  titulo:         '',
  sub:            '',
  cta:            '',
  medida:         '', // digitado livremente pelo usuário (modo "Arte de Medida")
  customPrompt:   '',    // texto digitado pelo usuário; '' = usar sugestão automática
  promptEditado:  false, // true se o usuário editou manualmente o textarea de prompt
  fundoGerado:    false,
  gerando:        false
};

// Id do canvas atualmente visível, conforme o tipo de arte ativo
function canvasAtivoId() {
  return estado.tipoArte === 'medida' ? 'art-canvas-medida' : 'art-canvas';
}

// =============================================================================
// INICIALIZAÇÃO
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  popularProdutos();
  vincularEventos();
  atualizarDisponibilidadeTipoArte();
  renderArt();
  renderArtMedida();
  atualizarEscala();
  window.addEventListener('resize', atualizarEscala);
});

// Retorna o produto atualmente selecionado, dentro do catálogo da marca ativa
function produtoAtual() {
  return MARCAS[estado.marca].produtos[estado.produto];
}

// Repopula o <select> de produtos com o catálogo da marca ativa
function popularProdutos() {
  const sel = document.getElementById('sel-produto');
  sel.innerHTML = '';
  MARCAS[estado.marca].produtos.forEach((p, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = p.nome;
    sel.appendChild(opt);
  });
  sel.value = estado.produto;
}

// Troca a marca ativa: atualiza tema (data-marca), logos, catálogo de
// produtos e textos sugeridos. Não mexe no fundo já gerado — o fundo de IA
// é agnóstico de marca (nunca contém logo/texto), então não precisa refazer.
function trocarMarca(marca) {
  estado.marca   = marca;
  estado.produto = 0;

  document.getElementById('app-root').dataset.marca = marca;
  document.getElementById('art-canvas').dataset.marca = marca;
  document.getElementById('art-canvas-medida').dataset.marca = marca;

  const logoUrl = MARCAS[marca].logo;
  document.getElementById('sidebar-logo').src = logoUrl;
  document.getElementById('art-logo').src     = logoUrl;
  document.getElementById('artm-logo').src    = logoUrl;

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
    renderArt();
    renderArtMedida();
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
    document.querySelectorAll('.btn-opt[data-field="formato"]').forEach(b => {
      const ativo = b.dataset.val === 'feed';
      b.classList.toggle('active', ativo);
      b.setAttribute('aria-pressed', String(ativo));
    });
    atualizarMeta();
  }

  renderArt();
  renderArtMedida();
  atualizarEscala();
}

// =============================================================================
// EVENTOS
// =============================================================================

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
      if (formatoMudou) atualizarMeta();
      if (!estado.promptEditado) atualizarSugestaoPrompt();
      renderArt();
      renderArtMedida();
      atualizarEscala();
    });
  });

  // Seleção de produto — preenche textos sugeridos (editáveis pelo usuário)
  document.getElementById('sel-produto').addEventListener('change', e => {
    estado.produto = parseInt(e.target.value, 10);
    preencherSugestoes(produtoAtual());
    atualizarSugestaoPrompt();
    renderArt();
    renderArtMedida();
  });

  // Campo "Medida" (digitado livremente — não vem de catálogo)
  criarCampoTexto('inp-medida', 'cnt-medida', 'medida', LIMITES.medida, renderArtMedida);

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

function criarCampoTexto(inputId, contadorId, chave, max, aoAtualizar = renderArt) {
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
  const obj     = estado.objetivo;
  const sugestao = (SUGESTOES_CENA[linha] ?? SUGESTOES_CENA.institucional)[obj] ?? '';
  const textarea = document.getElementById('inp-prompt-custom');
  if (textarea) textarea.value = sugestao;
  if (forcar) estado.customPrompt = '';
}

function atualizarMeta() {
  const f = FORMATOS[estado.formato];
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
    const res = await fetch('/api/gerar-fundo', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        modo:         estado.tipoArte,
        formato:      estado.formato,
        objetivo:     estado.objetivo,
        linha:        produto?.linha ?? 'institucional',
        customPrompt: estado.customPrompt
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

// Id do <img> de fundo do canvas atualmente ativo
function bgImgAtivoId() {
  return estado.tipoArte === 'medida' ? 'artm-bg-img' : 'art-bg-img';
}

// Aplica a imagem base64 como fundo com fade-in via <img> onload
function aplicarFundo(base64) {
  const bgImg = document.getElementById(bgImgAtivoId());
  bgImg.classList.remove('loaded');
  bgImg.onload = () => {
    requestAnimationFrame(() => bgImg.classList.add('loaded'));
  };
  bgImg.src = `data:image/png;base64,${base64}`;
}

// Remove o fundo gerado (ex.: ao trocar formato)
function resetarFundo() {
  const bgImg = document.getElementById(bgImgAtivoId());
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

function renderArt() {
  const canvas  = document.getElementById('art-canvas');
  const obj     = OBJETIVOS[estado.objetivo];
  const produto = produtoAtual();
  const semProd = estado.produto === 0;

  // Classes dinâmicas
  canvas.className = [
    'art',
    `format-${estado.formato}`,
    obj.cls,
    semProd ? 'no-product' : ''
  ].filter(Boolean).join(' ');
  canvas.dataset.marca = estado.marca;

  // Badge
  document.getElementById('art-badge').textContent = obj.texto;

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

  canvas.className = ['artm', `artm-${estado.formato}`].filter(Boolean).join(' ');
  canvas.dataset.marca = estado.marca;

  montarMarquee(semProd ? '' : produto.apelido);

  // Cabeçalho estático da Denali usa sempre a versão colorida da logo (o
  // fundo dessa arte é claro — a versão branca, usada no resto do app,
  // ficaria invisível aqui).
  document.getElementById('artm-logo-header').src =
    estado.marca === 'denali' ? 'assets/denali/logo-denali-colorida.png' : '';

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

// =============================================================================
// ESCALA DO PREVIEW
// =============================================================================

function atualizarEscala() {
  const canvas  = document.getElementById(canvasAtivoId());
  const wrapper = document.getElementById('preview-wrapper');
  const stage   = wrapper.parentElement;
  const { width, height } = FORMATOS[estado.formato];

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

async function exportarPNG() {
  const btn = document.getElementById('btn-png');
  definirEstadoBtn(btn, true, 'PNG...');
  try {
    const c = await capturarCanvas();
    const link = document.createElement('a');
    link.download = `${estado.marca}-${estado.formato}${estado.tipoArte === 'medida' ? '-medida' : ''}-arte.png`;
    link.href = c.toDataURL('image/png');
    link.click();
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
    const { width, height } = FORMATOS[estado.formato];
    const c = await capturarCanvas();
    const imgData = c.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: width >= height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [width, height],
      hotfixes: ['px_scaling']
    });
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save(`${estado.marca}-${estado.formato}${estado.tipoArte === 'medida' ? '-medida' : ''}-arte.pdf`);
  } catch (e) {
    console.error('[Delinte] Erro PDF:', e);
    mostrarErro('Não foi possível exportar o PDF. Verifique o console.');
  } finally {
    definirEstadoBtn(btn, false, 'PDF');
  }
}

// ── Captura via clone off-screen ─────────────────────────────────────────────
async function capturarCanvas() {
  const original = document.getElementById(canvasAtivoId());
  const { width, height } = FORMATOS[estado.formato];

  const clone = original.cloneNode(true);
  // O clone vai direto para o <body>, fora de #app-root — então não herda as
  // regras de visibilidade que dependem de .app[data-tipo-arte]. "display" e
  // "hidden" precisam ser forçados aqui (estilo inline sempre vence). O canvas
  // de Arte de Medida (.artm) empilha suas faixas com flex-direction:column,
  // então precisa de display:flex — display:block quebraria o layout.
  const displayAtivo = estado.tipoArte === 'medida' ? 'flex' : 'block';
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

  await Promise.all(
    Array.from(clone.querySelectorAll('img')).map(img => processarImgExport(img))
  );

  await esperarFrames(3);

  let resultado;
  try {
    resultado = await html2canvas(clone, {
      scale:           2,
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
      dataUrl = ehSvg
        ? 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(await blob.text())
        : await blobParaDataURL(blob);
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
    dataUrl = await imagemParaPngComFit(dataUrl, containerW, containerH, objPos, fit);
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
function imagemParaPngComFit(imgSrc, containerW, containerH, objectPosition, fit) {
  return new Promise((resolve, reject) => {
    const tmp = new Image();
    tmp.onload = () => {
      const natW = tmp.naturalWidth  || containerW;
      const natH = tmp.naturalHeight || containerH;

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

// =============================================================================
// GERAÇÃO DE PLACEHOLDER (usado em PRODUTOS enquanto não há foto oficial)
// Substitua pela URL real: foto: "https://..."
// =============================================================================

function gerarPlaceholder(nome) {
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">',
    '<rect width="800" height="800" fill="transparent"/>',
    '<circle cx="400" cy="400" r="340" fill="none" stroke="#FFDB0F" stroke-width="3" opacity="0.2"/>',
    '<circle cx="400" cy="400" r="270" fill="none" stroke="#FFDB0F" stroke-width="2.5" opacity="0.35"/>',
    '<circle cx="400" cy="400" r="190" fill="none" stroke="#FFDB0F" stroke-width="2" opacity="0.5"/>',
    `<text x="400" y="418" font-family="Arial Black,Arial,sans-serif" font-size="108"`,
    ` fill="#FFDB0F" text-anchor="middle" dominant-baseline="middle" font-weight="900">${nome}</text>`,
    '</svg>'
  ].join('');
  try {
    return 'data:image/svg+xml;base64,' + btoa(svg);
  } catch (_) {
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }
}
