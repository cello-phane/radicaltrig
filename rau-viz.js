// ============================================up
// Global State
// ============================================
let currentPhaseSection1 = 0;
let currentPhaseSection2 = 0;
let currentU = { x: 120, y: 0 };
let currentV = { x: 100, y: 0 };

// ============================================
// RAU Math Functions
// ============================================
function radicalSine(t) {
  t = t % 4;
  const quadrant = Math.floor(t);
  const lt = t - quadrant;
  const a = 1 - 2*lt + 2*lt*lt;
  switch(quadrant){
    case 0: return lt/Math.sqrt(a);
    case 1: return (1-lt)/Math.sqrt(a);
    case 2: return -lt/Math.sqrt(a);
    case 3: return -(1-lt)/Math.sqrt(a);
    default: return 0; // Safety fallback
  }
}

function radicalCosine(t) {
  t = t % 4;
  const quadrant = Math.floor(t);
  const lt = t - quadrant;
  const a = 1 - 2*lt + 2*lt*lt;
  switch(quadrant){
    case 0: return (1-lt)/Math.sqrt(a);
    case 1: return -lt/Math.sqrt(a);
    case 2: return -(1-lt)/Math.sqrt(a);
    case 3: return lt/Math.sqrt(a);
    default: return 0; // Safety fallback
  }
}

function radicalTan(t) {
  t = ((t % 4) + 4) % 4;
  const q = Math.floor(t);
  const f = t - q;
  if (f >= 0.999999) return 0;
  const base = f / (1.0 - f);
  return (q === 1 || q === 3) ? -1.0 / base : base;
}

function getRAUComponents(t) {
  const tt = Math.max(0, Math.min(0.999999, t));
  const denom = 1.0 / Math.sqrt(1.0 - 2.0*tt + 2.0*tt*tt);
  const rcos = (1.0 - tt) * denom;
  const rsin = tt * denom;
  return { cos: rcos, sin: rsin };
}

function getRotationComponents(param) {
  let p = param;
  if (!isFinite(p)) p = 0;
  if (p < 0) p = 0;
  const q = Math.floor(p) % 4;
  const frac = p - Math.floor(p);
  const { cos: c, sin: s } = getRAUComponents(frac);
  /*
  let cos_result, sin_result;
  switch (q) {
    case 0: cos_result = c; sin_result = s; break;
    case 1: cos_result = -s; sin_result = c; break;
    case 2: cos_result = -c; sin_result = -s; break;
    case 3: cos_result = s; sin_result = -c; break;
  }*/
  const q0 = Number(q === 0);
  const q1 = Number(q === 1);
  const q2 = Number(q === 2);
  const q3 = Number(q === 3);
  let cos_result = c*q0 - s*q1 - c*q2 + s*q3;
  let sin_result = (s*q0 + c*q1 - s*q2 - c*q3) * Math.sign(param); 
  return { cos: cos_result, sin: sin_result, quadrant: q, fraction: frac };
}

function degToRad(deg) { return deg * Math.PI/180; }

function radToDeg(rad) { return rad*180/Math.PI; }

function atanVec(u,v) {
  const mix = (a, b, c) => c ? b : a;
  const cross = u.x * v.y - u.y * v.x;
  const dot = u.x * v.x + u.y * v.y;
  let angle = Math.abs(cross) / (Math.abs(dot) + Math.abs(cross));
  const q4fix = mix(Math.sign(cross) * angle, 4.0 - angle, dot > 0 && cross < 0);
  const qblend = mix(mix(q4fix, angle, cross > dot), angle + 1.0, cross < 0 && dot < 0);
  const halfrot = mix(2.0 - angle, angle + 2.0, cross < 0);
  return mix(qblend, halfrot, dot < 0);
}

