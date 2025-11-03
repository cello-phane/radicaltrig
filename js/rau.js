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

// "Branchless"
function atanVec(u, v) {
    const cross = u.x * v.y - u.y * v.x; // signed
    const dot = u.x * v.x + u.y * v.y;
    // 0..1 inside quadrant
    const a = Math.abs(cross) / (Math.abs(dot) + Math.abs(cross));
    const mix = (a, b, c) => c ? b : a;
    // Q0: a (dot >= 0, cross >= 0)
    // Q1: 2.0 - a (dot < 0, cross >= 0)
    // Q2: 2.0 + a (dot < 0, cross < 0)
    // Q3: 4.0 - a (dot >= 0, cross < 0)
    const dotNeg = dot < 0.0;
    const crossNeg = cross < 0.0;
    const q0_or_q3 = mix(a, 4.0 - a, crossNeg);           // cross >= 0 ? a : 4.0 - a
    const q1_or_q2 = mix(2.0 - a, 2.0 + a, crossNeg);    // cross >= 0 ? 2.0 - a : 2.0 + a
    return mix(q0_or_q3, q1_or_q2, dotNeg);              // dot >= 0 ? q0_or_q3 : q1_or_q2
}
// "Branched" version of above
/*
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
}*/

// === Unit conversions ===
const degToRad = deg => deg * Math.PI / 180;
const rauToDeg = rau => (rau / 4) * 360;
