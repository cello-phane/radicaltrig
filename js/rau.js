// ================================
// Radical Angle Unit (RAU) math
// ================================

function radicalSine(t) {
  t = t % 4;
  const q = Math.floor(t);
  const lt = t - q;
  const a = 1 - 2 * lt + 2 * lt * lt;
  switch (q) {
    case 0: return lt / Math.sqrt(a);
    case 1: return (1 - lt) / Math.sqrt(a);
    case 2: return -lt / Math.sqrt(a);
    case 3: return -(1 - lt) / Math.sqrt(a);
  }
}

function radicalCosine(t) {
  t = t % 4;
  const q = Math.floor(t);
  const lt = t - q;
  const a = 1 - 2 * lt + 2 * lt * lt;
  switch (q) {
    case 0: return (1 - lt) / Math.sqrt(a);
    case 1: return -lt / Math.sqrt(a);
    case 2: return -(1 - lt) / Math.sqrt(a);
    case 3: return lt / Math.sqrt(a);
  }
}

function radicalTan(t) {
  t = ((t % 4) + 4) % 4;
  const q = Math.floor(t);
  const f = t - q;
  if (f >= 0.999999) return 0;
  const base = f / (1 - f);
  return (q === 1 || q === 3) ? -1 / base : base;
}

// === Unit conversions ===
const degToRad = deg => deg * Math.PI / 180;
const rauToDeg = rau => (rau / 4) * 360;


function initRAUCanvas() {
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
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2;
    drawGrid(cx, cy, w, h);
    const r = Math.min(w, h) * 0.34;

    const param = parseFloat(slider.value);
    introPhase = param;
    const info = getRotationComponents(param);
    const x = cx + info.cos * r;
    const y = cy - info.sin * r;

    ctx.strokeStyle = '#ff4444';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.fillStyle = '#ff4444';
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fill();

    valueDisplay.textContent = param.toFixed(5);
    updateResultsDisplay();
  }

  slider.addEventListener('input', draw);
  draw();
}
