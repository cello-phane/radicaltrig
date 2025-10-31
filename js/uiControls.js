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
function updateResultsDisplay() {
  const rc = document.getElementById('resultsContent');
  const s1 = document.getElementById('section1');
  const isS1 = s1.classList.contains('active');

  if (isS1) {
    const p = currentPhaseSection1;
    const rs = radicalSine(p);
    const rc2 = radicalCosine(p);
    const rt = radicalTan(p);
    const deg = rauToDeg(p);
    const rad = degToRad(deg);

    rc.textContent = `RAU Phase = ${p.toFixed(15)}
Radian = ${rad.toFixed(15)} (${deg.toFixed(1)}°)
-----------
tan(θ) = ${Math.abs(rt) > 1e6 ? 'undefined' : rt.toFixed(15)}
sin(θ) = ${rs.toFixed(15)}
cos(θ) = ${rc2.toFixed(15)}`;
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
      const p = currentPhaseSection2;
      const rs = radicalSine(p);
      const rc2 = radicalCosine(p);
      const rt = radicalTan(p);
      const rad = degToRad(anglebetweenDeg);
      let signedDeg = anglebetweenDeg * (ccw ? 1 : -1);
      const undirDeg = Math.min(Math.abs(signedDeg), 360 - Math.abs(signedDeg));

      rc.textContent = `Vector u = (${fmt(u.x)}, ${fmt(u.y)})
  |u| = ${fmt(uMag)}
Vector v = (${fmt(v.x)}, ${fmt(v.y)})
  |v| = ${fmt(vMag)}
Dot product = ${fmt(dot)}
Cross product = ${fmt(cross)}
Signed angle (u→v) = ${signedDeg.toFixed(2)}° ${ccw ? '(CCW)' : '(CW)'}
Angle between = ${undirDeg.toFixed(2)}°
RAU Phase = ${p.toFixed(15)}
Radian = ${rad.toFixed(15)}
_______________________________
tan(θ) = ${Math.abs(rt) > 1e6 ? 'undefined' : rt.toFixed(15)}
sin(θ) = ${rs.toFixed(15)}
cos(θ) = ${rc2.toFixed(15)}`;
    } else {
      const uD = uAng;
      const vD = vAng;
      const uP = (uD / 360) * 4;
      const vP = (vD / 360) * 4;
      const uS = radicalSine(uP);
      const uC = radicalCosine(uP);
      const vS = radicalSine(vP);
      const vC = radicalCosine(vP);

      rc.textContent = `Vector u:
  Components = (${fmt(u.x)}, ${fmt(u.y)})
  Magnitude = ${fmt(uMag)}
  Angle from +x = ${uD.toFixed(2)}° (CCW)
  RAU Phase = ${uP.toFixed(6)}
  rsin(u) = ${uS.toFixed(6)}
  rcos(u) = ${uC.toFixed(6)}

Vector v:
  Components = (${fmt(v.x)}, ${fmt(v.y)})
  Magnitude = ${fmt(vMag)}
  Angle from +x = ${vD.toFixed(2)}° (CCW)
  RAU Phase = ${vP.toFixed(6)}
  rsin(v) = ${vS.toFixed(6)}
  rcos(v) = ${vC.toFixed(6)}

Dot product = ${fmt(dot)}
Cross product = ${fmt(cross)}`;
    }
  }
}


