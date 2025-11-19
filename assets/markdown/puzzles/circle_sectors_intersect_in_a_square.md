The following puzzle asks the viewer to solve for the area enclosed by the intersection of both circle sectors, marked in blue.

<img src="/assets/images/circle_sectors_intersect_in_a_square__1.png" class="third-width-image"/>

The puzzle calls for a specific side-length of $4$, but this quantitiy can of course be generalized. Let's call it $a$ and reconstruct the scene manually, to get a feel for it:

<img src="/assets/images/circle_sectors_intersect_in_a_square__2.jpg" class="third-width-image"/>

The enclosing square is $\square{ABCD}$, the top-left quarter-circle is identified by it's origin $C_1$ (coincident with $B$) and radius $r_1 = a$ and the bottom center half-circle is identified by it's origin $C_2$ (half way between $A$ and $D$) and radius

$r_2 = \frac{a}{2} = \frac{r_1}{2}$.

These circles intersect in two points, namely $I_1$ and $I_2$.

The distance between $C_1$ and $C_2$, $d$, can be calculated by calculating the hypothenuse of the right triangle $\triangle{BAC_2}$:

$d^2 = r_1^2 + (\frac{r_1}{2})^2$<br>
$d^2 = r_1^2 + \frac{r_1^2}{4}$<br>
$d^2 = r_1^2 * (1 + \frac{1}{4})$<br>
$d^2 = r_1^2 * \frac{5}{4}$<br>

The above relation makes this pair of circles [Orthogonal Circles](/math/orthogonal_circles.md), which guarantees that, for both pairs of radii between the center points and the intersection point, the angle will be square:

<img src="/assets/images/circle_sectors_intersect_in_a_square__3.jpg" class="third-width-image"/>

The line $\overline{C_1C_2}$ ($x$), represents a line of symmetry, which cuts the target area exactly in half and creates two right triangles, namely $\triangle{C_1AC_2}$ and $\triangle{C_2I_2C_1}$. While we're at it, let's also name some areas and angles:

<img src="/assets/images/circle_sectors_intersect_in_a_square__4.jpg" class="third-width-image"/>

There's a lot going on in this drawing! To avoid confusion, let's precisely assign meanings to these new names:

$\alpha = \angle{C_1C_2I_2} = arctan(\frac{r_1}{r_2})$<br>
$\alpha = arctan(\frac{r_1}{\frac{r_1}{2}})$<br>
$\alpha = arctan(\frac{2*r_1}{r_1})$<br>
$\alpha = arctan(2)$

$\beta = \angle{C_2C_1I_2} = \frac{\pi}{2} - \alpha$<br>
$\beta = \frac{\pi}{2} - arctan(2)$<br>

Let $A_1$ be the area of the quarter circle at $C_1$, $A_2$ be the area of the half circle at $C_2$, $S_1$ be the area of the sector $\beta$ of the quarter circle at $C_1$, $S_2$ be the area of the sector $\alpha$ of the half circle at $C_2$, then:

$A_1 = \frac{\pi * r_1^2}{4}$

$A_2 = \frac{\pi * r_2^2}{2}$<br>
$A_2 = \frac{\pi * (\frac{r_1}{2})^2}{2}$<br>
$A_2 = \frac{\pi * \frac{r_1^2}{4}}{2}$<br>
$A_2 = \frac{\pi * r_1^2}{8}$

$\Rightarrow$ $A_2$ is exactly half of $A_1$.

While $\frac{\theta}{2*\pi}$ is the correct scaling factor for a circle sector of size $\theta$ on a full circle, this factor needs to be multiplied with $4$ and $2$ for $A_1$ and $A_2$ respectively, as they are only partial areas.

$S_1 = A_1 * \frac{\beta}{2*\pi} * 4$<br>
$S_1 = A_1 * \frac{2*\beta}{\pi}$<br>
$S_1 = \frac{\pi * r_1^2}{4} * \frac{2*\beta}{\pi}$<br>
$\mathrm{I}$: $S_1 = \frac{r_1^2 * \beta}{2}$

$S_2 = A_2 * \frac{\alpha}{2*\pi} * 2$<br>
$S_2 = A_2 * \frac{\alpha}{\pi}$<br>
$S_2 = \frac{\pi * r_1^2}{8} * \frac{\alpha}{\pi}$<br>
$\mathrm{II}$: $S_2 = \frac{r_1^2 * \alpha}{8}$

The area of the triangle $\triangle{C_2I_2C_1}$ is simply

$A_{\triangle} = \frac{r_1 * r_2}{2}$<br>
$A_{\triangle} = \frac{r_1 * \frac{r_1}{2}}{2}$<br>
$\mathrm{III}$: $A_{\triangle} = \frac{r_1^2}{4}$

Half of the target area $A$ is equal to the circle sector $S_1$ minus $A_3$:

$\mathrm{IV}$: $\frac{A}{2} = S_1 - A_3$<br>

The area $A_3$ is just the area of the triangle, minus it's opposite circle section:

$\mathrm{V}$: $A_3 = A_{\triangle} - S_2$

At this point, there's enough information available to solve for $A$, as follows:

Start out with $\mathrm{IV}$:

$\frac{A}{2} = S_1 - A_3$

Substitute $\mathrm{I}$ for $S_1$:

$\frac{A}{2} = \frac{r_1^2 * \beta}{2} - A_3$

Substitute $\mathrm{V}$ for $A_3$:

$\frac{A}{2} = \frac{r_1^2 * \beta}{2} - (A_{\triangle} - S_2)$

Substitute $\mathrm{II}$ for $S_2$:

$\frac{A}{2} = \frac{r_1^2 * \beta}{2} - (A_{\triangle} - \frac{r_1^2 * \alpha}{8})$

Substitute $\mathrm{III}$ for $A_{\triangle}$ and solve for $A$:

$\frac{A}{2} = \frac{r_1^2 * \beta}{2} - (\frac{r_1^2}{4} - \frac{r_1^2 * \alpha}{8})$<br>
$\frac{A}{2} = \frac{r_1^2 * \beta}{2} - \frac{r_1^2}{4} + \frac{r_1^2 * \alpha}{8}$<br>
$A = r_1^2 * \beta - \frac{r_1^2}{2} + \frac{r_1^2 * \alpha}{4}$<br>
$A = r_1^2 * (\beta - \frac{1}{2} + \frac{\alpha}{4})$

Since $\beta = \frac{\pi}{2} - \alpha$, one more variable drops:

$A = r_1^2 * (\frac{\pi}{2} - \alpha - \frac{1}{2} + \frac{\alpha}{4})$<br>
$A = r_1^2 * (\frac{\pi}{2} - \frac{1}{2} - \frac{3*\alpha}{4})$<br>
$A = r_1^2 * (\frac{2*\pi}{4} - \frac{2}{4} - \frac{3*\alpha}{4})$<br>
$A = r_1^2 * \frac{2*\pi - 2 - 3*\alpha}{4}$

Due to the ratio of both radii, as stated above, $\alpha = arctan(2)$:

$A = r_1^2 * \frac{2*\pi - 2 - 3*arctan(2)}{4}$

Let's evaluate the equation for the puzzle's case of $a = r_1 = 4$ in order to receive a concrete answer:

$A = 4^2 * \frac{2*\pi - 2 - 3*arctan(2)}{4}$<br>
$A = 4 * (2*\pi - 2 - 3*arctan(2))$<br>
$A = 8*\pi - 8 - 12*arctan(2)$<br>
$A \approx 3.85$