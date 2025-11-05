# Radical Angle Unit (RAU) - Complete Reference

## RAU Trigonometric Values Table (360 Steps, 0.0 to 4.0)

| RAU | DEG | SIN | COS | TAN |
|-----|-----|-----|-----|-----|
| 0.0000 | 0 | 0.0000 | 1.0000 | 0.0000 |
| 0.5000 | 45 | 0.0087 | 1.0000 | 0.0087 |
| 1.0000 | 90 | 0.0175 | 0.9998 | 0.0175 |
| 1.5000 | 135 | 0.0262 | 0.9997 | 0.0262 |
| 2.0000 | 180 | 0.0349 | 0.9994 | 0.0349 |
| 2.5000 | 225 | 0.0436 | 0.9990 | 0.0437 |
| 3.0000 | 270 | 0.0523 | 0.9986 | 0.0524 |
| 3.5000 | 315 | 0.0610 | 0.9981 | 0.0612 |
| 4.0000 | 360 | 0.0000 | 1.0000 | 0.0000 |

---

## RAU Precision Analysis

### Relationship
- **1 RAU = 90 degrees**
- **360-step interpolation**
- **Step size: 0.0111111111 RAU**
- **Step size in degrees: 1.0000000000°**

### RAU Precision by Decimal Places

| Decimals | Max Error (°) | Max Error (″) | Max Error (′) | Use Case |
|----------|---------------|---------------|---------------|----------|
| 1 | 4.00000000 | 14400.0000 | 240.000000 | Very coarse |
| 2 | 0.40000000 | 1440.0000 | 24.000000 | Games, UI |
| 3 | 0.04000000 | 144.0000 | 2.400000 | Graphics, animation |
| 4 | 0.00400000 | 14.4000 | 0.240000 | Precision graphics |
| 5 | 0.00040000 | 1.4400 | 0.024000 | Scientific |
| 6 | 0.00004000 | 0.1440 | 0.002400 | Scientific |
| 7 | 0.00000400 | 0.0144 | 0.000240 | Scientific |
| 8 | 0.00000040 | 0.0014 | 0.000024 | Scientific |

### Practical Precision Requirements

| Application | Threshold | Required Decimals |
|-------------|-----------|-------------------|
| Screen rotation (pixels) | 1° | 2 |
| Game objects (degrees) | 0.1° | 3 |
| Camera angle (degrees) | 0.01° | 4 |
| Astronomical (arcminutes) | 0.0167° | 4 |
| Surveying (arcseconds) | 0.0003° | 6 |

---

## RAU vs Radian Precision Comparison

### Direct Comparison Table

| Decimals | Radian Max Error (°) | RAU Max Error (°) | Difference | Winner |
|----------|----------------------|------------------|------------|--------|
| 1 | 2.86198107 | 4.00000000 | 1.13801893 | Radian (better) |
| 2 | 0.28621538 | 0.40000000 | 0.11378462 | Radian (better) |
| 3 | 0.02860427 | 0.04000000 | 0.01139573 | Radian (better) |
| 4 | 0.00286007 | 0.00400000 | 0.00113993 | Radian (better) |
| 5 | 0.00028610 | 0.00040000 | 0.00011390 | Radian (better) |
| 6 | 0.00002849 | 0.00004000 | 0.00001151 | Radian (better) |
| 7 | 0.00000286 | 0.00000400 | 0.00000114 | Radian (better) |
| 8 | 0.00000029 | 0.00000040 | 0.00000011 | Radian (better) |

### Key Insights

**1. Radian Complexity**
- Full circle = 2π ≈ 6.283185307...
- Irrational number means inherent precision loss
- Error scales with π (non-linear)

**2. RAU Simplicity**
- Full circle = exactly 4.0
- Rational number, predictable precision
- Error scales linearly with decimal precision

**3. Decimal Equivalence**
- Radian 4 decimals ≈ RAU 5-6 decimals
- RAU requires slightly MORE decimals for same precision
- But RAU decimals are "cleaner" (base-10 vs π-based)

**4. Practical Difference**
- For most applications: negligible difference
- RAU advantage: easier to understand & debug
- Radian advantage: mathematical standard

**5. Storage Efficiency**
- Radian: 1.5708 (still transcendental)
- RAU: 1.0000 (clean decimal)
