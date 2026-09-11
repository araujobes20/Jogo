/* ============================================================================
   Histórias do Mundo: Os Heróis de Gradefull
   Arquivo de dados: classes de personagem, capítulos e história.

   COMO ADICIONAR UM NOVO CAPÍTULO (uma nova era/lugar):
   1. Adicione um item na lista CHAPTERS lá embaixo, com um "id" novo,
      um nome, uma imagem de cenário (coloque o .svg em assets/img/scenes/)
      e o "entry" apontando para o primeiro nó da sua história.
   2. Escreva os nós da sua história dentro de STORY (veja os exemplos de
      "egito_..." para copiar o formato). Cada nó tem um texto e uma lista
      de escolhas. Uma escolha pode ter "requiresClass" para só aparecer
      liberada para certas classes (ou não ter, ficando sempre disponível).
   3. No último nó do capítulo, use "grantFragment: 'seu_id'" para entregar
      o fragmento e volte para o nó "hub".
   Não precisa mexer em mais nada — o jogo (js/game.js) lê tudo daqui!
============================================================================ */

/* -------------------- CLASSES DE PERSONAGEM -------------------- */
const CLASSES = [
  {
    id: 'pirata', nome: 'Pirata', icon: 'assets/img/classes/pirata.svg',
    descricao: 'Aventureiro corajoso e mestre dos mares, sempre pronto para uma boa luta ou uma boa risada.',
    habilidade: 'Fúria dos Sete Mares',
    forca: 8, magia: 2, coracao: 5
  },
  {
    id: 'mago', nome: 'Mago', icon: 'assets/img/classes/mago.svg',
    descricao: 'Estudioso das artes arcanas, capaz de manipular as forças invisíveis do universo.',
    habilidade: 'Runas Arcanas',
    forca: 3, magia: 9, coracao: 4
  },
  {
    id: 'bruxo', nome: 'Bruxo', icon: 'assets/img/classes/bruxo.svg',
    descricao: 'Conhece os segredos mais sombrios da magia e não teme caminhar por lugares que outros evitam.',
    habilidade: 'Pacto das Sombras',
    forca: 3, magia: 8, coracao: 3
  },
  {
    id: 'fada', nome: 'Fada', icon: 'assets/img/classes/fada.svg',
    descricao: 'Pequena, luminosa e profundamente ligada à magia da natureza e dos sonhos.',
    habilidade: 'Poeira de Encantamento',
    forca: 2, magia: 7, coracao: 8
  },
  {
    id: 'druida', nome: 'Druida', icon: 'assets/img/classes/druida.svg',
    descricao: 'Guardião das florestas e dos animais mágicos, fala a língua secreta da natureza.',
    habilidade: 'Chamado Selvagem',
    forca: 4, magia: 7, coracao: 7
  },
  {
    id: 'espadachim', nome: 'Espadachim', icon: 'assets/img/classes/espadachim.svg',
    descricao: 'Especialista em combate, treinado desde criança na arte da espada.',
    habilidade: 'Lâmina Radiante',
    forca: 9, magia: 2, coracao: 5
  },
  {
    id: 'curador', nome: 'Curador', icon: 'assets/img/classes/curador.svg',
    descricao: 'Protege e restaura seus companheiros, mantendo viva a esperança do grupo.',
    habilidade: 'Luz Curativa',
    forca: 3, magia: 6, coracao: 9
  },
  {
    id: 'animal-magico', nome: 'Animal Mágico', icon: 'assets/img/classes/animal-magico.svg',
    descricao: 'Uma criatura extraordinária que caminha ao lado dos heróis, com instintos e poderes únicos.',
    habilidade: 'Instinto Selvagem',
    forca: 6, magia: 6, coracao: 6
  }
];

/* -------------------- CAPÍTULOS (ERAS / LUGARES) -------------------- */
const CHAPTERS = [
  {
    id: 'egito', nome: 'O Egito Antigo', subtitulo: 'As Areias Eternas',
    scene: 'assets/img/scenes/egito.svg', entry: 'egito_1',
    fragmentoNome: 'Fragmento da Chama Ancestral'
  },
  {
    id: 'grecia', nome: 'A Grécia Antiga', subtitulo: 'O Labirinto Sombrio',
    scene: 'assets/img/scenes/grecia.svg', entry: 'grecia_1',
    fragmentoNome: 'Fragmento das Marés Eternas'
  },
  {
    id: 'vikings', nome: 'A Era Viking', subtitulo: 'O Uivo Sob a Aurora',
    scene: 'assets/img/scenes/vikings.svg', entry: 'vikings_1',
    fragmentoNome: 'Fragmento da Aurora Eterna'
  }
];

