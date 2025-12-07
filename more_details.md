# RAU (Radical Angle Unit) System Reference

## Core Formulas
For parameter `0.0 ≤ t < 1.0`:

```
rsin(t) = t / √(1 - 2t + 2t²)
rcos(t) = (1 - t) / √(1 - 2t + 2t²)
rtan(t) = t / (1 - t)
```

## Quadrant Mapping (0–4 RAU)
The RAU parameter extends from 0 to 4 by applying quadrant rotations:
```
┌-------------------┐
          ↑ y
 90°–180° │ 0°–90°  
    Q1    │   Q0
   -c,+s  │  +c,+s
  ←────────────────→ x 
 180°–270°|270°–360°
    Q2    │   Q3
  -c,-s   │  +c,-s  
          ↓
└-------------------┘
```
| Quadrant | Range | Mapping | Angle |
|----------|-------|---------|-------|
| Q0 | 0 ≤ t < 1 | (+c, +s) | 0°–90° |
| Q1 | 1 ≤ t < 2 | (–s, +c) | 90°–180° |
| Q2 | 2 ≤ t < 3 | (–c, –s) | 180°–270° |
| Q3 | 3 ≤ t < 4 | (+s, –c) | 270°–360° |

### Branched Computation
```javascript
if (q === 0) {
    cos_result = c;  sin_result = s;
} else if (q === 1) {
    cos_result = -s; sin_result = c;
} else if (q === 2) {
    cos_result = -c; sin_result = -s;
} else {
    cos_result = -c; sin_result = s;
}
sin_result=sin_result*Math.sign(parameter);
```

### Branchless Computation
```javascript
const q0 = quadrant === 0 ? 1 : 0;
const q1 = quadrant === 1 ? 1 : 0;
const q2 = quadrant === 2 ? 1 : 0;
const q3 = quadrant === 3 ? 1 : 0;

cos_result = c * q0 - s * q1 - c * q2 + s * q3;
sin_result = (s * q0 + c * q1 - s * q2 - c * q3) * Math.sign(param);
```

## Vectors atan function which returns RAU parameter
Convert angle between two vectors directly to RAU parameter:
```javascript
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

// If-less version of above
function atanVec(u, v) {
    const cross_uv = u.x * v.y - u.y * v.x;  // signed
    const dot_uv = u.x * v.x + u.y * v.y;
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

//Works with unnormalized vectors
```

## Uniform Motion Reparameterization
For constant angular velocity in time-domain animations, reparameterize using:
```
t' = tan(t · π/2) / (1 + tan(t · π/2))
```
Then use `t'` as the RAU parameter input. Without this, angular velocity varies.

## Inverse Functions
Recover RAU parameter from trig values:
```
sin⁻¹(t) = (t² - √(t²(1 - t²))) / (2t² - 1)    [domain: t ∈ [–1, 1]]
cos⁻¹(t) = (t² - 1 + √(t²(1 - t²))) / (2t² - 1) [domain: t ∈ [–1, 1]]
tan⁻¹(t) = t / (1 + t)                          [domain: t ∈ ℝ, t ≠ –1]
```
All return RAU parameter in range [0, 1] for one quadrant.
