Let there be two circles with origins $A$ and $B$ as well as radius $r_1$ and $r_2$, respectively. $r_1$ is always the greater radius of the two, so $r_1 \ge r_2$. Their mutual area is called $A_I$.

<img src="/assets/images/circle_circle_intersection__1.jpg" class="half-width-image"/>

Three main cases are to be considered:

- $\overline{AB} = r_1 + r_2$: The circles only intersect in a single point and $A_I = 0$
- $\overline{AB} > r_1 + r_2$: The circles do not intersect at all and $A_I = 0$
- $\overline{AB} < r_1 + r_2$: The circles are intersecting and $A_I > 0$

If $\overline{AB} + r_2 \le r_1$, then the smaller circle is inside it's bigger counterpart as a whole, thus $A_I = \pi * r_2^2$. Otherwise, the area of intersection can be determined as follows.

By connecting $\overline{AC}$ and $\overline{BC}$, $\triangle{ABC}$ emerges. $\alpha = \angle{BAC}$ and $\beta = \angle{CBA}$, while $h$ resembles the height of this triangle, which splits $\overline{AB}$ into $p$ and $q$. Due to symmetry, this triangle encapsulates $\frac{A_I}{2}$, and the result can just be doubled to end up at the full area of interest.

<img src="/assets/images/circle_circle_intersection__2.jpg" class="half-width-image"/>

The following relations are known about this scene:

$\mathrm{I}$: $p^2 + h^2 = r_1^2$<br>
$\mathrm{II}$: $q^2 + h^2 = r_2^2 \Rightarrow q^2 = r_2^2 - h^2$<br>
$\mathrm{III}$: $p + q = \overline{AB} \Rightarrow p = \overline{AB} - q$<br>

Substitute $\mathrm{III}$ into $\mathrm{I}$:

$(\overline{AB} - q)^2 + h^2 = r_1^2$<br>
$\overline{AB}^2 - 2 * \overline{AB} * q + q^2 + h^2 = r_1^2$

And substitute $\mathrm{II}$ into this intermediary relation:

$\overline{AB}^2 - 2 * \overline{AB} * \sqrt{r_2^2 - h^2} + r_2^2 - \cancel{h^2} + \cancel{h^2} = r_1^2$<br>
$\overline{AB}^2 - 2 * \overline{AB} * \sqrt{r_2^2 - h^2} + r_2^2 = r_1^2$<br>
$\overline{AB}^2 + r_2^2 - r_1^2= 2 * \overline{AB} * \sqrt{r_2^2 - h^2}$<br>
$\frac{\overline{AB}^2 + r_2^2 - r_1^2}{2 * \overline{AB}} = \sqrt{r_2^2 - h^2}$<br>
$\frac{\overline{AB}^{\cancel{2}}}{2 * \cancel{\overline{AB}}} + \frac{r_2^2 - r_1^2}{2 * \overline{AB}} = \sqrt{r_2^2 - h^2}$<br>
$\frac{\overline{AB}}{2} + \frac{r_2^2 - r_1^2}{2 * \overline{AB}} = \sqrt{r_2^2 - h^2}$<br>
$(\frac{\overline{AB}}{2} + \frac{r_2^2 - r_1^2}{2 * \overline{AB}})^2 = r_2^2 - h^2$<br>
$\frac{\overline{AB}^2}{4} + \cancel{2} * \frac{\cancel{\overline{AB}}}{\cancel{2}} * \frac{r_2^2 - r_1^2}{2 * \cancel{\overline{AB}}} + \frac{(r_2^2 - r_1^2)^2}{4 * \overline{AB}^2} = r_2^2 - h^2$<br>
$\frac{\overline{AB}^2}{4} + \frac{r_2^2 - r_1^2}{2} + \frac{(r_2^2 - r_1^2)^2}{4 * \overline{AB}^2} = r_2^2 - h^2$<br>
$- h^2 = \frac{\overline{AB}^2}{4} + \frac{r_2^2 - r_1^2}{2} + \frac{(r_2^2 - r_1^2)^2}{4 * \overline{AB}^2} - r_2^2$<br>
$h^2 = -(\frac{\overline{AB}^2}{4} + \frac{r_2^2 - r_1^2}{2} + \frac{(r_2^2 - r_1^2)^2}{4 * \overline{AB}^2} - r_2^2)$<br>
$h^2 = -\frac{\overline{AB}^2}{4} - \frac{r_2^2 - r_1^2}{2} - \frac{(r_2^2 - r_1^2)^2}{4 * \overline{AB}^2} + r_2^2$<br>
$h^2 = -\frac{\overline{AB}^2}{4} + \frac{r_2^2 + r_1^2}{2} - \frac{(r_2^2 - r_1^2)^2}{4 * \overline{AB}^2}$<br>
$\mathrm{IV}$: $h = \sqrt{-\frac{\overline{AB}^2}{4} + \frac{r_2^2 + r_1^2}{2} - \frac{(r_2^2 - r_1^2)^2}{4 * \overline{AB}^2}}$

