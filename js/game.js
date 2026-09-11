/* ============================================================================
   Histórias do Mundo: Os Heróis de Gradefull — motor do jogo
   Lê os dados de js/data.js (CLASSES, CHAPTERS, FINAL_CHAPTER, STORY) e
   desenha as telas na página. Não precisa de nenhuma biblioteca externa.
============================================================================ */
(function () {
  'use strict';

  const appEl = document.getElementById('app');
  const statusEl = document.getElementById('statusbar');

  /* Estado do jogo inteiro fica guardado em memória enquanto a página
     está aberta. Se a página for recarregada, a jornada recomeça — assim
     como abrir um livro de novo na primeira página. */
  const state = {
    party: [],        // [{ nome, classeId }]
    fragments: {},     // { egito: false, grecia: false, vikings: false }
    creating: null      // dados temporários da tela de criação de herói
  };

  function classeById(id) {
    return CLASSES.find(function (c) { return c.id === id; });
  }

  function initFragments() {
    state.fragments = {};
    CHAPTERS.forEach(function (c) { state.fragments[c.id] = false; });
  }

  function collectedFragments() {
    return Object.keys(state.fragments).filter(function (id) { return state.fragments[id]; }).length;
  }

  function allFragmentsCollected() {
    return collectedFragments() === CHAPTERS.length;
  }

  function partyHasClass(classeId) {
    return state.party.some(function (h) { return h.classeId === classeId; });
  }

  function partyNamesText() {
    const nomes = state.party.map(function (h) { return h.nome; });
    if (nomes.length <= 1) return nomes[0] || 'o herói';
    return nomes.join(' e ');
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str == null ? '' : str;
    return div.innerHTML;
  }

  function interpolate(texto) {
    let extra = '';
    if (texto.indexOf('{epilogo_extra}') !== -1) {
      const combina = EPILOGO_EXTRAS.filter(function (e) { return partyHasClass(e.classe); });
      extra = combina.slice(0, 2).map(function (e) { return e.texto; }).join(' ');
    }
    return texto
      .replace(/\{party\}/g, partyNamesText())
      .replace(/\{epilogo_extra\}/g, extra);
  }

  /* -------------------------------------------------------------- */
  /* TELA: TÍTULO                                                    */
  /* -------------------------------------------------------------- */
  function renderTitle() {
    statusEl.classList.add('escondido');
    statusEl.innerHTML = '';
    appEl.innerHTML =
      '<section class="tela tela-titulo">' +
        '<img class="titulo-crest" src="assets/img/crest.svg" alt="" aria-hidden="true">' +
        '<h2 class="titulo-jogo">Histórias do Mundo</h2>' +
        '<p class="titulo-subtitulo">Os Heróis de Gradefull</p>' +
        '<p class="titulo-intro">No meio do Atlântico Sul existe uma ilha que não aparece em nenhum mapa. ' +
        'A magia de Gradefull está desaparecendo — e apenas heróis capazes de atravessar lugares e ' +
        'épocas diferentes podem trazê-la de volta.</p>' +
        '<button class="botao-principal" id="btn-iniciar">Começar Jornada</button>' +
      '</section>';
    document.getElementById('btn-iniciar').addEventListener('click', startCreation);
  }

  function startCreation() {
    state.party = [];
    initFragments();
    state.creating = { heroIndex: 1, nome: '', classeId: null };
    renderCreatePickClass();
  }

  /* -------------------------------------------------------------- */
  /* TELA: CRIAÇÃO DE PERSONAGEM                                     */
  /* -------------------------------------------------------------- */
  function renderCreatePickClass() {
    statusEl.classList.add('escondido');

    const cartas = CLASSES.map(function (c) {
      const selecionada = state.creating.classeId === c.id;
      return (
        '<button class="carta-classe' + (selecionada ? ' selecionada' : '') + '" data-classe="' + c.id + '">' +
          '<img src="' + c.icon + '" alt="">' +
          '<span class="carta-nome">' + c.nome + '</span>' +
          '<span class="carta-desc">' + c.descricao + '</span>' +
          '<span class="carta-stats">' +
            '<span title="Força">⚔ ' + c.forca + '</span>' +
            '<span title="Magia">✦ ' + c.magia + '</span>' +
            '<span title="Coração">♥ ' + c.coracao + '</span>' +
          '</span>' +
        '</button>'
      );
    }).join('');

    appEl.innerHTML =
      '<section class="tela tela-criacao">' +
        '<h2>Herói ' + state.creating.heroIndex + ' — escolha uma classe</h2>' +
        '<div class="grade-classes">' + cartas + '</div>' +
        '<div class="criacao-nome' + (state.creating.classeId ? '' : ' escondido') + '">' +
          '<label for="input-nome-heroi">Nome do herói</label>' +
          '<input id="input-nome-heroi" maxlength="18" placeholder="Ex: Bruna, a Corajosa" value="' + escapeHtml(state.creating.nome) + '">' +
          '<button class="botao-principal" id="btn-confirmar-heroi">Confirmar Herói</button>' +
        '</div>' +
      '</section>';

    document.querySelectorAll('.carta-classe').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.creating.classeId = btn.getAttribute('data-classe');
        renderCreatePickClass();
        const input = document.getElementById('input-nome-heroi');
        if (input) input.focus();
      });
    });

    const confirmBtn = document.getElementById('btn-confirmar-heroi');
    const nameInput = document.getElementById('input-nome-heroi');
    if (nameInput) {
      nameInput.addEventListener('input', function (e) { state.creating.nome = e.target.value; });
      nameInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') confirmBtn.click();
      });
    }
    if (confirmBtn) {
      confirmBtn.addEventListener('click', function () {
        const nome = (nameInput.value || '').trim();
        if (!nome) { nameInput.focus(); return; }
        state.party.push({ nome: nome, classeId: state.creating.classeId });
        if (state.creating.heroIndex === 1) {
          renderAskSecondHero();
        } else {
          goToNode('prologo_1');
        }
      });
    }
  }

  function renderAskSecondHero() {
    appEl.innerHTML =
      '<section class="tela tela-pergunta">' +
        '<h2>Deseja adicionar um segundo herói?</h2>' +
        '<p>Jogue sozinho ou em dupla — cada herói do grupo abre escolhas diferentes na história.</p>' +
        '<div class="botoes-pergunta">' +
          '<button class="botao-principal" id="btn-sim">Sim, somos dois</button>' +
          '<button class="botao-secundario" id="btn-nao">Não, vou sozinho</button>' +
        '</div>' +
      '</section>';
    document.getElementById('btn-sim').addEventListener('click', function () {
      state.creating = { heroIndex: 2, nome: '', classeId: null };
      renderCreatePickClass();
    });
    document.getElementById('btn-nao').addEventListener('click', function () {
      goToNode('prologo_1');
    });
  }

  /* -------------------------------------------------------------- */
  /* BARRA DE STATUS (heróis + fragmentos)                           */
  /* -------------------------------------------------------------- */
  function renderStatusBar() {
    statusEl.classList.remove('escondido');
    const heroesHtml = state.party.map(function (h) {
      const c = classeById(h.classeId);
      return '<span class="chip-heroi"><img src="' + c.icon + '" alt="">' + escapeHtml(h.nome) + '</span>';
    }).join('');
    const gemsHtml = CHAPTERS.map(function (ch) {
      const on = state.fragments[ch.id];
      return '<img class="gema' + (on ? '' : ' gema-vazia') + '" src="assets/img/fragment.svg" alt="" title="' + ch.fragmentoNome + '">';
    }).join('');
    statusEl.innerHTML =
      '<div class="status-heroes">' + heroesHtml + '</div>' +
      '<div class="status-fragmentos">' + gemsHtml +
        '<span class="status-contagem">' + collectedFragments() + '/' + CHAPTERS.length + '</span></div>';
  }

  /* -------------------------------------------------------------- */
  /* TELA: MAPA DO TEMPO (hub)                                       */
  /* -------------------------------------------------------------- */
  function renderHub() {
    renderStatusBar();

    const cartasCapitulos = CHAPTERS.map(function (ch) {
      const done = state.fragments[ch.id];
      return (
        '<button class="carta-capitulo' + (done ? ' concluido' : '') + '" ' +
          (done ? 'disabled' : 'data-entry="' + ch.entry + '"') + ' ' +
          'style="background-image:linear-gradient(180deg, rgba(9,20,30,.15), rgba(9,20,30,.88)), url(\'' + ch.scene + '\')">' +
          '<span class="capitulo-selo">' + (done ? 'Concluído ✓' : 'Disponível') + '</span>' +
          '<span class="capitulo-nome">' + ch.nome + '</span>' +
          '<span class="capitulo-subtitulo">' + ch.subtitulo + '</span>' +
        '</button>'
      );
    }).join('');

    const podeVoltar = allFragmentsCollected();
    const cartaFinal =
      '<button class="carta-capitulo carta-final' + (podeVoltar ? '' : ' bloqueado') + '" ' +
        (podeVoltar ? 'data-entry="' + FINAL_CHAPTER.entry + '"' : 'disabled') + ' ' +
        'style="background-image:linear-gradient(180deg, rgba(9,20,30,.15), rgba(9,20,30,.88)), url(\'' + FINAL_CHAPTER.scene + '\')">' +
        '<span class="capitulo-selo">' + (podeVoltar ? 'Disponível' : 'Bloqueado 🔒') + '</span>' +
        '<span class="capitulo-nome">' + FINAL_CHAPTER.nome + '</span>' +
        '<span class="capitulo-subtitulo">' + (podeVoltar ? FINAL_CHAPTER.subtitulo : 'Reúna todos os fragmentos para desafiar Dravendor') + '</span>' +
      '</button>';

    appEl.innerHTML =
      '<section class="tela tela-hub">' +
        '<h2>Mapa do Tempo</h2>' +
        '<p class="hub-intro">O mapa brilha, revelando marcas de lugares e tempos distantes. Para onde os Heróis de Gradefull vão agora?</p>' +
        '<div class="grade-capitulos">' + cartasCapitulos + cartaFinal + '</div>' +
      '</section>';

    document.querySelectorAll('.carta-capitulo:not([disabled])').forEach(function (btn) {
      btn.addEventListener('click', function () { goToNode(btn.getAttribute('data-entry')); });
    });
  }

  /* -------------------------------------------------------------- */
  /* TELA: NÓ DE HISTÓRIA                                            */
  /* -------------------------------------------------------------- */
  let ultimaCena = null; // mantém a última imagem exibida quando um nó não define uma nova

  function renderStoryNode(node) {
    if (node.scene) ultimaCena = { src: node.scene, classe: node.sceneClass || '' };
    else if (node.sceneClass && ultimaCena) ultimaCena = { src: ultimaCena.src, classe: node.sceneClass };

    const sceneHtml = ultimaCena
      ? '<img class="cena ' + ultimaCena.classe + '" src="' + ultimaCena.src + '" alt="">'
      : '';

    const escolhasHtml = (node.choices || []).map(function (choice) {
      const bloqueada = choice.requiresClass && !choice.requiresClass.some(partyHasClass);
      const requisito = choice.requiresClass
        ? choice.requiresClass.map(function (id) { return classeById(id).nome; }).join(' ou ')
        : null;
      return (
        '<button class="botao-escolha' + (bloqueada ? ' bloqueada' : '') + '" ' +
          (bloqueada ? 'disabled' : 'data-next="' + choice.next + '"') + '>' +
          '<span>' + escapeHtml(choice.label) + '</span>' +
          (bloqueada ? '<span class="escolha-requisito">Requer: ' + requisito + '</span>' : '') +
        '</button>'
      );
    }).join('');

    const fimHtml = node.isEnd
      ? '<button class="botao-principal botao-jogar-de-novo" id="btn-jogar-de-novo">Jogar Novamente</button>'
      : '';

    appEl.innerHTML =
      '<section class="tela tela-historia">' +
        sceneHtml +
        '<div class="painel-texto">' +
          '<p class="texto-historia">' + interpolate(node.texto) + '</p>' +
          '<div class="lista-escolhas">' + escolhasHtml + '</div>' +
          fimHtml +
        '</div>' +
      '</section>';

    document.querySelectorAll('.botao-escolha:not([disabled])').forEach(function (btn) {
      btn.addEventListener('click', function () { goToNode(btn.getAttribute('data-next')); });
    });
    const denovo = document.getElementById('btn-jogar-de-novo');
    if (denovo) denovo.addEventListener('click', renderTitle);
  }

  function goToNode(nodeId) {
    if (nodeId === 'hub') { renderHub(); return; }
    const node = STORY[nodeId];
    if (!node) { console.error('Nó de história não encontrado:', nodeId); return; }
    if (node.grantFragment) state.fragments[node.grantFragment] = true;
    renderStatusBar();
    renderStoryNode(node);
    appEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* -------------------------------------------------------------- */
  renderTitle();
})();
