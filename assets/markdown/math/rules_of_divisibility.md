## Table Of Contents {: #toc }

## Digit Rules

Let there be two whole numbers $a$ and $b$, while $a$ is to be divided by $b$. The following rules then provide a way to quickly check whether $a$ can be divided by $b$ into even and whole parts.

### Preamble

In contrast to [Roman Numerals](./roman_numerals.md), a system of positional notation provides a simple way to add or subtract powers of its base. It has been globally agreed upon that the standard base for inter-human communication is $10$. We have assigned names to these places, as follows: Ones ($10^0$), Tens ($10^1$), Hundreds ($10^2$), Thousands ($10^3$), etc. Thus, the value of a number within a place-value system is the sum of its parts.

$\displaystyle \sum_{n=0}^{N} a_n * 10^n$

Let's take the number $123,456$ as an example.

$1 * 10^5 + 2 * 10^4 + 3 * 10^3 + 4 * 10^2 + 5 * 10^1 + 6 * 10^0$

This type of notation revealed a multitude of new patterns, which can be made use of to derive simple rules that govern whole number divisibility.

If a number $a$ is represented through the sum of other numbers $b_n$, and if each of these summands is divisible by $m$, then $m \mid a \Leftrightarrow m \mid b_n$.

$a = b_1 + b_2 + b_3 + \dotsm + b_n$<br>
$a = m * (\frac{b_1}{m} + \frac{b_2}{m} + \frac{b_3}{m} + \dotsm + \frac{b_n}{m})$

### Divisibility By 2

Since $2 \mid 10 \Rightarrow 2 \mid 10^n$ for $n \in \mathbb N_{> 0}$, so the only part of the number that may fail divisibility by two is its ones place, which ranges from zero to nine, of which only $0$, $2$, $4$, $6$ and $8$ are evenly divisible by $2$.

**A number is divisible by two if its last digit is divisible by two.**

### Divisibility By 3 And 9

Let $n \in \mathbb N_{> 0}$, then

$10^n - 1 = \displaystyle \sum_{k=0}^{n - 1} 9 * 10^k = 9 * \left(\displaystyle \sum_{k=0}^{n - 1} 10^k\right)$

It thus follows, that $9 \mid 10^n - 1$, and since $3 \mid 9$, that $3 \mid 10^n -1$.

Let the digits $a_n$ represent any number.

$a_0 * 10^0 + a_1 * 10^1 + \dotsm + a_n * 10^n$

$a_0 + a_1 * \left(9 * \left(\displaystyle \sum_{k=0}^{0} 10^k\right) + 1\right) + \dotsm + a_n * \left(9 * \left(\displaystyle \sum_{k=0}^{n - 1} 10^k\right) + 1\right)$

$a_0 + a_1 + \dotsm + a_n + \left[9 * \left(a_1 * \displaystyle \sum_{k=0}^{0} 10^k + \dotsm + a_n * \displaystyle \sum_{k=0}^{n - 1} 10^k\right)\right]$

The number within square brackets is now a multiple of nine, and is thereby guaranteed to be divisible by $3$ and $9$. What's left is the sum of the original number's digits.

**A number is divisible by three or nine if the sum of its digits is divisible by three or nine respectively.**

### Divisibility By 4

Since $4 \nmid 10$, the next power of ten that *is* divisible is $2$ ($4 \mid 100$), thus $4 \mid 10^n$ for $n \in \mathbb N : n \ge 2$. So the only parts of the number that may fail divisibility by four are its ones- and tens places, effectively the number represented by its last two digits.

**A number is divisible by four if the number represented by its last two digits is divisible by four.**

### Divisibility By 5

Since $5 \mid 10 \Rightarrow 5 \mid 10^n$ for $n \in \mathbb N_{> 0}$, so the only part of the number that may fail divisibility by five is its ones place, which ranges from zero to nine, of which only $0$ and $5$ are evenly divisible by $5$.

**A number is divisible by five if its last digit is either zero or five.**

### Divisibility By 6

