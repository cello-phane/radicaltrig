## Table Of Contents {: #toc }

## Overview

A truncated cone is defined as a base cone who's been subtracted by another sub-cone, starting from it's top, with a specific height.

<img src="/assets/images/truncated_cone_volume__1.jpg" class="third-width-image"/>

$r_1$ represents the base cone's radius, $h$ the height of the cut, $r_2$ the radius of the base cone at the height of the cut, $V_s$ the subtracted volume and $h_s$ the height of the cut in reference to the cone's top.

While $V$ is the requested volume of the truncated cone, let $V_T$ be the total volume of the base cone.

The end goal is to arrive at a formula which yields $V$ using $r_1$, $r_2$ and $h$ as inputs. Why are all three needed? In order to restrict all degrees of freedom. It would also be possible to formulate an equation in terms of $r_1$, $h$ and $h_T$ (base cone height or *total height*).

## Derivation

It can be visually deduced that $V_T = V + V_s$ and thus $V = V_T - V_s$, as well as that $h_T = h + h_s$ and thus $h_s = h_T - h$

The volume as a cone can be calculated using the following formula:

$V = \frac{1}{3}*\pi*r^2*h$

Substituting this into the deduced formula for $V$ yields:

$V = (\frac{1}{3}*\pi*r_1^2*h_T) - (\frac{1}{3}*\pi*r_2^2*h_s)$

Expressing $h_s$ in other terms:

$V = (\frac{1}{3}*\pi*r_1^2*h_T) - (\frac{1}{3}*\pi*r_2^2*(h_T - h))$

This is pretty close already, but requires $r_1$, $h_T$, $r_2$ and $h$, while $h_T$ is already fixed based on the other parameters and thus redundant.

Since $h_T = h + h_s$ and $h$ is known, $h_s$ needs to be expressed in terms of only $r_1$, $r_2$ and $h$ for this extra parameter to vanish.

Let's take a closer look at a cross section of this construct:

<img src="/assets/images/truncated_cone_volume__2.jpg" class="third-width-image"/>

Since $h$, $r_1$ and $r_2$ are given and $h_s = h_T - h$, it is necessary to figure out the full height of the cone just based on $r_1$, $r_2$ and $h$.  The only way I could find to do that, was to think of the line connecting the cone's base to it's top in terms of a linear function, called $g$ in this image.

A linear function has the base scheme of $y = kx + d$, where $k$ is it's slope and $d$ is it's intersection with the y-axis, also called y-offset.

I will put my origin $(0|0)$ right at the top of the cone, making the x-axis colinear to $h$ and the y-axis parallel to $r_2$ going through the top of the cone. This way, $d = 0$. The slope of $g$, $k = \frac{\Delta{y}}{\Delta{x}} = \frac{r_1}{h_T}$, since for every $r_1$ of y-travel, the function advances by $h_T$ on the x-axis. Thus, the final function will be $g = r'(h') = \frac{r_1}{h_T}*h'$.

This function now yields the radius ($r'$, y-value) of the cone based on the distance travelled from the top of the cone ($h'$, x-value). The last remaining step is to express $h'$ in terms of just $h$, which is simple enough to accomplish: $r'(h) = \frac{r_1}{h_T}*(h_T - h)$. For the sake of completeness, it should be stated that $h\in[0;h_T]$.

Let's use this function to determine the height $h_s$ based on $r_2$ and $h$, assuming $r' = r$:

$r_2 = \frac{r_1}{h_T}*(h_T - h)$<br>
$r_2 = \frac{r_1}{h_T}*h_T - \frac{r_1}{h_T}*h$<br>
$r_2 = r_1 - \frac{r_1}{h_T}*h$<br>
$r_2 - r_1 = -\frac{r_1}{h_T}*h$<br>
$(r_2 - r_1) * h_T = -r_1*h$<br>
$h_T = -\frac{r_1*h}{(r_2 - r_1)}$<br>

Which can be rewritten as the following, in order to remove the need for a leading negative sign:

$h_T = \frac{r_1*h}{(r_1 - r_2)}$<br>

Since $h_T$ is now expressable in terms of only $r_1$, $r_2$ and $h$, the final volume equation can be put together by substitution:

$V = (\frac{1}{3}*\pi*r_1^2*h_T) - (\frac{1}{3}*\pi*r_2^2*(h_T - h))$<br>
$V = (\frac{1}{3}*\pi*r_1^2*\frac{r_1*h}{(r_1 - r_2)}) - (\frac{1}{3}*\pi*r_2^2*(\frac{r_1*h}{(r_1 - r_2)}- h))$

Quite crowded! Let's carefully simplify step by step:

