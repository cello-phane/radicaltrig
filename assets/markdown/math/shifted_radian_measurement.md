Usually, an angle measure is comprised of the ratio between the arc $s$ of a circle with radius $r$ between two rays which span an angle and said radius, yielding $\theta = \frac{s}{r}$, as stated in [Angle Measurement](./angles.md#measurement). What happens if the circle's origin does not coincide with with the vertex of the two rays which span the angle?

There are two degrees of freedom, one being the offset along one of the rays, $x_{off}$, and the other being the radius of the circle, $r$. The arc of the circle may intersect at point $I$ with the other ray of $\theta$.

<img src="/assets/images/shifted_radian_measurement__1.jpg" class="half-width-image"/>

If $r$ has been choosen too small, relative to $x_{off}$, the circle will not intersect with the ray.

INFO: At least for now, the requirement of $\theta \in \left[0;\frac{\pi}{2}\right[$ is assumed, due to the nature of $tan$, so that it *is* defined and $tan(\theta) \ge 0$. Also, $x_{off} \ge 0$.

All points along the circumference of the circle at $(x_{off}, 0)$ are of distance $r$ from the origin. Let $C$ be the function of the circle.

$C^2(x) + x^2 = r^2$

To account for the offset, $x$ needs to be modified.

$C^2(x) + (x - x_{off})^2 = r^2$<br>
$C(x) = \sqrt{r^2 - (x - x_{off})^2}$

The opposite ray is just a simple linear function of shape

$y = k*x + d$

but without any offset along the y-axis, as it goes through the origin. Let $R$ be the function of this ray.

$R(x) = tan(\theta) * x$

A point of intersection requires $R$ and $C$ to have a common point with equal $x$ and $y$ values. For this to be true, their equations have to be equal.

$R(x) = C(x)$<br>
$tan(\theta) * x = \sqrt{r^2 - (x - x_{off})^2}$<br>
$tan^2(\theta) * x^2 = r^2 - (x - x_{off})^2$<br>
$tan^2(\theta) * x^2 = r^2 - (x^2 - 2*x*x_{off} + x_{off}^2)$<br>
$tan^2(\theta) * x^2 = r^2 - x^2 + 2*x*x_{off} - x_{off}^2$<br>
$tan^2(\theta) * x^2 + x^2 - 2*x*x_{off} - r^2 + x_{off}^2 = 0$<br>
$(tan^2(\theta) + 1) * x^2 - 2*x_{off}*x - (r^2 - x_{off}^2) = 0$

At this point, the pattern of a quadratic equation became obvious, with it's factors being as follows:

$a = tan^2(\theta) + 1$<br>
$b = -2*x_{off}$<br>
$c = -(r^2 - x_{off}^2)$

Let's solve for $x$.

$x_{1, 2} = \frac{-b \pm \sqrt{b^2 - 4*a*c}}{2*a}$<br>
$x_{1, 2} = \frac{2*x_{off} \pm \sqrt{4*x_{off}^2 - 4*(tan^2(\theta) + 1)*(-(r^2 - x_{off}^2))}}{2*(tan^2(\theta) + 1)}$<br>
$x_{1, 2} = \frac{2*x_{off} \pm \sqrt{4*x_{off}^2 + 4*(tan^2(\theta) + 1)*(r^2 - x_{off}^2)}}{2*(tan^2(\theta) + 1)}$<br>
$x_{1, 2} = \frac{2*x_{off} \pm \sqrt{4*(x_{off}^2 + (tan^2(\theta) + 1)*(r^2 - x_{off}^2))}}{2*(tan^2(\theta) + 1)}$<br>
$x_{1, 2} = \frac{\cancel{2}*x_{off} \pm \cancel{2} * \sqrt{x_{off}^2 + (tan^2(\theta) + 1)*(r^2 - x_{off}^2)}}{\cancel{2}*(tan^2(\theta) + 1)}$<br>
$x_{1, 2} = \frac{x_{off} \pm \sqrt{\cancel{x_{off}^2} + tan^2(\theta) * r^2 - tan^2(\theta) * x_{off}^2 + r^2 - \cancel{x_{off}^2}}}{tan^2(\theta) + 1}$<br>
$x_{1, 2} = \frac{x_{off} \pm \sqrt{r^2 + tan^2(\theta) * (r^2 - x_{off}^2)}}{tan^2(\theta) + 1}$

The second solution of $x_{1,2}$ (when subtracting) represents the intersection within the 3rd quadrant and can be ignored. So, finally, the $x$ of the intersection point $I$ will be:

$\mathrm{I}$: $x_{I} = \frac{x_{off} + \sqrt{r^2 + tan^2(\theta) * (r^2 - x_{off}^2)}}{tan^2(\theta) + 1}$

There will be no real solution if the radicand is less than zero, which implies that there will be no point of intersection.

$r^2 + tan^2(\theta) * (r^2 - x_{off}^2) < 0$<br>
$r^2 + tan^2(\theta) * r^2 - tan^2(\theta) * x_{off}^2 < 0$<br>
$r^2 * (1 + tan^2(\theta)) < tan^2(\theta) * x_{off}^2$<br>
$r^2 < \frac{tan^2(\theta)}{(1 + tan^2(\theta)) } * x_{off}^2$

Due to the [Definition Of Trigonometric Functions](./trigonometric_functions.md#definition) and it's resulting identities, the fraction above may be rewritten.

$r^2 < \frac{tan^2(\theta)}{sec^2(\theta)} * x_{off}^2$<br>
$r^2 < \frac{tan^2(\theta)}{sec^2(\theta)} * x_{off}^2$<br>
$r^2 < \frac{(\frac{sin(\theta)}{cos(\theta)})^2}{(\frac{1}{cos(\theta)})^2} * x_{off}^2$<br>
$r^2 < \frac{\frac{sin^2(\theta)}{cos^2(\theta)}}{\frac{1}{cos^2(\theta)}} * x_{off}^2$<br>
$r^2 < \frac{sin^2(\theta) * \cancel{cos^2(\theta)}}{\cancel{cos^2(\theta)}} * x_{off}^2$<br>
$r < sin(\theta) * x_{off}$

From this inequality arises the insight, that if $r$ is less than the offset $x_{off}$, scaled by the sine of the angle $\theta$, no intersection will occur.

In order to figure out the length $s$ of the arc between one ray and the point of intersection $I$ with the other ray, the angle $\alpha$ has to be known.

<img src="/assets/images/shifted_radian_measurement__2.jpg" class="half-width-image"/>

Let's zoom in on that little triangle and let the angle supplementary to $\alpha$ be $\beta$, while the difference between $x_{off}$ and $x_I$ is marked as $x_{\Delta}$.

<img src="/assets/images/shifted_radian_measurement__3.jpg" class="half-width-image"/>

It follows, that

$\beta = arccos(\frac{x_{\Delta}}{r})$

which implies, that

$\alpha = \pi - arccos(\frac{x_{\Delta}}{r})$

so that the length $s$ will end up being

$s = \cancel{2*\pi}*r*\frac{\pi - arccos(\frac{x_{\Delta}}{r})}{\cancel{2*\pi}}$<br>
$s = r*(\pi - arccos(\frac{x_{\Delta}}{r}))$<br>
$s = r*(\pi - arccos(\frac{x_{off} - x_I}{r}))$

Because the bottom ray has been defined to be the x-axis along this thought process, $x_I$ can be obtained by [Dropping A Perpendicular](./construction.md#dropping-a-perpendicular) on it from the point of intersection.

When $r$, $x_{off}$ and $x_I$ are known, the angle $\theta$ can be solved for by making use of $\mathrm{I}$.

$x_{I} = \frac{x_{off} + \sqrt{r^2 + tan^2(\theta) * (r^2 - x_{off}^2)}}{tan^2(\theta) + 1}$<br>
$x_{I} * (tan^2(\theta) + 1) = x_{off} + \sqrt{r^2 + tan^2(\theta) * (r^2 - x_{off}^2)}$<br>
$x_{I} * (tan^2(\theta) + 1) - x_{off} = \sqrt{r^2 + tan^2(\theta) * (r^2 - x_{off}^2)}$<br>
$(x_{I} * (tan^2(\theta) + 1) - x_{off})^2 = r^2 + tan^2(\theta) * (r^2 - x_{off}^2)$<br>
$(x_{I} * sec^2(\theta) - x_{off})^2 = r^2 + tan^2(\theta) * (r^2 - x_{off}^2)$<br>
$(x_{I} * sec^2(\theta) - x_{off})^2 = r^2 + tan^2(\theta) * r^2 - tan^2(\theta) * x_{off}^2$<br>
$(x_{I} * sec^2(\theta) - x_{off})^2 = (tan^2(\theta) + 1) * (r^2 - x_{off}^2) + x_{off}^2$<br>
$(x_{I} * sec^2(\theta) - x_{off})^2 = sec^2(\theta) * (r^2 - x_{off}^2) + x_{off}^2$<br>
$x_{I}^2 * sec^4(\theta) - 2 * x_{I} * sec^2(\theta) * x_{off} + \cancel{x_{off}^2} = sec^2(\theta) * (r^2 - x_{off}^2) + \cancel{x_{off}^2}$<br>
$\cancel{sec^2(\theta)} * (x_{I}^2 * sec^2(\theta) - 2 * x_{I} * x_{off}) = \cancel{sec^2(\theta)} * (r^2 - x_{off}^2)$<br>
$x_{I}^2 * sec^2(\theta) = r^2 - x_{off}^2 + 2 * x_{I} * x_{off}$<br>
$sec^2(\theta) = \frac{r^2 - x_{off}^2 + 2 * x_{I} * x_{off}}{x_I^2}$<br>
$sec(\theta) = \frac{\sqrt{r^2 - x_{off}^2 + 2 * x_{I} * x_{off}}}{x_I}$<br>
$\frac{1}{cos(\theta)} = \frac{\sqrt{r^2 - x_{off}^2 + 2 * x_{I} * x_{off}}}{x_I}$<br>
$cos(\theta) = \frac{x_I}{\sqrt{r^2 - x_{off}^2 + 2 * x_{I} * x_{off}}}$<br>
$\mathrm{II}$: $\theta = arccos\left(\frac{x_I}{\sqrt{r^2 - x_{off}^2 + 2 * x_{I} * x_{off}}}\right)$

If the circle is drawn at the vertex and thus $x_{off} = 0$, the formula vastly simplifies.

$\theta = arccos\left(\frac{x_I}{\sqrt{r^2}}\right)$<br>
$\theta = arccos\left(\frac{x_I}{r}\right)$