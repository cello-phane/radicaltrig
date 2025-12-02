// ===========================
// RAU Unit Circle visualization
// ===========================

function initRAUCanvas() {
  const canvas       = document.getElementById('vectorCanvas');
  const ctx          = canvas.getContext('2d');
  const slider       = document.getElementById('paramSlider');
  const valueDisplay = document.getElementById('paramValue');

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

function updateValueDisplay(id, value, suffix = '') {
  const el = document.getElementById(id);
  if (!el) return;
  
  // If value is already formatted, use it directly
  const displayValue = typeof value === 'number' ? formatValue(value) : value;
  el.textContent = `${displayValue}${suffix}`;
}

function updateAllDisplays() {
  // Update RAU phase display
  if (introPhase !== undefined) {
    updateValueDisplay('paramValue', formatValue(introPhase));
  }
  // Update results content
  updateResultsDisplay();
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
    
    // Standard angle from X-axis for the sliders
    const standardAng = Math.atan2(-my, mx) * 180 / Math.PI;
    const angleDeg = (standardAng + 360) % 360;
  
    if (dragging === 'u') {
      controls.uLength.value = len;
      controls.uAngle.value = angleDeg;
      updateValueDisplay('uLengthVal', formatValue(len, 0));
      updateValueDisplay('uAngleVal', formatValue(angleDeg, 0), '°');
    } else if (dragging === 'v') {
      controls.vLength.value = len;
      controls.vAngle.value = angleDeg;
      updateValueDisplay('vLengthVal', formatValue(len, 0));
      updateValueDisplay('vAngleVal', formatValue(angleDeg, 0), '°');
    }
  
    render(); // This calls updateResultsDisplay() which uses atanVec for sidebar
  });

  document.addEventListener('mouseup', () => dragging = null);
  function drawArcGradient(ctx, cx, cy, radius, startAngle, endAngle, color1, color2) {
    const segments = 120; // Smoothness
    const angleStep = (endAngle - startAngle) / segments;
    
    for (let i = 0; i < segments; i++) {
      const a1 = startAngle + angleStep * i;
      const a2 = startAngle + angleStep * (i + 1);
      
      // Interpolate color
      const t = i / segments;
      const r = Math.round(color1[0] * (1 - t) + color2[0] * t);
      const g = Math.round(color1[1] * (1 - t) + color2[1] * t);
      const b = Math.round(color1[2] * (1 - t) + color2[2] * t);
      
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, a1, a2);
      ctx.lineTo(cx, cy);
      ctx.fill();
    }
  }
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
    
    if (angleWrapMode) {    
	    vectorPhase = (anglebetweenDeg / 360) * 4;
		const bias = ccw ? Math.PI*2 : degToRad(anglebetweenDeg);
		const startAngle = ccw ? Math.max(uA, vA) : (Math.PI/2) - bias;
		const endAngle = startAngle - degToRad(Math.max(startAngle, Math.abs(360 - (ccw ? 360+signed : anglebetweenDeg))));
		//if (bias<Math.abs(uA)) console.log(-(vA+bias), uA+degToRad(signed)); // going CW
		const arcRadius = 0.5*Math.max(uLen,vLen);
		drawArcGradient(ctx, cx, cy, arcRadius, ccw ? bias - startAngle : -(vA+bias), ccw ? Math.abs(endAngle-Math.PI*2) : -(uA+degToRad(signed)), [255, 100, 100], [100, 100, 255]);
    }
	else {
		// Unfold: adjust vA if it wraps around to maintain directional logic
		let adjustedVA = vA;
		if (ccw && vA < uA) adjustedVA += Math.PI * 2;
		else if (!ccw && vA > uA) adjustedVA -= Math.PI * 2;
		const bias = ccw ? Math.PI*2 : degToRad(anglebetweenDeg);
		const startAngle = Math.min(uA, adjustedVA);
		const endAngle = startAngle - degToRad(Math.max(startAngle, Math.abs(360 - (ccw ? signed : anglebetweenDeg))));
		const arcRadius = 0.5 * Math.min(uLen, vLen);
		drawArcGradient(ctx, cx, cy, arcRadius, ccw ? bias - startAngle : -(vA+bias), ccw ? Math.abs(endAngle-Math.PI*2) : -(uA+degToRad(signed)), [255, 100, 100], [100, 100, 255]);
	}
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
