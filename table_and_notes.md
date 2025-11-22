# Radical Angle Unit

## 📊 Core Conversion Table

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
| **Radian** | | | |
| θ → RAU | √(1-cos(θ)) | **Chord method** | **Primary** |
| θ → RAU | tan(θ)/(1+tan(θ)) | Tangent method | Alternative |
| RAU → θ | arccos(1-x²) | Via chord | Inverse chord |
| RAU → θ | arctan(x/(1-x)) | Via tangent | Inverse tangent |
| **Degree** | | | |
| deg → RAU | √(1-cos(deg×π/180)) | Via chord | Through radian |
| RAU → deg | arccos(1-x²)×180/π | Via chord | Through radian |
| deg → freq | deg/90 | Direct scaling | Full circle |
| freq → deg | freq×90 | Direct scaling | Full circle |

---

## 🔢 Special Values Quick Reference

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

## 🔄 Quadrant Mappings (Full Circle)

| Quadrant | RAU Range | Angle | cos | sin | Formula |
|----------|-----------|-------|-----|-----|---------|
| Q0 | [0, 1) | 0°-90° | +c | +s | Base |
| Q1 | [1, 2) | 90°-180° | -s | +c | Rotate 90° |
| Q2 | [2, 3) | 180°-270° | -c | -s | Rotate 180° |
| Q3 | [3, 4) | 270°-360° | +s | -c | Rotate 270° |

**Where**: c = cos(t_frac), s = sin(t_frac), t_frac = freq - floor(freq)

---

## 🧮 Composition & Interpolation

| Operation | Formula | Notes |
|-----------|---------|-------|
| **Single Plane Composition** | z = (x+y-2xy)/(1-xy) | Combine two rotations |
| **Interpolation (geodesic)** | z(τ) = ((1-τ)x+τy)/(1-τ(1-τ)(x-y)²) | τ ∈ [0,1], spherical |
| **Uniform Motion** | t' = tan(t×π/2)/(1+tan(t×π/2)) | Constant angular velocity |

---

## 🎯 3D Rotation Matrix

**Parameters**: x₁ (plane 1), x₂ (plane 2)

**Denominators**:
```
D₁ = √(1-2x₁+2x₁²)
D₂ = √(1-2x₂+2x₂²)
```

**Matrix**:
```
R = [ (1-x₁)(1-x₂)/(D₁D₂)    x₁(1-x₂)/(D₁D₂)    x₂/D₂     ]
    [ -x₁/D₁                  (1-x₁)/D₁           0         ]
    [ -(1-x₁)x₂/(D₁D₂)       -x₁x₂/(D₁D₂)       (1-x₂)/D₂ ]
```

**Extract parameters from matrix R**:
```
x₁ = -R₂₁/√(R₂₁²+R₂₂²)
x₂ = R₁₃/√(R₁₃²+R₃₃²)
```

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
