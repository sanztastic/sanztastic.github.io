(function(){
  "use strict";
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById('year').textContent = new Date().getFullYear();

  /* =========================================================
     TERMINAL — lazy-mount the ttyd iframe only once the player
     presses start, so the terminal connection never opens until
     someone actually asks for it.
     ========================================================= */
  var REAL_TERMINAL_URL = 'https://terminal-algorithm-visualizer.onrender.com/'; // EDIT: your ttyd/docker terminal URL
  var terminalStartBtn = document.getElementById('terminalStartBtn');
  if (terminalStartBtn){
    terminalStartBtn.addEventListener('click', function(){
      var frame = document.getElementById('terminalFrame');
      var iframe = document.createElement('iframe');
      iframe.src = REAL_TERMINAL_URL;
      iframe.title = 'Algorithm Visualizer — live terminal';
      iframe.loading = 'lazy';
      frame.innerHTML = '';
      frame.appendChild(iframe);
    });
  }

  /* =========================================================
     INTRO DIALOGUE (typed, RPG text-box style)
     ========================================================= */
  var introBox = document.getElementById('introBox');
  var introLines = [
    'A SOFTWARE ENGINEER appears!',
    'SHANAND SHRESTHA joined your party!',
    'Backend engineer, 4+ years in Java and Spring. Ships production systems for healthcare EDI, fintech AML, and enterprise CRM.'
  ];

  function renderStaticIntro(){
    introBox.innerHTML = '';
    introLines.forEach(function(text){
      var p = document.createElement('p');
      p.className = 'line';
      p.textContent = text;
      introBox.appendChild(p);
    });
    var cur = document.createElement('span');
    cur.className = 'cursor';
    cur.textContent = '\u25BC';
    introBox.appendChild(cur);
  }

  function typeIntro(){
    var idx = 0;
    function nextLine(){
      if (idx >= introLines.length){
        var cur = document.createElement('span');
        cur.className = 'cursor';
        cur.textContent = '\u25BC';
        introBox.appendChild(cur);
        return;
      }
      var text = introLines[idx];
      var p = document.createElement('p');
      p.className = 'line';
      introBox.appendChild(p);
      var i = 0;
      var iv = setInterval(function(){
        p.textContent = text.slice(0, i + 1);
        i++;
        if (i >= text.length){
          clearInterval(iv);
          idx++;
          setTimeout(nextLine, 380);
        }
      }, 22);
    }
    nextLine();
  }

  if (reduceMotion){ renderStaticIntro(); } else { typeIntro(); }

})();