const FINAL_CHAPTER = {
  nome: 'Retornar a Gradefull', subtitulo: 'O Confronto Final',
  scene: 'assets/img/scenes/gradefull.svg', entry: 'final_1'
};

/* Pequenos trechos extras de epílogo, escolhidos de acordo com as classes
   do grupo — cada jogador realmente ajuda a escrever o final da história. */
const EPILOGO_EXTRAS = [
  { classe: 'curador', texto: 'Onde antes havia apenas cicatrizes, agora crescem flores — um lembrete silencioso do poder de cuidar dos outros.' },
  { classe: 'bruxo', texto: 'Pela primeira vez em muito tempo, a magia sombria também encontrou seu lugar em Gradefull, não como ameaça, mas como parte do equilíbrio.' },
  { classe: 'fada', texto: 'As florestas de Gradefull cantam mais alto do que nunca, agradecendo às fadas que falam a língua da natureza.' },
  { classe: 'druida', texto: 'Os animais mágicos da ilha se aproximam sem medo, sabendo que sempre terão um amigo entre os heróis.' },
  { classe: 'pirata', texto: 'Nos mares de Gradefull, uma nova lenda já começa a ser cantada nas tavernas dos marinheiros.' },
  { classe: 'espadachim', texto: 'As muralhas de Gradefull, antes fracas, agora são vigiadas por quem provou seu valor em três eras diferentes.' },
  { classe: 'mago', texto: 'Nas torres de Gradefull, um novo capítulo é escrito nos livros de magia — o capítulo de vocês.' },
  { classe: 'animal-magico', texto: 'Criaturas de todos os cantos da ilha vêm prestar respeito a quem caminhou ao lado delas nesta jornada.' }
];

