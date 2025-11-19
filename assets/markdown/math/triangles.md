This page tries to summarize knowledge that directly applies to triangles.

## Table Of Contents {: #toc }

## Generic Triangle

### Circumference

The circumference of a generic triangle is simply

$C_\triangle = a + b + c$

### Area

Let there be a triangle $\triangle{ABC}$ with base $b$ and height $h = \overline{FC}$. Parallely shift $\overline{AB}$ up into $C$ and connect $\overline{AE}$ and $\overline{BD}$ (which are both of the same length as $h$), to embox said triangle into a rectangle of side-lengths $b$ and $h$.

<img src="/assets/images/triangles__19.jpg" class="third-width-image"/>

The area of the rectangle will be

$\mathrm{I}$: $A_{\rectangle} = b * h$

The height $\overline{FC}$ splits the rectangle $\rectangle{ABDE}$ into $\rectangle{AFCE}$ and $\rectangle{FBDC}$.

$\mathrm{II}$: $A_{\rectangle} = A_{\rectangle{AFCE}} + A_{\rectangle{FBDC}}$

The side $\overline{AC}$ of the triangle is also the diagonal of $\rectangle{AFCE}$ and thus bisects it's area. The same reasoning can be carried out for the right-hand-side analogously.

The total area of the triangle will be

$A_{\triangle} = \frac{1}{2} * A_{\rectangle{AFCE}} + \frac{1}{2} * A_{\rectangle{FBDC}}$<br>
$A_{\triangle} = \frac{1}{2} * (A_{\rectangle{AFCE}} + A_{\rectangle{FBDC}})$

Substituting in $\mathrm{II}$ yields:

$A_{\triangle} = \frac{1}{2} * A_{\rectangle}$

In combination with $\mathrm{I}$, the above results in the final equation:

$\mathrm{III}$: $A_{\triangle} = \frac{1}{2} * b * h$

If only an angle $\alpha$ and it's touching sides are known ($b$ and $c$ in this example), there's also a simple way to obtain the triangle's area.

<img src="/assets/images/triangles__20.jpg" class="third-width-image"/>

By making use of the [Trigonometric Functions](./trigonometric_functions.md), $h_c$ is defined as

$h_c = b * sin(\alpha)$

With the base being $c$ and the height being $h_c$, $\mathrm{III}$ can now be applied.

$A_{\triangle} = \frac{1}{2} * c * b * sin(\alpha)$

### Side Length Inequality

In any triangle, the sum of any two sides will exceed the remaining third side. Let there be a triangle $\triangle{ABC}$, whose side $\overline{BA}$ has been extended into point $D$ such that

$\mathrm{I}$: $\overline{AD} = \overline{AC}$

