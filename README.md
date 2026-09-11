# Histórias do Mundo: Os Heróis de Gradefull

Um RPG de escolhas, feito para jogar em família, direto no navegador — sem
instalar nada. Vocês criam um ou dois heróis, escolhem uma classe para cada
um, e viajam por diferentes lugares e épocas da história para salvar a ilha
mágica de Gradefull.

Feito em HTML, CSS e JavaScript puro (sem frameworks, sem build, sem
servidor) — é só abrir e jogar.

## Como jogar agora mesmo

Basta abrir o arquivo `index.html` no navegador (duplo clique nele já
funciona). Para publicar online e jogar em qualquer aparelho, veja abaixo.

## Como publicar gratuitamente no GitHub Pages

1. Crie um repositório novo no GitHub e envie (`push`) todos os arquivos
   desta pasta para ele (mantendo a mesma estrutura de pastas).
2. No repositório, vá em **Settings → Pages**.
3. Em **Source**, selecione a branch `main` (ou `master`) e a pasta `/root`.
4. Salve. Em alguns minutos o GitHub mostra o link do site, algo como
   `https://seu-usuario.github.io/nome-do-repositorio/`.
5. Esse link já pode ser aberto de qualquer celular, tablet ou computador —
   é só compartilhar com quem for jogar.

## Estrutura do projeto

```
gradefull-rpg/
├── index.html              → estrutura da página
├── css/
│   └── style.css           → toda a aparência do jogo
├── js/
│   ├── data.js              → classes, capítulos e TODO o texto da história
│   └── game.js               → o "motor" do jogo (não guarda texto da história)
└── assets/
    └── img/
        ├── classes/          → ícone de cada classe de personagem
        └── scenes/           → ilustrações de cada cenário
```

Separei os **dados** (`data.js`) do **motor do jogo** (`game.js`) de
propósito: para adicionar ou mudar a história, história de personagens ou
capítulos, só é preciso mexer em `data.js`. O `game.js` não precisa ser
tocado.

## Como funciona o jogo

- **Criação de heróis:** cada jogador escolhe uma classe (Pirata, Mago,
  Bruxo, Fada, Druida, Espadachim, Curador ou Animal Mágico) e dá um nome
  ao seu herói. É possível jogar com um herói só ou em dupla.
- **Mapa do Tempo:** o "hub" do jogo, onde vocês escolhem para qual lugar
  e época viajar em seguida.
- **Capítulos:** cada capítulo é uma sequência de telas com uma imagem, um
  texto e escolhas. Algumas escolhas só aparecem liberadas para
  determinadas classes (por exemplo, só o Mago ou o Bruxo conseguem "ler
  runas antigas") — sempre existe pelo menos um caminho aberto para
  qualquer classe, então ninguém fica travado.
- **Fragmentos:** ao vencer o Guardião de cada capítulo, o grupo ganha um
  fragmento. Ao reunir todos, a opção "Retornar a Gradefull" se abre no
  Mapa do Tempo, levando ao capítulo final contra o vilão, Dravendor.
- **Final personalizado:** o epílogo muda um pouco de acordo com as
  classes escolhidas pelo grupo — jogar com classes diferentes conta uma
  história um pouco diferente.

## Como adicionar seu próprio capítulo (nova era ou lugar)

Tudo fica em `js/data.js`, que já vem com comentários explicando o
formato. Resumo rápido:

1. **Crie a ilustração de cenário** (um arquivo `.svg`, `.png` ou `.jpg`)
   e coloque em `assets/img/scenes/`. Pode ser um desenho da sua filha
   escaneado, uma foto, ou uma imagem feita por vocês — qualquer arquivo
   de imagem funciona.
2. **Adicione o capítulo** na lista `CHAPTERS`, copiando o formato de um
   capítulo existente (`id`, `nome`, `subtitulo`, `scene`, `entry`,
   `fragmentoNome`).
3. **Escreva os nós da história** dentro de `STORY`, no mesmo formato dos
   capítulos existentes: cada nó tem um `texto` e uma lista de `choices`
   (escolhas). Uma escolha pode ter `requiresClass: ['mago', 'bruxo']`
   para só aparecer liberada para certas classes, ou não ter essa
   propriedade para ficar sempre disponível.
4. No último nó do capítulo, use `grantFragment: 'seu_id'` para entregar
   o fragmento e uma escolha levando de volta para `'hub'`.

Não é preciso saber programar muito para isso — é basicamente copiar,
colar e trocar o texto.

## Ideias para continuar o projeto

- Trocar os cenários em SVG por desenhos ou fotos de vocês.
- Adicionar novos capítulos em outras eras (Idade Média, Egito, futuro,
  Brasil colonial, o que a imaginação de vocês quiser).
- Criar novos finais alternativos, ou novas classes de personagem.
- Adicionar efeitos sonoros ou música de fundo (um `<audio>` simples no
  `index.html` já resolve).

Bom jogo, Heróis de Gradefull! 🏝️✨
