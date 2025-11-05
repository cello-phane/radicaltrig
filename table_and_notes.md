# Radical Angle Unit (RAU) - Quick Reference

## RAU Trigonometric Values Table

| RAU | DEG | SIN | COS | TAN |
|-----|-----|-----|-----|-----|
| 0.0000 | 0 | 0.0000 | 1.0000 | 0.0000 |
| 0.5000 | 45 | 0.7071 | 0.7071 | 1.0000 |
| 1.0000 | 90 | 1.0000 | 0.0000 | — |
| 1.5000 | 135 | 0.7071 | -0.7071 | -1.0000 |
| 2.0000 | 180 | 0.0000 | -1.0000 | 0.0000 |
| 2.5000 | 225 | -0.7071 | -0.7071 | 1.0000 |
| 3.0000 | 270 | -1.0000 | 0.0000 | — |
| 3.5000 | 315 | -0.7071 | 0.7071 | -1.0000 |
| 4.0000 | 360 | 0.0000 | 1.0000 | 0.0000 |

---

## RAU Precision Analysis

### Radian System
- **Full circle = 2π ≈ 6.283185307...**
- Irrational number means inherent precision loss
- Error scales with π (non-linear)
- **4 decimals needed for per-degree precision**

### Radical Angle Unit (RAU)
- **Full circle = exactly 4.0**
- Rational number with predictable precision
- Error scales linearly with decimal precision
- **5-6 decimals needed for per-degree precision** (slightly more than radians)
- But RAU decimals are "cleaner" (base-10 vs π-based)

### Key Relationship
- **1 RAU = 90 degrees**
- Divides a full circle into 4 intuitive units
- Quarter turns: 0.0, 1.0, 2.0, 3.0, 4.0

---

## Practical Recommendations

**For Most Applications:** Use 4 decimal places (0.0001 RAU precision)

**Decimal Places Guide:**
- 2 decimals: ±0.4° error (UI/games)
- 3 decimals: ±0.04° error (graphics)
- 4 decimals: ±0.004° error (precision graphics)
- 5+ decimals: Scientific/specialized use
