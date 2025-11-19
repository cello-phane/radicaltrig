To solve the following puzzle, the percentage of gray area within the triangle is to be determined.

<img src="/assets/images/isosceles_triangle_slices_percentage__1.jpg" class="half-width-image"/>

Each slice has a side-length of $\frac{1}{10}*x$, while the total leg length of the main triangle $\triangle{A_{10}B_{10}C}$ is $x$. Since the points $A_n$ and $B_n$ are of equal distance relative to $C$, the lines $\overline{A_nB_n}$ are parallel.

<img src="/assets/images/isosceles_triangle_slices_percentage__2.jpg" class="half-width-image"/>

Due to this property, $\alpha$ and $\beta$ in the above scene are of equal measure, while the hypothenuse of these little right triangles are also equally as long, with $k$ being the total number of slices. As stated by the *ASA* mnemonic, all triangles are [Congruent](/math/triangles#congruence), which ensures that all slices are equally high.

The area of each shaded region can be calculated by calculating the difference of its enclosing triangles' areas.

Let's first derive the area $A_n$ of the triangle $\triangle{A_nB_nC}$.

$A_n = \frac{1}{2} * \overline{A_nB_n} * n * h$

Since all triangles $\triangle{A_nB_nC}$ are [Similar](/math/triangles#similarity), their side-lengths relate.

$\frac{\overline{A_nC}}{x} = \frac{\overline{A_nB_n}}{b}$

But $\overline{A_nC}$ is just $\frac{n}{k} * x$, so

$\frac{\frac{n}{k} * x}{x} = \frac{\overline{A_nB_n}}{b}$<br>
$\frac{n}{k} = \frac{\overline{A_nB_n}}{b}$<br>
$\overline{A_nB_n} = \frac{n}{k} * b$

By substituting this relation into $A_n$, the final triangle area formula arises.

$A_n = \frac{1}{2} * \frac{n}{k} * b * n * h$

Organizing it a bit yields

$A_n = \frac{1}{2*k} * b * h * n^2$

The first area $S_1$ is fully enclosed by $\triangle{A_1B_1C}$, thus

$S_1 = A_1 = \frac{1}{2*k} * b * h * 1^2$<br>
$S_1 = \frac{1}{2*k} * b * h$

The next slice is enclosed between $\triangle{A_3B_3C}$ and $\triangle{A_2B_2C}$, as follows:

$A_2 = \frac{1}{2} * \overline{A_2B_2} * 2 * h$<br>
$A_3 = \frac{1}{2} * \overline{A_3B_3} * 3 * h$

$S_2 = A_3 - A_2$

The pattern of subtracting from the triangle which shares its base with the current slice the triangle which shares its base with the top of the current slice continues.

$S_3 = A_5 - A_4$<br>
$S_4 = A_7 - A_6$<br>
$S_5 = A_9 - A_8$

The total gray area, $A_G$, thus is comprised as follows:

$A_G = A_1 + (A_3 - A_2) + (A_5 - A_4) + ... + (A_{k - 1} - A_{k - 2})$

Sorting by indices makes it obvious that odd indices are added, while even indices are subtracted.

$A_G = A_1 - A_2 + A_3 - A_4 + A_5 - ... - A_{k - 2} + A_{k - 1}$

The final ratio, $R_G$, represents the percentage of $A_G$ relative to the whole triangle $\triangle{A_kB_kC}$, who's area is as follows:

$A_k = \frac{1}{2*k} * b * h * k^2$

Let's write the whole ratio down.

$R_G = \frac{A_G}{A_k}$<br>
$R_G = \frac{A_1 - A_2 + A_3 - A_4 + A_5 - ... - A_{k - 2} + A_{k - 1}}{A_k}$

Since all areas are calculated by the same equation $A_n$, common factors can be extracted and will cancel out.

$R_G = \frac{\cancel{\frac{1}{2*k} * b * h} * (1^2 - 2^2 + 3^2 - 4^2 + 5^2 - ... - (k - 2)^2 + (k - 1)^2)}{\cancel{\frac{1}{2*k} * b * h} * (k^2)}$<br>
$R_G = \frac{(1^2 - 2^2 + 3^2 - 4^2 + 5^2 - ... - (k - 2)^2 + (k - 1)^2)}{k^2}$

The numerator now only consists of a sequence of added square numbers with alternating signs. Let's take a closer look at it.

$1^2 - 2^2 + 3^2 - 4^2 + 5^2 - ... - (k - 2)^2 + (k - 1)^2$

From this point onwards, $k$ is assumed to be an even number, as a case decision would become necessary otherwise. If $k$ is even, then $k - 1$ is odd. To make the sequence have an even number of members, the last is being removed for now, but kept in mind.

$1^2 - 2^2 + 3^2 - 4^2 + 5^2 - ... - (k - 2)^2$

As numbers are about to be grouped into pairs of distance one, I'm going to rewrite $5$ in terms of $k - 3$.

$1^2 - 2^2 + 3^2 - 4^2 + ... + (k - 3)^2 - (k - 2)^2$

By making use of the third binomial formula, the above can be rewritten as

$(1 - 2) * (1 + 2) + (3 - 4) * (3 + 4) + ... + ((k - 3) - (k - 2)) * ((k - 3) + (k - 2))$

The first parentheses of each pair will always evaluate to $-1$

$(-1) * (1 + 2) + (-1) * (3 + 4) + ... + (-1) * ((k - 3) + (k - 2))$

so $-1$ may be factored out.

$(-1) * ((1 + 2) + (3 + 4) + ... + ((k - 3) + (k - 2)))$<br>
$(-1) * (1 + 2 + 3 + 4 + ... + (k - 3) + (k - 2))$

As Gauß already proved, a sequence of increasing whole numbers ranging from $1$ to $n$ can be described as

$\frac{n * (n + 1)}{2}$

where $n$ is $k - 2$ in this case, thus the sequence will compress greatly.

$(-1) * (\frac{(k - 2) * ((k - 2) + 1)}{2})$

At this point, it's about time to re-introduce the previously removed last sequence element, so that the numerator can finally be expressed as

$(-1) * (\frac{(k - 2) * ((k - 2) + 1)}{2}) + (k - 1)^2$<br>
$(-1) * (\frac{(k - 2) * (k - 1)}{2}) + (k - 1)^2$<br>
$(-1) * (\frac{k^2 - k - 2k + 2}{2}) + (k - 1)^2$<br>
$\frac{-k^2 + k + 2k - 2}{2} + (k - 1)^2$<br>
$\frac{-k^2 + 3k - 2}{2} + (k - 1)^2$<br>
$\frac{-k^2 + 3k - 2}{2} + k^2 - 2k + 1$<br>
$\frac{-k^2 + 3k - 2 + 2 * (k^2 - 2k + 1)}{2}$<br>
$\frac{-k^2 + 3k - \cancel{2} + 2 * k^2 - 4k + \cancel{2}}{2}$<br>
$\frac{k^2 - k}{2}$

Let's substitute this simplified version back into $R_G$.

$R_G = \frac{\frac{k^2 - k}{2}}{k^2}$<br>
$R_G = \frac{k^2 - k}{2 * k^2}$<br>
$R_G = \frac{\cancel{k} * (k - 1)}{2 * k^{\cancel{2}}}$<br>
$R_G = \frac{k - 1}{2 * k}$

For $k = 10$, as required by the puzzle, the ratio of the gray area to the total area ends up as

$R_G = \frac{10 - 1}{2 * 10}$<br>
$R_G = \frac{9}{20}$<br>
$R_G = 45\%$

This ratio is obviously depending on the number of slices, but is there anything else that can be said about it? Let's calculate a few more datapoints.

| $\bf{k}$ | $\bf{\approx R_G}$ |
|:---:|:-----:|
| $2$ | $25.0$ |
| $4$ | $37.5$ |
| $6$ | $41.67$ |
| $8$ | $43.75$ |
| $10$ | $45.0$ |
| $20$ | $47.5$ |
| $30$ | $48.33$ |
| $40$ | $48.75$ |
| $50$ | $49.0$ |
| $60$ | $49.17$ |
| $70$ | $49.29$ |
| $80$ | $49.38$ |
| $90$ | $49.44$ |
| $100$ | $49.5$ |

Looks like that for increasing values of $k$, $R_G$ approaches $50\%$. Let's investigate.

$\lim \limits_{k \to \infty}{(\frac{k - 1}{2 * k})}$<br>
$\lim \limits_{k \to \infty}{(\frac{\frac{k}{k} - \frac{1}{k}}{2})}$<br>
$\lim \limits_{k \to \infty}{(\frac{1 - \frac{1}{k}}{2})}$

While $k$ increases, $\frac{1}{k}$ decreases. For $\infty$, this term becomes zero, leaving only $\frac{1}{2}$ as a constant. Thus, this ratio approaches $50\%$.