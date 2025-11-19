## Table Of Contents {: #toc }

## Introduction

Let there be a right-angled triangle $\triangle{ABC}$, with it's angles being the greek equivalent letter of it's three points ($\alpha, \beta, \gamma$) and it's sides being named the lower equivalent latin letter of it's opposite point.

<img src="/assets/images/pythagorean_theorem__1.jpg" class="third-width-image"/>

Since the sum of all angles within a triangle always adds up to $\pi$ and $\gamma = \frac{\pi}{2}$, $\alpha + \beta$ equals to the remainder, namely $\pi - \frac{\pi}{2}$, or just $\frac{\pi}{2}$. This means that if $\alpha$ and $\beta$ are added up, a right angle results.

## Alternating Alignment

If this alignment is done four times in a row, with alternating combinations of $\alpha$ and $\beta$, where the sides of two adjacent triangles are colinear, two squares appear:

<img src="/assets/images/pythagorean_theorem__2.jpg" class="half-width-image"/>

Namely, $\square{c}$ and $\square{(a+b)}$. The surface area of $A_{c1}$ is simply equivalent to $c^2$, while the surface area of one of the four triangles, $A_{\triangle}$ is equal to $\frac{1}{2}*a*b$. Last but not least, the area of the whole outer square, made up of the $a,b$ sides of all four triangles, is simply $(a+b)^2$.

Knowing these basic facts, it is now possible to put these three surface areas into relation:

$A_{c1} = (a+b)^2 - 4*A_{\triangle}$

The surface area of the inner square is equal to the full surface area of the outer square minus four times the surface area of a triangle.

Let's substitute the known representations into this relation:

$c^2 = (a+b)^2 - 4 * \frac{1}{2} * a * b$<br>
$c^2 = (a+b)^2 - 2 * a * b$<br>

Without making use of the Binomial Theorem, but just with basic algebraic knowledge, $(a+b)^2$ can be expanded the following way:

\begin{flalign}
(a+b)^2 &= (a+b)*(a+b)&& \\
&= a*a + a*b + b*a + b*b&& \\
&= a^2 + 2*a*b + b^2&&
\end{flalign}

Applying it to the last line of the previous substitution yields the following:

$c^2 = a^2 + 2*a*b + b^2 - 2*a*b$

Where $2*a*b - 2*a*b = 0$, thus arriving at:

$c^2 = a^2 + b^2$

## Equal Alignment

Aligning alternating angles already resulted in the desired proof, but one may always ask why aligning equal angles isn't also a valid way of constructing the relation.

<img src="/assets/images/pythagorean_theorem__3.jpg" class="half-width-image"/>

This time, the outer figure is a rectangle and the inner figure ended up as a parallelogram. The surface area of the rectangle is equal to $(a+a)*(b+b)=2a*2b=4*a*b$.

The surface area of a parallelogram equals to one of it's sidelengths times the length of that side's height in reference to the opposite corner. $e$ and $f$ are the diagonals of this parallelogram, where $e=2a$ and $f=2b$, as can be visually deduced. This is not only a parallelogram, but actually a special case: a rhombus, where all four sides are equal. Thus, it's surface area can also be expressed the following way:

$A_{c2} = \frac{e}{2} * \frac{f}{2} * \frac{1}{2} * 4 = \frac{1}{2}*e*f$

But $e$ and $f$ are only intermediates in this construction, the surface area needs to be expressed only in terms of $a$, $b$ and $c$.

By knowing that $A_{c2} = 2*e*f$ and that $A_{c2} = c*hc$, it follows that:

$\frac{1}{2}*e*f = c*hc$

Substituting in $e$ and $f$'s representations in terms of $a$ and $b$:

$\frac{1}{2}*2a*2b = c*hc$<br>
$2ab = c*hc$<br>
$\frac{2ab}{c} = hc$<br>

Which results in the following final surface area:

$A_{c2} = c*hc = c*\frac{2ab}{c} = 2*a*b$

While the surface area of one triangle is still just $\frac{1}{2}*a*b$.

Let's substitute into the known surface area relation again:

$A_{c2} = 4*a*b - 4*A_{\triangle}$<br>
$2*a*b = 4*a*b - 4 * \frac{1}{2}*a*b$<br>
$2*a*b = 4*a*b - 2a*b$<br>
$2*a*b = 2*a*b$

While this is a true statement, it's not offering any derivable information and can be called a *dead end*.