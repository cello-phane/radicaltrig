// ===========================
// RAU Unit Circle visualization
// ===========================

//section1
function initRAUCanvas() {
  const canvasSimple = document.getElementById('simpleCanvas');
  const ctxSimple    = canvasSimple.getContext('2d');
  const slider       = document.getElementById('paramSlider');
  const valueDisplay = document.getElementById('paramValue');

  const cx = canvasSimple.width / 2;
  const cy = canvasSimple.height / 2;
  let dragging = false;

  function currentEndpoint(param) {
    const introPhaseParam = getRotationComponents(param); // {sin, cos}
    const r = Math.min(canvasSimple.width, canvasSimple.height) * 0.34;
    return {
      x: cx + introPhaseParam.cos * r,
      y: cy - introPhaseParam.sin * r
    };
  }

  // ------------------------
  // DRAWING
  // ------------------------
  function draw() {
    const w = canvasSimple.width, h = canvasSimple.height;
    const r = Math.min(w, h) * 0.34;

    ctxSimple.clearRect(0, 0, w, h);

    drawGrid(cx, cy, w, h);

    // circle
    ctxSimple.strokeStyle = '#333';
    ctxSimple.lineWidth = 2;
    ctxSimple.beginPath();
    ctxSimple.arc(cx, cy, r, 0, Math.PI * 2);
    ctxSimple.stroke();

    // compute new endpoint from introPhase
    const info = getRotationComponents(introPhase);
    const px = cx + info.cos * r;
    const py = cy - info.sin * r;

    // radius
    ctxSimple.strokeStyle = '#ff4444';
    ctxSimple.lineWidth = 2.5;
    ctxSimple.beginPath();
    ctxSimple.moveTo(cx, cy);
    ctxSimple.lineTo(px, py);
    ctxSimple.stroke();

    // knob
    ctxSimple.fillStyle = '#ff4444';
    ctxSimple.beginPath();
    ctxSimple.arc(px, py, 7, 0, Math.PI * 2);
    ctxSimple.fill();
  }

  // ------------------------
  // GRID (unchanged)
  // ------------------------
  function drawGrid(cx, cy, w, h) {
    ctxSimple.strokeStyle = '#eee';
    ctxSimple.lineWidth = 1;
    for (let i = -10; i <= 10; i++) {
      ctxSimple.beginPath();
      ctxSimple.moveTo(cx + i * 40, 0);
      ctxSimple.lineTo(cx + i * 40, h);
      ctxSimple.stroke();
      ctxSimple.beginPath();
      ctxSimple.moveTo(0, cy + i * 40);
      ctxSimple.lineTo(w, cy + i * 40);
      ctxSimple.stroke();
    }
    ctxSimple.strokeStyle = '#666';
    ctxSimple.lineWidth = 2;
    ctxSimple.beginPath();
    ctxSimple.moveTo(cx, 0);
    ctxSimple.lineTo(cx, h);
    ctxSimple.moveTo(0, cy);
    ctxSimple.lineTo(w, cy);
    ctxSimple.stroke();
  }

  // ------------------------
  // DRAGGING HANDLERS
  // ------------------------

  canvasSimple.addEventListener('mousedown', e => {
    const rect = canvasSimple.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    // compute current handle pos
    const { x: hx, y: hy } = currentEndpoint(introPhase);
    const d = Math.hypot(mx - hx, my - hy);

    dragging = true;
  });

  canvasSimple.addEventListener('mousemove', e => {
    if (!dragging) return;

    const rect = canvasSimple.getBoundingClientRect();
    const mx = e.clientX - rect.left - cx;
    const my = e.clientY - rect.top - cy;
    // Standard angle from X-axis for the sliders
    // Now using atanVec with x and y as positive in xy order
    let standardAng = atanVec({ x: mx, y: my}, {x: 1, y: 0 });

    if (dragging) {
      controls.simpleSliderParam.value = standardAng;
      introPhase = parseFloat(slider.value);
      updateValueDisplay('paramValue', standardAng.toFixed(4)); // slider below canvas
      updateResultsDisplay(); // sidebar
      draw();
    }
  });

  // ------------------------
  // SLIDER → CANVAS UPDATE
  // ------------------------
  slider.addEventListener('input', () => {
    introPhase = parseFloat(slider.value);
    updateValueDisplay('paramValue', introPhase.toFixed(4));
    updateResultsDisplay();
    draw();
  });

  document.addEventListener('mouseup', () => dragging = false);
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

//section2
function initVectorCanvas() {
  const canvas = document.getElementById('vectorCanvas');
  const ctx = canvas.getContext('2d');
  let cx = canvas.width / 2;
  let cy = canvas.height / 2;
  canvas.addEventListener('mousedown', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const uEnd = {
      x: cx + currentU.x,
      y: cy + currentU.y
    };
    const vEnd = {
      x: cx + currentV.x,
      y: cy + currentV.y
    };

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
    // Now using atanVec with x and y as positive in xy order
    const standardAng = rauToDeg(atanVec({ x: mx, y: my }, { x: 1, y: 0 }));
    //const standardAng = Math.atan2(-my, mx) * 180 / Math.PI;
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

  function drawArcGradient(ctx, cx, cy, radius, startAngle, endAngle, color1, color2, segments = 180) {
    const angleStep = (endAngle - startAngle) / segments;

    for (let i = 0; i < segments; i++) {
      const t1 = i / segments;
      const t2 = (i + 1) / segments;
      const a1 = startAngle + t1 * (endAngle - startAngle);
      const a2 = startAngle + t2 * (endAngle - startAngle);

      // Interpolate colors
      const r = Math.round(color1[0] * (1 - t1) + color2[0] * t1);
      const g = Math.round(color1[1] * (1 - t1) + color2[1] * t1);
      const b = Math.round(color1[2] * (1 - t1) + color2[2] * t1);
      ctx.fillStyle = `rgb(${r},${g},${b})`;

      // build path for the trapezoid-like wedge slice (two radii lines and two arcs)
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, a1, a2);
      ctx.lineTo(cx, cy);
      ctx.fill();
    }
  }

  function render() {
    // const mode = controls.angleMode.value;
    const uLen = parseFloat(controls.uLength.value);
    const vLen = parseFloat(controls.vLength.value);
    const uAngle = parseFloat(controls.uAngle.value);
    const vAngle = parseFloat(controls.vAngle.value);
    const arcSegments = parseInt(controls.segments.value, 10);

    uAng = uAngle;
    vAng = vAngle;
    const uA = degToRad(uAngle);
    const vA = degToRad(vAngle);
    const u = {
      x: uLen * Math.cos(uA),
      y: -uLen * Math.sin(uA)
    };
    const v = {
      x: vLen * Math.cos(vA),
      y: -vLen * Math.sin(vA)
    };

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

    const signed = vAngle - uAngle; // in degrees
    ccw = signed > 0; // in degrees
    unsigned = Math.abs(signed); // in degrees
	anglebetweenDeg = unsigned;
    const arcRadius = 0.5 * Math.max(uLen, vLen);
    let startAngle = 0, endAngle = 0; // to store radians
    if (biasMode) { 
      const bias = ccw ? Math.PI * 2 : degToRad(unsigned);
      startAngle = Math.min(uA, vA + (ccw && vA < uA ? vA - Math.PI * 2 : vA + Math.PI * 2));
      endAngle = startAngle - degToRad(Math.max(startAngle, Math.abs(360 - (ccw ? signed : unsigned))));
      drawArcGradient(ctx, cx, cy, arcRadius,
            ccw ? bias - startAngle : -(vA + bias), // start
            ccw ? Math.abs(endAngle - Math.PI * 2) : -(uA - degToRad(unsigned)), // end
            [255, 100, 100], [100, 100, 255], arcSegments);
    }
    else if (angleWrapMode) {
      // Calculate the wrapped (long) arc
      const signedDeg = vAngle - uAngle;
      const ccw = signedDeg > 0;
      const unsignedDeg = Math.abs(signedDeg);
      const wrappedDeg = 360 - unsignedDeg;
      
      if (ccw) {
        // Draw from u going the long way CCW
        drawArcGradient(ctx, cx, cy, arcRadius,
          -uA + 2 * Math.PI,           // Start at u + full circle
          -uA + 2 * Math.PI + degToRad(wrappedDeg), // Add wrapped angle
          [255, 100, 100], [100, 100, 255], arcSegments);
      } else {
        // Draw from v going the long way CW  
        drawArcGradient(ctx, cx, cy, arcRadius,
          -vA - 2 * Math.PI,           // Start at v - full circle
          -vA - 2 * Math.PI + degToRad(wrappedDeg), // Add wrapped angle
          [255, 100, 100], [100, 100, 255], arcSegments);
      }
    }
    else if (defaultMode) {
      drawArcGradient(ctx, cx, cy, arcRadius, -Math.max(uA, vA), -Math.min(uA, vA), [255, 100, 100], [100, 100, 255], arcSegments);
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
