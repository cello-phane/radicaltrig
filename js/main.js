import { initUI } from './uiControls.js';
import { initRAUCanvas, initVectorCanvas } from './vectorDraw.js';

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
