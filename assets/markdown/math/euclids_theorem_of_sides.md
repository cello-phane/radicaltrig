## Table Of Contents {: #toc }

## Introduction

Let there be a right-angled triangle $\triangle{ABC}$, with it's angles being the greek equivalent letter of it's three points ($\alpha, \beta, \gamma$) and it's sides being named the lower equivalent latin letter of it's opposite point. A straight line is projected down from point $C$ onto side $c$, being orthogonal to it. The intersection is called $C'$, which splits side $c$ into two parts, the LHS called $p$ and the RHS called $q$. $\gamma$ is split into the LHS called $\gamma_1$ and the RHS called $\gamma_2$ by said line.

<img src="/assets/images/euclids_theorem_of_sides__1.jpg" class="third-width-image"/>

Making use of basic visual deductions as well as pythagoras' theorem, there are a multitude of relations that can be derived:

$\mathrm{I}$: $\alpha + \beta = \frac{\pi}{2} \Rightarrow \beta = \frac{\pi}{2} - \alpha$<br>
$\mathrm{II}$: $\alpha + \gamma_1 = \frac{\pi}{2} \Rightarrow \gamma_1 = \frac{\pi}{2} - \alpha$<br>
$\mathrm{III}$: $\beta + \gamma_2 = \frac{\pi}{2} \Rightarrow \gamma_2 = \frac{\pi}{2} - \beta$

By substituting $\mathrm{I}$ into $\mathrm{III}$ follows:

$\gamma_2 = \frac{\pi}{2} - (\frac{\pi}{2} - \alpha) \Rightarrow \gamma_2 = \alpha$

By substituting rearranged $\mathrm{I}$ into $\mathrm{II}$ follows:

$\gamma_1 = \frac{\pi}{2} - (\frac{\pi}{2} - \beta) \Rightarrow \gamma_1 = \beta$

Now it's time for the relations of various lengths.

$\mathrm{IV}$: $a^2 + b^2 = c^2$<br>
$\mathrm{V}$: $h_c^2 + p^2 = b^2$<br>
$\mathrm{VI}$: $h_c^2 + q^2 = a^2$<br>
$\mathrm{VII}$: $c = p + q$

## Height hc

By substituting $\mathrm{V}$, $\mathrm{VI}$ and $\mathrm{VII}$ into $\mathrm{IV}$, the following relation can be established:

$(p + q)^2 = (h_c^2 + q^2) + (h_c^2 + p^2)$<br>
$p^2 + 2*p*q + q^2 = 2*h_c^2 + q^2 + p^2$<br>

After removing the terms that cancel out, this is the final equation:

$\mathrm{VIII}$: $p*q = h_c^2$<br>

Which states that multiplying the two parts $p$ and $q$ which in total make up $c$ equals to the square of the height $h_c$.

There's also another way to arrive at this conclusion, by making use of the two smaller rectangles' similarity:

$\gamma_2 = \alpha \land \gamma_1 = \beta \Rightarrow \triangle{AC'C} \sim \triangle{C'BC} \Leftrightarrow \frac{h_c}{q} = \frac{p}{h_c} \Rightarrow h_c^2 = p*q$

This statement says that because $\gamma_2 = \alpha$ and $\gamma_1 = \beta$, the LHS triangle and the RHS triangle are similar, from which follows that the side lengths $h_c$ and $q$ are in the same relation as $p$ and $h_c$. From these equal ratio follows the same fact as previously proven through substitution of equations.

<img src="/assets/images/euclids_theorem_of_sides__2.jpg" class="third-width-image"/>

## Sides

By substituting $\mathrm{VIII}$ into $\mathrm{V}$, the following relation is established:

$p*q + p^2 = b^2 \Rightarrow b^2 = p*q + p^2 = p*(p+q)$

Due to $\mathrm{VII}$, this can be rewritten as it's final form:

$b^2 = p*c$

By substituting $\mathrm{VIII}$ into $\mathrm{VI}$, the following relation is established:

$p*q + q^2 = a^2 \Rightarrow a^2 = p*q + q^2 = q*(p+q)$

Due to $\mathrm{VII}$, this can be rewritten as it's final form:

$a^2 = q*c$