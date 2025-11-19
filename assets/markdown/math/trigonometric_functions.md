## Table Of Contents {: #toc }

## Solved Problem

In order to understand the problem that is being solved by defining trigonometric functions, let's consider the following right triangle $\triangle{ABC}$:

<img src="/assets/images/trigonometric_functions__1.jpg" class="third-width-image"/>

Due to the [Sum Of Angles](./triangles.md#sum-of-angles), choosing either $\alpha$ or $\beta$ will define the other angle, as follows:

$\alpha = \pi - \beta$<br>
$\beta = \pi - \alpha$

Due to this property, the principle of [Similarity](./triangles.md#similarity) applies to all right triangles that have an [Acute Angle](./angles.md#acute-angle) in common. Thus, the ratio of lengths of all corresponding side-pairs will be equal.

Let there be two right-angled triangles, namely $\triangle{ABC}$ and $\triangle{DEF}$, which share the acute angle $\alpha$:

<img src="/assets/images/trigonometric_functions__3.jpg" class="third-width-image"/>

The following relations will emerge:

$\frac{a'}{a} = \frac{b'}{b} = \frac{c'}{c}$

If $a'$, $b'$ and $c'$ are known for every $\alpha$, then $a$, $b$ and $c$ can be solved for.

$\frac{a'}{a} = \frac{b'}{b} \Rightarrow \frac{b}{a} = \frac{b'}{a'} \Rightarrow b = a * \frac{b'}{a'},\;a = b * \frac{a'}{b'}$<br>
$\frac{b'}{b} = \frac{c'}{c} \Rightarrow \frac{c}{b} = \frac{c'}{b'} \Rightarrow c = b * \frac{c'}{b'},\;b = c * \frac{b'}{c'}$<br>
$\frac{a'}{a} = \frac{c'}{c} \Rightarrow \frac{c}{a} = \frac{c'}{a'} \Rightarrow c = a * \frac{c'}{a'},\;a = c * \frac{a'}{c'}$

As apparent, there are two ways to solve for each side of $\triangle{ABC}$:

$b = a * \frac{b'}{a'} = c * \frac{b'}{c'}$<br>
$a = b * \frac{a'}{b'} = c * \frac{a'}{c'}$<br>
$c = b * \frac{c'}{b'} = a * \frac{c'}{a'}$

By constraining $c' = 1$, $\triangle{DEF}$ is now fully defined for every possible value of $\alpha$, which means that every corresponding $a'$ and $b'$ (and, of course, $c'$) is known. For reasons soon to be explored, $a'$ has been named $sin(\alpha)$ and $b'$ has been named $cos(\alpha)$.

<img src="/assets/images/trigonometric_functions__4.jpg" class="third-width-image"/>

The previously mentioned relations can now be re-stated in terms of these two new names and $c' = 1$:

$b = a * \frac{sin(\alpha)}{cos(\alpha)} = c * \frac{sin(\alpha)}{1} = c * sin(\alpha)$<br>
$a = b * \frac{cos(\alpha)}{sin(\alpha)} = c * \frac{cos(\alpha)}{1} = c * cos(\alpha)$<br>
$c = b * \frac{1}{sin(\alpha)} = a * \frac{1}{cos(\alpha)}$

To solve for a side of $\triangle{ABC}$, one other side as well as $\alpha$ needs to be known. On the other hand, if both sides of a relation are known, then one could solve for $\alpha$, if there were inverse functions of $sin$ and $cos$.

While we're at it, it would also be handy to have separate functions for all of these fraction-factors which don't have $1$ as their denominator, to avoid calculating constants from scratch over and over again.

## Definition

<img src="/assets/images/trigonometric_functions__2.jpg" class="half-width-image"/>

($\beta = \frac{\pi}{2} - \alpha \Rightarrow \alpha + \beta = \frac{\pi}{2}$)

Modern trigonometric functions have been defined within the *unit circle* of $r = 1$, and there are quite a few of them in existence. While a few different representations of these ratios within the *unit circle* exist, I personally think that the depiceted version is the most intuitively understandable amongst them. The "co-" prefix stands for the function operating on a [Complementary Angle](./angles.md#complementary-angles).

The reason to use a *unit circle* in contrast to just defining them by a right triangle is that the former allows the domain of the trigonometric functions to be the whole real number line, as - first of all - symmetries in the four quadrants of the coordinate system are made use of and, secondly, values less than $0$ or greater than $2*\pi$ are wrapped around by "walking in circles".

| Name (Function) | Distance | Ratio | Relations |
|:--------:|:--------:|:-----:|-----------|
| $sine$ ($sin$)      | $\overline{BC}$ | $\frac{opposite}{hypothenuse}$ | $sin(\alpha) = cos(\frac{\pi}{2} - \alpha) = \frac{1}{csc(\alpha)}$ |
| $cosine$ ($cos$)    | $\overline{AB}$ | $\frac{adjacent}{hypothenuse}$ | $cos(\alpha) = sin(\frac{\pi}{2} - \alpha) = \frac{1}{sec(\alpha)}$ |
| $tangent$ ($tan$)   | $\overline{DE}$ | $\frac{opposite}{adjacent}$    | $tan(\alpha) = \frac{sin(\alpha)}{cos(\alpha)} = cot(\frac{\pi}{2} - \alpha) = \frac{1}{cot(\alpha)}$ |
| $cotangent$ ($cot$) | $\overline{GD}$ | $\frac{adjacent}{opposite}$    | $cot(\alpha) = \frac{cos(\alpha)}{sin(\alpha)} = \tan(\frac{\pi}{2} - \alpha) = \frac{1}{tan(\alpha)}$ |
| $secant$ ($sec$)    | $\overline{CE}$ | $\frac{hypothenuse}{adjacent}$ | $sec(\alpha) = csc(\frac{\pi}{2} - \alpha) = \frac{1}{cos(\alpha)}$ |
| $cosecant$ ($csc$)  | $\overline{EG}$ | $\frac{hypothenuse}{opposite}$ | $csc(\alpha) = sec(\frac{\pi}{2} - \alpha) = \frac{1}{sin(\alpha)}$ |

The word sine is an adaptation of Latin sinus - a bend, bay, etc.; also, the hanging fold of the upper part of a toga, the bosom of a garment, and hence used to render the synonymous Arabic jaib, applied in geometry. The word tangent comes from the Latin *tangere*, to touch, as a tangent line touches the figure only in one point. The word secant comes from the Latin *secare*, to cut. A secant cuts a circle in exactly two points. In the current context, one of those points is omitted, due to symmetry.

## Derivation

Due to the [Pythagorean Theorem](./pythagorean_theorem.md), the following relation is true:

$\mathrm{I}$: $cos^2(\alpha) + sin^2(\alpha) = 1$

There are many [Similar](./triangles.md#similarity) triangles, relative to $\triangle{ABC}$, which are of help when it comes to deriving the remaining triangular functions in terms of only $sin$ and $cos$.

Since $\triangle{BDC} \sim \triangle{ABC}$:

$\mathrm{II}$: $\frac{cos(\alpha)}{sin(\alpha)} = \frac{1}{tan(\alpha)} \Rightarrow tan(\alpha) = \frac{sin(\alpha)}{cos(\alpha)}$

Since $\triangle{FCE} \sim \triangle{ABC}$:

$\mathrm{III}$: $\frac{sin(\alpha)}{cos(\alpha)} = \frac{1}{cot(\alpha)} \Rightarrow cot(\alpha) = \frac{cos(\alpha)}{sin(\alpha)}$

Since $\triangle{ACE} \sim \triangle{ABC}$:

$\frac{1}{csc(\alpha)} = \frac{cos(\alpha)}{cot(\alpha)}$<br>
$csc(\alpha) = \frac{cot(\alpha)}{cos(\alpha)}$

Substituting $\mathrm{III}$ for $cot$:

$csc(\alpha) = \frac{\frac{cos(\alpha)}{sin(\alpha)}}{cos(\alpha)}$<br>
$\mathrm{IV}$: $csc(\alpha) = \frac{cos(\alpha)}{sin(\alpha) * cos(\alpha)} = \frac{1}{sin(\alpha)}$

Since $\triangle{ADC} \sim \triangle{ABC}$:

$\frac{1}{sec(\alpha)} = \frac{sin(\alpha)}{tan(\alpha)}$<br>
$sec(\alpha) = \frac{tan(\alpha)}{sin(\alpha)}$

Substituting $\mathrm{II}$ for $tan$:

$sec(\alpha) = \frac{\frac{sin(\alpha)}{cos(\alpha)}}{sin(\alpha)}$<br>
$\mathrm{V}$: $sec(\alpha) = \frac{sin(\alpha)}{sin(\alpha) * cos(\alpha)} = \frac{1}{cos(\alpha)}$

## Graphs

<img src="/assets/images/trigonometric_functions__9.png" class="third-width-image"/>

Due to $cos$ being equal to $sin$ on it's [Complementary Angle](./angles.md#complementary-angles),

$sin(\alpha) = cos(\frac{\pi}{2} - \alpha)$

, $sin$ is leading $cos$ by $\frac{\pi}{2}$. They are said to be *90° out of phase*. $tan$ is undefined ($\pm\infty$) for $\frac{\pi}{2}$ (horizontal tangent line on the top) and $\frac{3*\pi}{2}$ (horizontal tangent line on the bottom), as well as for their multiples.

## Half Angle Formula

Let there be a right triangle $\triangle{ABC}$ with a hypothenuse of $1$ and an angle $\angle{BAC} = \alpha$. The side $\overline{AB}$ will depict $cos(\alpha)$, while the side $\overline{BC}$ will depict $sin(\alpha)$. It's angle $\alpha$ is bisected by the line $\overline{AD}$, which splits $\overline{BC}$ info $e$ and $f$.

<img src="/assets/images/trigonometric_functions__7.jpg" class="third-width-image"/>

According to the [Triangle Angle-Bisection Theorem](./triangle_angle_bisection_theorem.md), if $\alpha$ is bisected, then

$\mathrm{I}$: $\frac{e}{f} = \frac{cos(\alpha)}{1} = cos(\alpha) \Rightarrow e = f * cos(\alpha)$

It is visually deducable that

$\mathrm{II}:$ $e + f = sin(\alpha)$

Substitute $\mathrm{I}$ into $\mathrm{II}$:

$f * cos(\alpha) + f = sin(\alpha)$<br>
$f * (cos(\alpha) + 1) = sin(\alpha)$<br>
$\mathrm{III}$: $f = \frac{sin(\alpha)}{cos(\alpha) + 1}$

And substitute $\mathrm{III}$ back into $\mathrm{II}$:

$e + \frac{sin(\alpha)}{cos(\alpha) + 1} = sin(\alpha)$<br>
$\mathrm{IV}$: $e = sin(\alpha) - \frac{sin(\alpha)}{cos(\alpha) + 1}$

The length of $\overline{AD}$ can be calculated as follows:

$\overline{AD}^2 = cos^2(\alpha) + e^2$<br>
$\overline{AD} = \sqrt{cos^2(\alpha) + e^2}$

Substitute $\mathrm{IV}$ in for $e$:

$\overline{AD} = \sqrt{cos^2(\alpha) + (sin(\alpha) - \frac{sin(\alpha)}{cos(\alpha) + 1})^2}$<br>
$\overline{AD} = \sqrt{cos^2(\alpha) + sin^2(\alpha) - \frac{2 * sin^2(\alpha)}{cos(\alpha) + 1} + \frac{sin^2(\alpha)}{(cos(\alpha) + 1)^2}}$<br>
$\overline{AD} = \sqrt{\frac{cos^2(\alpha) * (cos(\alpha) + 1)^2}{(cos(\alpha) + 1)^2} + \frac{sin^2(\alpha) * (cos(\alpha) + 1)^2}{(cos(\alpha) + 1)^2} - \frac{2 * sin^2(\alpha) * (cos(\alpha) + 1)}{(cos(\alpha) + 1)^2} + \frac{sin^2(\alpha)}{(cos(\alpha) + 1)^2}}$<br>
$\overline{AD} = \sqrt{\frac{cos^2(\alpha) * (cos(\alpha) + 1)^2 + sin^2(\alpha) * (cos(\alpha) + 1)^2 - 2 * sin^2(\alpha) * (cos(\alpha) + 1) + sin^2(\alpha)}{(cos(\alpha) + 1)^2}}$<br>
$\overline{AD} = \sqrt{\frac{cos^2(\alpha) * (cos^2(\alpha) + 2 * cos(\alpha) + 1) + sin^2(\alpha) * (cos^2(\alpha) + 2 * cos(\alpha) + 1) - 2 * sin^2(\alpha) * (cos(\alpha) + 1) + sin^2(\alpha)}{(cos(\alpha) + 1)^2}}$<br>
$\overline{AD} = \sqrt{\frac{cos^4(\alpha) + 2 * cos^3(\alpha) + cos^2(\alpha) + sin^2(\alpha) * cos^2(\alpha) + sin^2(\alpha) * 2 * cos(\alpha) + sin^2(\alpha) - (2 * sin^2(\alpha) * cos(\alpha) + 2 * sin^2(\alpha)) + sin^2(\alpha)}{(cos(\alpha) + 1)^2}}$<br>
$\overline{AD} = \sqrt{\frac{cos^4(\alpha) + 2 * cos^3(\alpha) + cos^2(\alpha) + sin^2(\alpha) * cos^2(\alpha) + sin^2(\alpha) * 2 * cos(\alpha) + sin^2(\alpha) - 2 * sin^2(\alpha) * cos(\alpha) - 2 * sin^2(\alpha) + sin^2(\alpha)}{(cos(\alpha) + 1)^2}}$<br>
$\overline{AD} = \sqrt{\frac{cos^4(\alpha) + 2 * cos^3(\alpha) + cos^2(\alpha) + sin^2(\alpha) * cos^2(\alpha) + sin^2(\alpha) * 2 * cos(\alpha) + \cancel{sin^2(\alpha)} - 2 * sin^2(\alpha) * cos(\alpha) - \cancel{2 * sin^2(\alpha)} + \cancel{sin^2(\alpha)}}{(cos(\alpha) + 1)^2}}$<br>
$\overline{AD} = \sqrt{\frac{cos^4(\alpha) + 2 * cos^3(\alpha) + cos^2(\alpha) + sin^2(\alpha) * cos^2(\alpha) + \cancel{sin^2(\alpha) * 2 * cos(\alpha)} - \cancel{2 * sin^2(\alpha) * cos(\alpha)}}{cos^2(\alpha) + 2 * cos(\alpha) + 1}}$<br>
$\overline{AD} = \sqrt{\frac{cos^4(\alpha) + 2 * cos^3(\alpha) + cos^2(\alpha) + sin^2(\alpha) * cos^2(\alpha)}{(cos(\alpha) + 1)^2}}$

Since $sin^2(\alpha) = 1 - cos^2(\alpha)$

$\overline{AD} = \sqrt{\frac{cos^4(\alpha) + 2 * cos^3(\alpha) + cos^2(\alpha) + (1 - cos^2(\alpha)) * cos^2(\alpha)}{(cos(\alpha) + 1)^2}}$<br>
$\overline{AD} = \sqrt{\frac{\cancel{cos^4(\alpha)} + 2 * cos^3(\alpha) + cos^2(\alpha) + cos^2(\alpha) - \cancel{cos^4(\alpha)}}{(cos(\alpha) + 1)^2}}$<br>
$\overline{AD} = \sqrt{\frac{2 * cos^3(\alpha) + 2 * cos^2(\alpha)}{(cos(\alpha) + 1)^2}}$<br>
$\overline{AD} = \sqrt{\frac{2 * cos^2(\alpha) * \cancel{(cos(\alpha) + 1)}}{(cos(\alpha) + 1)^{\cancel{2}}}}$<br>
$\overline{AD} = \sqrt{\frac{2 * cos^2(\alpha)}{cos(\alpha) + 1}}$<br>
$\overline{AD} = \frac{\sqrt{2} * cos(\alpha)}{\sqrt{cos(\alpha) + 1}}$

$\overline{AD} < 1$, because the hypothenuse is directly proportional to the sum of the other sides. $cos$ remains constant, while $e < sin$. Therefore, the following factor $k$ scales the new triangle $\triangle{ABD}$ to be aligned to the *unit circle* again:

$k = \frac{1}{\overline{AD}}$

Thus follows, that

$cos(\frac{\alpha}{2}) = k * cos(\alpha)$<br>
$cos(\frac{\alpha}{2}) = \frac{cos(\alpha)}{\overline{AD}}$<br>
$cos(\frac{\alpha}{2}) = \frac{cos(\alpha)}{\frac{\sqrt{2} * cos(\alpha)}{\sqrt{cos(\alpha) + 1}}}$<br>
$cos(\frac{\alpha}{2}) = \frac{\cancel{cos(\alpha)} * \sqrt{cos(\alpha) + 1}}{\sqrt{2} * \cancel{cos(\alpha)}}$<br>
$cos(\frac{\alpha}{2}) = \frac{\sqrt{cos(\alpha) + 1}}{\sqrt{2}}$<br>
$cos(\frac{\alpha}{2}) = \sqrt{\frac{1 + cos(\alpha)}{2}}$

Since $sin^2 = 1 - cos^2$:

$sin(\frac{\alpha}{2})^2 = 1 - (\sqrt{\frac{cos(\alpha) + 1}{2}})^2$<br>
$sin(\frac{\alpha}{2})^2 = 1 - \frac{cos(\alpha) + 1}{2}$<br>
$sin(\frac{\alpha}{2})^2 = \frac{2}{2} - \frac{cos(\alpha) + 1}{2}$<br>
$sin(\frac{\alpha}{2})^2 = \frac{2 - (cos(\alpha) + 1)}{2}$<br>
$sin(\frac{\alpha}{2})^2 = \frac{1 - cos(\alpha)}{2}$<br>
$sin(\frac{\alpha}{2}) = \sqrt{\frac{1 - cos(\alpha)}{2}}$<br>

Last but not least, since $tan = \frac{sin}{cos}$, a direct formula for $tan$ can be derived as well:

$tan(\frac{\alpha}{2}) = \frac{sin(\frac{\alpha}{2})}{cos(\frac{\alpha}{2})}$<br>
$tan(\frac{\alpha}{2}) = \frac{\sqrt{\frac{1 - cos(\alpha)}{2}}}{\sqrt{\frac{1 + cos(\alpha)}{2}}}$<br>
$tan(\frac{\alpha}{2}) = \sqrt{\frac{\frac{1 - cos(\alpha)}{2}}{\frac{1 + cos(\alpha)}{2}}}$<br>
$tan(\frac{\alpha}{2}) = \sqrt{\frac{2 * (1 - cos(\alpha))}{2 * (1 + cos(\alpha))}}$<br>
$tan(\frac{\alpha}{2}) = \sqrt{\frac{1 - cos(\alpha)}{1 + cos(\alpha)}}$

## Quadrant Symmetries

<img src="/assets/images/trigonometric_functions__8.jpg" class="third-width-image"/>

The above image visualizes how the signs of $sin$ and $cos$ come to be within any given quadrant. Since the definition and derivation are both making use of right triangles, the input-angle $\alpha$ is constrained to be within $0 \le \alpha \le \frac{\pi}{2}$. Let's add the subscript $0$ to these functions, to mark them as operating only on this narrow domain. The following functions will operate on the extended domain of $0 \le \alpha \le 2 * \pi$ and handle all cases for each of the four quadrants in ascending order:

$$
sin(\alpha) = \left\{\begin{array}{lr}
  sin_0(\alpha), & \text{for } 0\leq \alpha \leq \frac{\pi}{2}\\
  sin_0(\alpha - \frac{\pi}{2}), & \text{for } \frac{\pi}{2} \leq \alpha \leq \pi\\
  -sin_0(\alpha - \pi), & \text{for } \pi \leq \alpha \leq \frac{3*\pi}{2}\\
  -sin_0(\alpha - \frac{3*\pi}{2}), & \text{for } \frac{3*\pi}{2} \leq \alpha \leq 2 * \pi\\
\end{array}\right\}
$$

$$
cos(\alpha) = \left\{\begin{array}{lr}
  cos_0(\alpha), & \text{for } 0\leq \alpha \leq \frac{\pi}{2}\\
  -cos_0(\alpha - \frac{\pi}{2}), & \text{for } \frac{\pi}{2} \leq \alpha \leq \pi\\
  -cos_0(\alpha - \pi), & \text{for } \pi \leq \alpha \leq \frac{3*\pi}{2}\\
  cos_0(\alpha - \frac{3*\pi}{2}), & \text{for } \frac{3*\pi}{2} \leq \alpha \leq 2 * \pi\\
\end{array}\right\}
$$

## Angle Sum

<img src="/assets/images/trigonometric_functions__10.jpg" class="third-width-image"/>

Let there be a unit-circle of radius 1, with an angle $\alpha$ spanned by the line $\overline{AC}$ and the $x$-axis, then drop a perpendicular from point $C$ relative to the $x$-axis into point $B$. The resulting triangle $\triangle{ABC}$ now has a hypothenuse $\overline{AC} = 1$ and sides $\overline{AB} = \cos(\alpha)$, $\overline{BC} = \sin(\alpha)$.

Next, the line $\overline{AE}$ spans an angle $\beta$ relative to the line $\overline{AC}$, with a perpendicular dropped at point $E$ relative to the $x$-axis into point $D$. The resulting triangle $\triangle{ADE}$ now has a hypothenuse $\overline{AE} = 1$ and sides $\overline{AD} = \cos(\alpha + \beta)$, $\overline{DE} = \sin(\alpha + \beta)$.

By dropping a perpendicular from point $E$ relative to line $\overline{AC}$ into point $F$, another right triangle $\triangle{AFE}$ emerges with a hypothenuse $\overline{AE} = 1$ and thereby sides $\overline{AF} = \cos(\beta)$, $\overline{FE} = \sin(\beta)$.

By extending the line $\overline{FE}$ until it intersects with the $x$-axis in point $H$, yet another right triangle is formed, namely $\triangle{AHF}$, with a complementary angle relative to $\alpha$, $\gamma = \frac{\pi}{2} - \alpha$.

### Sine

Since $\triangle{AGF} \sim \triangle{ABC}$ it follows that $\frac{\overline{GF}}{\overline{BC}} = \frac{\overline{AF}}{1}$, and thereby

$$\mathrm{I}: \frac{\overline{GF}}{\sin(\alpha)} = \cos(\beta)$$

Since $\triangle{DHE} \sim \triangle{GHF}$ it follows that $\frac{\overline{GF}}{\overline{DE}} = \frac{\overline{HF}}{\overline{HF} + \overline{FE}}$, and thereby

$$\mathrm{II}: \frac{\overline{GF}}{\sin(\alpha + \beta)} = \frac{\overline{HF}}{\overline{HF} + \sin(\beta)}$$

Since $\gamma$ is complementary to $\alpha$, $\cos(\alpha) = \sin(\gamma)$, and since $\sin(\gamma) = \frac{\overline{GF}}{\overline{HF}}$, it follows that

$$\mathrm{III}: \cos(\alpha) = \frac{\overline{GF}}{\overline{HF}}$$

By substituting $\mathrm{I}$ into $\mathrm{III}$, we get

$$
\begin{align*}
\cos(\alpha) &= \frac{\cos(\beta) * \sin(\alpha)}{\overline{HF}} \\
\mathrm{IV}: \overline{HF} &= \frac{\cos(\beta) * \sin(\alpha)}{\cos(\alpha)}
\end{align*}
$$

By substituting $\mathrm{I}$ into $\mathrm{II}$, we get

$$
\begin{align*}
\frac{\cos(\beta) * \sin(\alpha)}{\sin(\alpha + \beta)} &= \frac{\overline{HF}}{\overline{HF} + \sin(\beta)} \\
\mathrm{V}: sin(\alpha + \beta) &= \frac{\cos(\beta) * \sin(\alpha) * (\overline{HF} + \sin(\beta))}{\overline{HF}}
\end{align*}
$$

To finally substitute $\mathrm{IV}$ into $\mathrm{V}$

$$
\begin{align*}
sin(\alpha + \beta) &= \frac{\cos(\beta) * \sin(\alpha) * (\frac{\cos(\beta) * \sin(\alpha)}{\cos(\alpha)} + \sin(\beta))}{\frac{\cos(\beta) * \sin(\alpha)}{\cos(\alpha)}} \\
sin(\alpha + \beta) &= \frac{\frac{\cos(\beta) * \sin(\alpha) * \cos(\beta) * \sin(\alpha)}{\cos(\alpha)} + \cos(\beta) * \sin(\alpha) * \sin(\beta)}{\frac{\cos(\beta) * \sin(\alpha)}{\cos(\alpha)}} \\
sin(\alpha + \beta) &= \frac{\frac{\cos(\beta) * \sin(\alpha) * \cos(\beta) * \sin(\alpha)}{\cos(\alpha)}}{\frac{\cos(\beta) * \sin(\alpha)}{\cos(\alpha)}} + \frac{\cos(\beta) * \sin(\alpha) * \sin(\beta)}{\frac{\cos(\beta) * \sin(\alpha)}{\cos(\alpha)}} \\
sin(\alpha + \beta) &= \frac{\cancel{\cos(\beta)} * \cancel{\sin(\alpha)} * \cos(\beta) * \sin(\alpha) * \cancel{\cos(\alpha)}}{\cancel{\cos(\alpha)} * \cancel{\cos(\beta)} * \cancel{\sin(\alpha)}} + \frac{\cancel{\cos(\beta)} * \cancel{\sin(\alpha)} * \sin(\beta) * \cos(\alpha)}{\cancel{\cos(\beta)} * \cancel{\sin(\alpha)}} \\
sin(\alpha + \beta) &= \cos(\beta) * \sin(\alpha) + \sin(\beta) * \cos(\alpha)
\end{align*}
$$

### Cosine

Since $\cos(\alpha) = \sin(\frac{\pi}{2} - \alpha)$ and with the identities of $\sin(-\alpha) = -\sin(\alpha)$, $\cos(-\alpha) = \cos(\alpha)$ in mind, it follows that

$$
\begin{align*}
\cos(\alpha + \beta) &= \sin(\frac{\pi}{2} - (\alpha + \beta))\\
\cos(\alpha + \beta) &= \sin((\frac{\pi}{2} - \alpha) - \beta)\\
\cos(\alpha + \beta) &= \cos(-\beta) * \sin(\frac{\pi}{2} - \alpha) + \sin(-\beta) * \cos(\frac{\pi}{2} - \alpha) \\
\cos(\alpha + \beta) &= \cos(\beta) * \sin(\frac{\pi}{2} - \alpha) - \sin(\beta) * \cos(\frac{\pi}{2} - \alpha) \\
\cos(\alpha + \beta) &= \cos(\beta) * \cos(\alpha) - \sin(\beta) * \sin(\alpha)
\end{align*}
$$

### Tangent

Since $\tan(\alpha) = \frac{\sin(\alpha)}{\cos(\alpha)}$, it follows that

$$
\begin{align*}
\tan(\alpha + \beta) &= \frac{\sin(\alpha + \beta)}{\cos(\alpha + \beta)} \\
\tan(\alpha + \beta) &= \frac{\cos(\beta) * \sin(\alpha) + \sin(\beta) * \cos(\alpha)}{\cos(\beta) * \cos(\alpha) - \sin(\beta) * \sin(\alpha)} \\
\tan(\alpha + \beta) &= \frac{\frac{\cos(\beta) * \sin(\alpha) + \sin(\beta) * \cos(\alpha)}{\cos(\alpha)*\cos(\beta)}}{\frac{\cos(\beta) * \cos(\alpha) - \sin(\beta) * \sin(\alpha)}{\cos(\alpha)*\cos(\beta)}} \\
\tan(\alpha + \beta) &= \frac{\frac{\cancel{\cos(\beta)} * \sin(\alpha)}{\cos(\alpha)*\cancel{\cos(\beta)}} + \frac{\sin(\beta) * \cancel{\cos(\alpha)}}{\cancel{\cos(\alpha)}*\cos(\beta)}}{\frac{\cancel{\cos(\beta)} * \cancel{\cos(\alpha)}}{\cancel{\cos(\alpha)}*\cancel{\cos(\beta)}} - \frac{\sin(\beta) * \sin(\alpha)}{\cos(\alpha)*\cos(\beta)}} \\
\tan(\alpha + \beta) &= \frac{\tan(\alpha) + \tan(\beta)}{1 - \tan(\alpha) * \tan(\beta)}
\end{align*}
$$

## Trivial Values

There are a few datapoints on the fundamental trigonometric functions $sin$ and $cos$ (and, for completeness, $tan$) that can be easily derived based on simple logic and commonly known triangles. Due to [Quadrant Symmetries](#quadrant-symmetries), there is no point in finding values outside of $0 \le \alpha \le \frac{\pi}{2}$.

Let's first explore the border cases.

For $\alpha = 0$, $cos$ will be the full radius of the unit circle, thus $cos(0) = 1$, $sin$ will have no height to it, thus $sin(0) = 0$ and $tan$ spans no distance, since the point $C$ lies directly on the $x$-axis, thus $tan(0) = 0$.

For $\alpha = \frac{\pi}{2}$, $cos$ will have no width to it, thus $cos(\frac{\pi}{2}) = 0$, $sin$ will be the full radius of the unit circle, thus $sin(\frac{\pi}{2}) = 1$. Since the tangent line at point $C$ is now a horizontal line, it's parallel to the $x$-axis. Because parallel lines never intersect, the value of $tan(\frac{\pi}{2})$ is *undefined*, just as dividing by zero is ($tan = \frac{sin}{cos} = \frac{1}{0}$).

As, for all other cases, $tan$ is defined, it is being omitted and instead provided in the overview table at the bottom of this section.

The next simplest case is an [Equilateral Triangle](./triangles.md#equilateral-triangle) that has been cut in half, to make two congruent right triangles:

<img src="/assets/images/trigonometric_functions__5.jpg" class="third-width-image"/>

Due to the [Pythagorean Theorem](./pythagorean_theorem.md), it follows that:

$h = \sqrt{1^2 - (\frac{1}{2})^2}$<br>
$h = \sqrt{1 - \frac{1}{4}}$<br>
$h = \sqrt{\frac{3}{4}}$<br>
$h = \frac{\sqrt{3}}{2}$

Because $\beta = \frac{\alpha}{2}$ and $\alpha = \frac{\pi}{3}$, $\beta = \frac{\pi}{6}$. So $sin(\frac{\pi}{6}) = \frac{1}{2}$ and $cos(\frac{\pi}{6}) = \frac{\sqrt{3}}{2}$. Analogously, $sin(\frac{\pi}{3}) = \frac{\sqrt{3}}{2}$ and $cos(\frac{\pi}{3}) = \frac{1}{2}$.

The next simplest case is a right-angled [Isosceles Triangle](./triangles.md#isosceles-triangle) (constructed using [Thales Half Circle Theorem](./thales_half_circle_theorem.md)):

<img src="/assets/images/trigonometric_functions__6.jpg" class="third-width-image"/>

Due to the [Pythagorean Theorem](./pythagorean_theorem.md), $a$ can be calculated as follows:

$a^2 + a^2 = 1^2$<br>
$2*a^2 = 1$<br>
$a^2 = \frac{1}{2}$<br>
$a = \sqrt{\frac{1}{2}}$<br>
$a = \frac{1}{\sqrt{2}}$

Because the triangle is isosceles and contains a right angle, $\alpha = \frac{\pi}{4}$. So $sin(\frac{\pi}{4}) = \frac{1}{\sqrt{2}}$ and $cos(\frac{\pi}{4}) = \frac{1}{\sqrt{2}}$.

That seems to be about as far as one can go with simply constructed triangles. Next up, $\frac{\pi}{6}$ can be halved by making use of the [Half Angle Formula](#half-angle-formula), as follows:

$sin(\frac{\pi}{12}) = \sqrt{\frac{1 - \frac{\sqrt{3}}{2}}{2}}$<br>
$sin(\frac{\pi}{12}) = \sqrt{\frac{\frac{2}{2} - \frac{\sqrt{3}}{2}}{2}}$<br>
$sin(\frac{\pi}{12}) = \sqrt{\frac{\frac{2 - \sqrt{3}}{2}}{2}}$<br>
$sin(\frac{\pi}{12}) = \sqrt{\frac{2 - \sqrt{3}}{4}}$<br>
$sin(\frac{\pi}{12}) = \frac{\sqrt{2 - \sqrt{3}}}{2}$

$cos(\frac{\pi}{12}) = \sqrt{\frac{1 + \frac{\sqrt{3}}{2}}{2}}$<br>
$cos(\frac{\pi}{12}) = \sqrt{\frac{2 + \sqrt{3}}{4}}$<br>
$cos(\frac{\pi}{12}) = \frac{\sqrt{2 + \sqrt{3}}}{2}$

$tan(\frac{\pi}{12}) = \sqrt{\frac{1 - \frac{\sqrt{3}}{2}}{1 + \frac{\sqrt{3}}{2}}}$<br>
$tan(\frac{\pi}{12}) = \sqrt{\frac{\frac{2 - \sqrt{3}}{2}}{\frac{2 + \sqrt{3}}{2}}}$<br>
$tan(\frac{\pi}{12}) = \sqrt{\frac{2 * (2 - \sqrt{3})}{2 * (2 + \sqrt{3})}}$<br>
$tan(\frac{\pi}{12}) = \sqrt{\frac{2 - \sqrt{3}}{2 + \sqrt{3}}}$<br>
$tan(\frac{\pi}{12}) = \sqrt{\frac{(2 - \sqrt{3})*(2 - \sqrt{3})}{(2 + \sqrt{3})*(2 - \sqrt{3})}}$<br>
$tan(\frac{\pi}{12}) = \sqrt{\frac{4 - 2 * \sqrt{3} - 2 * \sqrt{3} + 3}{4 - 3}}$<br>
$tan(\frac{\pi}{12}) = \sqrt{4 - 4 * \sqrt{3} + 3}$<br>
$tan(\frac{\pi}{12}) = \sqrt{(2 - \sqrt{3})^2}$<br>
$tan(\frac{\pi}{12}) = 2 - \sqrt{3}$

| $\alpha$ (rad) | $\alpha$ (deg) | $sin(\alpha)$ | $cos(\alpha)$ | $tan(\alpha)$ |
|:------------------:|:-----:|:--------------------:|:--------------------:|:-------------------------------------------:|
| $0$                | $0°$  | $0$                  | $1$                  | $0$                                         |
| $\frac{\pi}{12}$   | $15°$ | $\frac{\sqrt{2 - \sqrt{3}}}{2}$        | $\frac{\sqrt{2 + \sqrt{3}}}{2}$ | $2 - \sqrt{3}$ |
| $\frac{\pi}{6}$    | $30°$ | $\frac{1}{2}$        | $\frac{\sqrt{3}}{2}$ | $\frac{\sqrt{3}}{3}$                        |
| $\frac{\pi}{4}$    | $45°$ | $\frac{1}{\sqrt{2}}$ | $\frac{1}{\sqrt{2}}$ | $1$                                         |
| $\frac{\pi}{3}$    | $60°$ | $\frac{\sqrt{3}}{2}$ | $\frac{1}{2}$        | $\sqrt{3}$                                  |
| $\frac{5*\pi}{12}$ | $75°$ | $\frac{\sqrt{2 + \sqrt{3}}}{2}$        | $\frac{\sqrt{2 - \sqrt{3}}}{2}$ | $2 + \sqrt{3}$ |
| $\frac{\pi}{2}$    | $90°$ | $1$                  | $0$                  | undefined                                   |