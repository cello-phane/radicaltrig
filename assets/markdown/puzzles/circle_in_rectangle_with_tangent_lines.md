This puzzle describes a circle that's located at an exact point within a rectangle, determined by the four tangent lines that connect to it, starting from each of the four corners of the enclosing rectangle. The claim is, that only the length of three of these tangent lines already fully geometrically define the scene, for which the puzzle provided the following inputs:

$d = 33$<br>
$a = 35$<br>
$c = 85$

The reader is challenged to solve for $b$.

<img src="/assets/images/circle_in_rectangle_with_tangent_lines__1.jpg" class="half-width-image"/>

For brevity's sake, $\overline{AA'} = a$, $\overline{BB'} = b$, $\overline{CC'} = c$ and $\overline{DD'} = d$. Since a tangent line of a circle is defined to make a right angle with the radius at the point of intersection, four right triangles emerge, namely $\triangle{MD'D}$, $\triangle{MA'A}$, $\triangle{MB'B}$ and $\triangle{MC'C}$.

<img src="/assets/images/circle_in_rectangle_with_tangent_lines__2.jpg" class="half-width-image"/>

Due to the [Pythagorean Theorem](/math/pythagorean_theorem.md), their sides are related.

$\mathrm{I}$: $\overline{MD'}^2 + d^2 = \overline{MD}^2$<br>
$\mathrm{II}$: $\overline{MA'}^2 + a^2 = \overline{MA}^2$<br>
$\mathrm{III}$: $\overline{MB'}^2 + b^2 = \overline{MB}^2$<br>
$\mathrm{IV}$: $\overline{MC'}^2 + c^2 = \overline{MC}^2$

Since the distance from the center of the circle, $M$, and a point on it's circumference (prime-points) is always equal to the radius $r$ of the circle, let's re-state the above equations.

$\mathrm{I}$: $r^2 + d^2 = \overline{MD}^2$<br>
$\mathrm{II}$: $r^2 + a^2 = \overline{MA}^2$<br>
$\mathrm{III}$: $r^2 + b^2 = \overline{MB}^2$<br>
$\mathrm{IV}$: $r^2 + c^2 = \overline{MC}^2$

While these relations are certainly very helpful already, they contain six unknowns, so we cannot solve for concrete values yet. Let's search for relations within the enclosing rectangle. By drawing a horizontal as well as a vertical line through the center of the circle, $M$, the rectangle is partitioned into four new rectangles.

<img src="/assets/images/circle_in_rectangle_with_tangent_lines__3.jpg" class="half-width-image"/>

These rectangles each share one of their diagonals with the hypothenuses of the four right triangles found earlier.

<img src="/assets/images/circle_in_rectangle_with_tangent_lines__4.jpg" class="half-width-image"/>

It is now possible to relate these hypothenuses, as they are part of new right triangles, where adjacent pairs each have one side in common.

$\mathrm{V}$: $h_1^2 + l_1^2 = \overline{MD}^2 \Rightarrow h_1^2 = \overline{MD}^2 - l_1^2$<br>
$\mathrm{VI}$: $h_1^2 + l_2^2 = \overline{MC}^2$<br>
$\mathrm{VII}$: $h_2^2 + l_2^2 = \overline{MB}^2 \Rightarrow h_2^2 = \overline{MB}^2 - l_2^2$<br>
$\mathrm{VIII}$: $h_2^2 + l_1^2 = \overline{MA}^2$

By substituting $\mathrm{V}$ into $\mathrm{VI}$ and $\mathrm{VII}$ into $\mathrm{VIII}$, two promising new equations can be obtained.

$\overline{MC}^2 - l_2^2 + l_1^2 = \overline{MD}^2$<br>
$\overline{MB}^2 - l_2^2 + l_1^2 = \overline{MA}^2$

Because they share the lengths $l_2$ and $l_1$ with common signs, subtracting them will drop these out and yield a relation of just the diagonals themselves.

$\mathrm{IX}$: $\overline{MC}^2 - \overline{MB}^2 = \overline{MD}^2 - \overline{MA}^2$

Let's substitute $\mathrm{I}$, $\mathrm{II}$, $\mathrm{III}$ and $\mathrm{IV}$ into $\mathrm{IX}$ to see the fully expanded relation.

$r^2 + c^2 - r^2 + b^2 = r^2 + d^2 - r^2 + a^2$<br>
$\cancel{r} + c^2 - \cancel{r} + b^2 = \cancel{r} + d^2 - \cancel{r} + a^2$

We now receive the final equation, relating the lengths of the tangent lines.

$c^2 - b^2 = d^2 - a^2$

Applying the puzzle's inputs, the side $b$ can be solved for.

$85^2 - b^2 = 33^2 - 35^2$<br>
$b^2 = 85^2 - 33^2 + 35^2$<br>
$b^2 = 85^2 - 33^2 + 35^2$<br>
$b^2 = 7361$<br>
$b = \sqrt{7361} \approx 85.8$