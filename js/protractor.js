/* ---------- RAU math utilities (reusable) ---------- */
const RAU = (function(){
  const pi = Math.PI;
  return {
    // t in [0,1] -> vector (x,y) normalized direction of (1-t, t)
    tToVector(t){
      // vector = (1-t, t) ; normalize
      const vx = 1 - t, vy = t;
      const len = Math.hypot(vx, vy) || 1;
      return { x: vx/len, y: vy/len };
    },
    // t -> angle in radians (standard polar angle measured from +x towards +y)
    tToAngle(t){
      const v = this.tToVector(t);
      return Math.atan2(v.y, v.x); // range (-pi,pi) but for t in [0,1] gives [0,pi/2]
    },
    // angle (radians) -> t (inverse mapping), theta in (0, pi/2)
    angleToT(theta){
      // tan(theta) = t/(1-t) => t = tan/(1+tan)
      const tanv = Math.tan(theta);
      const t = tanv / (1 + tanv);
      // clamp
      return Math.max(0, Math.min(1, t));
    },
    // format helpers
    formatT(t, decimals=3){ return t.toFixed(decimals); },
    formatDeg(theta, decimals=2){ return (theta*180/Math.PI).toFixed(decimals); },
    formatRad(theta, decimals=3){ return theta.toFixed(decimals); }
  };
})();

/* ---------- Rendering code ---------- */
const svg = document.getElementById('prosvg');
let state = {
  ticks: 72,
  radius: 117,
  labelMode: 't',
  curT: 0.0
};

const NS = "http://www.w3.org/2000/svg";
function create(tag, attrs={}) {
  const el = document.createElementNS(NS, tag);
  for(const k in attrs) el.setAttribute(k, attrs[k]);
  return el;
}

// Clear svg
function clearSvg() {
  while(svg.firstChild) svg.removeChild(svg.firstChild);
}

// draw protractor base (quarter circle from 0..90deg)
function drawProtractor(){
  clearSvg();
  const R = state.radius;
  // center at (0,0) for simplicity but shifted a bit so tick labels fit
  const cx = 0, cy = 0;

  // Quarter circle path from angle 0->90 (SVG coordinates: y down -> we use negative for up)
  const start = {x: R, y: 0}, end = {x: 0, y: -R};
  const arcPath = `M ${start.x} ${start.y} A ${R} ${R} 0 0 0 ${end.x} ${end.y}`;
  const arc = create('path', {d:arcPath, stroke: 'rgba(255,255,255,0.06)', 'stroke-width':2, fill:'none'});
  svg.appendChild(arc);

  // draw ticks uniformly in t
  const ticks = state.ticks;
  for(let i=0;i<=ticks;i++){
    const t = i / ticks;
    const v = RAU.tToVector(t);
    // screen coords: use (x*R, -y*R) because in math +y is up
    const px = v.x * R, py = -v.y * R;
    // tick length
    const inner = {x: v.x*(R-8), y: -v.y*(R-8)};
    const line = create('line', {
      x1: px, y1: py, x2: inner.x, y2: inner.y,
      stroke: (i%4===0? 'rgba(46,226,196,0.95)': 'rgba(255,255,255,0.12)'),
      'stroke-width': (i%4===0?2:1)
    });
    svg.appendChild(line);
  
  // labels
  const labelMode = state.labelMode;
  if(labelMode !== 'none' && (i === 0 || i === ticks || i % Math.max(1, Math.floor(ticks/12)) === 0)){
      let text = '';
      if(labelMode === 't') text = RAU.formatT(t,3);
      else if(labelMode === 'deg') text = RAU.formatDeg(RAU.tToAngle(t),1) + '°';
      else if(labelMode === 'rad') text = RAU.formatRad(RAU.tToAngle(t),2) + 'r';
  
      // compute rotated position + rotation angle
      const theta = RAU.tToAngle(t);
      const deg = -theta * 180 / Math.PI;
  
      // pushing label slightly outside radius
      const lx = v.x * (R + 20);
      const ly = -v.y * (R + 20);
  
      const tx = create('text', {
          x: lx,
          y: ly,
          fill: 'var(--text)',
          'font-size': (i%4===0 ? 10 : 8),
          'text-anchor':'middle',
          'dominant-baseline':'middle',
          transform: `rotate(${deg} ${lx} ${ly})`
      });
      tx.textContent = text;
      svg.appendChild(tx);
  }
}

  // small center guide line for angle zero
  const axis = create('line', {x1:0,y1:0,x2:R,y2:0, stroke:'rgba(255,255,255,0.03)', 'stroke-width':1});
  svg.appendChild(axis);
}

function screenToSvg(clientX, clientY){
 const rect = svg.getBoundingClientRect();
 const relX = clientX - rect.left;
 const relY = clientY - rect.top;
 
 // Map from pixel coords to viewBox coords
 const pt = svg.createSVGPoint();
 pt.x = relX * (520 / rect.width) - 260;  // viewBox width/pixel width, offset by viewBox x
 pt.y = relY * (10 / rect.height) - 20;   // viewBox height/pixel height, offset by viewBox y
 
 return pt.matrixTransform(svg.getScreenCTM().inverse());
}
 
const hand = document.getElementById('hand');

/* ---------- UI wiring ---------- */
document.getElementById('tickCount').addEventListener('input', (e)=>{ state.ticks = +e.target.value; document.getElementById('tickVal').textContent = e.target.value; drawProtractor();});
document.getElementById('labelMode').addEventListener('change', (e)=>{ state.labelMode = e.target.value; drawProtractor();});
document.getElementById('themeToggle').addEventListener('click', (e)=>{ drawProtractor();});
svg.removeEventListener('click', hand);
/* ---------- initialization ---------- */
drawProtractor();

// Expose RAU to global for easy integration into other files
window.RAU = RAU;
