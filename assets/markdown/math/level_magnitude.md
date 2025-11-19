## Table Of Contents {: #toc }

## Geometric Meaning

The phrase "Arithmetic Mean" is really a misnomer, as it implies a "middle", but ironically, it has nothing to do with the middle of anything. "Level magnitude" would be a better name, which became the title of this article.

Given any set of numbers or magnitudes, the arithmetic mean indicates a value that each number would have, if all the numbers in the set were made to be equal through a process of redistribution. An arithmetic mean leads to correct inference, if and only if, redistribution makes sense.

<img src="/assets/images/level_magnitude__1.png" class="half-width-image"/>

It's easy to see that if the green block is moved from pile 3 to pile 1, then all three piles will be level and equal.

<img src="/assets/images/level_magnitude__2.png" class="half-width-image"/>

### Example

Let there be six arbitrary magnitudes, called $a_1$ through $a_6$, aligned at the bottom, so that the shortest line segment can be easily spotted. Then, make a cut at this lowest height, so that each line-segment is now split up into $s$, being the shortest length, plus $l_k$, the excess-length relative to $s$, which will be zero for the shortest line itself.

<img src="/assets/images/level_magnitude__3.jpg" class="half-width-image"/>

If each excess $l_k$ is now summed up into a total length $l$, then by adding an equal amount $\frac{l}{k}$ of $l$ to each $s$ will result in all the segments becoming equally as long. The length of such a resulting segment will then be the level magnitude $\bar{a}$. Start out by joining all lines $l_k$, which can easily be accomplished by the use of a compass.

<img src="/assets/images/level_magnitude__4.jpg" class="half-width-image"/>

Notice that there is no distance $l_4$, as $l_4=0$, and that which has no dimension cannot add to a length. This total excess may now be divided up into $k=6$ parts by Thales' theorem.

TODO: Write about Thales' theorem in detail

<img src="/assets/images/level_magnitude__5.jpg" class="half-width-image"/>

Then, add this even part of $l$ to each $s$, so that all magnitudes end up being level to one another.

<img src="/assets/images/level_magnitude__6.jpg" class="half-width-image"/>

## Algebraic Derivation

$s$ - shortest line segment<br>
$a_k$ - $k$-th line segment<br>
$l_k$ - $k$-th excess, relative to $s$; will be zero for the shortest segment(s)<br>
$\bar{a}$ - the level magnitude of all $a_k$ values; spoken "a-bar"

With the following relation in mind

$s + l_k = a_k \Rightarrow l_k = a_k - s$

the first way to derive $\bar{a}$ is by interpreting it as the sum of the sortest segment $s$ plus an equal part of the sum of the excesses $l_k$

$$
\begin{align*}
\bar{a} &= s + \frac{l_1 + l_2 + \dotsm + l_n}{n} \\
&= s + \frac{(a_1 - s) + (a_2 - s) + \dotsm + (a_n - s)}{n} \\
&= s + \frac{a_1 + a_2 + \dotsm + a_n - s - s + \dotsm - s }{n} \\
&= s + \frac{a_1 + a_2 + \dotsm + a_n - n*s}{n} \\
&= s + \frac{a_1 + a_2 + \dotsm + a_n}{n} - \frac{\cancel{n}*s}{\cancel{n}} \\
&= \cancel{s} + \frac{a_1 + a_2 + \dotsm + a_n}{n} - \cancel{s} \\
&= \frac{a_1 + a_2 + \dotsm + a_n}{n} \\
\end{align*}
$$

and the second can be realized as adding an equal part of the sum of excesses $l_k$ to each shortest segment $s$, and dividing by the number of segments, to retrieve an individual segment's length

$$
\begin{align*}
\bar{a} &= \frac{((s + \frac{l_1 + l_2 + \dotsm + l_n}{n}) + (s + \frac{l_1 + l_2 + \dotsm + l_n}{n}) + \dotsm + (s + \frac{l_1 + l_2 + \dotsm + l_n}{n}))}{n} \\
&= \frac{(s + s + \dotsm + s) + (\frac{l_1 + l_2 + \dotsm + l_n}{n} + \frac{l_1 + l_2 + \dotsm + l_n}{n} + \dotsm + \frac{l_1 + l_2 + \dotsm + l_n}{n})}{n} \\
&= \frac{(s + s + \dotsm + s) + (\cancel{n} * \frac{l_1 + l_2 + \dotsm + l_n}{\cancel{n}})}{n} \\
&= \frac{(s + s + \dotsm + s) + (l_1 + l_2 + \dotsm + l_n)}{n} \\
&= \frac{(s + l_1) + (s + l_2) + \dotsm + (s + l_n)}{n} \\
&= \frac{a_1 + a_2 + \dotsm + a_3}{n} \\
\end{align*}
$$