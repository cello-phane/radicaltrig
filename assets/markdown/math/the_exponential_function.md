## Table Of Contents {: #toc }

## Definition

### General Exponential

An exponential function is a function whose base is any fixed number $a$, while $x$ resides in $a$'s exponent.

$f(x) = a^x$

There are a few other parameters which characterize exponential functions, as follows:

$f(x) = b * a^{c*x + d} + e$

For $b > 1$, the function becomes steeper, while for $0 \lt b < 1$, its slope decreases. If $b < 0$, the function is mirrored about the x-axis, with the same reasoning holding true for $\mid{b}\mid$ as it did within the range of positiv values.

When $c$, $d$ and $e$ have no effect, $b$ represents the point of intersection with the y-axis, since $x = 0$ and $a^0 = 1 \Rightarrow b*a^x = b$. Since $e$ just offsets the graph along the y-axis, if $e$ is present, this point of section becomes $b + e$.

The parameter $d$ offsets the graph along the x-axis by $-d$ to the right, while $c$ increases the slope for $c \gt 0$ and decreases it for $c \lt 0$, with the function becoming a horizontal line when $c = 0$.

### The Exponential

Amongst all possibile exponential functions, one in particular has been designated as **the exponential function**, which is constructed as follows:

This function, $f(x)$, shall have its slope at the point $x$ be its value at $x$, being $f(x)$, so that

$f'(x) = f(x)$

and thus, the derivative of this function is the function itself. Other than that, there are no further modifications taking place, so $b = 1$, $c = 1$, $d = 0$ and $e = 0$, making its appearance be simply

$f(x) = a^x$

This special a is called `Euler's Number` $e$, and approximately equals to $2.718$. It's corresponding function $f$ is called $exp$, so that

$exp(x) = e^x$

## Derivation

