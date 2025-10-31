// ================================
// Radical Angle Unit (RAU) math
// ================================

export function radicalSine(t) {
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

export function radicalCosine(t) {
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

export function radicalTan(t) {
  t = ((t % 4) + 4) % 4;
  const q = Math.floor(t);
  const f = t - q;
  if (f >= 0.999999) return 0;
  const base = f / (1 - f);
  return (q === 1 || q === 3) ? -1 / base : base;
}

// === Unit conversions ===
export const degToRad = deg => deg * Math.PI / 180;
export const rauToDeg = rau => (rau / 4) * 360;
