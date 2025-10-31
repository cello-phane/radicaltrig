// Shared global variables
let currentPhaseSection1 = 0;
let currentPhaseSection2 = 0;
let currentU = { x: 120, y: 0 };
let currentV = { x: 100, y: 0 };
let anglebetweenDeg = 0;
let uAng = 0;
let vAng = 0;
let ccw = false;

document.addEventListener('DOMContentLoaded', () => {
  initUI();
  initRAUCanvas();
  initVectorCanvas();

  const toggleBtn = document.getElementById('toggleButton');
  const s1 = document.getElementById('section1');
  const s2 = document.getElementById('section2');

  toggleBtn.addEventListener('click', () => {
    const showing1 = s1.classList.contains('active');
    s1.classList.toggle('active', !showing1);
    s2.classList.toggle('active', showing1);
    toggleBtn.textContent = showing1 ? 'Switch to Introduction' : 'Switch to Vector Diagram';
  });
});

function toggleMathBlock() {
    const mb = document.getElementById('mathBlock');
    if (mb.classList.contains('collapsed')) {
        mb.classList.remove('collapsed');
        mb.style.maxHeight = mb.scrollHeight + 'px';
    } else {
        mb.style.maxHeight = '0';
        mb.classList.add('collapsed');
    }
}

function changeFontSize(changeAmount, id) {
    let el = document.getElementById(id);
    if (el) {
        let size = parseInt(el.style.fontSize) || 13;
        size += changeAmount;
        if (size < 8) size = 8;
        el.style.fontSize = size + 'px';
    }
}
