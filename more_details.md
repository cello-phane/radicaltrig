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

## Vector to RAU Parameter
Convert angle between two vectors directly to RAU parameter:
```javascript
function atanVec(u, v) {
  const mix = (a, b, c) => c ? b : a;
  const cross = u.x * v.y - u.y * v.x;
  const dot = u.x * v.x + u.y * v.y;
  let angle = Math.abs(cross) / (Math.abs(dot) + Math.abs(cross));
  const q4fix = mix(Math.sign(cross) * angle, 4.0 - angle, dot > 0 && cross < 0);
  const qblend = mix(mix(q4fix, angle, cross > dot), angle + 1.0, cross < 0 && dot < 0);
  const halfrot = mix(2.0 - angle, angle + 2.0, cross < 0);
  return mix(qblend, halfrot, dot < 0);
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
