(function(){
      const bits = 6;                          // ahora 6 listas → 1 a 63
      const maxNumber = Math.pow(2,bits) - 1;  // 63

      const startBtn = document.getElementById('startBtn');
      const btnYes   = document.getElementById('btnYes');
      const btnNo    = document.getElementById('btnNo');
      const revealBtn= document.getElementById('revealBtn');
      const playAgainBtn=document.getElementById('playAgainBtn');
      const numbersGrid=document.getElementById('numbersGrid');
      const listArea = document.getElementById('listArea');
      const instr    = document.getElementById('instr');
      const stepInfo = document.getElementById('stepInfo');
      const progressBar=document.getElementById('progressBar');
      const finalNumber=document.getElementById('finalNumber');
      const finalText=document.getElementById('finalText');
      const resetBtn=document.getElementById('resetBtn');

      let currentBit = 0;
      let sum = 0;
      let started = false;

      function generateLists(){
        const lists = [];
        for(let b=0;b<bits;b++){
          const arr = [];
          for(let n=1;n<=maxNumber;n++){
            if ( ((n >> b) & 1) === 1 ) arr.push(n);
          }
          lists.push(arr);
        }
        return lists;
      }
      const lists = generateLists();

      function showCurrentList(){
        numbersGrid.innerHTML = '';
        lists[currentBit].forEach(n=>{
          const div=document.createElement('div');
          div.className='num';
          div.textContent=n;
          numbersGrid.appendChild(div);
        });
        listArea.style.display='block';
        btnYes.style.display='inline-block';
        btnNo.style.display='inline-block';
        revealBtn.style.display='none';
        updateStatus();
      }

      function updateStatus(){
        stepInfo.textContent = `Listas mostradas: ${currentBit} / ${bits}`;
        progressBar.style.width = (currentBit/bits*100)+'%';
      }

      function startGame(){
        currentBit=0;
        sum=0;
        started=true;

        finalNumber.textContent='—';
        finalText.textContent='Responde las listas para adivinar tu número.';
        startBtn.style.display='none';
        playAgainBtn.style.display='none';
        
        instr.textContent='Piensa un número entre 1 y '+maxNumber+'.';

        setTimeout(()=> showCurrentList(), 200);
      }

      function answer(isYes){
        if(isYes) sum += Math.pow(2,currentBit);
        currentBit++;
        if(currentBit < bits){
          showCurrentList();
        } else {
          reveal();
        }
      }

      function reveal(){
        listArea.style.display='none';
        btnYes.style.display='none';
        btnNo.style.display='none';
        revealBtn.style.display='inline-block';

        finalNumber.textContent = sum;
        finalText.textContent='¿Adiviné tu número correctamente?';
        playAgainBtn.style.display='inline-block';

        stepInfo.textContent=`Listas mostradas: ${bits} / ${bits}`;
        progressBar.style.width='100%';
      }

      function resetAll(){
        started=false;
        currentBit=0;
        sum=0;

        startBtn.style.display='inline-block';
        btnYes.style.display='none';
        btnNo.style.display='none';
        revealBtn.style.display='none';
        playAgainBtn.style.display='none';
        listArea.style.display='none';

        instr.textContent='Presiona Comenzar cuando estés listo.';
        finalNumber.textContent='—';
        finalText.textContent='Aún no hemos adivinado.';
        progressBar.style.width='0%';
        stepInfo.textContent='Listas mostradas: 0 / 6';
      }

      startBtn.addEventListener('click', startGame);
      playAgainBtn.addEventListener('click', startGame);
      btnYes.addEventListener('click', ()=>answer(true));
      btnNo.addEventListener('click', ()=>answer(false));
      revealBtn.addEventListener('click', reveal);
      resetBtn.addEventListener('click', resetAll);

      document.addEventListener('keydown',e=>{
        if(!started && e.key==='Enter') startGame();
        if(started){
          if(e.key==='y' || e.key==='Y') btnYes.click();
          if(e.key==='n' || e.key==='N') btnNo.click();
        }
      });

      resetAll();
    })();