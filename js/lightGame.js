/**
 * Documento JS criado por Paulo Osawa
 * Código Destinado à página Light Game - Jogo de Memória
 * Colaboradores:
 */
function lightGame() {

  const dvmain = document.querySelector('.dvmain');
  const dvfase = document.querySelector('.dvfase');
  const dvini = document.querySelector('.dvini');
  const dvinfo = document.querySelector('.dvinfo');
  const dvluzes = document.querySelector('.dvluzes');

  const dvluz = dvluzes.children.item(0);
  const dvmsg = document.querySelector('.dvmsg');
  const spnerr = document.querySelector('.spnerr');
  const spnfase = document.querySelector('.spnfase');

  const predio = document.querySelector('.predio');
  const janelas = predio.querySelectorAll('.janela');

  const btstart = document.querySelector('button[name=btstart]');
  const btread = document.querySelector('button[name=btread]');
  const btreset = document.querySelector('button[name=btreset]');
  const linkGit = document.querySelector('footer a');

  const arSeq = [2, 4];
  const numJanelas = predio.children.length;
  let state = 'off'
  let [fase, erros, clicks] = [1, 0, 0];
  const arStates = ['off', 'ini', 'show', 'game', 'over'];

  const showMsgBox = (msg, fn, ...fnargs) => {
    const txtMsg = msg.replace(/([a-zé ]+! )/i, '');
    dvmsg.querySelector('h2').textContent = msg.replace(txtMsg, '');
    dvmsg.querySelector('h3').textContent = txtMsg;
    btreset.classList.add('disab');
    predio.classList.add('disab');
    dvinfo.classList.remove('actv');
    dvmsg.classList.add('actv');
    const msgtime = setTimeout(() => {
      dvmsg.classList.remove('actv');
      btreset.classList.remove('disab');
      if(fn) { fn(...fnargs); }
      clearTimeout(msgtime);
    }, 4000);
  }
  const togHiden = (...elms) => elms.forEach(elm => elm.classList.toggle('hiden'));

  const rendSpans = (err, fas) => {
    const spanelm = !fas ? spnerr : spnfase;
    spnerr.textContent = erros = err;
    if(fas){ fase = fas; spnfase.textContent = fas; }
    if(state !== 'game' && dvinfo.classList.contains('actv')){ return; }
    spanelm.classList.add('grow');
    const remgrow = setTimeout(() => { spanelm.classList.remove('grow'); clearTimeout(remgrow); },700);
  }

  const changeSignColor = (cl) => {
    if (cl === 'on') {
      const turnon = setTimeout(() => { dvluz.className = cl; clearTimeout(turnon); },100);
      return;
    }
    dvluz.className = !cl ? '' : cl;
  }

  const togInfoBtns = (isReset) => {
    if (isReset && !btreset.classList.contains('hiden')){
      togHiden(btreset, btread); return;
    }
    if (!isReset && !btread.classList.contains('hiden')) {
      btread.classList.add('hiden');
      btreset.classList.remove('hiden');
    }
  }

  const resetJanelas = () => {
    predio.querySelectorAll('.acesa').forEach(j => j.classList.remove('acesa'))
    predio.querySelectorAll('.broken').forEach(j => j.classList.remove('broken'))
    predio.classList.add('disab');
  }

  const addErr = (i) => {
    erros = (state !== 'game') ? 0 : erros + 1;
    rendSpans(erros);
    janelas.item(i).classList.add('broken');
    const max = parseInt(fase/3) + 1;
    if (erros > max) {
      janelas.item(i).blur();
      state = 'over';
      fase = 1;
      showMsgBox('GAME OVER! Tente Novamente!', reseta, state);
    }
  }

  const clicouJanela = (i) => {

    if(clicks >= arSeq.length){ return; }
    if(janelas.item(i).classList.contains('acesa')){ return; }
    const v = arSeq[clicks];

    if(janelas.item(i).classList.contains('broken')){
      if(i !== v){ return; }
      janelas.item(i).classList.remove('broken');
    }
    if(i !== v){ return addErr(i); }
    clicks++;
    janelas.item(i).classList.add('acesa');
    if(clicks >= arSeq.length){ novaFase();}
  }

  const geraDifNum = () => {
    const niuNum = parseInt(Math.random() * (numJanelas - 1) + 1);
    return arSeq.includes(niuNum) ? geraDifNum() : niuNum;
  }
  const geraNums = () => {
    if(arSeq.length > 11){ return; }
    arSeq.fill(0).forEach((v,i) => { arSeq[i] = geraDifNum(); })
  }
  const showJanelas = () => {
    geraNums();
    state = 'show';
    let i = 0;
    // console.log(...arSeq );
    janelas.item(arSeq[0]).classList.add('acende');
    const fim = arSeq.length - 1;

    const int = setInterval(() => {
      janelas.item(arSeq[i]).classList.remove('acende');
      if(i === fim || state !== 'show'){
        state = (i === fim) ? 'game' : state;
        changeSignColor('on');
        btreset.classList.remove('disab');
        predio.classList.remove('disab');
        predio.focus();
        return clearInterval(int);
      }
      i++;
      janelas.item(arSeq[i]).classList.add('acende');
    }, 1300);
  }

  const novaFase = () => {
    // console.log('novaFase', fase + 1);
    if (fase > 9) {
      const msg = 'Parabéns! Você COMPLETOU O JOGO!';
      state = 'over';
      fase = 1;
      return showMsgBox(msg, reseta, state);
    }
    arSeq.push(0);
    fase++;
    const msg = 'Parabéns! Você Passou para a Fase '+fase+'!!';
    showMsgBox(msg, reseta);
  }

  const goGame = (e) => {
    e.stopPropagation();
    if (state !== 'ini') { return; };
    togInfoBtns();
    changeSignColor('read');
    btreset.classList.add('disab');
    const jtime = setTimeout(() => { showJanelas(); clearTimeout(jtime); }, 1200);
  }

  const reseta = (st) => {
    clicks = 0;
    state = 'ini';
    togInfoBtns(true);
    changeSignColor();
    resetJanelas();
    if(!st){ rendSpans(0, fase); dvinfo.classList.add('actv'); return; }
    rendSpans(0, 1);
    arSeq.splice(0, arSeq.length, 0, 1);
    if (st !== 'ini') {
      dvinfo.classList.remove('actv');
      dvini.classList.add('actv');
      state = 'off';
    }
  }

  const comeca = (e) => {
    e.stopPropagation();
    state = 'ini';
    togInfoBtns(true);
    dvini.classList.remove('actv');
    dvmain.scrollIntoView( {block:"start", behavior:"smooth"} )
    dvinfo.classList.add('actv');
  };

  const desfoca = (toBtn) => {
    const elm = !toBtn ? linkGit : dvfase.querySelector('.actv button:not(.disab)');
    (elm ?? linkGit).focus();
  }

  const canPlay = () => { return state === 'game' && !predio.classList.contains('disab') }

  btread.onclick = goGame;
  btstart.onclick = comeca;
  btreset.onclick = (e) => {
    e.stopPropagation();
    if(btreset.classList.contains('disab')){ e.preventDefault(); return; }
    reseta(e);
  }

  predio.onfocus = (e) => {
    if(!canPlay()){ predio.blur(); }
  }

  janelas.forEach((jj, i) => {

    jj.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      if(canPlay()){ clicouJanela(i); }
    }

    jj.onfocus = (e) => {
      if(!canPlay()){ jj.blur(); return desfoca(i > 0); }      
    }

    jj.onkeydown = (e) => {

      const tecla = e.keyCode;
      if(!canPlay()){ return; }
      const teclasAceitas = [13, 32, 37, 38, 39, 40];
      if(!teclasAceitas.includes(tecla) ){ return; }
      e.preventDefault();
      if([32, 13].includes(tecla) ){ return jj.click(); }
      let idx = [37, 39].includes(tecla) ? 1 : 3;
      if([37, 38].includes(tecla) ){ idx = idx * -1; }
      const elm = janelas.item(i + idx);
      if(elm){ elm.focus(); }
    }
  });
}

window.onload = lightGame();