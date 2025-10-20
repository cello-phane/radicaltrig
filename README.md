# radicaltrig
Radical Angle Units that are used with a formula to compute sin(angle) and cos(angle)  
0.0 to 4.0 rau ~~ 0.0 to 2.0 π radians 
<img width="424" height="217" alt="image" src="https://github.com/user-attachments/assets/bfd17458-9a9a-40ed-b22f-305bd0e7a4f8" />

## Explanation of the handrolled periodicity/continuity:
https://cello-phane.github.io/radicaltrig/rau_rotating_axes.html
After a 90 degree sweep, every point(all 4) has swept the circle, which is why this system works.
```

Since the formula for t covers only a quarter of a circle (1.0),
we define the Radical Angle Unit (RAU) to be periodic by using an
integer 0, 1, 2, and 3 combined with mod 4 arithmetic(the % operator).

c = x coordinate
s = y coordinate
For every Point(x,y)
┌───────────────────────────────────────────────────┐
│                    +y                       │
│                     ↑                       │
│          Q1         |        Q0             │
│        (-c,+s)      |     (+c,+s)           │
│  -x-----------------+------------------> +x │
│          Q2         |        Q3             │
│        (-c,-s)      |     (+c,-s)           |
│                    -y                       |
└───────────────────────────────────────────────────┘

## Radical Angle Unit (RAU) System

The RAU trigonometric functions map a quarter-circle (0 to 1) onto a full  
circle using a 0-4 parameter space with four quadrants.

### Base Functions

For a parameter `t` between 0 and 1:
- `c = (1-t) / √(1 - 2t + 2t²)` (cosine component)
- `s = t / √(1 - 2t + 2t²)` (sine component)

### Quadrant Mapping

Any angle from 0° to 360° maps to a RAU value from 0 to 4. The integer part gives  
the quadrant (0, 1, 2, or 3), and the fractional part is used in the base functions above.  

For any quadrant `q`:
```
cos = c·q0 - s·q1 - c·q2 + s·q3
sin = (s·q0 + c·q1 - s·q2 - c·q3) × sign(parameter)
```

Where `q0, q1, q2, q3` are booleans (1 if in that quadrant, 0 if not).

### Quadrant Behavior

 Quadrant   Angle           Formula       Point          
| Q0 |          0°–90°        | (+c, +s)   | identity/start|
| Q1 |          90°–180°    | (-s,  +c)   | rotate 90°    |
| Q2 |          180°–270°  | (-c,  -s)    | rotate 180°  |
| Q3 |          270°–360°  | (+s, -c)    | rotate 270°  |

### Example: 135° (1.5 RAU)

- Quadrant: floor(1.5) = 1 (Q1), fraction = 0.5
- Base: c = s = √2/2 ≈ 0.707
- Apply Q1 mapping: (-s, +c) = (-0.707, 0.707)
```

## GPU shaders and other things that use radical angle units for rotation:

https://www.shadertoy.com/view/M3cfRN (2D demo that uses both kinds of trig (blue and pink))

https://www.shadertoy.com/view/WXVXDR (3D demo that uses radical trig)  

https://www.shadertoy.com/view/wcXyzB (3D demo that uses traditional sin/cos)

https://www.geogebra.org/classic/tepm6wcn - Geogebra applet (shows an rau & original sin/cos)