// ============================================
// Display Update Function
// ============================================
function updateResultsDisplay() {
  const resultsContent = document.getElementById('resultsContent');
  const s1 = document.getElementById('section1');
  const isSection1Active = s1.classList.contains('active');
  
  if (isSection1Active) {
    // Section 1: Only show RAU phase and trig values
    const phase = currentPhaseSection1;
    const rauSin = radicalSine(phase);
    const rauCos = radicalCosine(phase);
    const rauTan = radicalTan(phase);
    const rauRad = (phase / 4) * 2.0 * Math.PI;
    const rauDeg = (phase / 4) * 360;
    
    resultsContent.textContent = `RAU Phase = ${phase.toFixed(3)}
θ (Radians) = ${rauRad.toFixed(3)} (${rauDeg.toFixed(1)}°)
-----------
tan(θ) = ${rauTan === 0 ? 'undefined' : rauTan.toFixed(4)}
sin(θ) = ${rauSin.toFixed(3)}
cos(θ) = ${rauCos.toFixed(3)}`;
  } else {
    // Section 2: Show vector info + RAU values
    const phase = currentPhaseSection2;
    const u = currentU;
    const v = currentV;
    const cross = u.x * v.y - u.y * v.x;
    const dot = u.x * v.x + u.y * v.y;
    const rauSin = radicalSine(phase);
    const rauCos = radicalCosine(phase);
    const rauTan = radicalTan(phase);
    const rauRad = (phase / 4) * 2.0 * Math.PI;
    const rauDeg = (phase / 4) * 360;
    
    const formatNum = (num, width=8, decimals=2) => num.toFixed(decimals).padStart(width);
    
    resultsContent.textContent = `u = (${formatNum(u.x)}, ${formatNum(u.y)})
v = (${formatNum(v.x)}, ${formatNum(v.y)})
Cross = ${formatNum(cross)}
Dot   = ${formatNum(dot)}
-----------
RAU Phase = ${phase.toFixed(3)}
θ (Radians) = ${rauRad.toFixed(3)} (${rauDeg.toFixed(1)}°)
-----------
tan(θ) = ${rauTan === 0 ? 'undefined' : rauTan.toFixed(4)}
sin(θ) = ${rauSin.toFixed(3)}
cos(θ) = ${rauCos.toFixed(3)}`;
  }
}

// ============================================
// Conversion Diagram
// ============================================
const convCanvas = document.getElementById("conversionCanvas");
const convCtx = convCanvas.getContext("2d");
const convPanel = document.getElementById("conversionPanel");
const showConv = document.getElementById("showConversion");

function drawConversionDiagram(rauPhase) {
    const ctx = convCtx;
    const w = convCanvas.width;  // use actual width
    const h = convCanvas.height; // use actual height
    ctx.clearRect(0, 0, w, h);
  
    const r = Math.min(w, h) * 0.3; // radius scales with canvas size
    const cx = w/2, cy = h/2;
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2*Math.PI);
    ctx.stroke();

    ctx.fillStyle = "#333";
    ctx.font = "11px monospace";

    const labels = [
      { t: 0, label: "1 RAU\n90°" },
      { t: 1, label: "0 RAU\n0°/360°" },
      { t: 2, label: "3 RAU\n270°" },
      { t: 3, label: "2 RAU\n180°" }
    ];
    labels.forEach(l => {
      const a = (l.t/4)*2*Math.PI - Math.PI/2;
      const x = cx + Math.cos(a)*(r + 28);
      const y = cy + Math.sin(a)*(r + 28);
      l.label.split("\n").forEach((line, i)=>{
        ctx.fillText(line, x - 18, y + i*12);
      });
    });

    const quadColors = ["#5cc0ff", "#ffb35c", "#d28aff", "#68e186"];
    for (let q = 0; q < 4; q++) {
      ctx.strokeStyle = quadColors[q];
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, r, (q/4)*2*Math.PI - Math.PI/2, ((q+1)/4)*2*Math.PI - Math.PI/2);
      ctx.stroke();
    }

    const theta = (rauPhase / 4) * 2 * Math.PI;
    const px = cx - Math.sin(theta - Math.PI/2) * r;
    const py = cy + Math.cos(theta + Math.PI/2) * r;
    
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(px, py, 6, 0, 2*Math.PI);
    ctx.fill();
}
function updateConversionDisplay() {
  const s1 = document.getElementById('section1');
  const isSection1Active = s1.classList.contains('active');
  const phase = isSection1Active ? currentPhaseSection1 : currentPhaseSection2;
  const showConv = document.getElementById('showConversion');
  if (showConv.checked) {
    drawConversionDiagram(phase);
  }
}

