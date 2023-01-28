/**
 * Documento JS criado por Paulo Osawa
 * Código Destinado à página Light Game - Jogo de Memória
 * Colaboradores:
 */
function lightGame() {
  
  const setElemnts = (arElms = [], pai) => arElms.map(elm => (pai ?? document).querySelector(elm));

  // #region ====
  // const [dvmain, dvfase, dvini, dvinfo, dvluzes] = setElemnts(['.dvmain', '.dvfase', '.dvini', '.dvinfo', '.dvluzes']);

  const dvmain = document.querySelector('.dvmain');
  const dvfase = document.querySelector('.dvfase');
  const dvini = document.querySelector('.dvini');
  const dvinfo = document.querySelector('.dvinfo');
  const dvluzes = document.querySelector('.dvluzes');

  const dvluz = dvluzes.children.item(0);  
  // const [dvmsg, spnerr, spnfase] = setElemnts(['.dvmsg', '.spnerr', '.spnfase']);
  const dvmsg = document.querySelector('.dvmsg');
  const spnerr = document.querySelector('.spnerr');
  const spnfase = document.querySelector('.spnfase');

  const predio = document.querySelector('.predio');
  const janelas = predio.querySelectorAll('.janela');

  const btstart = document.querySelector('button[name=btstart]');
  const btread = document.querySelector('button[name=btread]');
  const btreset = document.querySelector('button[name=btreset]');

  // #endregion ====
  const arSeq = [2, 4]
  const numJanelas = predio.children.length;
  let state = 'off'
  let [fase, erros, clicks] = [1, 0, 0]
  const arStates = ['off', 'ini', 'show', 'game', 'over']
  // #region ============================  FN HELPERS ====== */
  const showMsgBox = (msg, fn, ...fnargs) => {
    const txtMsg = msg.replace(/([a-zé ]+! )/i, '');
    dvmsg.querySelector('h2').textContent = msg.replace(txtMsg, '');
    dvmsg.querySelector('h3').textContent = txtMsg;
    btreset.classList.add('disab');
    predio.classList.add('disab');
    dvinfo.classList.remove('actv');
    dvmsg.classList.add('actv');
    setTimeout(() => {
      dvmsg.classList.remove('actv');
      btreset.classList.remove('disab');
      changeSignColor();
      if(fn) { fn(...fnargs); }
    }, 4000);

  }
  const togHiden = (...elms) => elms.forEach(elm => elm.classList.toggle('hiden'));

  const rendSpans = (err, fas) => {
    let addgrow = false;
    if(fas){
      fase = fas;
      spnfase.textContent = fas;
      if(fas !== 1){ addgrow = true; spnfase.classList.add('grow'); }
    }
    erros = err;
    spnerr.textContent = erros;
    if(erros !== 0){ addgrow = true; spnerr.classList.add('grow'); }
    if(addgrow){
      setTimeout(() => {
        dvinfo.querySelectorAll('.grow').forEach(spn => spn.classList.remove('grow'));
      },700);
    }
  }

  const changeSignColor = (cl) => {
    dvluz.classList.remove(dvluz.classList[0]);
    if (!cl) { return; }
    if (cl !== 'on') { dvluz.classList.add('read'); return; }
    setTimeout(() => { dvluz.classList.add(cl); },100);
  }

  const togInfoBtns = (isReset) => {
    if (isReset && !btreset.classList.contains('hiden')) {
      togHiden(btreset, btread);
      btread.classList.add('blink');
      setTimeout(() => { btread.classList.remove('blink'); },500);
      return;
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
  // ----------------------------------------
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
  /* --------------------------------------- */
  // #endregion

  // ----------------------------------------
  const clicouJanela = (i) => {
    if(state !== 'game'){ return console.log('sem jogo', i ); }
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
  // #region ------------------- showJanelas -----
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
    }, 1600);
  }
  // #endregion
  // ----------------------------------------
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
  // ----------------------------------------
  const goGame = (e) => {
    if (state !== 'ini') { return; }
    if (state === 'over') {return showMsgBox('Clique em Reiniciar!'); }
    togInfoBtns();
    changeSignColor('read');
    btreset.classList.add('disab');
    setTimeout(() => { showJanelas(); },1200);
  }
  // ----------------------------------------
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
      dvmain.querySelector('.tits').classList.remove('hiden');
      dvinfo.classList.remove('actv');
      dvini.classList.add('actv');
      state = 'off';
    }
  }
  // ----------------------------------------
  const comeca = (e) => {
    dvmain.querySelector('.tits').classList.add('hiden');
    dvini.classList.remove('actv');
    dvinfo.classList.add('actv');
    reseta('ini');
    // window.scrollTo({top:400, behavior:'smooth'})
  }

  const canPlay = () => { return state === 'game' && !predio.classList.contains('disab') }

  btread.onclick = goGame;
  btstart.onclick = comeca;
  btreset.onclick = (e) => { 
    if(btreset.classList.contains('disab')){ e.preventDefault(); return; }
    reseta(e);
  } 

  predio.onfocus = (e) => {
    if(!canPlay()) {
      predio.blur();
      document.activeElement.closest('button').focus();
    }
  } 

  janelas.forEach((jj, i) => { 
    jj.onclick = (e) => { e.preventDefault(); clicouJanela(i); }
    jj.onfocus = (e) => { 
      if(!canPlay()) { 
        e.preventDefault(); jj.blur();
        document.querySelector('footer a').focus();
      }
    }
    jj.onkeydown = (e) => { 
      e.stopPropagation();
      if(!canPlay()) { e.preventDefault(); return; }
      const tecla = e.keyCode;
      const teclasAceitas = [13, 32, 37, 38, 39, 40];
      if(!teclasAceitas.includes(tecla) ){ return; }

      if([32, 13].includes(tecla) ){ e.preventDefault(); return jj.click(); }
      let idx = [37, 39].includes(tecla) ? 1 : 3;
      if([37, 38].includes(tecla) ){ idx = idx * -1; }
      const elm = janelas.item(i + idx);
      if(elm){ elm.focus(); }
    }
  });
}

window.onload = lightGame();