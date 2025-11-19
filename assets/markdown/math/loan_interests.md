## Table Of Contents {: #toc }

## Preamble

The sum of a sequence of equal numbers raised to incrementing powers, starting with zero, will occur in the derivations below, in the form of

$1 + a^1 + a^2 + ... + a^n$

It is now claimed that the result will be $\frac{a^{n + 1} - 1}{a - 1}$, which is easily provable:

$1 + a^1 + a^2 + ... + a^n = \frac{a^{n + 1} - 1}{a - 1}$<br>
$(a - 1) * (1 + a^1 + a^2 + ... + a^n) = a^{n + 1} - 1$<br>
$a * (1 + a^1 + a^2 + ... + a^n) -1 * (1 + a^1 + a^2 + ... + a^n) = a^{n + 1} - 1$<br>
$(a^1 + a^2 + a^3 + ... + a^{n + 1}) + (-1 - a^1 - a^2 + ... - a^n) = a^{n + 1} - 1$

This equality becomes more apparent once the addition above is aligned by cancelling out, like terms.

$$
\begin{alignedat}{5}
&&         &a^1 &+{}&a^2 + \dotsm &+&{}a^n &+{}&a^{n + 1}\\
&-1 &-{}&a^1 &-{}&a^2 + \dotsm &-&{}a^n &&\\
\hline
&-1 &&&&&& &+{}&a^{n + 1}
\end{alignedat}
$$

## Introduction

Let $a$ be the amount of money loaned, $r \in [0;1]$ be the rate of interest, and $p$ be the amount of periodic repayment. The function $a(t)$ represents loaned money at period $t$, where a period may be a week, a month, a year, etc. If $a(t) = 0$, then the loan has been paid off.

Each period, the remaining amount is increased by the rate of interest, so that interests of previous periods are also increased. The following recursive equations depict this behavior, where $t > 0$ and $a(0) = a$.

## Interests In Advance

"Advance" indicates that the interests of a period are calculated by multiplying with the final amount of said period, which has already been lessened by the periodic payment. The payment happens before the calculation.

$a(t) = (a(t - 1) - m) * (1 + r)$

For brevity's sake, the substitution $z = (1 + r)$ is applied from this point onwards, making $a(t)$ become:

$a(t) = (a(t - 1) - m) * z$

Let's expand the first few time periods manually:

$a(1) = (a - m) * z$<br>
$a(2) = ((a - m) * z - m) * z$<br>
$a(3) = (((a - m) * z - m) * z - m) * z$<br>
$a(4) = ((((a - m) * z - m) * z - m) * z - m) * z$

Multiplying out the expression representing $a(4)$ reveals a pattern.

$((((a - m) * z - m) * z - m) * z - m) * z$<br>
$(((a*z - m*z - m) * z - m) * z - m) * z$<br>
$((a*z^2 - m*z^2 - m*z - m) * z - m) * z$<br>
$(a*z^3 - m*z^3 - m*z^2 - m*z - m) * z$<br>
$a*z^4 - m*z^4 - m*z^3 - m*z^2 - m*z$<br>
$a*z^4 - m*(z^4 + z^3 + z^2 + z)$

$-m$ is multiplied by $z$ over and over again, where the first instance judging from the left hand side is multiplied four times, the next three times, then twice, then once. $a$ is always multiplied by all instances of $z$, as it's the inner-most expression. This pattern yields the following, non-recursive equation:

$a(t) = a * z^t - m * \displaystyle \sum_{k=1}^{t} z^k$

