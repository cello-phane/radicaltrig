# radicaltrig
<img width="424" height="217" alt="image" src="https://github.com/user-attachments/assets/bfd17458-9a9a-40ed-b22f-305bd0e7a4f8" />  
0.0 to 1.0 ~~ 0.0 to π/2 radians  
(Non-periodic, closed form solution)   
### Resources on youtube  
[John Gabriel on the topic of the right angle measure](https://youtu.be/xUdFMTpfGHg)  
[Trigonometric ratios and formulas using right angles](https://youtu.be/TJr4YfEgVuk)  
### Radical Angle Unit (RAU)
[Rotating axes](https://www.desmos.com/calculator/4cefade964)
After a 90 degree sweep, every point(all 4) has covered the circle, which is why we can achieve periodicity of 0 to 2π.

### Base Functions
For a parameter `t` between 0 and 1:
- `c = (1-t) / √(1 - 2t + 2t²)` (cosine component)
- `s = t / √(1 - 2t + 2t²)` (sine component)
  
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

### Quadrant Mapping
Any angle from 0° to 360° maps to a RAU value from 0 to 4. The integer part gives  
the quadrant (0, 1, 2, or 3), and the fractional part is used in the base functions above.  
For any quadrant q:
```
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
And the same thing is done with this arithmetic  
where q0, q1, q2, q3 are booleans (1 if in that quadrant, 0 if not):
```
cos = c·q0 - s·q1 - c·q2 + s·q3
sin = (s·q0 + c·q1 - s·q2 - c·q3) × Math.sign(parameter)
```  
### Example: 135° (1.5 RAU)
- Quadrant: floor(1.5) = 1 (Q1), fraction = 0.5
- Base: c = s = √2/2 ≈ 0.707
- Apply Q1 mapping: (-s, +c) = (-0.707, 0.707)  

### 2D/3D applications:  
https://www.shadertoy.com/view/M3cfRN (2D demo that uses both kinds of trig (blue and pink))  
https://www.shadertoy.com/view/WXVXDR (3D demo that uses radical trig)  
https://www.shadertoy.com/view/wcXyzB (3D demo that uses traditional sin/cos)  
https://cello-phane.github.io/radicaltrig/perspective_sphere.html (3D rotation of a sphere on Javascript 2D canvas)
Graphing:  
[Trig Ratios in geogebra](https://www.geogebra.org/calculator/kvnpt4f3)
[Uniform Motion conversion parameter](https://www.desmos.com/calculator/qku0curcwb)