INFO: A more straight forward and less "*infinity-riddled*" derivation may be found [here](/math/new-calculus#the-exponential-function).

### Base Derivation

In order to derive a function which satisfies [the exponential definition](#definition_the-exponential), the following property has to be satisfied:

$\mathrm{I}$: $f'(x) = f(x)$

The goal now becomes to find the $a$ of

$f(x) = a^x$

so that $\mathrm{I}$ becomes satisfied. Let's start by expanding the derivative into it's definition, then rearrange.

$f'(x) = \displaystyle \lim_{h \to 0}{\left(\frac{a^{x + h} - a^x}{h}\right)}$<br>
$f'(x) = \displaystyle \lim_{h \to 0}{\left(\frac{a^x*(a^h - 1)}{h}\right)}$

Because the term $a^x$ does not depend on $h$, it can be lifted out of the limit.

$f'(x) = a^x * \displaystyle \lim_{h \to 0}{\left(\frac{a^h - 1}{h}\right)}$<br>
$f'(x) = f(x) * \displaystyle \lim_{h \to 0}{\left(\frac{a^h - 1}{h}\right)}$

It now becomes apparent, that the limit needs to equal to $1$, for $\mathrm{I}$ to become satisfied. For this to be the case, the following equation must hold:

$\frac{a^h - 1}{h} = 1$<br>
$a^h - 1 = h$<br>
$a^h = h + 1$<br>
$a = \sqrt[h]{h + 1}$

By approaching the limit of $h \to 0$, we approach the value of $a$.

$a = \displaystyle \lim_{h \to 0}{\left(\sqrt[h]{h + 1}\right)}$

Let's go through a few points manually.

| h | a |
|:-:|:-:|
| $\frac{1}{1}$ | $2.00000$ |
| $\frac{1}{10}$ | $2.59374$ |
| $\frac{1}{100}$ | $2.70481$ |
| $\frac{1}{1000}$ | $2.71692$ |
| $\frac{1}{10000}$ | $2.71815$ |
| $\frac{1}{100000}$ | $2.71827$ |

$\Rightarrow a \approx 2.718$

The $h$-th root can be expressed as exponentiation

$a = \displaystyle \lim_{h \to 0}{(h + 1)^{\frac{1}{h}}}$

and instead of letting $h$ approach $0$, $h$ may approach $\infty$, if for every occurrence of $h$, it's reciprocal $\frac{1}{h}$ is substituted, since it approaches the same value of $0$.

$a = \displaystyle \lim_{h \to \infty}{\left(\left(\frac{1}{h} + 1\right)^{\frac{1}{\frac{1}{h}}}\right)}$<br>
$\mathrm{II}$: $a = \displaystyle \lim_{h \to \infty}{\left(\left(\frac{1}{h} + 1\right)^{h}\right)}$

This rewrite of the limit turned the root-operation into whole-number exponentiation of a binomial, which is far simpler to work with. As described in [Binomial Expansion](/math/binomial_expansion.md), a binomial raised to a power $n \in \mathbb{N_0}$ expands as

$(a+b)^n=\displaystyle \sum_{k=0}^{n}{\binom{n}{k}*a^{(n-k)}*b^{k}}$

Let's also substitute in the underlying expression of the binomial coefficent.

$(a+b)^n=\displaystyle \sum_{k=0}^{n}{\frac{n!}{(n-k)!*k!} *a^{(n-k)}*b^{k}}$

Due to the commutative law of addition, it doesn't matter whether $a = \frac{1}{h}$ and $b = 1$ or $a = 1$ and $b = \frac{1}{h}$. Let's go with the latter.

$(1 + \frac{1}{h})^h = \displaystyle \sum_{k=0}^{h}{\frac{h!}{(h-k)!*k!}*1^{(h-k)}*\left(\frac{1}{h}\right)^{k}}$

Since $1^x = 1$ for $x \in \mathbb{N_0}$, the factor $1^{(h-k)}$ can be left out, while the exponent $k$ can be distributed into the fraction.

$(1 + \frac{1}{h})^h = \displaystyle \sum_{k=0}^{h}{\frac{h!}{(h-k)!*k!}*\frac{1}{h^k}}$

There's still room for simplification.

$(1 + \frac{1}{h})^h = \displaystyle \sum_{k=0}^{h}{\frac{1}{k!}*\frac{h!}{(h-k)!}*\frac{1}{h^k}}$

When dividing $h!$ by $(h-k)!$, only the first $k$ factors of $h!$ remain, while the last $h - k$ factors are removed.

$(1 + \frac{1}{h})^h = \displaystyle \sum_{k=0}^{h}{\frac{1}{k!}*(h * (h - 1) * (h - 2) * \dotsm * (h - k + 1))*\frac{1}{h^k}}$<br>
$(1 + \frac{1}{h})^h = \displaystyle \sum_{k=0}^{h}{\frac{1}{k!}*\frac{h * (h - 1) * (h - 2) * \dotsm * (h - k + 1)}{h^k}}$<br>
$(1 + \frac{1}{h})^h = \displaystyle \sum_{k=0}^{h}{\frac{1}{k!}*\frac{(h - 0) * (h - 1) * (h - 2) * \dotsm * (h - (k - 1))}{h^k}}$

There are k factors in the numerator of the fraction with $h^k$ in its denominator, as each term contains a subtrahend that's a whole number and the successor of its predecessor's subtrahend, with the first term having this subtrahend be zero. Counting from $0$ to $k - 1$ is the same as counting from $1$ to $k$. Due to the commutative law of multiplication, and due to there being $k$ instances of $h$ in the denominator ($h^k$), each term can be divided by exactly one $h$.

$(1 + \frac{1}{h})^h = \displaystyle \sum_{k=0}^{h}{\frac{1}{k!}*\left(\frac{h - 0}{h} * \frac{h - 1}{h} * \frac{h - 2}{h} * \dotsm * \frac{h - (k - 1)}{h}\right)}$<br>
$(1 + \frac{1}{h})^h = \displaystyle \sum_{k=0}^{h}{\frac{1}{k!}*\left(\left(1 - \frac{0}{h}\right)*\left(1 - \frac{1}{h}\right) * \left(1 - \frac{2}{h}\right) * \dotsm * \left(1 - \frac{k - 1}{h}\right)\right)}$

Substituting this result back into $\mathrm{II}$ will yield the final limit:

$a = \displaystyle \lim_{h \to \infty}{\left(\displaystyle \sum_{k=0}^{h}{\frac{1}{k!}*\left(\left(1 - \frac{0}{h}\right)*\left(1 - \frac{1}{h}\right) * \left(1 - \frac{2}{h}\right) * \dotsm * \left(1 - \frac{k - 1}{h}\right)\right)}\right)}$

WARNING: At this point, the derivation becomes a bit sloppy. Since the sum iterates from $0$ to $h$ and $h$ is approaching infinity, it becomes quite hard to argue about why $\frac{k - 1}{h}$ should become zero, as $\frac{\infty - 1}{\infty} \neq 0$, but - in this case - rather $1$. Then, $(1 - 1) = 0$ and the whole summand becomes $0$, which annihilates $\frac{1}{k!}$ as well. The line between fractions with $h$ in their denominator evaluating as $1$ or $0$ is quite blurry to me. Despite of this, Euler came up with the infinite sum of reciprocal factorials as the limit. I'm going to have to come back to this.

With the above in mind, let's continue.

$a = \displaystyle \lim_{h \to \infty}{\left(\displaystyle \sum_{k=0}^{h}{\frac{1}{k!}*((1 - 0)*(1 - 0) * (1 - 0) * \dotsm * (1 - 0))}\right)}$<br>
$a = \displaystyle \lim_{h \to \infty}{\left(\displaystyle \sum_{k=0}^{h}{\frac{1}{k!}*(1*1*1 * \dotsm * 1)}\right)}$<br>
$a = \displaystyle \lim_{h \to \infty}{\left(\displaystyle \sum_{k=0}^{h}{\frac{1}{k!}}\right)}$<br>
$a = \displaystyle \sum_{k=0}^{\infty}{\frac{1}{k!}}$

### Function Derivation

The exponential function

$exp(x) = e^x$

can be expressed as an infinite sum, a [Taylor Series](/math/taylor-series). Due to the property that

$\frac{\mathrm{d}}{\mathrm{d}x}e^x = e^x$

$c_n = \frac{1}{n!} * f^{(n)}(0)$<br>
$c_n = \frac{1}{n!} * e^0$<br>
$c_n = \frac{1}{n!}$

Such, that

$exp(x) = \displaystyle \sum_{k = 0}^{\infty}{\frac{1}{k!}*x^k}$