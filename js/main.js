// Shared global variables
let currentPhaseSection1 = 0;
let currentPhaseSection2 = 0;
let currentU = { x: 120, y: 0 };
let currentV = { x: 100, y: 0 };
let anglebetweenDeg = 0;
let uAng = 0;
let vAng = 0;
let ccw = false;
let displayPrecision = 5; // Default to 5 decimal places
let maxDigitsofPrecision = 15;
let angleWrapMode = 'wrap'; // 'wrap' | 'unwrap'

document.addEventListener('DOMContentLoaded', () => {
  initUI();
  initRAUCanvas();
  initVectorCanvas();
  const toggleBtn = document.getElementById('toggleButton');
  const themeBtn = document.getElementById('themeToggle');
  const s1 = document.getElementById('section1');
  const s2 = document.getElementById('section2');

  // --- Load saved theme ---
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeBtn.textContent = 'Light';
  }

  // --- Theme toggle ---
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const dark = document.body.classList.contains('dark-mode');
    themeBtn.textContent = dark ? 'Light' : 'Dark';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  });

  // --- Section toggle ---
  toggleBtn.addEventListener('click', () => {
    const showing1 = s1.classList.contains('active');
    s1.classList.toggle('active', !showing1);
    s2.classList.toggle('active', showing1);
    toggleBtn.textContent = showing1
      ? 'Switch to Introduction'
      : 'Switch to Vector Diagram';
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

function setPrecision(digits) {
  displayPrecision = Math.max(0, Math.min(maxDigitsofPrecision, digits));
  updateResultsDisplay();
}

function formatValue(value, precision = displayPrecision) {
  if (typeof value !== 'number' || !isFinite(value)) return '—';
  return value.toFixed(precision);
}

// ================================
// Initialize precision control in sidebar
// ================================
function initPrecisionControl() {
  const formulaBody = document.getElementById('formulaBody');
  if (!formulaBody) return;
  
  // Insert precision control after the formulas
  const mathBlock = document.getElementById('mathBlock');
  if (mathBlock && mathBlock.nextSibling) {
    mathBlock.parentNode.insertBefore(createPrecisionControl(), mathBlock.nextSibling);
  } else {
    formulaBody.insertBefore(createPrecisionControl(), formulaBody.firstChild);
  }
}

// Call this after DOM is ready
document.addEventListener('DOMContentLoaded', initPrecisionControl);
