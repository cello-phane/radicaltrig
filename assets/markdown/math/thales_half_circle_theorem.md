This theorem states that, to construct a right triangle, the following steps can be taken:

Start out with line $\overline{AB}$, who's length is equal to the desired side length of the triangle's side $c$. Find it's center point and draw half of a circle (above or below) landing on $A$ and $B$ with radius $\frac{c}{2}$:

<img src="/assets/images/thales_half_circle_theorem__1.jpg" class="third-width-image"/>

Now, no matter which point $C$ is being picked on this arc, the resulting triangle $\triangle{ABC}$ will always be a right triangle:

<img src="/assets/images/thales_half_circle_theorem__2.jpg" class="third-width-image"/>

To prove this theorem, let's add the point $M$ to the scene, which is the midpoint of $\overline{AB}$, and draw in the radius $r$ from the picked point $C$ to $M$. $\alpha$ is going to be the angle $\angle{BAC}$, $\beta$ is the angle $\angle{CBA}$ and $\gamma$ is the angle $\angle{ACB}$.

<img src="/assets/images/thales_half_circle_theorem__3.jpg" class="third-width-image"/>

The line $\overline{CM} = r$ splits $\gamma$ into $\gamma_1$ and $\gamma_2$, with the following relation:

$\mathrm{I}$: $\gamma_1 + \gamma_2 = \gamma$

Because both $\triangle{AMC}$ and $\triangle{MBC}$ are isosceles triangles, it is further known that:

$\mathrm{II}$: $\alpha = \gamma_1$<br>
$\mathrm{III}$: $\beta = \gamma_2$

Since the [Sum Of Angles](./triangles.md#sum-of-angles) in a triangle is $\pi$, it follows that

$\mathrm{IV}$: $\alpha + \beta + \gamma = \pi$

By substituting $\mathrm{I}$, $\mathrm{II}$ and $\mathrm{III}$ into $\mathrm{IV}$, we receive:

$\gamma_1 + \gamma_2 + (\gamma_1 + \gamma_2) = \pi$<br>
$2*(\gamma_1 + \gamma_2) = \pi$<br>
$\gamma_1 + \gamma_2 = \frac{\pi}{2}$

Which finally constrains each and every possible triangle to be a right triangle, as

$\gamma = \frac{\pi}{2}$<br>