/* -------------------- HISTÓRIA -------------------- */
const STORY = {

  /* ---------- PRÓLOGO ---------- */
  prologo_1: {
    scene: 'assets/img/scenes/gradefull.svg',
    texto: 'Há um lugar que não existe em nenhum mapa. No meio do Atlântico Sul, escondida por uma névoa mágica, existe uma ilha chamada Gradefull. Lá, piratas navegam mares encantados, fadas cuidam das florestas e a magia é tão comum quanto o ar que se respira. Mas, esta noite, o Salão Real está em silêncio. O Rei Aldric caminha de um lado para o outro, com o rosto pálido. Algo terrível está acontecendo: a magia de Gradefull está desaparecendo, dia após dia, feitiço após feitiço.',
    choices: [{ label: 'Aproximar-se do Rei', next: 'prologo_2' }]
  },
  prologo_2: {
    scene: 'assets/img/scenes/gradefull.svg',
    texto: 'O Rei Aldric se vira para {party}, os únicos capazes de enxergar Gradefull sem se perder no caminho. "Vocês vieram", ele diz, com um misto de alívio e tristeza. "Um antigo inimigo lançou um feitiço para apagar toda a magia desta ilha. Não sei quem é, nem por quê. Mas sei que, se nada for feito, em poucas luas Gradefull vai desaparecer para sempre — e todos que vivem aqui, com ela."',
    choices: [{ label: 'Perguntar o que pode ser feito', next: 'prologo_3' }]
  },
  prologo_3: {
    scene: 'assets/img/scenes/gradefull.svg',
    texto: '"Existe uma esperança", continua o rei. "Antes de perder minhas próprias forças, escondi os fragmentos capazes de desfazer o feitiço em lugares distantes — e em tempos distantes também. Cada fragmento é guardado por um Guardião poderoso. Vocês precisam encontrá-los, prová-los dignos, e trazer os fragmentos de volta para Gradefull." Ele estende um mapa antigo, que brilha fracamente. "Este é o Mapa do Tempo. Ele só se abre para verdadeiros Heróis de Gradefull."',
    choices: [{ label: 'Seguir o Mapa do Tempo', next: 'hub' }]
  },

  /* ---------- CAPÍTULO 1: EGITO ANTIGO ---------- */
  egito_1: {
    scene: 'assets/img/scenes/egito.svg',
    texto: 'O Mapa do Tempo brilha e o mundo gira ao redor de {party}. Quando a poeira mágica se assenta, vocês estão sobre areia quente, sob um sol implacável. Ao longe, pirâmides douradas cortam o céu, e uma esfinge de pedra observa o horizonte com olhos vazios. Um vento sussurra em uma língua antiga: "Somente os dignos atravessam."',
    choices: [{ label: 'Caminhar em direção às pirâmides', next: 'egito_2' }]
  },
  egito_2: {
    texto: 'Perto das pirâmides, encontram um velho guardião — um escriba enrolado em linho dourado, sentado sobre tábuas de pedra cobertas de símbolos. "Viajantes de outro tempo", ele diz, sem se assustar. "Sinto o cheiro da magia de Gradefull em vocês. O fragmento que procuram está guardado pela Esfinge, mas ela só se move para quem responde ao seu enigma — ou prova seu valor de outra forma."',
    choices: [
      { label: 'Perguntar ao escriba sobre o enigma da Esfinge', next: 'egito_3' },
      { label: 'Agradecer e seguir direto até a Esfinge', next: 'egito_guardiao' }
    ]
  },
  egito_3: {
    texto: 'O escriba sorri, satisfeito com a curiosidade de vocês. "A Esfinge guarda o Fragmento da Chama Ancestral há mil anos. Ela testa quem chega: alguns com enigmas, outros com força, outros ainda com a bondade do coração. Ninguém sabe ao certo o que ela vai pedir — até chegar a hora." Ele aponta para o horizonte dourado. "Vão. Ela já sabe que vocês estão aqui."',
    choices: [{ label: 'Seguir até a Esfinge', next: 'egito_guardiao' }]
  },
  egito_guardiao: {
    texto: 'A Esfinge se ergue lentamente, areia escorrendo de suas patas de pedra como água. Sua voz ecoa como um trovão distante: "Três caminhos se abrem diante de vocês. Escolham como provar seu valor."',
    choices: [
      { label: 'Decifrar o enigma milenar gravado na base da Esfinge', requiresClass: ['mago', 'bruxo'], next: 'egito_vitoria_magia' },
      { label: 'Erguer a espada e provar sua coragem em um duelo simbólico', requiresClass: ['espadachim', 'pirata'], next: 'egito_vitoria_forca' },
      { label: 'Aproximar-se sem medo e falar com o coração', next: 'egito_vitoria_coracao' }
    ]
  },
  egito_vitoria_magia: {
    texto: 'Vocês se aproximam da base da Esfinge e traçam símbolos no ar, decifrando runas que ninguém mais consegue ler há séculos. A Esfinge inclina a cabeça de pedra. "Poucos ainda lembram desta língua", ela diz, quase surpresa. "Vocês honram o conhecimento antigo."',
    choices: [{ label: 'Continuar', next: 'egito_fragmento' }]
  },
  egito_vitoria_forca: {
    texto: 'Um dos heróis ergue a espada e a crava na areia diante da Esfinge, em um gesto de respeito e desafio ao mesmo tempo. A criatura de pedra observa, e algo parecido com um sorriso se forma em seu rosto imenso. "Coragem sem arrogância", ela murmura. "É raro encontrar as duas coisas juntas."',
    choices: [{ label: 'Continuar', next: 'egito_fragmento' }]
  },
  egito_vitoria_coracao: {
    texto: 'Sem armas, sem feitiços, um dos heróis simplesmente se aproxima e diz a verdade: que vieram para salvar um lar que amam, não por glória, mas por amor. A Esfinge fica em silêncio por um longo momento. "Essa", ela finalmente diz, "é a resposta que menos ouço — e a que mais vale."',
    choices: [{ label: 'Continuar', next: 'egito_fragmento' }]
  },
  egito_fragmento: {
    texto: 'A Esfinge se abaixa, e de dentro de sua garra de pedra retira um fragmento brilhante, quente como brasa e dourado como o sol do deserto. "Levem o Fragmento da Chama Ancestral", ela diz. "Que o calor dele aqueça o coração de Gradefull outra vez." Antes que vocês possam agradecer, o Mapa do Tempo puxa vocês de volta, e o deserto se dissolve em luz dourada.',
    grantFragment: 'egito',
    choices: [{ label: 'Voltar ao Mapa do Tempo', next: 'hub' }]
  },

  /* ---------- CAPÍTULO 2: GRÉCIA ANTIGA ---------- */
  grecia_1: {
    scene: 'assets/img/scenes/grecia.svg',
    texto: 'O ar muda, cheira a sal e azeitona. {party} está em pé sobre ladrilhos de mármore quebrado, cercado por colunas brancas que já foram parte de um templo majestoso. O mar Egeu brilha ao longe, mas um vento frio sopra vindo de baixo da terra — de um labirinto escondido sob as ruínas.',
    choices: [{ label: 'Procurar a entrada do labirinto', next: 'grecia_2' }]
  },
  grecia_2: {
    texto: 'Uma anciã vestida de branco aparece entre as colunas, como se tivesse surgido do próprio ar. "Vocês vieram pelo fragmento", ela diz, não como pergunta. "Ele está no centro do labirinto, guardado pelo Minotauro das Sombras — não a besta que as lendas contam, mas algo pior: o medo que ele representa, tornado carne." Ela hesita. "Muitos entram. Poucos escolhem a saída certa."',
    choices: [
      { label: 'Perguntar como encontrar o caminho certo', next: 'grecia_3' },
      { label: 'Entrar no labirinto sem mais perguntas', next: 'grecia_labirinto' }
    ]
  },
  grecia_3: {
    texto: '"O labirinto não teme espadas", diz a anciã, "mas teme quem enxerga além da pedra." Ela entrega a vocês um fio de lã vermelha, gasto pelo tempo. "Um presente de uma velha história. Pode ajudar — ou pode ser só um fio velho. Isso depende de vocês."',
    choices: [{ label: 'Aceitar o fio e entrar no labirinto', next: 'grecia_labirinto' }]
  },
  grecia_labirinto: {
    texto: 'Dentro do labirinto, os corredores parecem se mover sozinhos, mudando de forma toda vez que vocês olham para outro lado. Em algum lugar, ao longe, ouve-se uma respiração pesada — o Minotauro das Sombras está por perto.',
    choices: [
      { label: 'Usar a magia para enxergar através da ilusão do labirinto', requiresClass: ['mago', 'bruxo', 'fada'], next: 'grecia_guardiao' },
      { label: 'Seguir o instinto e farejar o caminho certo', requiresClass: ['animal-magico', 'druida'], next: 'grecia_guardiao' },
      { label: 'Confiar no fio vermelho e seguir em frente com cuidado', next: 'grecia_guardiao' }
    ]
  },
  grecia_guardiao: {
    texto: 'No centro do labirinto, o Minotauro das Sombras espera — uma silhueta enorme, feita de escuridão e chifres de fumaça. Seus olhos vermelhos brilham. "Todo herói que chega aqui", ele ruge, "traz consigo um medo. Mostrem-me o de vocês — ou fujam, como todos os outros."',
    choices: [
      { label: 'Enfrentar o medo de frente, com a espada em punho', requiresClass: ['espadachim', 'pirata'], next: 'grecia_vitoria' },
      { label: 'Acalmar a fera sombria com um canto antigo', requiresClass: ['curador', 'fada', 'druida'], next: 'grecia_vitoria' },
      { label: 'Admitir o medo em voz alta, sem vergonha', next: 'grecia_vitoria' }
    ]
  },
  grecia_vitoria: {
    texto: 'Ao ouvir a verdade dos heróis — coragem, canção ou simples honestidade — o Minotauro das Sombras começa a se desfazer, como fumaça ao vento. "O medo", ele sussurra, quase aliviado, "só é forte enquanto ninguém o encara." Onde a criatura estava, resta apenas um fragmento flutuando no ar, azul como o mar Egeu ao entardecer.',
    choices: [{ label: 'Pegar o fragmento', next: 'grecia_fragmento' }]
  },
  grecia_fragmento: {
    texto: 'Vocês seguram o Fragmento das Marés Eternas, e o labirinto desaparece ao redor de vocês como se nunca tivesse existido. A anciã de branco acena de longe, sorrindo, antes que o Mapa do Tempo puxe vocês de volta.',
    grantFragment: 'grecia',
    choices: [{ label: 'Voltar ao Mapa do Tempo', next: 'hub' }]
  },

  /* ---------- CAPÍTULO 3: ERA VIKING ---------- */
  vikings_1: {
    scene: 'assets/img/scenes/vikings.svg',
    texto: 'O ar fica gelado instantaneamente. {party} está em um fiorde congelado, cercado por montanhas nevadas, enquanto luzes verdes dançam no céu escuro. Um navio viking de madeira repousa na praia gelada, abandonado. Ao longe, uivos ecoam entre as montanhas — mais de um.',
    choices: [{ label: 'Seguir os uivos', next: 'vikings_2' }]
  },
  vikings_2: {
    texto: 'Perto de uma fogueira quase apagada, encontram uma jovem guerreira envolta em peles, com um machado apoiado no ombro. "Vocês não são daqui", ela diz, sem hostilidade. "O fragmento que procuram está com Fenrir — não o lobo das lendas antigas, mas um espírito acorrentado por um feitiço parecido com o que ameaça a ilha de vocês. Ele só vai se libertar se alguém provar que merece confiança."',
    choices: [
      { label: 'Perguntar como conquistar a confiança de Fenrir', next: 'vikings_3' },
      { label: 'Seguir sozinho até a montanha onde ele está preso', next: 'vikings_guardiao' }
    ]
  },
  vikings_3: {
    texto: 'A guerreira balança a cabeça. "Fenrir foi acorrentado por promessas quebradas. Ele não confia em palavras — só em atos." Ela entrega a vocês uma corda trançada com fios prateados. "Talvez isso ajude. Talvez não. Vocês vão descobrir."',
    choices: [{ label: 'Seguir até a montanha com a corda em mãos', next: 'vikings_guardiao' }]
  },
  vikings_guardiao: {
    texto: 'No topo da montanha, acorrentado entre rochas cobertas de gelo, um lobo do tamanho de uma casa ergue a cabeça. Suas correntes brilham com a mesma magia sombria que ameaça Gradefull. "Vocês vieram me libertar", Fenrir rosna, desconfiado, "ou vieram me usar, como os outros?"',
    choices: [
      { label: 'Prometer libertá-lo sem pedir nada em troca', requiresClass: ['curador', 'druida'], next: 'vikings_vitoria' },
      { label: 'Quebrar as correntes com força bruta', requiresClass: ['espadachim', 'pirata'], next: 'vikings_vitoria' },
      { label: 'Falar com ele de igual para igual, como se fala com um amigo', requiresClass: ['animal-magico', 'fada'], next: 'vikings_vitoria' },
      { label: 'Oferecer a corda prateada como sinal de boa fé', next: 'vikings_vitoria' }
    ]
  },
  vikings_vitoria: {
    texto: 'Algo na atitude dos heróis convence Fenrir. As correntes sombrias racham e se desfazem em fagulhas de gelo. Livre, o lobo se abaixa diante de vocês — um gesto raro de respeito. Em seu antigo colar de correntes, resta um único fragmento, frio e brilhante como uma estrela presa em gelo.',
    choices: [{ label: 'Pegar o fragmento', next: 'vikings_fragmento' }]
  },
  vikings_fragmento: {
    texto: 'Vocês seguram o Fragmento da Aurora Eterna. Fenrir uiva uma última vez — não de dor, mas de liberdade — antes que a neve e a luz verde do céu se dissolvam ao redor de vocês.',
    grantFragment: 'vikings',
    choices: [{ label: 'Voltar ao Mapa do Tempo', next: 'hub' }]
  },

  /* ---------- CAPÍTULO FINAL ---------- */
  final_1: {
    scene: 'assets/img/scenes/gradefull.svg',
    sceneClass: 'cena-corrompida',
    texto: 'O Mapa do Tempo brilha pela última vez e devolve {party} a Gradefull. Mas a ilha que encontram não é a mesma: o céu está tomado por um vórtice de sombras, e o Rei Aldric mal consegue ficar de pé. "Vocês conseguiram", ele sussurra, olhando os fragmentos brilhando nas mãos dos heróis. "Agora falta a parte mais difícil."',
    choices: [{ label: 'Perguntar quem está por trás da maldição', next: 'final_2' }]
  },
  final_2: {
    sceneClass: 'cena-corrompida',
    texto: 'Antes que o rei possa responder, o céu se abre, e uma figura desce em meio às sombras: Dravendor, o Devorador de Magia — uma armadura vazia sustentada apenas por escuridão e vontade. "Tolos", sua voz ecoa sem boca. "Vocês trouxeram exatamente o que eu precisava. Os fragmentos, entregues à minha porta." Ele estende uma mão sombria. "Deem-nos a mim, e talvez eu poupe suas vidas."',
    choices: [
      { label: 'Recusar e preparar-se para lutar', next: 'final_3' },
      { label: 'Tentar entender por que ele quer destruir a magia', next: 'final_2b' }
    ]
  },
  final_2b: {
    sceneClass: 'cena-corrompida',
    texto: '"Por quê?", Dravendor repete, quase divertido. "Porque a magia sempre escolhe quem vive e quem é esquecido. Eu fui esquecido. Se ninguém puder ter magia, ninguém mais vai sofrer como eu sofri." Por um instante, algo quase humano tremula onde deveria haver um rosto — e então desaparece, engolido pela sombra novamente. "Mas isso não importa mais. Entreguem os fragmentos."',
    choices: [{ label: 'Recusar e preparar-se para lutar', next: 'final_3' }]
  },
  final_3: {
    sceneClass: 'cena-corrompida',
    texto: 'Os heróis se colocam entre Dravendor e o Rei Aldric, erguendo os três fragmentos. Juntos, eles começam a brilhar, reconhecendo uns aos outros — a Chama Ancestral, as Marés Eternas, a Aurora Eterna — como se sempre tivessem pertencido à mesma coroa quebrada.',
    choices: [{ label: 'Unir os fragmentos e enfrentar Dravendor', next: 'final_guardiao' }]
  },
  final_guardiao: {
    sceneClass: 'cena-corrompida',
    texto: 'Dravendor ataca com um golpe de pura escuridão. É a hora de usar tudo o que {party} aprendeu na jornada — força, magia e, principalmente, aquilo que os torna verdadeiramente Heróis de Gradefull.',
    choices: [
      { label: 'Atacar com toda a força reunida no grupo', next: 'final_vitoria' },
      { label: 'Envolver Dravendor com toda a magia reunida no grupo', next: 'final_vitoria' },
      { label: 'Oferecer a Dravendor o que ele mais queria: ser lembrado', next: 'final_vitoria_coracao' }
    ]
  },
  final_vitoria: {
    sceneClass: 'cena-corrompida',
    texto: 'Com um brado só, vocês liberam toda a energia dos fragmentos reunidos. A escuridão que envolve Dravendor racha como vidro, e a luz da magia verdadeira de Gradefull explode sobre a ilha, afastando o vórtice sombrio de volta para onde veio. Dravendor desaparece com um último grito abafado, e o céu, aos poucos, volta a ficar azul.',
    choices: [{ label: 'Ver o final da jornada', next: 'epilogo' }]
  },
  final_vitoria_coracao: {
    texto: 'Em vez de atacar, vocês abaixam as armas e as varinhas. "Nós vamos lembrar de você", um dos heróis diz, olhando direto para o vazio sombrio onde deveria haver um rosto. "Não como um monstro. Como alguém que também teve medo." Por um instante, o vórtice para de girar. E então, lentamente, a escuridão ao redor de Dravendor começa a clarear — não destruída, mas curada. A armadura vazia se ajoelha, e a magia de Gradefull volta a brilhar, mais forte do que nunca, agora também iluminando aquilo que antes era apenas sombra.',
    choices: [{ label: 'Ver o final da jornada', next: 'epilogo' }]
  },
  epilogo: {
    scene: 'assets/img/scenes/gradefull.svg',
    texto: 'Gradefull respira de novo. As luzes mágicas voltam a dançar sobre os mares, as fadas voltam a cuidar das florestas, e o Rei Aldric se curva diante de {party}. "Os fragmentos foram apenas ferramentas", ele diz. "A verdadeira magia sempre esteve em vocês." {epilogo_extra} A história dos Heróis de Gradefull termina aqui — mas, em algum lugar do Mapa do Tempo, novos lugares e novas eras ainda esperam para ser descobertos.',
    isEnd: true,
    choices: []
  }
};