With this height, the area of the triangle ends up being

$\mathrm{V}$: $A_{\triangle} = \frac{1}{2} * \overline{AB} * h$

The areas within $\triangle{ABC}$ are segmented as follows:

<img src="/assets/images/circle_circle_intersection__3.jpg" class="half-width-image"/>

Where $\frac{A_I}{2}$ splits $A_{\triangle}$ into a left hand side of $A_1$ and a right hand side of $A_2$, while the two circle sectors spanning $\alpha$ and $\beta$ are in the scene as well. Let's call them $A_{\alpha}$ and $A_{\beta}$.

It follows, that

$A_{\alpha} = \pi * r_1^2 * \frac{\alpha}{2*\pi}$<br>
$\mathrm{VI}$: $A_{\alpha} = r_1^2 * \frac{\alpha}{2}$

$A_{\beta} = \pi * r_2^2 * \frac{\beta}{2*\pi}$<br>
$\mathrm{VII}$: $A_{\beta} = r_2^2 * \frac{\beta}{2}$

$\mathrm{VIII}$: $A_1 = A_{\triangle} - A_{\beta}$<br>

$\frac{A_I}{2} = A_{\alpha} - A_1$<br>
$\mathrm{IX}$: $A_I = 2 * (A_{\alpha} - A_1)$

Let's substitute $\mathrm{V}$ and $\mathrm{VII}$ into $\mathrm{VIII}$:

$A_1 = \frac{1}{2} * \overline{AB} * h - r_2^2 * \frac{\beta}{2}$

To then, finally, substitute this relation, alongside with $\mathrm{VI}$ into $\mathrm{IX}$:

$A_I = 2 * (r_1^2 * \frac{\alpha}{2} - (\frac{1}{2} * \overline{AB} * h - r_2^2 * \frac{\beta}{2}))$<br>
$A_I = 2 * (r_1^2 * \frac{\alpha}{2} - \frac{1}{2} * \overline{AB} * h + r_2^2 * \frac{\beta}{2})$<br>
$A_I = r_1^2 * \alpha - \overline{AB} * h + r_2^2 * \beta$

$\alpha$ and $\beta$ are obtainable as follows: $\alpha = arcsin(\frac{h}{r_1})$, $\beta = arcsin(\frac{h}{r_2})$, and thus follows, that

$A_I = r_1^2 * arcsin(\frac{h}{r_1}) - \overline{AB} * h + r_2^2 * arcsin(\frac{h}{r_2})$

where, as in $\mathrm{IV}$, $h$ is obtainable as

$h = \sqrt{-\frac{\overline{AB}^2}{4} + \frac{r_2^2 + r_1^2}{2} - \frac{(r_2^2 - r_1^2)^2}{4 * \overline{AB}^2}}$