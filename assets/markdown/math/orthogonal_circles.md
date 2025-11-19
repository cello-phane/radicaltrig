Two circles are being considered orthogonal if the lines representing their radii at the point of intersection are orthogonal to each other.

## Table Of Contents {: #toc }

## Introduction

Let there be two circles, circle $1$ with origin $P_1$ and radius $r_1$ as well as circle $2$ with origin $P_2$ and radius $r_2$. Since the drawn radii are supposed to be orthogonal, there will always be two intersection-points, $P_3$ and $P_4$. If there is only one common point, the radii will be parallel.

<img src="/assets/images/orthogonal_circles__1.jpg" class="third-width-image"/>

## Distance Between Center-Points

The lines $\overline{P_1P_4}$ and $\overline{P_4P_2}$ make up a right triangle with it's third side being $\overline{P_2P_1}$. Let's call the latter $d$, as in the $\mathrm{\textbf{d}istance}$ between both centers.

<img src="/assets/images/orthogonal_circles__2.jpg" class="third-width-image"/>

If, and only if, the triangle $\triangle{P_1P_4P_2}$ is right-angled, the [Pythagorean Theorem](pythagorean_theorem.md) must apply, as follows:

$r_1^2 + r_2^2 = d^2$<br>
$\Rightarrow d = \sqrt{r_1^2 + r_2^2}$

It should be noted that this relation is symmetrical about $\overline{d}$ and thus applies to both points of intersection.

<img src="/assets/images/orthogonal_circles__3.jpg" class="third-width-image"/>

## Distance Between Intersection-Points

With this symmetry in mind, the distance between $P_3$ and $P_4$ will be equal to two times the height $h$ of a single right triangle.

<img src="/assets/images/orthogonal_circles__4.jpg" class="third-width-image"/>

Let's isolate the examined triangle for clarity. The height $h$ can be easily computed by making use of [Euclids Theorem Of Sides](euclids_theorem_of_sides.md), right after splitting $d$ into $p$ and $q$, based on the intersection of $d$ with $h$.

<img src="/assets/images/orthogonal_circles__5.jpg" class="third-width-image"/>

While not all of the following relations are required to solve for $h$, I still think that they are noteworthy:

$\mathrm{I}$: $p + q = d$<br>

By Pythagoras' Theorem:

$\mathrm{II}$: $h^2 + q^2 = r_2^2$<br>
$\mathrm{III}$: $h^2 + p^2 = r_1^2$

By Euclid's Theorem Of Sides:

$\mathrm{IV}$: $p * q = h^2$<br>
$\mathrm{V}$: $r_1^2 = p * d \Rightarrow p = \frac{r_1^2}{d}$<br>
$\mathrm{VI}$: $r_2^2 = q * d \Rightarrow q = \frac{r_2^2}{d}$

It doesn't matter wheter $\mathrm{II}$ or $\mathrm{III}$ is used as the base, as one will analogously follow the other's path. Let's substitute $q$ of $\mathrm{VI}$ into $\mathrm{II}$:

$h^2 + (\frac{r_2^2}{d})^2 = r_2^2$<br>
$h^2 = r_2^2 - (\frac{r_2^2}{d})^2$<br>
$h^2 = r_2^2 - \frac{r_2^4}{d^2}$

$d$ is of course already familiar, so let's get $h$ expressed only in terms of $r_1$ and $r_2$:

$h^2 = r_2^2 - \frac{r_2^4}{r_1^2 + r_2^2}$<br>
$h^2 = \frac{r_2^2 * (r_1^2 + r_2^2)}{r_1^2 + r_2^2} - \frac{r_2^4}{r_1^2 + r_2^2}$<br>
$h^2 = \frac{r_2^2 * (r_1^2 + r_2^2) - r_2^4}{r_1^2 + r_2^2}$<br>
$h^2 = \frac{r_2^2 * r_1^2 + r_2^2 * r_2^2 - r_2^4}{r_1^2 + r_2^2}$<br>
$h^2 = \frac{r_2^2 * r_1^2 + r_2^4 - r_2^4}{r_1^2 + r_2^2}$<br>
$h^2 = \frac{r_1^2 * r_2^2}{r_1^2 + r_2^2}$<br>
$h = \sqrt{\frac{r_1^2 * r_2^2}{r_1^2 + r_2^2}}$

Since $h$ is only half of the distance $\overline{P_3P_4}$, it finally follows that:

$\overline{P_3P_4} = 2 * \sqrt{\frac{r_1^2 * r_2^2}{r_1^2 + r_2^2}}$

# Intersection Area

The intersection area $A$ can be derived by just focusing on $\frac{A}{2}$, due to the previously talked-about symmetry:

<img src="/assets/images/orthogonal_circles__6.jpg" class="third-width-image"/>

There are two more areas of interest enclosed by the triangle $\triangle{P_1P_3P_2}$, namely $A_2$ and $A_3$:

<img src="/assets/images/orthogonal_circles__7.jpg" class="third-width-image"/>

