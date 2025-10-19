# radicaltrig
Radical Angle Units for a formula to compute sin(angle) and cos(angle)  
<img width="424" height="217" alt="image" src="https://github.com/user-attachments/assets/bfd17458-9a9a-40ed-b22f-305bd0e7a4f8" />

## GPU shaders that use radical angle units for rotation:

https://www.shadertoy.com/view/M3cfRN (2D demo that uses both kinds of trig (blue and pink))

https://www.shadertoy.com/view/WXVXDR (3D demo that uses radical trig)  

https://www.shadertoy.com/view/wcXyzB (3D demo that uses traditional sin/cos)

## Explanation of the handrolled periodicity/continuity:
https://cello-phane.github.io/radicaltrig/rau_rotating_axes.html
After a 90 degree sweep, every point(all 4) has sweeped the circle, which is why this system works.
```
After a 90° sweep, every point (all 4 quadrants) completes one full
rotation around the circle — which is why this system works.
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
│        (-c,-s)      |     (+c,-s)           │
└───────────────────────────────────────────────────┘
So the algorithm(for the coordinates) for any parameter 0.0 - 4.0:      
Q0: 0 ≤ t < 1	both stay +	 (+c, +s) | 0°–90°
Q1:	1 ≤ t < 2	mirror X↔Y	  (-s, +c) | 90°–180° 
Q2:	2 ≤ t < 3	both negated (-c, -s) | 180°–270°
Q3:	3 ≤ t < 4	mirror X↔Y 	 (+s, -c) | 270°–360°

Make the parameter % 4 minus fraction(after decimal point)
equal q# integer for each quadrant.
For every integer q# as boolean q0==0, q1==1, q2==2, q3==3
that becomes 0.0(false) or 1.0(true) for every quadrant 0-3.
cos = c x q0​ - s x q1​ - c x q2 + s x q3​
sin = (s x q0 + c x q1​ - s x q2​ - c x q3​) x sign(parameter)​  ----> Point(c,s)


#An example with 135 degrees
1.5 radical angle unit === 135 deg
 1.5 - 0.5 = 1 so mapped to Q1
c = cos(0.5)  0.5/sqrt(1-2*0.5+2*(0.5^2)) =        sqrt(2)/2
cos = cx0 - sx1 - cx0 + sx0 = -s                       ||                 
s = sin(0.5)  (1.0-0.5)/sqrt(1-2*0.5+2*(0.5^2)) =  sqrt(2)/2       Point (-s, +c)
sin = (sx0 + cx1 - sx0 - cx0) x (+1) = +c        Point(cos,sin) = (-0.707106, 0.707106)
```