Since $6 = 2 * 3$ and $2$ and $3$ are prime numbers, for any number to be divisible by $6$, it has to be divisible by both $2$ and $3$.

**A number is divisible by six if its last digit is divisible by two and the sum of its digits is divisible by three.**

### Divisibility By 7

(This derivation is very much analogous to [Divisibility By 11](#divisibility-by-11)).

$7 \mid 999\,999$, since $999\,999 = 3^3 * 7 * 11 * 13 * 37$. Let $m, n \in \mathbb{N_0}$, then

$7 \mid 10^n * 999\,999$<br>
$\mathrm{I}$: $7 \mid 10^n * (10^6 - 1)$

Further,

$\mathrm{II}$: $7 \mid \displaystyle \sum_{k=0}^{n} 10^{6*k} * (10^6 - 1)$

because each summand is divisible by 7 (see $\mathrm{I}$), so the sum is also divisible by 7. The expression above depicts numbers with only nines as their digits, who's lengths are multiples of six (6, 12, 18, ...).

Due to $\mathrm{I}$, the following is also true:

$\mathrm{III}$: $7 \mid 10^m * \displaystyle \sum_{k=0}^{n} 10^{6*k} * (10^6 - 1)$

The expression above depicts numbers, starting with a count of nines that's a multiple of six and an arbitrary amount of trailing zeroes.

$1000 \bmod 7 = 6$ since $142 * 7 = 994$ and $1000 - 994 = 6$ and $6 < 7$. To find all powers of ten, which cause a remainder of $6$ when dividing with $7$, the following congruence equation can be considered.

Let $x \in \mathbb{N_0}$, then

$1000 \equiv 1000 + 7*x \pmod{7}$

The above is true, as only multiples of $7$ are added to the number. Let's look at two examples.

$1\,000\,000\,000 \bmod 7 = 6$ since

$1000 + 7*x = 1\,000\,000\,000$<br>
$7*x = 999\,999\,000$<br>
$x = 142\,857\,000$<br>

$1\,000\,000\,000\,000\,000 \bmod 7 = 6$ since

$1000 + 7*x = 1\,000\,000\,000\,000\,000$<br>
$7*x = 999\,999\,999\,999\,000$<br>
$x = 142\,857\,142\,857\,000$<br>

Due to $1000 = 10^3$, $1\,000\,000\,000 = 10^9$ and $1\,000\,000\,000\,000\,000 = 10^{15}$, it looks like the following should be true

$\mathrm{IV}$: $1000 + 7*x = 10^{(2*n + 1) * 3}$<br>
$10^3 + 7*x = 10^{6*n + 3}$<br>
$10^3 + 7*x = 10^3 * 10^{6*n}$<br>
$7*x = 10^3 * 10^{6*n} - 10^3$<br>
$7*x = 10^3 * (10^{6*n} - 1)$

If it can now be shown, that

$\mathrm{V}$: $10^{6*n} - 1$

is evenly divisible by $7$, then $\forall\,x\,\exists!\,n$, so that $\mathrm{IV}$ is satisfied.

I now claim, that

$\displaystyle \sum_{k=0}^{n} 10^{6*k} * (10^6 - 1) = 10^{6*n} - 1$

which can be shown as follows

$(10^0 * (10^6 - 1)) + (10^6 * (10^6 - 1)) + (10^{12} * (10^6 - 1)) + \dotsm + (10^{6*n} * (10^6 - 1))$<br>
$(10^0 * 10^6 - 10^0) + (10^6 * 10^6 - 10^6) + (10^{12} * 10^6 - 10^{12}) + \dotsm + (10^{6*n} * 10^6 - 10^{6*n})$<br>
$(10^{0 + 6} - 10^0) + (10^{6 + 6} - 10^6) + (10^{12 + 6} - 10^{12}) + \dotsm + (10^{6*n + 6} - 10^{6*n})$<br>
$(10^6 - 10^0) + (10^{12} - 10^6) + (10^{18} - 10^{12}) + \dotsm + (10^{6*n + 6} - 10^{6*n})$

It now becomes apparent that the first term within each pair of parentheses is cancelled out by the second term of its successor, as follows:

$(\cancel{10^6} - 10^0) + (10^{12} - \cancel{10^6}) + (10^{18} - 10^{12}) + \dotsm + (10^{6*n + 6} - 10^{6*n})$<br>
$(-10^0) + (\cancel{10^{12}}) + (10^{18} - \cancel{10^{12}}) + \dotsm + (10^{6*n + 6} - 10^{6*n})$<br>
$(-10^0) + (\cancel{10^{18}}) + \dotsm + (10^{6*n + 6} - \cancel{10^{6*n}})$<br>
$(-10^0) + 10^{6*n + 6}$<br>
$10^{6*n + 6} - 1$<br>
$10^{6*(n + 1)} - 1$

So, $\mathrm{V}$ is now proven to be divisible by $7$, just not for the base-case of $n = 1$, which is trivial:

$10^{6*1} - 1$<br>
$1\,000\,000 - 1 = 999\,999 = 7 * 142\,857$

Due to the established validity of $\mathrm{IV}$

$1000 \equiv 10^{(2*n + 1) * 3} \pmod{7}$

which states, that all powers of ten that are an odd multiple of three, starting from $10^3$ have the same remainder when divided by $7$ as $1000$ has, which is $6$. From this follows, that

$\mathrm{VI}$: $7 \mid 10^{(2*n + 1) * 3} + 1$ for $n \in \mathbb N_0$

From $\mathrm{V}$ follows

$\mathrm{VII}$: $7 \mid 10^{6*n} - 1$

Let the groups of three digits each, $a_n$, represent any number. Let's assume that $n$ is even, as the opposite is analogous and not necessary to be shown.

$a_0 * 10^0 + a_1 * 10^3 + a_2 * 10^6 + a_3 * 10^9 \dotsm + a_n * 10^{3*n}$<br>
$a_0 * 10^0 + a_1 * ([10^3 + 1] - 1) + a_2 * ([10^6 - 1] + 1) + a_3 * ([10^9 + 1] - 1) \dotsm + a_n * ([10^{3*n} - 1] + 1)$<br>
$a_0 * 1 + a_1 * [10^3 + 1] - a_1 + a_2 * [10^6 - 1] + a_2 + a_3 * [10^9 + 1] - a_3 \dotsm + a_n * [10^{3*n} - 1] + a_n$<br>

The divisibility of all square bracketed terms is ensured by $\mathrm{VI}$ and $\mathrm{VII}$. Let's separate the above into terms of ensured divisibility and terms that are left to be checked.

$a_0 - a_1 + a_2 - a_3 + \dotsm + a_n + [a_1 * (10^3 + 1) + a_2 * (10^6 - 1) + a_3 * (10^9 + 1) \dotsm + a_n * (10^{3*n} - 1)]$<br>

The term within square brackets is now a sum of terms that are each divisible by $7$, and it itself is thus divisible by $7$. What's left is the sum of the original number's groups of three digits each, with alternating signs, where the last group starts out with a positive sign.

**A number is divisible by seven if the sum of its pairs of digits with size three and with alternating signs, starting positive at the last group, is divisible by 7.**

### Divisibility By 8

Since $8 = 2 * 2 * 2 = 2^3$, a number is only divisible by eight if it has $2^3$ as a prime factor. Due to $10 = 2 * 5$, for each power of ten, an additional prime factor of $2$ enters the scene. So, all numbers $\ge 10^3$ are divisible by eight, as they're multiples of a thousand. So the only part of the number that may fail divisibility by eight is its ones-, tens- and hundreds place.

**A number is divisible by eight if the number represented by its last three digits is divisible by eight.**

### Divisibility By 10

Since $10 \mid 10 \Rightarrow 10 \mid 10^n$ for $n \in \mathbb N_{> 0}$, so the only part of the number that may fail divisibility by ten is its ones place, which ranges from zero to nine, of which only $0$ is evenly divisible by $10$.

**A number is divisible by ten if its last digit is zero.**

### Divisibility By 11

(This derivation is very much analogous to [Divisibility By 7](#divisibility-by-7)).

Let $m, n \in \mathbb{N_0}$. Since $9 * 11 = 99 \Rightarrow 11 \mid 99$, so

$\mathrm{I}$: $11 \mid 10^n * 99$

Further,

$\mathrm{II}$: $11 \mid \displaystyle \sum_{k=0}^{n} 10^{2*k} * 99$

because each summand is divisible by $11$ (see $\mathrm{I}$), so the sum is also divisible by $11$. The expression above depicts numbers with only nines as their digits, that are of even lengths (2, 4, 6, 8, ...).

Due to $\mathrm{I}$, the following is also true:

$\mathrm{III}$: $11 \mid 10^m * \displaystyle \sum_{k=0}^{n} 10^{2*k} * 99$

The expression above depicts numbers, starting with an even number of nines and an arbitrary amount of trailing zeroes.

$1000 \bmod 11 = 10$ since $90 * 11 = 990$ and $1000 - 990 = 10$ and $10 \lt 11$. To find all powers of ten which cause a remainder of $10$ when dividing with $11$, the following congruence equation can be considered.

Let $x \in \mathbb{N_0}$, then

$1000 \equiv 1000 + 11*x \pmod{11}$

The above is true, as only multiples of $11$ are added to the number. Let's look at two examples.

$100\,000 \bmod 11 = 10$ since

$1000 + 11*x = 100\,000$<br>
$11*x = 99\,000$<br>
$x = 9000$

$10\,000\,000 \bmod 11 = 10$ since

$1000 + 11*x = 10\,000\,000$<br>
$11*x = 9\,999\,000$<br>
$x = 909\,000$

Due to $1000 = 10^3$, $100\,000 = 10^5$ and $10\,000\,000 = 10^7$, it looks like the following should be true

$\mathrm{IV}$: $1000 + 11*x = 10^{3 + 2*n}$<br>
$10^3 + 11*x = 10^3 * 10^{2*n}$<br>
$11*x = 10^3 * 10^{2*n} - 10^3$<br>
$11*x = 10^3 * (10^{2*n} - 1)$

If it can now be shown, that

$\mathrm{V}$: $10^{2*n} - 1$

is evenly divisible by $11$, then $\forall\,x\,\exists!\,n$, so that $\mathrm{IV}$ is satisfied.

Let's take a look at the first four elements of both $\mathrm{II}$

$n = 0$: $99$<br>
$n = 1$: $99\,99$<br>
$n = 2$: $99\,99\,99$<br>
$n = 3$: $99\,99\,99\,99$

and $\mathrm{V}$

$n = 0$: $0$<br>
$n = 1$: $99$<br>
$n = 2$: $99\,99$<br>
$n = 3$: $99\,99\,99$

I now claim, that

$\displaystyle \sum_{k=0}^{n} 10^{2*k} * 99 = 10^{2*(n + 1)} - 1$

which can be shown as follows

$(10^0 * 99) + (10^2 * 99) + (10^4 * 99) + \dotsm + (10^{2*n} * 99)$<br>
$(10^0 * (100 - 1)) + (10^2 * (100 - 1)) + (10^4 * (100 - 1)) + \dotsm + (10^{2*n} * (100 - 1))$<br>
$(10^0 * (10^2 - 1)) + (10^2 * (10^2 - 1)) + (10^4 * (10^2 - 1)) + \dotsm + (10^{2*n} * (10^2 - 1))$<br>
$(10^0 * 10^2 - 10^0) + (10^2 * 10^2 - 10^2) + (10^4 * 10^2 - 10^4) + \dotsm + (10^{2*n} * 10^2 - 10^{2*n})$<br>
$(10^{0 + 2} - 10^0) + (10^{2 + 2} - 10^2) + (10^{4 + 2} - 10^4) + \dotsm + (10^{2*n + 2} - 10^{2*n})$<br>
$(10^2 - 10^0) + (10^4 - 10^2) + (10^6 - 10^4) + \dotsm + (10^{2*n + 2} - 10^{2*n})$

It now becomes apparent that the first term within each pair of parentheses is cancelled out by the second term of its successor, as follows:

$(\cancel{10^2} - 10^0) + (10^4 - \cancel{10^2}) + (10^6 - 10^4) + \dotsm + (10^{2*n + 2} - 10^{2*n})$<br>
$(-10^0) + (\cancel{10^4}) + (10^6 - \cancel{10^4}) + \dotsm + (10^{2*n + 2} - 10^{2*n})$<br>
$(-10^0) + (\cancel{10^6}) + \dotsm + (10^{2*n + 2} - \cancel{10^{2*n}})$<br>
$(-10^0) + (10^{2*n + 2})$<br>
$10^{2*n + 2} - 1$<br>
$10^{2*(n + 1)} - 1$

So, $\mathrm{V}$ is now proven to be divisible by $11$, just not for the base-case of $n = 1$, which is trivial:

$10^{2*1} - 1$<br>
$100 - 1 = 99 = 11 * 9$

Due to the established validity of $\mathrm{IV}$

$1000 \equiv 10^{3 + 2*n} \pmod{11}$

which states, that all odd powers of ten, starting from $10^3$ have the same remainder when divided by $11$ as $1000$ has, which is $10$. From this follows, that

$\mathrm{VI}$: $11 \mid 10^{3 + 2*n} + 1$ for $n \in \mathbb N_0$

From $\mathrm{V}$ follows

$\mathrm{VII}$: $11 \mid 10^{2*n} - 1$

Let the digits $a_n$ represent any number. Let's assume that $n$ is even, as the opposite is analogous and not necessary to be shown.

$a_0 * 10^0 + a_1 * 10^1 + a_2 * 10^2 + a_3 * 10^3 \dotsm + a_n * 10^n$<br>
$a_0 * 1 + a_1 * ([11] - 1) + a_2 * ([10^2 - 1] + 1) + a_3 * ([10^3 + 1] - 1) \dotsm + a_n * ([10^n - 1] + 1)$<br>
$a_0 * 1 + a_1 * [11] - a_1 + a_2 * [10^2 - 1] + a_2 + a_3 * [10^3 + 1] - a_3 \dotsm + a_n * [10^n - 1] + a_n$

While it is obvious, that $11 \mid 11$, the divisibility of all remaining square bracketed terms is ensured by $\mathrm{VI}$ and $\mathrm{VII}$. Let's separate the above into terms of ensured divisibility and terms that are left to be checked.

$a_0 - a_1 + a_2 - a_3 + \dotsm + a_n + [a_1 * 11 + a_2 * (10^2 - 1) + a_3 * (10^3 + 1) + \dotsm + a_n * (10^n - 1)]$

The term within square brackets is now a sum of terms that are each divisible by $11$, and it itself is thus divisible by $11$. What's left is the sum of the original number's digits with alternating signs, where the last digit starts out with a positive sign.

**A number is divisible by eleven if the sum of its digits with alternating signs, starting positive at the last digit, is divisible by 11.**

## Expression Rules

### Three Consecutive Cubes Sum

The sum of three consecutive natural numbers, each raised to the third power, will always be divisible by three and nine.

Let $x \in \mathbb{N}$, then

$\mathrm{I}$: $s = x^3 + (x + 1)^3 + (x + 2)^3$

so that

$\mathrm{II}$: $9 \mid s \Rightarrow 3 \mid s$.

$s = x^3 + (x + 1)^3 + (x + 2)^3$<br>
$s = x^3 + x^3 + 3*x^2 + 3*x + 1 + x^3 + 3*x^2*2 + 3*x^2*2^2 + 2^3$<br>
$s = x^3 + x^3 + 3*x^2 + 3*x + 1 + x^3 + 6*x^2 + 12*x + 8$<br>
$s = 3 * x^3 + 9*x^2 + 15*x + 9$<br>
$s = 9 + 9*x^2 + 3 * x^3 + 15*x$<br>
$s = 9 * (1 + x^2) + 3 * x^3 + 15*x$

$s$ is divisible by $9$ if and only if each summand is divisible by $9$. What remains to be analyzed is as follows:

$\mathrm{III}$: $3*x^3 + 15*x$

By checking a few cases manually, it becomes apparent that this term is also divisible by nine.

$x = 1$: $3 * 1^3 + 15*1 = 3 + 15 = 18$, $9 \mid 18$<br>
$x = 2$: $3 * 2^3 + 15*2 = 24 + 30 = 54$, $9 \mid 54$<br>
$x = 3$: $3 * 3^3 + 15*3 = 81 + 45 = 126$, $9 \mid 126$

Thus follows, that $\exists x \in \mathbb{N}: 9 \mid \mathrm{III}(x)$. I claim that if $\mathrm{III}$ holds for one $x$, then it will also hold for $x + 1$:

$3 * (x + 1)^3 + 15*(x + 1)$<br>
$3 * (x^3 + 3*x^2 + 3*x + 1) + 15*x + 15$<br>
$3*x^3 + 3*3*x^2 + 3*3*x + 3 + 15*x + 15$<br>
$3*x^3 + 9*x^2 + 9*x + 15*x + 18$<br>
$[3*x^3 + 15*x] + 9*(x^2 + x + 2)$

The square-bracketed term now represents the induction assumption, while the remaining three terms are divisible by nine since nine can be factored out.

$(\mathrm{III}(x_0) \land (\mathrm{III}(x) \Rightarrow \mathrm{III}(x + 1))) \Rightarrow \forall x \in \mathbb{N}: \mathrm{III}(n)$

Thus, $\mathrm{II}$ has been proven. There is another way to argue the divisibility of $s$ by nine, which is as follows:

Since three consecutive numbers are raised to the third power, one of them will always be a multiple of three, which then contains 9 as a factor after having been cubed.

$x = 1$: $(1^3, 2^3, \circled{3}^3)$<br>
$x = 2$: $(2^3, \circled{3}^3, 4^3)$<br>
$x = 3$: $(\circled{3}^3, 4^3, 5^3)$<br>
$x = 4$: $(4^3, 5^3, \circled{6}^3)$<br>
$x = 5$: $(5^3, \circled{6}^3, 7^3)$<br>
$x = 6$: $(\circled{6}^3, 7^3, 8^3)$

It becomes apparent, that while one of the three numbers, call it $a$, will always be divisible by three, and thus its cube by nine, two won't. There are three cases to consider. Let's go through the full reasoning on the first:

$(a - 2)^3 + (a - 1)^3$<br>
$(a^3 + 3*a^2*(-2) + 3*a*(-2)^2 + (-2)^3) + (a^3 + 3*a^2*(-1) + 3*a*(-1)^2 + (-1)^3)$<br>
$(a^3 - 6*a^2 + 12*a - 8) + (a^3 - 3*a^2 + 3*a - 1)$<br>
$2*a^3 - 9*a^2 + 15*a - 8 - 1$

Since $a$ is a multiple of three, all terms which are raised to a power $\ge 2$ are thereby divisible by nine. $15 = 3 * 5$, so $9 \mid 15*a$. Stated differently, due to the binomial coefficents of $(1, 3, 3, 1)$, all terms of $a$ will always be divisible by nine, as the only occurence of $a^1$ is multiplied by three. What remains, is as follows:

$(-8) + (-1) = -9$

The remainder of the first term and that of the second complement each other in such a way that the total remainder will be divisible by nine again. While this remainder comes out as negative, it will just lessen or cancel out other terms of $a$ by a multiple of nine, and thereby keep the remainder unchanged, at zero.

The last two cases can be argued analogously, in fast-forward mode:

$(a - 1)^3 + (a + 1)^3$<br>
$(-1) + (1) = 0$

$(a + 1)^3 + (a + 2)^3$<br>
$(1) + (8) = 9$

Again, $\mathrm{II}$ has been proven.