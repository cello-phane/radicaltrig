const Geom = (function(){
  const EPS = 1e-12;

  // ---- basic vector helpers (2D)
  function vx(x,y){ return {x:x, y:y}; }
  function sub(a,b){ return {x: a.x - b.x, y: a.y - b.y}; }
  function dot(a,b){ return a.x*b.x + a.y*b.y; }
  function cross(a,b){ return a.x*b.y - a.y*b.x; }
  function len(a){ return Math.hypot(a.x, a.y); }
  function nearlyZero(v){ return Math.abs(v) < 1e-12; }

  // ---- normalize mod 4 to [0,4]
  function mod4(x){
    let r = x % 4.0;
    if (r < 0) r += 4.0;
    // clamp tiny negative due to FP
    if (r < EPS) r = 0.0;
    if (r >= 4.0 - EPS) r = 0.0;
    return r;
  }

  // ---- signed delta from a -> b, range [-2,2]
  // i.e. the minimal signed sweep going CCW from a to b
  function delta(a, b){
    // map into [0,4)
    a = mod4(a); b = mod4(b);
    // direct difference
    let d = b - a;
    // wrap to (-2,2]
    if (d <= -2.0) d += 4.0;
    else if (d > 2.0) d -= 4.0;
    return d;
  }

  // ---- absolute circular span when you have a set of [0-4] radical angles:
  // normalize relative to first angle and compute min/max in [0,4]
  // returns {minR, maxR, span}
  function circularSpan(angles){
    if (!angles || angles.length === 0) return {minR:0,maxR:0,span:0};
    const a0 = mod4(angles[0]);
    let minR =  1e9, maxR = -1e9;
    for (let i=0;i<angles.length;i++){
      const r = mod4(angles[i] - a0 + 4.0); // now in [0,4)
      if (r < minR) minR = r;
      if (r > maxR) maxR = r;
    }
    return {minR, maxR, span: maxR - minR};
  }

  // ---- convex polygon intersection
  // polygons are arrays of {x,y} in CCW or CW order (convex)
  function convexPolygonsIntersect(poly1, poly2){
    function testEdges(polyA, polyB){
      const n = polyA.length;
      for (let i=0;i<n;i++){
        const a = polyA[i], b = polyA[(i+1)%n];
        const edge = sub(b,a);
        // compute angles of all vertices of polyB relative to edge origin a
        const angles = polyB.map(p => atanVec(edge, sub(p, a)));
        const span = circularSpan(angles);
        // if all points fall into span < 2 -> they lie on same halfplane => separating axis
        if (span.span < 2.0 - 1e-12) return true; // separating axis found => no intersection
      }
      return false;
    }
    // if either set yields a separating axis -> no intersection
    if (testEdges(poly1, poly2)) return false;
    if (testEdges(poly2, poly1)) return false;
    return true; // no separating axis -> intersect (for convex)
  }

  // ---- point-in-polygon using winding sum
  // returns true if point inside polygon (works for nonconvex too)
  function pointInPolygon(point, poly){
    // compute RAU angles from a fixed ref-vector (1,0) to each vertex as seen from point
    const ref = {x:1, y:0};
    const angles = poly.map(v => atanVec(ref, sub(v, point)));
    // sum signed deltas between consecutive vertices
    let total = 0.0;
    for (let i=0;i<angles.length;i++){
      const a = angles[i], b = angles[(i+1)%angles.length];
      total += rauDelta(a, b); // signed delta
    }
    // total will be multiple of ~4 (full turns). If abs(total) > 2 => enclosed.
    return Math.abs(total) > 2.0;
  }

  // ---- robust line segment intersection (standard cross-product approach)
  function onSegment(a,b,p){
    // p collinear with a-b and within bounding box
    const minx = Math.min(a.x,b.x)-EPS, maxx = Math.max(a.x,b.x)+EPS;
    const miny = Math.min(a.y,b.y)-EPS, maxy = Math.max(a.y,b.y)+EPS;
    return p.x >= minx && p.x <= maxx && p.y >= miny && p.y <= maxy;
  }
  function segmentsIntersect(p1,p2,q1,q2){
    const r = sub(p2,p1), s = sub(q2,q1);
    const rxs = cross(r,s), qpxr = cross(sub(q1,p1), r);
    if (Math.abs(rxs) < EPS && Math.abs(qpxr) < EPS){
      // collinear - check overlap by bbox compare
      if (onSegment(p1,p2,q1) || onSegment(p1,p2,q2) || onSegment(q1,q2,p1) || onSegment(q1,q2,p2)) return true;
      return false;
    }
    if (Math.abs(rxs) < EPS && Math.abs(qpxr) >= EPS) return false; // parallel non-intersecting
    const t = cross(sub(q1,p1), s) / (rxs);
    const u = cross(sub(q1,p1), r) / (rxs);
    return t >= -EPS && t <= 1+EPS && u >= -EPS && u <= 1+EPS;
  }

  // ---- general polygon intersection (concave-safe)
  function polygonsIntersect(polyA, polyB){
    // quick bbox reject
    function bbox(poly){
      let minx=1e9,miny=1e9,maxx=-1e9,maxy=-1e9;
      for (const p of poly){
        if (p.x<minx) minx=p.x; if (p.y<miny) miny=p.y;
        if (p.x>maxx) maxx=p.x; if (p.y>maxy) maxy=p.y;
      }
      return {minx,miny,maxx,maxy};
    }
    const A = bbox(polyA), B = bbox(polyB);
    if (A.maxx < B.minx - EPS || A.minx > B.maxx + EPS || A.maxy < B.miny - EPS || A.miny > B.maxy + EPS) return false;

    // 1) SAT (edge test) - if separating axis found -> no intersection
    function satSeparation(Apoly, Bpoly){
      for (let i=0;i<Apoly.length;i++){
        const a = Apoly[i], b = Apoly[(i+1)%Apoly.length];
        const edge = sub(b,a);
        const angles = Bpoly.map(p => atanVec(edge, sub(p,a)));
        const span = circularSpan(angles);
        if (span.span < 2.0 - 1e-12) return true; // separation
      }
      return false;
    }
    if (satSeparation(polyA, polyB)) return false;
    if (satSeparation(polyB, polyA)) return false;

    // 2) Check edge-edge intersections (segment intersection)
    for (let i=0;i<polyA.length;i++){
      const a1 = polyA[i], a2 = polyA[(i+1)%polyA.length];
      for (let j=0;j<polyB.length;j++){
        const b1 = polyB[j], b2 = polyB[(j+1)%polyB.length];
        if (segmentsIntersect(a1,a2,b1,b2)) return true;
      }
    }

    // 3) If no edge intersects, check containment (point-in-polygon)
    if (pointInPolygon(polyA[0], polyB)) return true;
    if (pointInPolygon(polyB[0], polyA)) return true;

    // otherwise: no intersection
    return false;
  }

  // ---- triangulate convex polygon naive helper (ear clipping not included)
  // ( For faster concave handling use triangulation routine)
  function triangulateConvex(poly){
    // assumes convex & ordered; returns triangles as arrays of 3 pts
    const tri = [];
    for (let i=1;i<poly.length-1;i++){
      tri.push([poly[0], poly[i], poly[i+1]]);
    }
    return tri;
  }

  // ---- export API
  return {
    mod4, delta, circularSpan,
    convexPolygonsIntersect, pointInPolygon, polygonsIntersect,
    segmentsIntersect, triangulateConvex,
    vec: {sub, dot, cross, len, vx}
  };
})();


