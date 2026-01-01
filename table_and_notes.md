| Standard | RAU Parameter (x) | Formula | Method |
|----------|-------------------|---------|--------|
| **Forward** | | | |
| sin(x) | x/√(1-2x+2x²) | Direct | Rational function |
| cos(x) | (1-x)/√(1-2x+2x²) | Direct | Rational function |
| tan(x) | x/(1-x) | Direct | Pure rational |
| **Inverse** | | | |
| arcsin(t) | (t²-√(t²-t⁴))/(2t²-1) | Solve sin(x)=t | Algebraic |
| arccos(t) | (t²-1+√(t²-t⁴))/(2t²-1) | Solve cos(x)=t | Algebraic |
| arctan(t) | t/(1+t) | Solve tan(x)=t | Rational |

---

| Angle | Degrees | Radians | RAU (t) | sin(t) | cos(t) | tan(t) |
|-------|---------|---------|---------|--------|--------|--------|
| Zero | 0° | 0 | 0.0000 | 0.0000 | 1.0000 | 0.0000 |
| | 30° | π/6 | 0.3827 | 0.5000 | 0.8660 | 0.5774 |
| Quarter | 45° | π/4 | 0.5412 | 0.7071 | 0.7071 | 1.0000 |
| | 60° | π/3 | 0.7071 | 0.8660 | 0.5000 | 1.7321 |
| Right | 90° | π/2 | 1.0000 | 1.0000 | 0.0000 | ∞ |
| Straight | 180° | π | 2.0000 | 0.0000 | -1.0000 | 0.0000 |
| Full | 360° | 2π | 4.0000 | 0.0000 | 1.0000 | 0.0000 |

---

| Quadrant | RAU Range | Angle | cos | sin | Formula |
|----------|-----------|-------|-----|-----|---------|
| Q0 | [0, 1) | 0°-90° | +c | +s | Base |
| Q1 | [1, 2) | 90°-180° | -s | +c | Rotate 90° |
| Q2 | [2, 3) | 180°-270° | -c | -s | Rotate 180° |
| Q3 | [3, 4) | 270°-360° | +s | -c | Rotate 270° |

**Where**: c = cos(t_frac), s = sin(t_frac), t_frac = freq - floor(freq)

---


## 🔺 Vector Operations

| Operation | Formula | Notes |
|-----------|---------|-------|
| **Vector to RAU** | a = \|wedge\|/(\|dot\|+\|wedge\|) | Quadrant from signs |
| **Wedge product** | wedge = u.x×v.y - u.y×v.x | Signed area |
| **Dot product** | dot = u.x×v.x + u.y×v.y | Projection |

**Quadrant selection**:
- dot≥0, wedge≥0 → return a (Q0)
- dot<0, wedge≥0 → return 2-a (Q1)
- dot<0, wedge<0 → return 2+a (Q2)
- dot≥0, wedge<0 → return 4-a (Q3)

---
