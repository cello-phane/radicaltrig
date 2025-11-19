The following puzzle asks the reader to solve for the radius $r$, as marked in the image below. All three circles have radii of equal length and touch each of their neighbors once while also touching the square once, except for the bottom left circle, which touches the square twice.

<img src="/assets/images/three_circles_in_a_square__1.png" class="third-width-image"/>

 The puzzle calls for a specific side-length of $10\mathrm{cm}$, but this quantitiy can of course be generalized. Let's call it $a$ and reconstruct the scene manually, to get a feel for it:

<img src="/assets/images/three_circles_in_a_square__2.jpg" class="third-width-image"/>

After a bit of cleanup as well as some naming, this should be a good starting-point:

<img src="/assets/images/three_circles_in_a_square__3.jpg" class="third-width-image"/>

$C_1$, $C_2$ and $C_3$ mark the centers of each circle, $T_1$, $T_2$ and $T_3$ mark their mutual touching points, $T_4$, $T_5$, $T_6$ and $T_7$ mark the touching points between circles and the square, which is identified through $S_1$, $S_2$, $S_3$ and $S_4$, having side-length $a$.

Now is a good time to add all radii $r$, as those make the previously hidden equilateral triangle quite obvious:

<img src="/assets/images/three_circles_in_a_square__4.jpg" class="third-width-image"/>

The side-length of this new triangle is $2r$, as by [Orthogonal Circles - Single Intersection Point](/math/orthogonal-circles#single-intersection-point). Due to all sides having the same length, all angles are equal: $\angle{C_3C_1C_2} = \angle{C_1C_2C_3} = \angle{C_2C_3C_1} = \frac{\pi}{3}$. Due to the touching points $T_4$, $T_5$, $T_6$ and $T_7$ with the square, this triangle is exactly centered within the square $\square{S_1S_2S_3S_4}$. To visualize this fact, let's enclose the triangle in another square that's parallel to the outermost square:

<img src="/assets/images/three_circles_in_a_square__5.jpg" class="third-width-image"/>

The side length of this inner square, $\square{I_1I_2I_3I_4}$ ($I_1$ and $C_1$ are coincident), has been called $b$, which is:

$\mathrm{I}$: $b = a - 2*r$

Three new right triangles emerged: $\triangle{C_1I_2C_2}$, $\triangle{C_2I_3C_3}$ and $\triangle{C_3I_4C_1}$. Let's call the angle $\angle{I_4C_1C_3} = \alpha$ and $\angle{C_2C_1I_2} = \beta$, while all three angles of the equilateral triangle are called $\gamma$.

<img src="/assets/images/three_circles_in_a_square__6.jpg" class="third-width-image"/>

It is for certain that

$\alpha + \beta + \gamma = \frac{\pi}{2}$,

and since $\gamma = \frac{\pi}{3}$, that

$\alpha + \beta + \frac{\pi}{3} = \frac{\pi}{2}$<br>
$\alpha + \beta = \frac{\pi}{2} - \frac{\pi}{3}$<br>
$\alpha + \beta = \frac{3*\pi}{3*2} - \frac{2*\pi}{2*3}$<br>
$\alpha + \beta = \frac{3*\pi - 2*\pi}{6}$<br>
$\alpha + \beta = \frac{\pi}{6}$

Both mentioned right triangles share three properties in common: a right angle, hypothenuse $2*r$ and short side $b$. While it certainly doesn't look like it on the drawing (sorry!), these triangles are congruent, so $\triangle{C_1I_2C_2} \equiv \triangle{C_3I_4C_1}$, and thus follows that $x = y$ and that $\alpha = \beta = \frac{1}{2} * \frac{\pi}{6} = \frac{\pi}{12}$.

With these equalities in mind, the solution lies within these similar right triangles, so let's isolate one of them for clarity:

<img src="/assets/images/three_circles_in_a_square__7.jpg" class="third-width-image"/>

$cos(\alpha) = \frac{b}{2*r}$

Let's substitute $\mathrm{I}$ and $\alpha$, then solve for $r$:

$cos(\frac{\pi}{12}) = \frac{a - 2*r}{2*r}$<br>
$cos(\frac{\pi}{12}) * 2*r = a - 2*r$<br>
$cos(\frac{\pi}{12}) * 2*r + 2*r = a$<br>
$2*r * (cos(\frac{\pi}{12}) + 1) = a$<br>
$r = \frac{a}{2*(cos(\frac{\pi}{12}) + 1)}$

As the puzzle originally asked for $a = 10\mathrm{cm}$, the specific solution can now be calculated:

$r = \frac{10}{2*(cos(\frac{\pi}{12}) + 1)}$<br>
$r = \frac{5}{cos(\frac{\pi}{12}) + 1}$<br>
$r \approx 2.543\mathrm{cm}$

While there are other solutions to this puzzle, I think that they all boil down to the same principle: trigonometric functions. While it would certainly be possible to express $x$ in terms of only $a$ and $r$ to then apply the Pythagorean Theorem and solve for $r$, the shown solution is likely to be the most concise.