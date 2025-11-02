// ===========================
// RAU Unit Circle visualization
// ===========================
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
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2;
    drawGrid(cx, cy, w, h);

    const r = Math.min(w, h) * 0.34;
    const param = parseFloat(slider.value);
    introPhase = param;

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

    valueDisplay.textContent = param.toFixed(4);
    updateResultsDisplay();
  }

  slider.addEventListener('input', draw);
  draw();
}

function updateValueDisplay(id, value, suffix='') {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = `${value}${suffix}`;
}

function initVectorCanvas() {
  const canvas = document.getElementById('simpleCanvas');
  const ctx = canvas.getContext('2d');
  let cx = canvas.width / 2;
  let cy = canvas.height / 2;

  let dragging = null; // 'u' or 'v'

  canvas.addEventListener('mousedown', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const uEnd = { x: cx + currentU.x, y: cy + currentU.y };
    const vEnd = { x: cx + currentV.x, y: cy + currentV.y };

    const distU = Math.hypot(mx - uEnd.x, my - uEnd.y);
    const distV = Math.hypot(mx - vEnd.x, my - vEnd.y);
    if (distU < 12) dragging = 'u';
    else if (distV < 12) dragging = 'v';
  });

  canvas.addEventListener('mousemove', e => {
    if (!dragging) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left - cx;
    const my = e.clientY - rect.top - cy;
    const len = Math.sqrt(mx * mx + my * my);
    const u = { x: -my, y: mx };
    const v = { x: 1,  y: 0 };
    const ang = Math.atan2(u) * 180 / Math.PI;
    const angDisplay = rauToDeg(atanVec(u, v)) * 180 / Math.PI;
    const mouse = { x: -my, y: mx };
    const ref = { x: 1,  y: 0 };//from the x-axis
    const ang = Math.atan2(mouse.x, mouse.y) * 180 / Math.PI;
    const angDisplay = rauToDeg(atanVec(mouse, ref)) * 180 / Math.PI;

    if (dragging === 'u') {
      controls.uLength.value = len;
      controls.uAngle.value = (ang + 360) % 360;
      updateValueDisplay('uLengthVal', len.toFixed(0));
      updateValueDisplay('uAngleVal', ((angDisplay + 360) % 360).toFixed(0), '°');
    } else if (dragging === 'v') {
      controls.vLength.value = len;
      controls.vAngle.value = (ang + 360) % 360;
      updateValueDisplay('vLengthVal', len.toFixed(0));
      updateValueDisplay('vAngleVal', ((angDisplay + 360) % 360).toFixed(0), '°');
    }

    render();
  });

  document.addEventListener('mouseup', () => dragging = null);

  function render() {
    const mode = controls.angleMode.value;
    const uLen = parseFloat(controls.uLength.value);
    const vLen = parseFloat(controls.vLength.value);
    const uAngle = parseFloat(controls.uAngle.value);
    const vAngle = parseFloat(controls.vAngle.value);
    uAng = uAngle;
    vAng = vAngle;
    const uA = degToRad(uAngle);
    const vA = degToRad(vAngle);
    const u = { x: uLen * Math.cos(uA), y: -uLen * Math.sin(uA) };
    const v = { x: vLen * Math.cos(vA), y: -vLen * Math.sin(vA) };
    currentU = u;
    currentV = v;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    for (let i = -10; i <= 10; i++) {
      ctx.beginPath();
      ctx.moveTo(cx + i * 50, 0);
      ctx.lineTo(cx + i * 50, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, cy + i * 50);
      ctx.lineTo(canvas.width, cy + i * 50);
      ctx.stroke();
    }

    // draw u and v vectors
    ctx.strokeStyle = '#ff4444';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + u.x, cy + u.y);
    ctx.stroke();

    ctx.strokeStyle = '#4444ff';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + v.x, cy + v.y);
    ctx.stroke();

    ctx.fillStyle = '#ff4444';
    ctx.beginPath();
    ctx.arc(cx + u.x, cy + u.y, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#4444ff';
    ctx.beginPath();
    ctx.arc(cx + v.x, cy + v.y, 6, 0, Math.PI * 2);
    ctx.fill();

    const signed = vAngle - uAngle;
    ccw = signed > 0;
    anglebetweenDeg = Math.abs(signed);
    vectorPhase = (anglebetweenDeg / 360) * 4;

    updateResultsDisplay();
 }

Object.entries(controls).forEach(([key, control]) => {
    control.addEventListener('input', e => {
      const val = e.target.value;
      if (key === 'uAngle' || key === 'vAngle')
        updateValueDisplay(key + 'Val', val, '°');
      else
        updateValueDisplay(key + 'Val', val);
      render();
    });
  });
  render();
}
