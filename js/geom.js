// ============================================================================
// RADICAL ANGLE UNIT TRIGONOMETRIC FUNCTIONS
// ============================================================================

/**
 * Compute radical sine for RAU parameter
 * @param {number} t - RAU parameter (0-4 maps to 0-360°)
 * @returns {number} Sine value
 */
function radicalSine(t) {
  t = t % 4;
  const q = Math.floor(t);
  const lt = t - q;
  const denomSq = 1 - 2 * lt + 2 * lt * lt;
  const denom = Math.sqrt(denomSq);
  
  switch (q) {
    case 0: return lt / denom;
    case 1: return (1 - lt) / denom;
    case 2: return -lt / denom;
    case 3: return -(1 - lt) / denom;
    default: return 0;
  }
}

/**
 * Compute radical cosine for RAU parameter
 * @param {number} t - RAU parameter (0-4 maps to 0-360°)
 * @returns {number} Cosine value
 */
function radicalCosine(t) {
  t = t % 4;
  const q = Math.floor(t);
  const lt = t - q;
  const denomSq = 1 - 2 * lt + 2 * lt * lt;
  const denom = Math.sqrt(denomSq);
  
  switch (q) {
    case 0: return (1 - lt) / denom;
    case 1: return -lt / denom;
    case 2: return -(1 - lt) / denom;
    case 3: return lt / denom;
    default: return 1;
  }
}

/**
 * Compute radical tangent for RAU parameter
 * @param {number} t - RAU parameter (0-4 maps to 0-360°)
 * @returns {number} Tangent value
 */
function radicalTan(t) {
  t = ((t % 4) + 4) % 4;
  const q = Math.floor(t);
  const f = t - q;

  // NOTE: no early-return guard here. f/(1-f) correctly diverges to
  // +/-Infinity as f -> 1 in Q0/Q2 (the true limit of tan at that
  // boundary), and -1/base correctly collapses to 0 in Q1/Q3. A prior
  // version special-cased f >= 0.999999 to return 0 unconditionally,
  // which was right for Q1/Q3 but silently wrong for Q0/Q2 (tan should
  // blow up there, not vanish). JS division handles both cases without
  // throwing, so the guard was both unnecessary and incorrect.
  const base = f / (1 - f);
  return (q === 1 || q === 3) ? -1 / base : base;
}

/**
 * Compute inverse radical sine (arcsine)
 * @param {number} value - Sine value [-1, 1]
 * @returns {number} RAU parameter in [0, 1] or NaN if invalid
 */
function radicalAsin(value) {
  const t = value;
  const denom = 2 * t * t - 1;
  const inner = t * t - t ** 4;
  
  if (inner < 0 || denom === 0) return NaN;
  
  return (t ** 2 - Math.sqrt(inner)) / denom;
}

/**
 * Compute inverse radical cosine (arccosine)
 * @param {number} value - Cosine value [-1, 1]
 * @returns {number} RAU parameter in [0, 1] or NaN if invalid
 */
function radicalAcos(value) {
  const t = value;
  const denom = 2 * t * t - 1;
  const inner = t * t - t ** 4;
  
  if (inner < 0 || denom === 0) return NaN;
  
  return (t ** 2 - 1 + Math.sqrt(inner)) / denom;
}

/**
 * Compute inverse radical tangent (arctangent)
 * @param {number} value - Tangent value
 * @returns {number} RAU parameter in [0, 1]
 */
function radicalAtan(value) {
  return value / (1 + value);
}