// ================================
// Radical Angle Unit (RAU)
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

function atanVec(u, v) {
    const cross_uv = Geom.vec.cross(u, v);  // signed
    const dot_uv = Geom.vec.dot(u, v);
    // If either is zero-length, handle gracefully(but we don't allow zero-lengths yet)
    /*const lu = Geom.vec.len(u), lv = Geom.vec.len(v);
    if (lu + lv < Geom.EPS) return 0.0;*/
    // Compute signed cross/dot of u (reference) and v (target)
    const a = Math.abs(cross_uv) / (Math.abs(dot_uv) + Math.abs(cross_uv));
    const q1 = a;                    // Q1: dot≥0, cross≥0 → a
    const q2 = 2.0 - a;              // Q2: dot<0, cross≥0 → 2-a
    const q3 = 2.0 + a;              // Q3: dot<0, cross<0 → 2+a
    const q4 = 4.0 - a;              // Q4: dot≥0, cross<0 → 4-a
    // reduce to two separate choices
    const upper = cross_uv >= 0.0 ? q1 : q4;
    const lower = cross_uv >= 0.0 ? q2 : q3;
    // reduce to choice of two each stated above
    return dot_uv >= 0.0 ? upper : lower;
}

// --- Uniform-time parameterization ---
function uniformRAU(t) {
  const mapped = Math.tan(t * Math.PI / 2);
  return mapped / (1 + mapped);
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

function degToRau(deg) {
	const q = deg % 360;
	const f = q / 90;
	return f;
}

function radToRau(radian) {
	const q = radian % (2*Math.PI);
	const f = q / (Math.PI/2);
	return f;
}

function rauToRad(p) {
    const q = Math.floor(p);       // 0..3
    const u = p - q;               // 0..1
    const local = Math.atan2(u, 1-u);   // 0..π/2
	if (q === 4) return Math.PI*2;
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
