# RAU (Radical Angle Unit) - Complete Conversion Cheat Sheet

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
| θ → RAU | √(1-cos(θ)) | **Chord method** | **Primary** (Normalized by √2: √(2 - 2cos(θ)) / √2)|
| θ → chord | √(2 - 2cos(θ)) | Actual chord distance |
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

## ⚡ Implementation Shortcuts

### JavaScript One-Liners

```javascript
// Core functions
sin = t => t/Math.sqrt(1-2*t+2*t*t)
cos = t => (1-t)/Math.sqrt(1-2*t+2*t*t)
tan = t => t/(1-t)

// Conversions
radToRAU = θ => Math.sqrt(1-Math.cos(θ))
RAUToRad = t => Math.acos(1-t*t)
degToFreq = d => d/90
freqToDeg = f => f*90

// Inverse
arctan = x => x/(1+x)
```

### GLSL One-Liners

```glsl
float rauSin(float t) { return t * inversesqrt(1.0-2.0*t+2.0*t*t); }
float rauCos(float t) { return (1.0-t) * inversesqrt(1.0-2.0*t+2.0*t*t); }
float rauTan(float t) { return t / (1.0-t); }
```

---

## ⚠️ Singularities & Special Cases

| Function | Singularity | Value | Solution |
|----------|-------------|-------|----------|
| tan(t) | t = 1 | 90° | Return ∞ or max float |
| arcsin(x) / arccos(x) | x = ±1/√2 | ±45° | Return t = 0.5 |
| x/(1-x) | x = 1 | 90° | Check before divide |
| (x+y-2xy)/(1-xy) | xy = 1 | Composition | Check before divide |

---

## 📏 Precision Requirements

| Decimals | RAU Error | Angle Error | Use Case |
|----------|-----------|-------------|----------|
| 2 | ±0.01 | ±0.4° | UI, games |
| 3 | ±0.001 | ±0.04° | Graphics |
| 4 | ±0.0001 | ±0.004° | Precision work |
| 5+ | ±0.00001 | ±0.0004° | Scientific |

---

## 🚀 Performance

| Method | Iterations (32-digit) | Type |
|--------|----------------------|------|
| Gabriel-Heron (RAU) | 5 | Rational |
| Newton's Method | 8 | Taylor series |

---

## 🔑 Key Constants

```
Full circle:  4.0 RAU = 360° = 2π rad
Quarter:      1.0 RAU = 90° = π/2 rad
45° value:    t ≈ 0.541196
Scale (t=0.5): 1/r = √2
Period:       4 (vs 2π ≈ 6.283)
```

---

## 💡 Quick Memory Aids

**"Diagonal to Circle"**
- Start: Point (1-t, t) on diagonal x+y=1
- Scale: Multiply by 1/√(1-2t+2t²)
- Result: Point on unit circle

**"Tangent is Slope"**
- tan(t) = rise/run = t/(1-t)
- No square root needed!

**"Chord Distance"**
- RAU parameter = chord distance / √2
- t = √(1-cos(θ))

**"Period of 4"**
- 0→1: First quadrant (0°-90°)
- 1→2: Second quadrant (90°-180°)
- 2→3: Third quadrant (180°-270°)
- 3→4: Fourth quadrant (270°-360°)

---

## 📖 Example Workflows

### Workflow 1: Standard Angle → RAU → Trig Values
```
45° → √(1-cos(45°)) → t≈0.5412 → sin≈0.7071, cos≈0.7071
```

### Workflow 2: Trig Value → RAU → Angle
```
sin=0.5 → (0.25-√0.1875)/(2×0.25-1) → t≈0.3827 → 30°
```

### Workflow 3: 2D Vector → RAU → Rotation
```
(3,4) → atan2(4,3) → √(1-cos(θ)) → t → rotation matrix
```

### Workflow 4: Compose Rotations
```
t₁=0.3, t₂=0.2 → z=(0.3+0.2-0.12)/(1-0.06) → z≈0.4255
```

---

**Print this page for quick reference!**  
Repository: [github.com/cello-phane/radicaltrig](https://github.com/cello-phane/radicaltrig)