// ============================================================================
// INVERSE-WARP APPROXIMATION (ported from radicaltrig.c's rau_invpolyf)
//
// CORRECTION to how this was described earlier in conversation: this is
// NOT literally the algebraic inverse of warp11() above (i.e. it does not
// solve warp11(t) = w for t). warp11 has no closed form inverse — solving
// it exactly requires numerical root-finding (Newton's method etc).
//
// What the C library actually does instead — and what's ported here — is
// a different, more principled route that never needs to invert warp11
// at all: given the EXACT chord ratio w (e.g. from
// RAUConverter.vectorToRAU, or from r_arctan in the C library — both
// exact, no polynomial involved), convert w to a raw tangent-like ratio
// (w/(1-w) or its reciprocal), then apply an independently Remez-fit
// arctan polynomial to THAT ratio. This approximates the true
// angle-from-ratio relationship directly, rather than approximating the
// inverse of any specific forward-warp fit — same purpose (recover the
// "uniform" angle fraction from a chord value), different and more
// robust mechanism.
//
// Matches RAU_ATAN_QUALITY=2 ("precise") in the C library: degree-6,
// 7-term polynomial, max err 7.32e-7 rad. Measured end-to-end (this
// JS port, at w=0.366025404 recovering t=1/3): residual ~2.16e-7,
// consistent with that figure.
// ============================================================================
function rauAtanfPrecise(x) {
  const x2 = x * x;
  return x * (0.9999997567
    + x2 * (-0.3332778034
    + x2 * (0.1989157444
    + x2 * (-0.1351964889
    + x2 * (0.0843541706
    + x2 * (-0.0373408246
    + x2 * (0.0079436085)))))));
}

/**
 * Approximate inverse of the forward pipeline: given the exact chord
 * ratio w in [0,1] (NOT a warp11 output specifically — any exact w, e.g.
 * from RAUConverter.vectorToRAU), recover the RAU angle fraction t in
 * [0,1] such that projecting t*90deg forward would give (approximately)
 * this w. Ported from radicaltrig.c's rau_invpolyf (RAU_ATAN_QUALITY=2,
 * "precise" tier).
 * @param {number} w - Exact chord ratio in [0,1]
 * @returns {number} Approximate RAU angle fraction in [0,1], or NaN if
 *   w is out of range / non-finite
 */
function rauInvpolyf(w) {
  if (!isFinite(w) || w < 0 || w > 1) return NaN;
  if (w === 0) return 0;
  if (w === 1) return 1;
  if (w >= 0.5) {
    // w > 0.5: angle > 45 deg, reflect via reciprocal ratio
    const ratio = (1 - w) / w;
    const a = rauAtanfPrecise(ratio);
    return (Math.PI / 2 - a) * (2 / Math.PI);
  } else {
    // w < 0.5: angle < 45 deg, direct evaluation
    const ratio = w / (1 - w);
    return rauAtanfPrecise(ratio) * (2 / Math.PI);
  }
}

// ============================================================================
// DISPLAY-ONLY WARP MODE
//
// The functions above (radicalSine/radicalCosine/radicalTan/rauToRad) are
// the ground truth and are used everywhere in the app (collision
// detection, RAUConverter, etc.) — none of that changes here.
//
// This block adds a purely cosmetic warp transform used ONLY by the two
// "Introduction to RAU" display surfaces (the draggable red line + the
// sidebar readout in vectorDraw.js / uiControls.js), so the person can
// compare "raw t" against "warp-corrected t" the same way the protractor
// overlay already lets them compare tick placement.
//
// Two tiers are defined, mirroring RAU_WARP_QUALITY in radicaltrig.c:
//   tier 0 (default) — end-to-end sin/cos max err 5.472e-7
//   tier 1 (v2)       — constrained minimax refit, ~4.4x tighter (1.246e-7),
//                        same C1=pi/4 exactness
// JS_WARP_QUALITY below selects which one RAU_WARP.apply() uses. Keep this
// in sync with whichever RAU_WARP_QUALITY the C library defaults to —
// this file previously had ONLY tier 1 wired in with no way to switch,
// which silently disagreed with the C library's tier-0 default and cost
// real time to track down when comparing outputs across the two. tier 1
// is still directly reachable via RAU_WARP_V2.apply() for anyone who
// wants it regardless of this default.
// ============================================================================
const JS_WARP_QUALITY = 1; // 1 = v2 (default, matches C library default), 0 = tier 0 (original, still available)

