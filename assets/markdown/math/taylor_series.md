Let there be an any function $f(x)$ that's to be approximated to any required precision within a given interval with center $x_0 = 0$, by representing it as a polynomial of $n$-th degree, as follows:

$\mathrm{I}$: $f(x) = c_0 + c_1 * x + c_2 * x^2 + \dotsm + c_n * x^n$

Let's substitute $x = x_0 = 0$ into $\mathrm{I}$:

$f(0) = c_0 + c_1 * 0 + c_2 * 0^2 + \dotsm + c_n * 0^n$<br>
$f(0) = c_0$

In order to compute the value for $c_1$, both sides of the equation $\mathrm{I}$ are derived.

$f'(x) = c_1 + 2 * c_2 * x + \dotsm + n * c_n * x^{n - 1}$

Now, $c_0$ vanished, due to it being a constant, while $c_2 * x$ transformed into $1 * c_2 * x^0 = c_2$, so that the same procedure as for $c_0$ can be applied again.

$f'(0) = c_1 + 2 * c_2 * 0 + \dotsm + n * c_n * 0^{n - 1}$<br>
$f'(0) = c_1$

Let's try to repeat this procedure to arrive at an expression for $c_2$.

$f''(x) = 2 * c_2 + \dotsm + n * (n - 1) * c_n * x^{n - 1 - 1}$

Again, $c_1$ vanished and $c_2$ is the only $x$-independent term, so that

$f''(0) = 2 * c_2$

But now, there's a factor of two "in the way", so that

$\frac{f''(0)}{2} = c_2$

In general, to arrive at $c_n$ as an $x$-independent term, $n$ successive derivations are to be taken. The summand

$n * (n - 1) * c_n * x^{n - 1 - 1}$

already indicates, that with each derivation, the current $x$-exponent becomes an additional factor of the term, while the $x$-exponent decreases by one, as by the rules of derivation. This behavior results in the final factor of $c_n$ being $n!$, and thus

$c_n = \frac{1}{n!} * f^{(n)}(0)$

thereby

$f(x) = \displaystyle \sum_{n = 0}^{\infty}{\frac{1}{n!} * f^{(n)}(0) * x^n}$

From this relation, the insight arises, that any given function $f(x)$ can be described by only knowing its derivatives at $x_0$. This fact is very useful to bring various mental constructs into the world of computation, in the form of an approximation. There are many cases where a taylor expansion only manages to approximate a small radius, relative to $x_0$, so not every function can be expanded this way.

If, at any point in the derivation chain, $f^{(n)}(x) = 0$, then $n - 1$ is the last summand that's required to fully express $f(x)$, as $\frac{\mathrm{d}}{\mathrm{d}x} 0 = 0$, and each further summand is multiplied by this derivative, and thus vanishes.