and $\triangle{ACD}$ ends up being [isosceles](#isosceles-triangle).

<img src="/assets/images/triangles__21.jpg" class="third-width-image"/>

Since $\angle{DCB} = \angle{ACB} + \angle{DCA}$ and $\angle{ACB} > 0$ for all triangles of non-zero area, it follows that $\angle{DCB} > \angle{ACB}$ and $\angle{DCB} > \angle{DCA}$. But $\angle{DCA} = \angle{ADC}$ ($\mathrm{I}$), and therefore

$\angle{DCB} > \angle{ADC}$

which both lie within $\triangle{BCD}$. The greater angle is subtended by the greater side, so

$\overline{BD} > \overline{BC}$

but $\overline{BD} = \overline{BA} + \overline{AD}$, so

$\overline{BA} + \overline{AD} > \overline{BC} \xRightarrow{\mathrm{I}} \overline{BA} + \overline{AC} > \overline{BC}$

Analogously, the inequalities for the remaining two permutations can be proven as well. So, for any triangle $\triangle{ABC}$ with side-lengths $a$, $b$ and $c$, as in the following scene,

<img src="/assets/images/triangles__22.jpg" class="third-width-image"/>

these relations hold:

$a + b > c \Leftrightarrow b + a > c$<br>
$a + c > b \Leftrightarrow c + a > b$<br>
$b + c > a \Leftrightarrow c + b > a$<br>

## Right Triangle

A triangle is considered to be right-angled if one of it's angles is exactly of measure $\pi$. Then, the [Pythagorean Theorem](./pythagorean_theorem.md) applies to it's side-lengths.

### Construction

Any right triangle may easily be constructed by making use of [Thales' Half Circle Theorem](./thales_half_circle_theorem.md).

### Circumference

The circumference of a right-angled triangle is simply

$C_\triangle = a + b + c$

### Area

When mirroring the triangle about it's hypothenuse $c$, it extends itself into a rectangle of height $b$ and width $a$, which will have the following surface-area:

<img src="/assets/images/triangles__13.jpg" class="third-width-image"/>

$A_\rectangle = a * b$

So the surface area of one triangle is $\frac{A_\rectangle}{2}$, which yields the final equation:

$A_\triangle = \frac{a*b}{2}$

## Equilateral Triangle

A triangle is considered to be equilateral if all three of its sides are of equal length.

### Construction

To construct an equilateral triangle with side-length $a$, start by drawing a line-segment of length $a$, starting in point $A$ and ending in point $B$. Then, set the compass to the distance of $a$, draw a partial circle above the line segement's center with origin $A$ and repeat the same procedure for $B$. Then, connect two more line-segments from $A$ and $B$ to the intersection-point of those circle-segments, called $C$.

<img src="/assets/images/triangles__12.jpg" class="third-width-image"/>

### Circumference

The circumference of an equilateral triangle is simply

$C_\triangle = 3 * a$

### Area

The triangle can be split into two congruent [Right Triangle](#right-triangle)s, who's sum of surface areas is the equilateral triangle's surface area.

<img src="/assets/images/triangles__14.jpg" class="third-width-image"/>

$\mathrm{I}$: $A_\triangle = 2 * \frac{\frac{a}{2} * h}{2} = \frac{a}{2} * h$

$h$ can be expressed in terms of $a$ by the [Pythagorean Theorem](./pythagorean_theorem.md):

$a^2 = h^2 + (\frac{a}{2})^2$<br>
$a^2 = h^2 + \frac{a^2}{4}$<br>
$h^2 = a^2 - \frac{a^2}{4}$<br>
$h^2 = \frac{3}{4} * a^2$<br>
$h = \sqrt{\frac{3}{4} * a^2}$<br>
$\mathrm{II}$: $h = \frac{\sqrt{3}}{2} * a$<br>

Substituting $\mathrm{II}$ into $\mathrm{I}$:

$A_\triangle = \frac{a}{2} * \frac{\sqrt{3}}{2} * a$<br>
$A_\triangle = \frac{\sqrt{3}}{4} * a^2$

## Isosceles Triangle

A triangle is considered to be isosceles if two of it's sides are of equal length.

### Construction

The construction can be accomplished analogously to the [Equilateral Triangle](#equilateral-triangle) by just varying the base's side-length.

<img src="/assets/images/triangles__15.jpg" class="third-width-image"/>

### Circumference

The circumference of an isosceles triangle is simply

$C_\triangle = a + 2 * b$

### Area

The triangle can be split into two congruent [Right Triangle](#right-triangle)s, who's sum of surface areas is the equilateral triangle's surface area.

<img src="/assets/images/triangles__16.jpg" class="third-width-image"/>

$\mathrm{I}$: $A_\triangle = 2 * \frac{\frac{a}{2} * h}{2} = \frac{a}{2} * h$

$h$ can be expressed in terms of $a$ and $b$ by the [Pythagorean Theorem](./pythagorean_theorem.md):

$b^2 = h^2 + (\frac{a}{2})^2$<br>
$b^2 = h^2 + \frac{a^2}{4}$<br>
$h^2 = b^2 - \frac{a^2}{4}$<br>
$\mathrm{II}$: $h = \sqrt{b^2 - \frac{a^2}{4}}$

Substituting $\mathrm{II}$ into $\mathrm{I}$:

$A_\triangle = \frac{a}{2} * \sqrt{b^2 - \frac{a^2}{4}}$<br>
$A_\triangle = \frac{a}{2} * \sqrt{b^2 - \frac{a^2}{4}}$<br>

## Sum Of Angles

Let's consider the triangle $\triangle{ABC}$ with angles $\alpha = \angle{CAB}$, $\beta = \angle{BCA}$ and $\gamma = \angle{CBA}$.

<img src="/assets/images/triangles__6.jpg" class="third-width-image"/>

By shifting the line that passes through $A$ and $B$ parallelly into point $C$, a line passing through $A'$ and $B'$ comes into existence, with the property of $\overline{AB} \parallel \overline{A'B'}$.

As described in [Parallel Vertical Angles](./angles.md#parallel-vertical-angles), the line through $A$ and $B$ as well as the line through $A'$ and $B'$ both intersect the line through $A$ and $C$ in the exact same angle, making $\alpha$ appear again at point $C$.

Analogously, the line through $A$ and $B$ as well as the line through $A'$ and $B'$ both intersect the line through $B$ and $C$ in the exact same angle, making $\gamma$ appear again at point $C$.

From these two facts follows, that

$2 * \alpha + 2 * \beta + 2 * \gamma = 2 * \pi$<br>
$2 * (\alpha + \beta + \gamma) = 2 * \pi$<br>
$\alpha + \beta + \gamma = \pi$

## Congruence

Two triangles are called congruent if one can be transformed into the other by only applying translation, rotation and reflection. As many have heard already, these rules can also be described as cutting out both shapes and then checking whether they can be matched up completely, while allowing to turn the paper (mirroring).

Two line segments are congruent if they have the same length and two angles are congruent if they have the same measure. The notation of congruence looks as follows:

$\triangle{ABC} \cong \triangle{A'B'C}$<br>
$\triangle{ABC} \ncong \triangle{A'B'C}$

In order to determine congruence, one has to fully restrict the degrees of freedom a triangle has. The following cases are to be considered:

### SAS

`SAS` is a mnemonic for **S**ide **A**ngle **S**ide and depicts the case wherein two sides of known length span an angle of known measure. Let $O$ be the origin, $a$ and $b$ be the two known sides and $\alpha$ be the known angle:

<img src="/assets/images/triangles__1.jpg" class="third-width-image"/>

Then, the remaining side $c$ is constrained to an exact length, namely $\overline{AB}$. With this third side, the two remaining angles are also defined.

### SSS

`SSS` is a menmonic for **S**ide **S**ide **S**ide and depicts a case wherein the lengths of all three sides are known. To construct such a triangle, let $O$ be the origin, and draw a line segment of length $a$, to end up at point $A$. Set the compass to span the length of $b$, insert it at the origin and draw a partial circle. Repeat with the length of $c$, inserted at the point $A$. Then, draw two line segments, starting at the intersection ($I$) of those two partial circles, connecting to $O$ and $A$:

<img src="/assets/images/triangles__2.jpg" class="third-width-image"/>

Then, all three angles are constrained to an exact measure.

### ASA

`ASA` is a mnemonic for **A**ngle **S**ide **A**ngle and depicts a case wherein the length of a single side is known, as well as the measure of two angles relative to said side. Let $O$ be the origin, $a$ be the known side and $\alpha$ and $\beta$ be the two known angles:

<img src="/assets/images/triangles__3.jpg" class="third-width-image"/>

### AAS

`AAS` is a mnemonic for **A**ngle **A**ngle **S**ide and depicts a case wherein the length of a single side is known, as well as the measure of a single angle relative to said side. The third quantity then represents the measure of the angle opposite to the known side. Let $O$ be the origin, $a$ be the known side, $\alpha$ be the angle relative to $a$ and $\beta$ be the angle opposite to $a$:

<img src="/assets/images/triangles__4.jpg" class="third-width-image"/>

To construct this triangle, it is of value to first calculate the second angle relative to a, $\gamma$, and then treat this case like [ASA](#asa). Since the sum of all angles within any given triangle equates to $\pi$, it follows that $\gamma = \pi - \alpha - \beta$.

### RHS

`RHS` is a mnemonic for **R**ight-Angled **H**ypothenuse **S**ide and depicts a special case that only applies to right triangles, wherein the length of the hypothenuse ($h$) is known, as well as any one of the other sides ($s$):

<img src="/assets/images/triangles__5.jpg" class="third-width-image"/>

By [Thales' Half Circle Theorem](./thales_half_circle_theorem.md), every right triangle can be constructed by choosing a third point on a half-circle. Let $M$ be the midpoint of the line $\overline{AB} = h$, which serves as the origin for said half-circle of radius $\frac{h}{2}$.

<img src="/assets/images/triangles__7.jpg" class="third-width-image"/>

No matter where $C$ lies on the circumference of the half-circle, the statement $\overline{AC} \perp \overline{CB}$ will always be true. To each point $C$, a unique side-length $s$ as well as a unique angle-measure $\alpha$ can be assigned. To name a few:

$s = h \Rightarrow \alpha = 0$<br>
$s = 0 \Rightarrow \alpha = \frac{\pi}{2}$

For an isosceles triangle, $2*s^2 = h^2 \Rightarrow s = \frac{1}{\sqrt{2}}*h$

$s = \frac{1}{\sqrt{2}}*h \Rightarrow \alpha = \frac{\pi}{4}$

And so on, and so forth. In general: $\alpha = arccos(\frac{s}{h})$. With this in mind, the only degrees of freedom of a right-angled triangle are the lengths of it's hypothenuse and one of it's sides.

## Similarity

Two triangles are called similar if one can be transformed into the other by applying translation, rotation and reflection, as in [Congruence](#congruence), with the additional permission to scale the triangles uniformly.

While all circles, all squares and all equilateral triangles are similar to each other, all ellipses, rectanges and isosceles triangles (as well as triangles with three distinct sides, of course) are *not*. Ellipses may have different width to height ratios, rectangles can have different length to breadth ratios and isosceles triangles can have different base angles.

Let there be two triangles, $\triangle{ABC}$ with angles $\alpha$, $\beta$ and $\gamma$ as well as $\triangle{A'B'C'}$ with angles $\alpha'$, $\beta'$ and $\gamma'$.

<img src="/assets/images/triangles__8.jpg" class="third-width-image"/>

If they are similar, it's noted as $\triangle{ABC} \sim \triangle{A'B'C}$, while the negated case is written as $\triangle{ABC} \nsim \triangle{A'B'C'}$

If two triangles are similar, all three of their corresponding angles are congruent, and the following theorem applies:

In equiangular triangles, the sides about equal angles are proportional to their corresponding sides in the other triangle.

Let $\triangle{ABC}$ and $\triangle{DCE}$ be equiangular triangles, having the angles $\beta = \angle{ABC} = \beta' = \angle{DCE}$, $\alpha = \angle{BAC} = \alpha' = \angle{CDE}$ and $\gamma = \angle{ACB} = \gamma' = \angle{DEC}$. Let $\overline{BC}$ be placed in a straight line with $\overline{CD}$:

<img src="/assets/images/triangles__17.jpg" class="third-width-image"/>

Since $\beta$ and $\gamma$ are less than two [Right Angle](./angles.md#right-angle)s, and $\beta = \beta'$ and $\gamma = \gamma'$, $\beta'$ and $\gamma'$ are less than two [Right Angle](./angles.md#right-angle)s as well. Therefore, $\overline{BA}$ and $\overline{ED}$, when produced, will meet at $F$:

<img src="/assets/images/triangles__18.jpg" class="third-width-image"/>

Now, since $\beta = \beta' \Rightarrow \overline{BF} \parallel \overline{CD}$, and since $\gamma = \gamma' \Rightarrow \overline{CA} \parallel \overline{FE}$. Therefore, $FACD$ is a parallelogram. Therefore, $\overline{AF} = \overline{CD}$ and $\overline{CA} = \overline{DF}$.

Stated simply, $\overline{AF}$ is an extension of $\overline{BA}$, making up $\overline{BF}$ and $\overline{DF}$ is an extension of $\overline{ED}$, making up $\overline{EF}$.

At this point, the scene depicts $\triangle{FBE}$, which is intersected parallel to it's side $\overline{EF}$ by $\overline{CA}$, as generally described by the [Triangle-Line Intersection Theorem](./triangle_line_intersection_theorem.md).

It thus follows, that:

$\frac{\overline{BA}}{\overline{AF}} = \frac{\overline{BC}}{\overline{CE}}$

But since

$\overline{AF} = \overline{CD}$

the proportionality can be expressed only in terms of the sides of the original triangles:

$\mathrm{I}$: $\frac{\overline{BA}}{\overline{CD}} = \frac{\overline{BC}}{\overline{CE}}$

$\triangle{FBE}$ is intersected by $\overline{CD}$ parallel to it's side $\overline{BF}$, which is why it again follows, that:

$\frac{\overline{BC}}{\overline{CE}} = \frac{\overline{DF}}{\overline{ED}}$

But since

$\overline{DF} = \overline{CA}$

the proportionality can be expressed only in terms of the sides of the original triangles:

$\mathrm{II}$: $\frac{\overline{BC}}{\overline{CE}} = \frac{\overline{CA}}{\overline{ED}}$

$\xRightarrow{\mathrm{I},\mathrm{II}} \frac{\overline{BA}}{\overline{CD}} = \frac{\overline{BC}}{\overline{CE}} = \frac{\overline{CA}}{\overline{ED}}$

The following cases may mark similarity:

### AAA

`AAA` is a mnemonic for **A**ngle **A**ngle **A**ngle and depicts a case wherein all three angles of two triangles are congruent.

<img src="/assets/images/triangles__9.jpg" class="third-width-image"/>

If two angles of a triangle have measures equal to the measures of two angles of another triangle, then the triangles are similar. The third angle is then already constrained, due to the [Sum Of Angles](#sum-of-angles). So, at least two of the following three equalities must hold:

$\alpha = \alpha'$<br>
$\beta = \beta'$<br>
$\gamma = \gamma'$

### SSS

`SSS` is a mnemonic for **S**ide **S**ide **S**ide and depicts a case wherein all three sides of two triangles are proportional to each other.

<img src="/assets/images/triangles__10.jpg" class="third-width-image"/>

As per how the [Measurement](./angles.md#measurement) of an angle is defined, the angles of a triangle are proportional to it's side-lengths. This relation is why two triangles are also considered to be similar if all corresponding sides are proportional. So, the following equalities must hold:

$\frac{\overline{AB}}{\overline{A'B'}} = \frac{\overline{BC}}{\overline{B'C'}} = \frac{\overline{AC}}{\overline{A'C'}}$

These equalities are another way of saying that one triangle is an enlargement of the other.

### SAS

`SAS` is a mnemonic for **S**ide **A**ngle **S**ide and depicts a case wherein two sides of two triangles are proportional to each other, and their spanned angles are congruent.

<img src="/assets/images/triangles__11.jpg" class="third-width-image"/>

So, at least two of the following side-ratio equalities must hold:

$\frac{\overline{AB}}{\overline{A'B'}} = \frac{\overline{BC}}{\overline{B'C'}}$<br>
$\frac{\overline{BC}}{\overline{B'C'}} = \frac{\overline{AC}}{\overline{A'C'}}$<br>
$\frac{\overline{AB}}{\overline{A'B'}} = \frac{\overline{AC}}{\overline{A'C'}}$

As well as at least one of the following angle congruencies:

$\alpha \cong \alpha'$<br>
$\beta \cong \beta'$<br>
$\gamma \cong \gamma'$<br>