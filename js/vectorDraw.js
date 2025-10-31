import { radicalSine, radicalCosine, radicalTan, degToRad, rauToDeg } from './rau.js';
import { updateResultsDisplay, updateConversionDisplay } from './uiControls.js';

// Shared state
export let currentPhaseSection1 = 0;
export let currentPhaseSection2 = 0;
export let currentU = { x: 120, y: 0 };
export let currentV = { x: 100, y: 0 };
export let anglebetweenDeg = 0;
export let ccw = false;
export let uAng = 0;
export let vAng = 0;

// ===========================
// RAU Unit Circle visualization
// ===========================
export function initRAUCanvas() {
  const canvas = document.getElementById('vectorCanvas');
  const ctx = canvas.getContext('2d');
  const slider = document.getElementById('paramSlider');
  const valueDisplay = document.getElementById('paramValue');

  function getRAUComponents(t) {
    const tt = Math.max(0, Math.min(0.999999, t));
    const denom = 1 / Math.sqrt(1 - 2 * tt + 2 * tt * tt);
    return { cos: (1 - tt) * denom, sin: tt * denom };
  }

  function getRotationComponents(param) {
    let p = param;
    if (!isFinite(p) || p < 0) p = 0;
    const q = Math.floor(p) % 4;
    const frac = p - Math.floor(p);
    const { cos: c, sin: s } = getRAUComponents(frac);
    let cos_val, sin_val;
    switch (q) {
      case 0: cos_val = c; sin_val = s; break;
      case 1: cos_val = -s; sin_val = c; break;
      case 2: cos_val = -c; sin_val = -s; break;
      case 3: cos_val = s; sin_val = -c; break;
    }
    return { cos: cos_val, sin: sin_val, quadrant: q };
  }

  function drawGrid(cx, cy, w, h) {
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;
    for (let i = -10; i <= 10; i++) {
      ctx.beginPath();
      ctx.moveTo(cx + i * 40, 0);
      ctx.lineTo(cx + i * 40, h);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, cy + i * 40);
      ctx.lineTo(w, cy + i * 40);
      ctx.stroke();
    }
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, h);
    ctx.moveTo(0, cy);
    ctx.lineTo(w, cy);
    ctx.stroke();
  }

  function draw() {
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2;
    drawGrid(cx, cy, w, h);

    const r = Math.min(w, h) * 0.34;
    const param = parseFloat(slider.value);
    currentPhaseSection1 = param;

    const info = getRotationComponents(param);
    const x = cx + info.cos * r;
    const y = cy - info.sin * r;

    // Circle
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    // Radius
    ctx.strokeStyle = '#ff4444';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.fillStyle = '#ff4444';
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.fill();

    valueDisplay.textContent = param.toFixed(5);
    updateResultsDisplay();
    updateConversionDisplay();
  }

  slider.addEventListener('input', draw);
  draw();
}

// ===========================
// Vector diagram (u, v)
// ===========================
export function initVectorCanvas() {
  const canvas = document.getElementById('simpleCanvas');
  const ctx = canvas.getContext('2d');
  const controls = {
    uLength: document.getElementById('uLength'),
    uAngle: document.getElementById('uAngle'),
    vLength: document.getElementById('vLength'),
    vAngle: document.getElementById('vAngle'),
    angleMode: document.getElementById('angleMode')
  };

  function drawArrow(fromX, fromY, toX, toY, color, width = 2) {
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - 12 * Math.cos(angle - Math.PI / 6), toY - 12 * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - 12 * Math.cos(angle + Math.PI / 6), toY - 12 * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const mode = controls.angleMode.value;

    const uLen = parseInt(controls.uLength.value);
    const uAngleDeg = parseInt(controls.uAngle.value);
    const vLen = parseInt(controls.vLength.value);
    const vAngleDeg = parseInt(controls.vAngle.value);

    const uA = degToRad(uAngleDeg);
    const vA = degToRad(vAngleDeg);

    const u = { x: uLen * Math.cos(uA), y: -uLen * Math.sin(uA) };
    const v = { x: vLen * Math.cos(vA), y: -vLen * Math.sin(vA) };
    currentU = u; currentV = v;
    uAng = uAngleDeg; vAng = vAngleDeg;

    drawArrow(cx, cy, cx + u.x, cy + u.y, '#ff4444', 3);
    drawArrow(cx, cy, cx + v.x, cy + v.y, '#4444ff', 3);

    const diff = vAngleDeg - uAngleDeg;
    ccw = diff > 0;
    anglebetweenDeg = Math.abs(diff);
    currentPhaseSection2 = (anglebetweenDeg / 360) * 4;

    updateResultsDisplay();
    updateConversionDisplay();
  }

  Object.values(controls).forEach(c => c.addEventListener('input', render));
  render();
}