function makeWarp11(C1, C2, C3, C4, C5, C6) {
  return function warp11(t) {
    const v = t - 0.5;
    const v2 = v * v;
    let poly = C6;
    poly = v2 * poly + C5;
    poly = v2 * poly + C4;
    poly = v2 * poly + C3;
    poly = v2 * poly + C2;
    poly = v2 * poly + C1;
    return v * poly;
  };
}

const warp11_tier0 = makeWarp11(
  0.78539816339744830962, // = pi/4, exact
  0.64607158024987317298,
  0.63401589172451679138,
  0.68515350354689586789,
  0.32501622369042378935,
  1.51901679307446258196
);

const warp11_tier1 = makeWarp11(
  0.7853981633974483, // unchanged from tier 0 — pi/4, exact
  0.6460261721112686,
  0.6346711435786873,
  0.6812793876895539,
  0.33448057938003534,
  1.5121252251949524
);

const RAU_WARP_V2 = { apply(t) { return 0.5 + warp11_tier1(t); } };

const RAU_WARP = {
  apply(t) {
    return 0.5 + (JS_WARP_QUALITY === 1 ? warp11_tier1(t) : warp11_tier0(t));
  }
};

/**
 * Apply the display-only warp to a full RAU phase (0-4), correcting the
 * fractional part within whatever quadrant it falls in. Leaves the
 * integer (quadrant) part untouched.
 * @param {number} phase - Raw RAU phase
 * @param {boolean} useWarp - If false, returns phase unchanged
 * @returns {number} Warp-corrected phase
 */
function applyDisplayWarp(phase, useWarp) {
  if (!useWarp) return phase;
  const q = Math.floor(phase);
  const lt = phase - q;
  return q + RAU_WARP.apply(lt);
}

/**
 * Compute angle(in radians) between two vectors
 * @param {{x: number, y: number}} u - Reference vector
 * @param {{x: number, y: number}} v - Target vector
 * @returns {number} Radian (0 to 2π) from u to v
 */
function atanVec(u, v) {
  return rauToRad(RAUConverter.vectorToRAU(u, v));
}

/**
 * Apply uniform velocity mapping to RAU parameter
 * Converts linear time parameter to constant angular velocity
 * @param {number} t - Time parameter [0, 1]
 * @returns {number} Adjusted RAU parameter
 */
function uniformRAU(t) {
  const mapped = Math.tan(t * Math.PI / 2);
  return mapped / (1 + mapped);
}

// ============================================================================
// UNIT CONVERSIONS
// ============================================================================

const degToRad = deg => deg * Math.PI / 180;
const radToDeg = rad => rad * 180 / Math.PI;

/**
 * Convert Radians to RAU
 * Bypasses degree scaling for direct transcendental-to-radical mapping.
 */
function radToRau(rad) {
  // Normalize to [0, 2PI)
  let nR = ((rad % (2 * Math.PI)) + (2 * Math.PI)) % (2 * Math.PI);
  const q = Math.floor(nR / (Math.PI / 2));
  const localRad = nR % (Math.PI / 2);
  
  const tVal = Math.tan(localRad);
  const a = tVal / (1 + tVal);
  
  return (q + a) % 4;
}

/**
 * Convert degrees to RAU with full wrap-around support.
 * @param {number} deg - Angle in degrees (any range)
 * @returns {number} RAU parameter in [0, 4)
 */
function degToRau(deg) {
  // 1. Normalize to [0, 360) range immediately
  // This handles -360, -45, 720, etc. perfectly.
  let nD = ((deg % 360) + 360) % 360;

  // 2. Identify Quadrant and local degree offset
  const q = Math.floor(nD / 90);
  const localDeg = nD % 90;

  // 3. Compute local ratio 'a'
  // By using localDeg (0-89.9), we never hit the tan(-1) death zone.
  let a;
  if (localDeg === 0) {
    a = 0;
  } else {
    const rad = localDeg * (Math.PI / 180);
    const tVal = Math.tan(rad);
    a = tVal / (1 + tVal);
  }

  // 4. Return the wrapped RAU [0, 4)
  // q + a gives 0.0, 1.0, 2.0, 3.0 at cardinal points
  return (q + a) % 4;
}

