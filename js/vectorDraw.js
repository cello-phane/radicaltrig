// ===========================
// RAU Unit Circle visualization
// ===========================

//section1
function initRAUCanvas() {
  const canvasSimple = document.getElementById('simpleCanvas');
  const ctxSimple    = canvasSimple.getContext('2d');
  const slider       = document.getElementById('paramSlider');
  const valueDisplay = document.getElementById('paramValue');
  let cx = canvasSimple.width / 2;
  let cy = canvasSimple.height / 2;
  let dragging = false;

  function currentEndpoint(param) {
    const introPhaseParam = getRotationComponents(param);
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
    ctxSimple.arc(px, py, 6, 0, Math.PI * 2);
    ctxSimple.fill();
  }

  // ------------------------
  // GRID
  // ------------------------
  function drawGrid(cx, cy, w, h) {
    ctxSimple.strokeStyle = '#555';
    ctxSimple.lineWidth = 1;
    for (let i = -10; i <= 10; i++) {
      ctxSimple.beginPath();
      ctxSimple.moveTo(cx + i * 68, 0);
      ctxSimple.lineTo(cx + i * 68, h);
      ctxSimple.stroke();
      ctxSimple.beginPath();
      ctxSimple.moveTo(0, cy + i * 34);
      ctxSimple.lineTo(w, cy + i * 34);
      ctxSimple.stroke()
    }
    ctxSimple.strokeStyle = '#444';
    ctxSimple.lineWidth = 2;
    ctxSimple.beginPath();
    ctxSimple.moveTo(cx, 0);
    ctxSimple.lineTo(cx, h);
    ctxSimple.moveTo(0, cy);
    ctxSimple.lineTo(w, cy);
    ctxSimple.stroke();
  }

  // ------------------------
  // UPDATE POSITION (shared logic)
  // ------------------------
  function updatePosition(mx, my) {
    const standardAng = atanVec({ x: mx - cx, y: my - cy }, { x: 1, y: 0 });
    
    controls.simpleSliderParam.value = standardAng;
    introPhase = standardAng;
    controls.introPhaseTextBox.value = standardAng;
    
    updateValueDisplay('paramValue', formatValue(standardAng));
    updateResultsDisplay();
    draw();
  }

  // ------------------------
  // CLICK HANDLER
  // ------------------------
  canvasSimple.addEventListener('click', e => {
    if (dragging) return; // Don't trigger on drag release
    
    const rect = canvasSimple.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    
    updatePosition(mx, my);
  });

  // ------------------------
  // DRAGGING HANDLERS
  // ------------------------
  canvasSimple.addEventListener('mousedown', e => {
    dragging = true; // Activate
  });
	
  canvasSimple.addEventListener('mousemove', e => {
    if (!dragging) return; // Detect if mouse is held and dragging
    const rect = canvasSimple.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    updatePosition(mx, my);
  });

  document.addEventListener('mouseup', () => {
    dragging = false; // Don't trigger on mouse hover
  });

  // ------------------------
  // SLIDER → CANVAS UPDATE
  // ------------------------
  slider.addEventListener('input', () => {
    introPhase = parseFloat(slider.value);
    updateValueDisplay('paramValue', formatValue(introPhase));
    updateResultsDisplay();
    draw();
  });

  valueDisplay.addEventListener('change', () => {
    introPhase = parseFloat(valueDisplay.value);
    slider.value = introPhase;
    updateResultsDisplay();
    draw();
  });

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
    updateValueDisplay('paramValue', introPhase.toFixed(6));
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

  function drawArcGradient(ctx, cx, cy, radius, startAngle, endAngle, color1, color2) {
	  // Normalize angle difference
	  let angleDiff = endAngle - startAngle;
	  while (angleDiff > Math.PI * 2) angleDiff -= Math.PI * 2;
	  while (angleDiff < -Math.PI * 2) angleDiff += Math.PI * 2;
	  
	  const absAngleDiff = Math.abs(angleDiff);
	  
	  // For tiny arcs, just use solid color (performance optimization)
	  if (absAngleDiff < 0.01) {
	    ctx.fillStyle = `rgb(${color1[0]},${color1[1]},${color1[2]})`;
	    ctx.beginPath();
	    ctx.moveTo(cx, cy);
	    ctx.arc(cx, cy, radius, startAngle, endAngle);
	    ctx.closePath();
	    ctx.fill();
	    return;
	  }
	  
	  // Try conic gradient (best performance, single draw call)
	  if (ctx.createConicGradient) {
	    const gradient = ctx.createConicGradient(startAngle, cx, cy);
	    const fraction = absAngleDiff / (Math.PI * 2);
	    
	    gradient.addColorStop(0, `rgb(${color1[0]},${color1[1]},${color1[2]})`);
	    gradient.addColorStop(fraction, `rgb(${color2[0]},${color2[1]},${color2[2]})`);
	    
	    // For arcs larger than 180°, add intermediate stops for better gradient
	    if (fraction > 0.5) {
	      const midR = Math.round((color1[0] + color2[0]) / 2);
	      const midG = Math.round((color1[1] + color2[1]) / 2);
	      const midB = Math.round((color1[2] + color2[2]) / 2);
	      gradient.addColorStop(0.5, `rgb(${midR},${midG},${midB})`);
	    }
	    
	    ctx.fillStyle = gradient;
	    ctx.beginPath();
	    ctx.moveTo(cx, cy);
	    ctx.arc(cx, cy, radius, startAngle, endAngle);
	    ctx.closePath();
	    ctx.fill();
	    return;
	  }
	  
	  // Fallback: segment-based approach with adaptive quality
	  const segments = Math.max(6, Math.min(48, Math.ceil(arcLength / 15)));
	  const arcLength = absAngleDiff * radius;
	  const angleStep = angleDiff / segments;
	  
	  for (let i = 0; i < segments; i++) {
	    const t1 = i / segments;
	    const t2 = (i + 1) / segments;
	    const a1 = startAngle + angleStep * i;
	    const a2 = startAngle + angleStep * (i + 1);
	    
	    // Get edge points for linear gradient
	    const x1 = cx + Math.cos(a1) * radius;
	    const y1 = cy + Math.sin(a1) * radius;
	    const x2 = cx + Math.cos(a2) * radius;
	    const y2 = cy + Math.sin(a2) * radius;
	    
	    // Create gradient for this segment
	    const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
	    
	    // Interpolate colors
	    const r1 = Math.round(color1[0] * (1 - t1) + color2[0] * t1);
	    const g1 = Math.round(color1[1] * (1 - t1) + color2[1] * t1);
	    const b1 = Math.round(color1[2] * (1 - t1) + color2[2] * t1);
	    
	    const r2 = Math.round(color1[0] * (1 - t2) + color2[0] * t2);
	    const g2 = Math.round(color1[1] * (1 - t2) + color2[1] * t2);
	    const b2 = Math.round(color1[2] * (1 - t2) + color2[2] * t2);
	    
	    gradient.addColorStop(0, `rgb(${r1},${g1},${b1})`);
	    gradient.addColorStop(1, `rgb(${r2},${g2},${b2})`);
	    
	    ctx.fillStyle = gradient;
	    ctx.beginPath();
	    ctx.moveTo(cx, cy);
	    ctx.arc(cx, cy, radius, a1, a2);
	    ctx.closePath();
	    ctx.fill();
	  }
  }
  
  function render() {
    // const mode = controls.angleMode.value;
    const uLen = parseFloat(controls.uLength.value);
    const vLen = parseFloat(controls.vLength.value);
    const uAngle = parseFloat(controls.uAngle.value);
    const vAngle = parseFloat(controls.vAngle.value);

    const uA = degToRad(uAngle);
    const vA = degToRad(vAngle);
	  
	// Lose precision from an integral degree input if this is used
	// (would need higher precision float!)
	// let uCS = getRotationComponents(radToRau(degToRad(uAngle)));
	// let vCS = getRotationComponents(radToRau(degToRad(vAngle)));

    const u = {
      x: uLen * Math.cos(uA),
      y: -uLen * Math.sin(uA)
      // x: uLen * uCS.cos,
      // y: -uLen * uCS.sin
	};
    const v = {
      x: vLen * Math.cos(vA),
      y: -vLen * Math.sin(vA)
	  // x: vLen * vCS.cos,
      // y: -vLen * vCS.sin
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
	 anglebetweenDeg = unsigned; // update the global var
    const arcRadius = 0.5 * Math.max(uLen, vLen);
    let startAngle = 0, endAngle = 0; // to store radians
    if (biasMode) { 
      const bias = ccw ? Math.PI * 2 : degToRad(unsigned);
      startAngle = Math.min(uA, bias);
      endAngle = startAngle - degToRad(Math.abs(360 - (ccw ? signed : unsigned)));
      drawArcGradient(ctx, cx, cy, arcRadius,
            ccw ? bias - startAngle : -(vA + bias), // Start at u always
            ccw ? Math.abs(endAngle - Math.PI * 2) : -(uA - degToRad(unsigned)), // Wrap around ccw if going positive
            [255, 100, 100], [100, 100, 255]);
      anglebetweenDeg = !ccw ? 360 + radToDeg(endAngle - startAngle) : radToDeg(startAngle - endAngle);
    }
    else if (angleWrapMode) {
      // Draw from u going the long way CCW
      drawArcGradient(ctx, cx, cy, arcRadius,
        (ccw ? -uA : -vA) + 2 * Math.PI, // Start at u or v + full circle
        (ccw ? -uA : -vA) + 2 * Math.PI + degToRad(360 - unsigned), // Wrap angle
        [255, 100, 100], [100, 100, 255]);
    }
    else if (defaultMode) {
      drawArcGradient(ctx, cx, cy, arcRadius, -Math.max(uA, vA), -Math.min(uA, vA), [255, 100, 100], [100, 100, 255]);
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