function resizeConversionCanvas() {
  const canvas = document.getElementById('conversionCanvas');
  const container = document.getElementById('conversionPanel');
  
  // Set canvas resolution to match container
  const width = container.clientWidth - 6; // subtract padding (3px each side)
  canvas.width = width;
  canvas.height = width; // square canvas
  
  // Redraw if it's visible
  const showConv = document.getElementById('showConversion');
  if (showConv.checked) {
    updateConversionDisplay();
  }
}

// ============================================
// Section Toggle Logic
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggleButton');
  const s1 = document.getElementById('section1');
  const s2 = document.getElementById('section2');
  
  toggleBtn.addEventListener('click', () => {
    const showing1 = s1.classList.contains('active');
    s1.classList.toggle('active', !showing1);
    s2.classList.toggle('active', showing1);
    toggleBtn.textContent = showing1 ? 'Switch to Introduction' : 'Switch to Vector Diagram';
    updateResultsDisplay();
    updateConversionDisplay();
  });

  // ============================================
  // Formula Panel Logic
  // ============================================
  const formulaPanel = document.getElementById('formulaPanel');
  const formulaHeader = document.getElementById('formulaHeader');
  const formulaChevron = document.getElementById('formulaChevron');

  let isSlim = false;
  function setSlimMode(slim) {
    isSlim = !!slim;
    if (isSlim) {
      formulaPanel.classList.add('slim');
      formulaChevron.textContent = '▶';
    } else {
      formulaPanel.classList.remove('slim');
      formulaChevron.textContent = '◀';
      if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise().catch(console.error);
      }
    }
  }

  formulaChevron.addEventListener('click', () => {
    setSlimMode(!isSlim);
  });
  
  setSlimMode(false);
  dragElement(formulaPanel);

  // ============================================
  // Section 1: RAU Canvas
  // ============================================
  (function() {
    const canvas = document.getElementById('vectorCanvas');
    const ctx = canvas.getContext('2d');
    const slider = document.getElementById('paramSlider');
    const valueDisplay = document.getElementById('paramValue');

    function drawGrid(cx, cy, w, h, scale=50) {
      ctx.save();
      ctx.strokeStyle = '#eee';
      ctx.lineWidth = 1;
      for (let i = -Math.floor(w/scale); i <= Math.floor(w/scale); i++) {
        ctx.beginPath();
        ctx.moveTo(cx + i*scale, 0);
        ctx.lineTo(cx + i*scale, h);
        ctx.stroke();
      }
      for (let j = -Math.floor(h/scale); j <= Math.floor(h/scale); j++) {
        ctx.beginPath();
        ctx.moveTo(0, cy + j*scale);
        ctx.lineTo(w, cy + j*scale);
        ctx.stroke();
      }
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, 0); ctx.lineTo(cx, h);
      ctx.moveTo(0, cy); ctx.lineTo(w, cy);
      ctx.stroke();
      ctx.restore();
    }

    function draw() {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0,0,W,H);
      const cx = W/2, cy = H/2;
      drawGrid(cx, cy, W, H, 40);

      const radius = Math.min(W,H) * 0.34;
      ctx.save();
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI*2);
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.setLineDash([6,6]);
      ctx.strokeStyle = '#888';
      ctx.lineWidth = 1;
      ctx.beginPath();

      ctx.moveTo(cx + radius, cy);
      ctx.lineTo(cx, cy - radius);
      ctx.moveTo(cx, cy - radius);
      ctx.lineTo(cx - radius, cy);
      ctx.moveTo(cx - radius, cy);
      ctx.lineTo(cx, cy + radius);
      ctx.moveTo(cx, cy + radius);
      ctx.lineTo(cx + radius, cy);

      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      const param = parseFloat(slider.value);
      currentPhaseSection1 = param;
      const info = getRotationComponents(param);

      const x = cx + info.cos * radius;
      const y = cy - info.sin * radius;

      ctx.save();
      ctx.strokeStyle = '#00aa00';
      ctx.lineWidth = 3;
      ctx.beginPath();
      switch (info.quadrant) {
        case 0: ctx.moveTo(cx + radius, cy); ctx.lineTo(cx, cy - radius); break;
        case 1: ctx.moveTo(cx, cy - radius); ctx.lineTo(cx - radius, cy); break;
        case 2: ctx.moveTo(cx - radius, cy); ctx.lineTo(cx, cy + radius); break;
        case 3: ctx.moveTo(cx, cy + radius); ctx.lineTo(cx + radius, cy); break;
      }
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.strokeStyle = '#ff4444';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x, y);
      ctx.stroke();

      ctx.fillStyle = '#ff4444';
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();

      valueDisplay.textContent = param.toFixed(2);
      updateResultsDisplay();
      updateConversionDisplay();
    }

    slider.addEventListener('input', draw);
    draw();

    // Setup responsive canvas with redraw callback
    setupResponsiveCanvas('vectorCanvas', 0.642, draw);
    
      if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise().catch(console.error);
      }
    })();

  // ============================================
  // Section 2: Vector Diagram
  // ============================================
  (function() {
    const canvas = document.getElementById('simpleCanvas');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width/2;
    const centerY = canvas.height/2;
    
    const controls = {
      uLength: document.getElementById('uLength'),
      uAngle: document.getElementById('uAngle'),
      vLength: document.getElementById('vLength'),
      vAngle: document.getElementById('vAngle')
    };

    function drawArrow(ctx, fromX, fromY, toX, toY, color, width=2){
      const headLen = 12;
      const dx = toX - fromX, dy = toY - fromY;
      const angle = Math.atan2(dy, dx);
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(toX, toY);
      ctx.lineTo(toX - headLen*Math.cos(angle-Math.PI/6), toY - headLen*Math.sin(angle-Math.PI/6));
      ctx.moveTo(toX, toY);
      ctx.lineTo(toX - headLen*Math.cos(angle+Math.PI/6), toY - headLen*Math.sin(angle+Math.PI/6));
      ctx.stroke();
    }
    
    function drawGrid(ctx, width, height, scale=50){
      ctx.strokeStyle = '#ddd';
      ctx.lineWidth = 1;
      for(let i = -Math.floor(width/scale); i <= Math.floor(width/scale); i++){
        ctx.beginPath();
        ctx.moveTo(centerX + i*scale, 0);
        ctx.lineTo(centerX + i*scale, height);
        ctx.stroke();
      }
      for(let j = -Math.floor(height/scale); j <= Math.floor(height/scale); j++){
        ctx.beginPath();
        ctx.moveTo(0, centerY + j*scale);
        ctx.lineTo(width, centerY + j*scale);
        ctx.stroke();
      }
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX, 0); ctx.lineTo(centerX, height);
      ctx.moveTo(0, centerY); ctx.lineTo(width, centerY);
      ctx.stroke();
    }

    function drawChordConnection(ctx, u, v, radius) {
      const uMag = Math.sqrt(u.x*u.x + u.y*u.y);
      const vMag = Math.sqrt(v.x*v.x + v.y*v.y);
      const uNorm = {x: u.x / uMag, y: u.y / uMag};
      const vNorm = {x: v.x / vMag, y: v.y / vMag};
      
      ctx.strokeStyle = 'rgba(100, 200, 100, 0.3)';
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      
      const O = {x: centerX, y: centerY};
      const B = {x: centerX + radius * uNorm.x, y: centerY + radius * uNorm.y};
      const A = {x: centerX + radius * vNorm.x, y: centerY + radius * vNorm.y};
      const M = {x: (O.x + A.x) / 2, y: (O.y + A.y) / 2};
      
      ctx.strokeStyle = 'rgba(0, 150, 0, 0.5)';
      ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(O.x, O.y);
      ctx.lineTo(B.x, B.y);
      ctx.lineTo(A.x, A.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      ctx.strokeStyle = 'rgba(0, 150, 0, 0.3)';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(M.x, M.y - 50);
      ctx.lineTo(M.x, M.y + 50);
      ctx.stroke();
      ctx.setLineDash([]);
      
      ctx.fillStyle = '#060';
      ctx.beginPath(); ctx.arc(A.x, A.y, 3, 0, 2*Math.PI); ctx.fill();
      ctx.beginPath(); ctx.arc(B.x, B.y, 3, 0, 2*Math.PI); ctx.fill();
    }
    
    function render(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid(ctx, canvas.width, canvas.height, 50);

      const uLen = parseInt(controls.uLength.value);
      const uAng = degToRad(parseInt(controls.uAngle.value));
      const vLen = parseInt(controls.vLength.value);
      const vAng = degToRad(parseInt(controls.vAngle.value));

      document.getElementById('uLengthVal').textContent = uLen;
      document.getElementById('uAngleVal').textContent = radToDeg(uAng).toFixed(0)+'°';
      document.getElementById('vLengthVal').textContent = vLen;
      document.getElementById('vAngleVal').textContent = radToDeg(vAng).toFixed(0)+'°';

      const uVal = (parseInt(controls.uAngle.value) / 90.0);
      const vVal = (parseInt(controls.vAngle.value) / 90.0);
      
      let usc = getRotationComponents(uVal);
      let vsc = getRotationComponents(vVal);
      //const u = {x: uLen*Math.cos(uAng), y: -uLen*Math.sin(uAng)};
      //const v = {x: vLen*Math.cos(vAng), y: -vLen*Math.sin(vAng)};
      const u = {x: uLen*usc.cos, y: -uLen*usc.sin};
      const v = {x: vLen*vsc.cos, y: -vLen*vsc.sin};
      
      /////////////////Parameters for the vector diagram///////////////////
      currentU = u;
      currentV = v;
      const rauPhase = atanVec(u, v);
      /////////////////////////////////////////////////////////////////////
      
      const uEnd = {x: centerX+u.x, y: centerY+u.y};
      const vEnd = {x: centerX+v.x, y: centerY+v.y};
      const para = {x: centerX+u.x+v.x, y: centerY+u.y+v.y};

      ctx.strokeStyle = '#aaa';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(uEnd.x, uEnd.y);
      ctx.lineTo(para.x, para.y);
      ctx.lineTo(vEnd.x, vEnd.y);
      ctx.closePath();
      ctx.stroke();
      drawArrow(ctx, centerX, centerY, uEnd.x, uEnd.y, '#ff4444', 3);
      drawArrow(ctx, centerX, centerY, vEnd.x, vEnd.y, '#4444ff', 3);
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 2;
      ctx.beginPath();
      const arcRadius = Math.min(uLen, vLen);
      const startAngle = Math.min(uAng, vAng);
      const endAngle = Math.max(uAng, vAng);
      ctx.arc(centerX, centerY, arcRadius, -endAngle, -startAngle);
      ctx.stroke();
      const refvec = {x: 1.0, y: 0.0};
      if (atanVec(refvec, u) < rauPhase && rauPhase > 2.0) {
        console.log("Blue(v) should switch direction.");
      }
      currentPhaseSection2 = rauPhase;
      updateResultsDisplay();
      updateConversionDisplay();
      drawChordConnection(ctx, v, u, arcRadius)
    }

    Object.values(controls).forEach(c => c.addEventListener('input', render));
    render();
    // Setup responsive canvas with redraw callback
    setupResponsiveCanvas('simpleCanvas', 0.642, render);
  })();

  showConv.addEventListener("change", () => {
    convPanel.style.display = showConv.checked ? "block" : "none";
    updateConversionDisplay();
  });

});
