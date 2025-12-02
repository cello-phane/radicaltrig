const controls={uLength:document.getElementById('uLength'),
	uAngle:document.getElementById('uAngle'),
	vLength:document.getElementById('vLength'),
	vAngle:document.getElementById('vAngle'),
	angleMode:document.getElementById('angleMode')};

function initUI() {
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
// ================================
// Create precision control UI
// ================================
function createPrecisionControl() {
  const container = document.createElement('div');
  container.id = 'precisionControl';
  container.style.cssText = `
    margin: 12px 0;
    padding: 12px;
    background: var(--bg);
    border-radius: 6px;
    border: 1px solid #ddd;
  `;
  
  const label = document.createElement('label');
  label.style.cssText = `
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    font-size: 13px;
  `;
  label.textContent = 'Precision:';
  
  const input = document.createElement('input');
  input.type = 'number';
  input.id = 'precisionInput';
  input.min = '0';
  input.max = maxDigitsofPrecision;
  input.value = displayPrecision;
  input.style.cssText = `
    width: 10%;
    padding: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 13px;
  `;
  
  input.addEventListener('change', (e) => {
    setPrecision(parseInt(e.target.value));
  });
  
  input.addEventListener('input', (e) => {
    setPrecision(parseInt(e.target.value) || 0);
  });
  
  const display = document.createElement('span');
  display.id = 'precisionDisplay';
  display.style.cssText = `
    margin-left: 8px;
    padding: 4px 8px;
    background: var(--accent);
    border-radius: 3px;
    font-family: monospace;
    font-size: 12px;
    color: var(--card);
  `;
  
  display.textContent = `${formatValue(Math.PI, displayPrecision)}`;
  
  input.addEventListener('input', () => {
    display.textContent = `${formatValue(Math.PI, parseInt(input.value) || 0)}`;
  });
  
  label.appendChild(input);
  label.appendChild(display);
  container.appendChild(label);
  
  return container;
}

// ================================
// Enhanced results display with precision
// ================================
// Results panel
function updateResultsDisplay() {
  const results = document.getElementById('resultsContent');
  const s1 = document.getElementById('section1');
  const isS1 = s1.classList.contains('active');

  if (isS1) {
    const p = introPhase;
    const rs = radicalSine(p);
    const rc = radicalCosine(p);
    const rt = radicalTan(p);
    const deg = rauToDeg(p);
    const radian = rauToRad(p);
	const degrees = radian/(Math.PI/180);

    results.textContent = `RAU Phase = ${formatValue(p)}
Radian = ${formatValue(radian)} (${degrees.toFixed(1)}°)
_______________________________
tan(θ) = ${Math.abs(rt) > 1e6 ? 'undefined' : formatValue(rt)}
sin(θ) = ${formatValue(rs)}
cos(θ) = ${formatValue(rc)}`;
  } else {
    const mode = controls.angleMode.value;
    const u = currentU;
    const v = currentV;
    const uMag = Math.sqrt(u.x * u.x + u.y * u.y);
    const vMag = Math.sqrt(v.x * v.x + v.y * v.y);
    const cross = u.x * v.y - u.y * v.x;
    const dot = u.x * v.x + u.y * v.y;
    const fmt = (n, w = 8, d = 2) => n.toFixed(d).padStart(w);

    if (mode === 'between') {
      let p = atanVec(u, v);
	  p = ccw ? 4-p : p;
	  const rs = radicalSine(p);
      const rc = radicalCosine(p);
      const rt = radicalTan(p);
      const rad = rauToRad(p);
      let signedDeg = anglebetweenDeg * (ccw ? 1 : -1);
      signedDeg = formatValue(signedDeg, 1);
      const undirDeg = formatValue(Math.min(Math.abs(signedDeg), Math.abs(signedDeg)), 1);
	  
      results.textContent = `Vector u = (${fmt(u.x)}, ${fmt(u.y)})
  |u| = ${fmt(uMag)}
Vector v = (${fmt(v.x)}, ${fmt(v.y)})
  |v| = ${fmt(vMag)}
Dot product = ${fmt(dot)}
Cross product = ${fmt(cross)}
_______________________________
Signed angle (u→v) = ${signedDeg}° ${ccw ? '(CCW)' : '(CW)'}
Angle between = ${undirDeg}°
_______________________________
RAU Phase = ${formatValue(p)}
Radian = ${formatValue(rad)}
_______________________________
tan(θ) = ${Math.abs(rt) > 1e6 ? 'undefined' : formatValue(rt)}
sin(θ) = ${formatValue(rs)}
cos(θ) = ${formatValue(rc)}`;
    } else {
      const uD = uAng;
      const vD = vAng;
	  const refvec = {x: 1, y: 0};
      const uP = atanVec(u, refvec);
      const vP = atanVec(v, refvec);
      const uS = radicalSine(uP);
      const uC = radicalCosine(uP);
      const vS = radicalSine(vP);
      const vC = radicalCosine(vP);

      results.textContent = `Vector u:
  Components = (${fmt(u.x)}, ${fmt(u.y)})
  Magnitude = ${fmt(uMag)}
  _______________________________
  Angle from +x = ${uD}° (CCW)
  RAU Phase = ${formatValue(uP)}
  _______________________________
  rsin(u) = ${formatValue(uS)}
  rcos(u) = ${formatValue(uC)}

Vector v:
  Components = (${fmt(v.x)}, ${fmt(v.y)})
  Magnitude = ${fmt(vMag)}
  _______________________________
  Angle from +x = ${vD}° (CCW)
  RAU Phase = ${formatValue(vP)}
  _______________________________
  rsin(v) = ${formatValue(vS)}
  rcos(v) = ${formatValue(vC)}

Dot product = ${fmt(dot)}
Cross product = ${fmt(cross)}`;
    }
  }
}
