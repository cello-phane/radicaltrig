import { currentPhaseSection1, currentPhaseSection2 } from './vectorDraw.js';
import { radicalSine, radicalCosine, radicalTan, rauToDeg, degToRad } from './rau.js';

export function initUI() {
  const panel = document.getElementById('formulaPanel');
  const header = document.getElementById('formulaHeader');
  const chev = document.getElementById('formulaChevron');

  let isSlim = false;
  chev.addEventListener('click', () => {
    isSlim = !isSlim;
    panel.classList.toggle('slim', isSlim);
    chev.textContent = isSlim ? '▶' : '◀';
    if (!isSlim && window.MathJax) MathJax.typesetPromise().catch(console.error);
  });

  // Drag functionality
  let dragging = false, offsetX, offsetY;
  header.addEventListener('mousedown', e => {
    dragging = true;
    const rect = panel.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    panel.style.left = (e.clientX - offsetX) + 'px';
    panel.style.top = (e.clientY - offsetY) + 'px';
  });
  document.addEventListener('mouseup', () => dragging = false);
}

// Results panel
export function updateResultsDisplay() {
  const rc = document.getElementById('resultsContent');
  const s1 = document.getElementById('section1');
  const isS1 = s1.classList.contains('active');

  if (isS1) {
    const p = currentPhaseSection1;
    const rs = radicalSine(p), rc2 = radicalCosine(p), rt = radicalTan(p);
    const deg = rauToDeg(p), rad = degToRad(deg);
    rc.textContent = `RAU Phase = ${p.toFixed(4)}\nRadians = ${rad.toFixed(4)} (${deg.toFixed(1)}°)
sin = ${rs.toFixed(4)}\ncos = ${rc2.toFixed(4)}\ntan = ${rt.toFixed(4)}`;
  } else {
    rc.textContent = "Vector mode information displayed here.";
  }
}

export function updateConversionDisplay() {
  // Placeholder: could draw the RAU conversion circle
}
