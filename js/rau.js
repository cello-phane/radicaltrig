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

// --- Inverse Radical Functions ---
function radicalAsin(value) {
  const t = value;
  const denom = 2 * t * t - 1;
  const inner = t * t - t ** 4;
  if (inner < 0 || denom === 0) return NaN;
  return (t ** 2 - Math.sqrt(inner)) / denom;
}

function radicalAcos(value) {
  const t = value;
  const denom = 2 * t * t - 1;
  const inner = t * t - t ** 4;
  if (inner < 0 || denom === 0) return NaN;
  return (t ** 2 - 1 + Math.sqrt(inner)) / denom;
}

function radicalAtan(value) {
  return value / (1 + value);
}

// --- Uniform-time parameterization ---
function uniformRAU(t) {
  const mapped = Math.tan(t * Math.PI / 2);
  return mapped / (1 + mapped);
}

function atanVec(u, v) {
    const cross_uv_mag = u.x * v.y - u.y * v.x; // signed
    const dot_uv   = u.x * v.x + u.y * v.y;
    // 0..1 inside quadrant
    let a = Math.abs(cross_uv_mag) / (Math.abs(dot_uv) + Math.abs(cross_uv_mag));

    if (dot_uv >= 0.0 && cross_uv_mag >= 0.0) {
        // Q1: 0..1
        return a;
    } else if (dot_uv < 0.0 && cross_uv_mag >= 0.0) {
        // Q2: 1..2
        return 2.0 - a;
    } else if (dot_uv < 0.0 && cross_uv_mag < 0.0) {
        // Q3: 2..3
        return 2.0 + a;
    } else {
        // Q4: 3..4
        return 4.0 - a;
    }
}

// ================================
// Precomputed Uniform Velocity RAU Table
// ================================

function generateUniformVelocityTable(divisions = 60) {
  const table = [];
  
  for (let i = 0; i < divisions; i++) {
    // RAU position: uniform steps from 0 to 4
    const rauPosition = (i / divisions) * 4;
    
    // Compute sin/cos once and store
    const sin = radicalSine(rauPosition);
    const cos = radicalCosine(rauPosition);
    
    table.push({ sin, cos, rauPosition });
  }
  
  return table;
}

function getInterpolatedFromTable(table, secondsFrac) {
  const totalSeconds = secondsFrac % 60; // Wrap at 60 seconds
  const indexFloat = (totalSeconds / 60) * table.length;
  
  const index = Math.floor(indexFloat);
  const nextIndex = (index + 1) % table.length;
  const fraction = indexFloat - index;
  
  const current = table[index];
  const next = table[nextIndex];
  
  // Linear interpolation
  const sin = current.sin + (next.sin - current.sin) * fraction;
  const cos = current.cos + (next.cos - current.cos) * fraction;
  
  return { sin, cos };
}
// === Unit conversions ===
const degToRad = deg => deg * Math.PI / 180;
const radToDeg = rad => rad / (Math.PI / 180);
const degToRau = deg => Math.sqrt(2-2*Math.cos(deg*(Math.PI/180)));

function rauToRad(p) {
    const q = Math.floor(p);       // 0..3
    const u = p - q;               // 0..1
    const local = Math.atan2(u, 1-u);   // 0..π/2
	if (q === 4) return Math.PI*2;//this edge case is needed?? since we can also wrap around back to 0
    switch(q) {
        case 0: return local;                // 0°–90°
        case 1: return Math.PI/2 + local;    // 90°–180°
        case 2: return Math.PI + local;      // 180°–270°
        case 3: return 3*Math.PI/2 + local;  // 270°–360°
    }
}
const rauToDeg = rau => rauToRad(rau)*(180/Math.PI);

// Component-wis rotation function
function getRAUComponents(t) {
  const tt    = Math.max(0, Math.min(0.999999, t));
  const denom = 1 / Math.sqrt(1 - 2 * tt + 2 * tt * tt);
  return { cos: (1 - tt) * denom, sin: tt * denom };
}

function getRotationComponents(phase) {
  let p = phase;
  if (!isFinite(p) || p < 0) p = 0;
  const q    = Math.floor(p) % 4;
  let cos_val = radicalCosine(phase);
  let sin_val = radicalSine(phase);
  return { cos: Math.sign(phase)*cos_val, sin: sin_val, quadrant: q };
}