/**
 * Convert RAU to radians
 * @param {number} p - RAU parameter
 * @returns {number} Angle in radians
 */
function rauToRad(p) {
  if (p >= 4) return Math.PI * 2;
  
  const q = Math.floor(p); // indexable integer
  const u = p - q; // fractional unit
  const local = Math.atan2(u, 1 - u); // Local angle in [0, π/2]
  // 0, 90(or π/2), 180(or π), or 270(or 3π/2) to be matched with integer index q
  const offsets = [0, Math.PI / 2, Math.PI, 3 * Math.PI / 2];
  
  // return offset q added to the fractional unit
  return offsets[q] + local;
}

/**
 * Convert RAU to degrees
 * @param {number} rau - RAU parameter
 * @returns {number} Angle in degrees
 */
const rauToDeg = rau => rauToRad(rau) * 180 / Math.PI;

/**
 * Get sine and cosine components for RAU parameter
 * @param {number} phase - RAU parameter
 * @returns {{cos: number, sin: number, quadrant: number}}
 */
function getRotationComponents(phase) {
  if (!isFinite(phase) || phase < 0) phase = 0;
  
  const q = Math.floor(phase) % 4;
  const cosVal = radicalCosine(phase);
  const sinVal = radicalSine(phase);
  
  return {
    cos: cosVal,
    // NOTE: previously `Math.sign(phase) * sinVal`. Since phase is already
    // clamped to >= 0 above, Math.sign(phase) is only ever 0 or 1 here, so
    // it never did anything except (coincidentally, harmlessly) zero out
    // sin at phase === 0, where sin is 0 anyway. radicalSine already
    // returns the correctly signed value for its quadrant; removed the
    // dead multiply for clarity.
    sin: sinVal,
    quadrant: q
  };
}

// Complete roundtrip: Vector → RAU → Trig → Back to RAU
class RAUConverter {
    // Vector to RAU
    static vectorToRAU(u, v) {
        const cross = u.x * v.y - u.y * v.x;
        const dot = u.x * v.x + u.y * v.y;
        const a = Math.abs(cross) / (Math.abs(dot) + Math.abs(cross));
        
        const q1 = a, q2 = 2.0 - a, q3 = 2.0 + a, q4 = 4.0 - a;
        const upper = cross >= 0.0 ? q1 : q4;
        const lower = cross >= 0.0 ? q2 : q3;
        
        return dot >= 0.0 ? upper : lower;
    }
    
    // RAU to sine/cosine
    static rauToTrig(rau) {
        const quadrant = Math.floor(rau);
        const t = rau - quadrant;
        
        const s = this.rsin_base(t);
        const c = this.rcos_base(t);
        
        return this.applyQuadrant(s, c, quadrant);
    }
    
    // Sine/cosine back to RAU (using inverses)
    static trigToRAU(sinVal, cosVal) {
        // Determine which quadrant based on signs
        const quadrant = this.getQuadrant(sinVal, cosVal);
        
        // Get the base value (always positive in our parameterization)
        let baseVal;
        if (quadrant === 0 || quadrant === 2) {
            baseVal = Math.abs(sinVal);
        } else {
            baseVal = Math.abs(cosVal);
        }
        
        // Use inverse to get fractional parameter
        const t = radicalAsin(baseVal);
        
        return quadrant + t;
    }
    
    // Helper: Base trig functions (t ∈ [0, 1])
    static rsin_base(t) {
        const a = 1.0 - 2.0 * t + 2.0 * t * t;
        return t / Math.sqrt(a);
    }
    
    static rcos_base(t) {
        const a = 1.0 - 2.0 * t + 2.0 * t * t;
        return (1.0 - t) / Math.sqrt(a);
    }
    
    // Helper: Apply quadrant transformation
    static applyQuadrant(s, c, q) {
        const transforms = [
            { sin: s, cos: c },      // Q0: (c, s)
            { sin: c, cos: -s },     // Q1: (-s, c)
            { sin: -s, cos: -c },    // Q2: (-c, -s)
            { sin: -c, cos: s }      // Q3: (s, -c)
        ];
        return transforms[q];
    }

