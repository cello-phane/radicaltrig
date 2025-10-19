# radicaltrig
Radical Angle Units in action

# Gpu shaders that use radical angle units for rotation:

https://www.shadertoy.com/view/M3cfRN (2D demo that uses both kinds of trig (blue and pink))

https://www.shadertoy.com/view/WXVXDR (3D demo that uses radical trig)
https://www.shadertoy.com/view/wcXyzB (3D demo that uses traditional sin/cos)

```c = x coordinate
s = y coordinate
For every Point(x,y)
                    +y
                     ↑
          Q1         |        Q0
         (-c,+s)     |     (+c,+s)
  -x-----------------+------------------> +x
          Q2         |        Q3
        (-c,-s)      |     (+c,-s)
So the algorithm must be the following for any parameter t 0.0 - 4.0      
Q0: 0 ≤ t < 1	none	       (+c, +s)
Q1:	1 ≤ t < 2	mirror X↔Y	 (-s, +c)
Q2:	2 ≤ t < 3	both negated (-c, -s)
Q3:	3 ≤ t < 4	mirror X↔Y 	 (+s, -c)

t progression (0→4) as angle increases:
┌────────────────────────────────────────────┐
│ Q0 : ( +c, +s )  → rotate 0°–90°      │
│ Q1 : ( -s, +c )  → rotate 90°–180°    │
│ Q2 : ( -c, -s )  → rotate 180°–270°   │
│ Q3 : ( +s, -c )  → rotate 270°–360°   │
└────────────────────────────────────────────┘