$V = \frac{1}{3}*\pi*r_1^2*\frac{r_1*h}{(r_1 - r_2)} - (\frac{1}{3}*\pi*r_2^2*\frac{r_1*h}{(r_1 - r_2)}- \frac{1}{3}*\pi*r_2^2*h)$<br>
$V = \frac{1}{3}*\pi*r_1^2*\frac{r_1*h}{(r_1 - r_2)} - \frac{1}{3}*\pi*r_2^2*\frac{r_1*h}{(r_1 - r_2)}+ \frac{1}{3}*\pi*r_2^2*h$

$\frac{1}{3}*\pi*h$ is a common factor:

$V = \frac{1}{3}*\pi*h*(r_1^2*\frac{r_1}{(r_1 - r_2)} - r_2^2*\frac{r_1}{(r_1 - r_2)} + r_2^2)$<br>
$V = \frac{1}{3}*\pi*h*(\frac{r_1^3}{(r_1 - r_2)} - \frac{r_2^2*r_1}{(r_1 - r_2)} + r_2^2)$<br>
$V = \frac{1}{3}*\pi*h*(\frac{r_1^3 - r_2^2 * r_1}{(r_1 - r_2)} + r_2^2)$<br>

While this seems like a dead end at first glance and it took me some time of staring at it, the fraction can be eliminated by rewriting it's numerator as follows:

$r_1^3 - r_2^2 * r_1 = (r_1 - r_2)*(r_1^2 + r_1*r_2)$<br>
$r_1^3 - r_2^2 * r_1 = r_1 * r_1^2 + r_1*r_1*r_2 - r_2*r_1^2 - r_2*r_1*r_2$<br>
$r_1^3 - r_2^2 * r_1 = r_1^3 + r_1^2*r_2 - r_2*r_1^2 - r_2^2*r_1$<br>
$r_1^3 - r_2^2 * r_1 = r_1^3 - r_2^2*r_1$<br>

The cancellation of the middle FOIL terms $r_1^2*r_2$ reminded me of the third binomial formula $(a-b)(a+b) = a^2 - b^2$, just with little adaptation where the binom's $a$ and $b$ are allowed to differ, to accomodate for this situation.

This way, the nominator and denumerator both contain $(r1-r2)$ and cancel out:

$V = \frac{1}{3}*\pi*h*((r_1^2 + r_1 * r_2) + r_2^2)$

With the final result being:

$V = \frac{1}{3}*\pi*h*(r_1^2 + r_1 * r_2 + r_2^2)$

## Formula Adaptation

In specific circumstances, it may be more convenient to express $V$ in terms of $r_1$, $h$ and $h_T$, which requires the expression of $r_2$ in terms of $r_1$, $h$ and $h_T$.

This only takes little effort, as there's already a relation established from the result of the radius function constructed earlier:

$h_T = \frac{r_1*h}{(r_1 - r_2)}$<br>

Solving for $r_2$:

$h_T*(r_1 - r_2) = r_1*h$<br>
$r_1 - r_2 = \frac{r_1*h}{h_T}$<br>
$-r_2 = \frac{r_1*h}{h_T} - r_1$<br>
$r_2 = r_1 -\frac{r_1*h}{h_T}$<br>
$r_2 = r_1 *(1-\frac{h}{h_T})$<br>

Substituting $r_2$ into the equation for volume:

$V_X = \frac{1}{3}*\pi*h*(r_1^2 + r_1 * (r_1 *(1-\frac{h}{h_T})) + (r_1 *(1-\frac{h}{h_T}))^2)$<br>
$V = \frac{1}{3}*\pi*h*(r_1^2 + r_1^2 *(1-\frac{h}{h_T}) + r_1^2 * (1-\frac{h}{h_T})^2)$

How beautiful! $r_1^2$ appears in all terms and can be factored out, leaving only:

$V = \frac{1}{3}*\pi*h*r_1^2*(1 + (1-\frac{h}{h_T}) + (1-\frac{h}{h_T})^2)$<br>
$V = \frac{1}{3}*\pi*h*r_1^2*(1 + 1-\frac{h}{h_T} + 1 - 2*\frac{h}{h_T} + (\frac{h}{h_T})^2)$<br>
$V = \frac{1}{3}*\pi*h*r_1^2*(3-3*\frac{h}{h_T} + (\frac{h}{h_T})^2)$

There's not much more simplification to be done, I'm afraid.

Last but not least, it may also be convenient to arrive at the truncated cone's volume through only $r_1$, $h$ and $h_s$. Expressing $h_T$ in terms of $h$ and $h_s$ is as simple as $h_T = h + h_s$, resulting in:

$V = \frac{1}{3}*\pi*h*r_1^2*(3-3*\frac{h}{h + h_s} + (\frac{h}{h + h_s})^2)$