	static rauToAngle(rau) {
		const sin = this.rsin_base(rau);  // Normalized
		const cos = this.rcos_base(rau);  // Normalized  
		return Math.atan2(sin, cos); // Combines both
	}
	
    // Helper: Determine quadrant from trig values
    static getQuadrant(sinVal, cosVal) {
        if (cosVal >= 0 && sinVal >= 0) return 0;
        if (cosVal < 0 && sinVal >= 0) return 1;
        if (cosVal < 0 && sinVal < 0) return 2;
        return 3;
    }

}

/**
 * Geometry Utilities
 * Provides vector operations, angle calculations, and polygon intersection tests
 */

const Geom = (function() {
  // Configuration constants
  const CONFIG = {
    EPSILON: 1e-12,
    RAU_FULL_CIRCLE: 4.0,
    RAU_HALF_CIRCLE: 2.0
  };

  // ============================================================================
  // VECTOR OPERATIONS (2D)
  // ============================================================================

  /**
   * Create a 2D vector
   * @param {number} x - X component
   * @param {number} y - Y component
   * @returns {{x: number, y: number}}
   */
  function vec(x, y) {
    return { x, y };
  }

  /**
   * Subtract vector b from vector a
   * @param {{x: number, y: number}} a
   * @param {{x: number, y: number}} b
   * @returns {{x: number, y: number}}
   */
  function sub(a, b) {
    return { x: a.x - b.x, y: a.y - b.y };
  }

  /**
   * Dot product of two vectors
   * @param {{x: number, y: number}} a
   * @param {{x: number, y: number}} b
   * @returns {number}
   */
  function dot(a, b) {
    return a.x * b.x + a.y * b.y;
  }

  /**
   * Cross product (2D) - returns scalar z-component
   * @param {{x: number, y: number}} a
   * @param {{x: number, y: number}} b
   * @returns {number}
   */
  function cross(a, b) {
    return a.x * b.y - a.y * b.x;
  }

  /**
   * Vector magnitude (length)
   * @param {{x: number, y: number}} a
   * @returns {number}
   */
  function len(a) {
    return Math.hypot(a.x, a.y);
  }

  /**
   * Check if value is nearly zero (within epsilon)
   * @param {number} v
   * @returns {boolean}
   */
  function nearlyZero(v) {
    return Math.abs(v) < CONFIG.EPSILON;
  }

  // ============================================================================
  // RAU ANGLE UTILITIES
  // ============================================================================

  /**
   * Normalize RAU parameter to [0, 4) range
   * @param {number} x - RAU parameter
   * @returns {number} Normalized value in [0, 4)
   */
  function mod4(x) {
    let r = x % CONFIG.RAU_FULL_CIRCLE;
    if (r < 0) r += CONFIG.RAU_FULL_CIRCLE;
    
    // Clamp tiny negatives due to floating point errors
    if (r < CONFIG.EPSILON) r = 0.0;
    if (r >= CONFIG.RAU_FULL_CIRCLE - CONFIG.EPSILON) r = 0.0;
    
    return r;
  }

  /**
   * Calculate signed delta from angle a to angle b
   * Returns minimal signed sweep (CCW positive) in range [-2, 2]
   * @param {number} a - Start angle (RAU)
   * @param {number} b - End angle (RAU)
   * @returns {number} Signed angular difference
   */
  function delta(a, b) {
    // Normalize both angles to [0, 4)
    a = mod4(a);
    b = mod4(b);
    
    // Direct difference
    let d = b - a;
    
    // Wrap to (-2, 2] for minimal arc
    if (d <= -CONFIG.RAU_HALF_CIRCLE) {
      d += CONFIG.RAU_FULL_CIRCLE;
    } else if (d > CONFIG.RAU_HALF_CIRCLE) {
      d -= CONFIG.RAU_FULL_CIRCLE;
    }
    
    return d;
  }

  /**
   * Calculate circular span of a set of angles
   * Returns the minimal arc containing all angles
   * @param {number[]} angles - Array of RAU angles
   * @returns {{minR: number, maxR: number, span: number}}
   */
  function circularSpan(angles) {
    if (!angles || angles.length === 0) {
      return { minR: 0, maxR: 0, span: 0 };
    }
    
    // Normalize relative to first angle
    const a0 = mod4(angles[0]);
    let minR = Infinity;
    let maxR = -Infinity;
    
    for (let i = 0; i < angles.length; i++) {
      const r = mod4(angles[i] - a0 + CONFIG.RAU_FULL_CIRCLE);
      if (r < minR) minR = r;
      if (r > maxR) maxR = r;
    }
    
    return { minR, maxR, span: maxR - minR };
  }

  // ============================================================================
  // POLYGON INTERSECTION TESTS
  // ============================================================================

  /**
   * Test if two convex polygons intersect using Separating Axis Theorem
   * @param {Array<{x: number, y: number}>} poly1 - First polygon vertices (CCW)
   * @param {Array<{x: number, y: number}>} poly2 - Second polygon vertices (CCW)
   * @returns {boolean} True if polygons intersect
   */
  function convexPolygonsIntersect(poly1, poly2) {
    /**
     * Test edges of polyA for separating axis against polyB
     */
    function testEdges(polyA, polyB) {
      const n = polyA.length;
      
      for (let i = 0; i < n; i++) {
        const a = polyA[i];
        const b = polyA[(i + 1) % n];
        const edge = sub(b, a);
        
        // Compute angles of all polyB vertices relative to edge
        const angles = polyB.map(p => RAUConverter.vectorToRAU(edge, sub(p, a)));
        const span = circularSpan(angles);
        
        // If all points in same half-plane, we found a separating axis
        if (span.span < CONFIG.RAU_HALF_CIRCLE - CONFIG.EPSILON) {
          return true; // Separating axis found
        }
      }
      
      return false; // No separating axis found
    }
    
    // If either polygon has a separating axis, no intersection
    if (testEdges(poly1, poly2)) return false;
    if (testEdges(poly2, poly1)) return false;
    
    return true; // No separating axis found - polygons intersect
  }

  /**
   * Test if point is inside polygon using winding number
   * @param {{x: number, y: number}} point - Test point
   * @param {Array<{x: number, y: number}>} poly - Polygon vertices
   * @returns {boolean} True if point is inside polygon
   */
  function pointInPolygon(point, poly) {
    const ref = { x: 1, y: 0 }; // Reference vector
    
    // Compute RAU angles from reference to each vertex as seen from point
    const angles = poly.map(v => RAUConverter.vectorToRAU(ref, sub(v, point)));
    
    // Sum signed deltas between consecutive vertices
    let total = 0.0;
    for (let i = 0; i < angles.length; i++) {
      const a = angles[i];
      const b = angles[(i + 1) % angles.length];
      total += delta(a, b); // Fixed: was rauDelta, now using delta
    }
    
    // If total winding is > half circle, point is enclosed
    return Math.abs(total) > CONFIG.RAU_HALF_CIRCLE;
  }

  /**
   * Check if point p is on segment a-b within epsilon tolerance
   */
  function onSegment(a, b, p) {
    const eps = CONFIG.EPSILON;
    const minX = Math.min(a.x, b.x) - eps;
    const maxX = Math.max(a.x, b.x) + eps;
    const minY = Math.min(a.y, b.y) - eps;
    const maxY = Math.max(a.y, b.y) + eps;
    
    return p.x >= minX && p.x <= maxX && p.y >= minY && p.y <= maxY;
  }

  /**
   * Test if two line segments intersect
   * @param {{x: number, y: number}} p1 - First segment start
   * @param {{x: number, y: number}} p2 - First segment end
   * @param {{x: number, y: number}} q1 - Second segment start
   * @param {{x: number, y: number}} q2 - Second segment end
   * @returns {boolean} True if segments intersect
   */
  function segmentsIntersect(p1, p2, q1, q2) {
    const r = sub(p2, p1);
    const s = sub(q2, q1);
    const rxs = cross(r, s);
    const qpxr = cross(sub(q1, p1), r);
    const eps = CONFIG.EPSILON;
    
    // Collinear case
    if (Math.abs(rxs) < eps && Math.abs(qpxr) < eps) {
      return (
        onSegment(p1, p2, q1) ||
        onSegment(p1, p2, q2) ||
        onSegment(q1, q2, p1) ||
        onSegment(q1, q2, p2)
      );
    }
    
    // Parallel non-intersecting
    if (Math.abs(rxs) < eps && Math.abs(qpxr) >= eps) {
      return false;
    }
    
    // Standard intersection test
    const t = cross(sub(q1, p1), s) / rxs;
    const u = cross(sub(q1, p1), r) / rxs;
    
    return t >= -eps && t <= 1 + eps && u >= -eps && u <= 1 + eps;
  }

  /**
   * Calculate bounding box of polygon
   */
  function bbox(poly) {
    let minX = Infinity, minY = Infinity;
    let maxX = -Infinity, maxY = -Infinity;
    
    for (const p of poly) {
      if (p.x < minX) minX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.x > maxX) maxX = p.x;
      if (p.y > maxY) maxY = p.y;
    }
    
    return { minX, minY, maxX, maxY };
  }

  /**
   * Test if two general polygons intersect (works for concave)
   * @param {Array<{x: number, y: number}>} polyA - First polygon
   * @param {Array<{x: number, y: number}>} polyB - Second polygon
   * @returns {boolean} True if polygons intersect
   */
  function polygonsIntersect(polyA, polyB) {
    const eps = CONFIG.EPSILON;
    
    // Quick bounding box rejection
    const A = bbox(polyA);
    const B = bbox(polyB);
    
    if (
      A.maxX < B.minX - eps || A.minX > B.maxX + eps ||
      A.maxY < B.minY - eps || A.minY > B.maxY + eps
    ) {
      return false;
    }
    
    // SAT test for separation
    function satSeparation(poly1, poly2) {
      for (let i = 0; i < poly1.length; i++) {
        const a = poly1[i];
        const b = poly1[(i + 1) % poly1.length];
        const edge = sub(b, a);
        
        const angles = poly2.map(p => RAUConverter.vectorToRAU(edge, sub(p, a)));
        const span = circularSpan(angles);
        
        if (span.span < CONFIG.RAU_HALF_CIRCLE - eps) {
          return true; // Separation found
        }
      }
      return false;
    }
    
    if (satSeparation(polyA, polyB)) return false;
    if (satSeparation(polyB, polyA)) return false;
    
    // Check edge-edge intersections
    for (let i = 0; i < polyA.length; i++) {
      const a1 = polyA[i];
      const a2 = polyA[(i + 1) % polyA.length];
      
      for (let j = 0; j < polyB.length; j++) {
        const b1 = polyB[j];
        const b2 = polyB[(j + 1) % polyB.length];
        
        if (segmentsIntersect(a1, a2, b1, b2)) {
          return true;
        }
      }
    }
    
    // Check containment
    if (pointInPolygon(polyA[0], polyB)) return true;
    if (pointInPolygon(polyB[0], polyA)) return true;
    
    return false;
  }

  /**
   * Triangulate convex polygon (simple fan triangulation)
   * @param {Array<{x: number, y: number}>} poly - Convex polygon vertices
   * @returns {Array<Array<{x: number, y: number}>>} Array of triangles
   */
  function triangulateConvex(poly) {
    const triangles = [];
    
    for (let i = 1; i < poly.length - 1; i++) {
      triangles.push([poly[0], poly[i], poly[i + 1]]);
    }
    
    return triangles;
  }

  // ============================================================================
  // PUBLIC API
  // ============================================================================

  return {
    // Configuration
    config: CONFIG,
    
    // Angle utilities
    mod4,
    delta,
    circularSpan,
    
    // Collision detection
    convexPolygonsIntersect,
    pointInPolygon,
    polygonsIntersect,
    segmentsIntersect,
    triangulateConvex,
    
    // Vector operations (namespaced)
    vec: {
      create: vec,
      sub,
      dot,
      cross,
      len,
      nearlyZero
    }
  };
})();