It graphically follows, that

$A_2 + \frac{A}{2} + A_3 = \frac{r_1 * r_2}{2}$<br>
$\frac{A}{2} = \frac{r_1 * r_2}{2} - A_2 - A_3$<br>
$A = 2*(\frac{r_1 * r_2}{2} - A_2 - A_3)$,

so, finally,

$\mathrm{I}$: $A = r_1 * r_2 - 2*A_2 - 2*A_3$.

There are two circle-sectors, $S_1$ for the circle at $P_1$ and $S_2$ for the circle at $P_2$. Let $\alpha$ be the angle $\angle{P_3P_1P_2}$ and $\beta$ be the angle $\angle{P_1P_2P_3}$, then:

$\mathrm{II}$: $S_1 = \pi * r_1^2 * \frac{\alpha}{2 * \pi} = r_1^2 * \frac{\alpha}{2}$<br>
$\mathrm{III}$: $S_1 = A_2 + \frac{A}{2}$

$\mathrm{IV}$: $S_2 = \pi * r_2^2 * \frac{\beta}{2 * \pi} = r_2^2 * \frac{\beta}{2}$<br>
$\mathrm{V}$: $S_2 = A_3 + \frac{A}{2}$

By equating $\mathrm{II}$ and $\mathrm{III}$, we receive:

$\mathrm{VI}$: $r_1^2 * \frac{\alpha}{2} = A_2 + \frac{A}{2} \Rightarrow A_2 = r_1^2 * \frac{\alpha}{2} - \frac{A}{2}$

Analogously, by equating $\mathrm{IV}$ and $\mathrm{V}$, we receive:

$\mathrm{VII}$: $r_2^2 * \frac{\beta}{2} = A_3 + \frac{A}{2} \Rightarrow A_3 = r_2^2 * \frac{\beta}{2} - \frac{A}{2}$

Both of the above now allow to solve $\mathrm{I}$:

$A = r_1 * r_2 - 2*(r_1^2 * \frac{\alpha}{2} - \frac{A}{2}) - 2*(r_2^2 * \frac{\beta}{2} - \frac{A}{2})$<br>
$A = r_1 * r_2 - 2*r_1^2 * \frac{\alpha}{2} + 2*\frac{A}{2} - 2*r_2^2 * \frac{\beta}{2} + 2*\frac{A}{2}$<br>
$A = r_1 * r_2 - r_1^2 * \alpha + A - r_2^2 * \beta + A$<br>
$A = 2*A + r_1 * r_2 - r_1^2 * \alpha - r_2^2 * \beta$<br>
$-A = r_1 * r_2 - r_1^2 * \alpha - r_2^2 * \beta$<br>
$A = -(r_1 * r_2 - r_1^2 * \alpha - r_2^2 * \beta)$<br>
$A = -r_1 * r_2 + r_1^2 * \alpha + r_2^2 * \beta$<br>

$\alpha$ and $\beta$ can be described in terms of only $r_1$ and $r_2$ as well, by making use of $tan$:

$tan(\alpha) = \frac{r_2}{r_1} \Rightarrow \alpha = arctan(\frac{r_2}{r_1})$<br>
$\alpha + \beta = \frac{\pi}{2} \Rightarrow \beta = \frac{\pi}{2} - \alpha$

At this point, $A$ is fully defined in terms of $r_1$ and $r_2$:

$A = r_1^2 * \alpha + r_2^2 * (\frac{\pi}{2} - \alpha) - r_1 * r_2$

$A = r_1^2 * arctan(\frac{r_2}{r_1}) + r_2^2 * (\frac{\pi}{2} - arctan(\frac{r_2}{r_1})) - r_1 * r_2$

## Intersection Circumference

The circumference will be the sum of both arcs of circle sector $S_1$ (circle at $P_1$ with $r_1$) and circle sector $S_2$ (circle at $P_2$ with $r_2$).

Since $\pi = \frac{C}{d} \Rightarrow C = d * \pi$, and thus follows:

$C = 2*\pi*r_1 * \frac{\alpha}{2\pi} + 2*\pi*r_2 * \frac{\beta}{2\pi}$<br>
$C = r_1 * \alpha + r_2 * \beta$<br>
$C = r_1 * \alpha + r_2 * (\frac{\pi}{2} - \alpha)$

$C = r_1 * arctan(\frac{r_2}{r_1}) + r_2 * (\frac{\pi}{2} - arctan(\frac{r_2}{r_1}))$<br>

## Single Intersection Point

In order to end up with a single intersection point, the distance of the circles' center points needs to be exactly equal to the sum of their radii:

$\mathrm{I}$: $d = r_1 + r_2$

The tangent of a point on a circle's circumference is just a line orthogonal to it's radius-line, connecting said point to it's origin. If two circles touch because of $\mathrm{I}$, then they both share a single point, and with that, a single tangent line, which is why their radii are parallel. Since the radii connect, they are also colinear.