But, as in [Preamble](#preamble),

$1 + a + a^2 + a^3 + ... + a^n = \frac{a^{n + 1} - 1}{a - 1}$

thus

$a + a^2 + a^3 + ... + a^n = \frac{a^{n + 1} - 1}{a - 1} - 1$<br>
$a + a^2 + a^3 + ... + a^n = \frac{a^{n + 1} - 1}{a - 1} - \frac{a - 1}{a - 1}$<br>
$a + a^2 + a^3 + ... + a^n = \frac{a^{n + 1} - 1 - (a - 1)}{a - 1}$<br>
$a + a^2 + a^3 + ... + a^n = \frac{a^{n + 1} - \cancel{1} - a + \cancel{1}}{a - 1}$<br>
$a + a^2 + a^3 + ... + a^n = \frac{a^{n + 1} - a}{a - 1}$

so

$a(t) = a * z^t - m * \frac{z^{t + 1} - z}{z - 1}$

Undoing the substitution $z = (1 + r)$ yields the final formula:

$a(t) = a * (1 + r)^t - m * \frac{(1 + r)^{t + 1} - (1 + r)}{\cancel{1} + r - \cancel{1}}$<br>
$a(t) = a * (1 + r)^t - m * \frac{(1 + r)^{t + 1} - 1 - r}{r}$

## Interests In Arrear

Arrear stands for "delayed" and indicates that the interests of a period are calculated by multiplying with the initial amount of said period, instead of the amount which has been lessened by the periodic payment. The payment happens after the calculation.

$a(t) = a(t - 1) * (1 + r) - m$

For brevity's sake, the substitution $z = (1 + r)$ is applied from this point onwards, making $a(t)$ become:

$a(t) = a(t - 1) * z - m$

Let's expand the first few time periods manually:

$a(1) = a * z - m$<br>
$a(2) = (a * z - m) * z - m$<br>
$a(3) = ((a * z - m) * z - m) * z - m$<br>
$a(4) = (((a * z - m) * z - m) * z - m) * z - m$

Multiplying out the expression representing $a(4)$ reveals a pattern.

$(((a * z - m) * z - m) * z - m) * z - m$<br>
$((a*z^2 - m*z - m) * z - m) * z - m$<br>
$(a*z^3 - m*z^2 - m*z - m) * z - m$<br>
$a*z^4 - m*z^3 - m*z^2 - m*z - m$<br>
$a*z^4 - m*(z^3 + z^2 + z + 1)$

$-m$ is multiplied by $z$ over and over again, where the first instance judging from the left hand side is multiplied three times, the next two times, then once, lastly not at all. $a$ is always multiplied by all instances of $z$, as it's the inner-most expression. This pattern yields the following, non-recursive equation:

$a(t) = a * z^t - m * \displaystyle \sum_{k=0}^{t - 1} z^k$

But, as in [Preamble](#preamble),

$1 + a + a^2 + a^3 + ... + a^n = \frac{a^{n + 1} - 1}{a - 1}$

so

$a(t) = a * z^t - m * \frac{a^{t - 1 + 1} - 1}{a - 1}$<br>
$a(t) = a * z^t - m * \frac{a^t - 1}{a - 1}$

Undoing the substitution $z = (1 + r)$ yields the final formula:

$a(t) = a * (1+r)^t - m * \frac{(1 + r)^t - 1}{\cancel{1} + r - \cancel{1}}$<br>
$a(t) = a * (1+r)^t - m * \frac{(1 + r)^t - 1}{r}$

## Comparison

Let's compare the following two interest types:

[Advance](#interests-in-advance)

$a(t) = a * (1 + r)^t - m * \frac{(1 + r)^{t + 1} - 1 - r}{r}$

[Arrear](#interests-in-arrear)

$a(t) = a * (1+r)^t - m * \frac{(1 + r)^t - 1}{r}$

Their equations only differ by the numerator of the scaling factor for $-m$. A bigger numerator will lessen the remaining amount more quickly. Let's compare these two by setting them into a ratio.

$\frac{(1 + r)^{t + 1} - 1 - r}{(1 + r)^t - 1}$<br>
$\frac{(1 + r) * \cancel{((1 + r)^t - 1)}}{\cancel{(1 + r)^t - 1}}$<br>
$(1 + r)$

Thus, [Advance](#interests-in-advance) is quicker in lessening the amount by a factor of $(1 + r)$, relative to [Arrear](#interests-in-arrear). With the former, one will save on

$(1 + r) * m$<br>
$m + m*r$

periodic payments. Simply put, around one period and a fraction less.

## Python Script

The following simple python script may be made use of to quickly calculate remaining amounts at various points in time:

```python
import math
import sys

def calc_advance(a, r, m, t):
  return a * math.pow(1 + r, t) - m * (
    (math.pow(1 + r, t + 1) - 1 - r) / r
  )

def calc_arrear(a, r, m, t):
  return a * math.pow(1 + r, t) - m * (
    (math.pow(1 + r, t) - 1) / r
  )

if __name__ == "__main__":
  if len(sys.argv) != 5:
    print(f"Usage: {sys.argv[0]} a r m t")
    sys.exit(1)

  try:
    a = float(sys.argv[1])
    r = float(sys.argv[2])
    m = float(sys.argv[3])
    t = float(sys.argv[4])

    print(f"advance: {round(calc_advance(a, r, m, t) * 100) / 100}")
    print(f"arrear: {round(calc_arrear(a, r, m, t) * 100) / 100}")
  except ValueError:
    print(f"Invalid number entered")
```