Archimedes was already aware of the fact that the ratio of a circle's circumference to it's diameter was a constant, nowadays broadly known as Pi ($\pi$).

## Table Of Contents {: #toc }

## First Step

All that's required to perform this approximation is basic geometric knowledge, Pythagoras' Theorem (which already existed since many decades at this point) as well as the ability to perform the square root operation. Said operation is the most tedious part, especially if you have to execute it manually, due to the lack of calculating machinery.

The idea is to inscribe a polygon into the circle, so that it's vertices lie on the circumference. The sum of the length of all it's edges then approximates the circumference. By choosing a six-sided polygon as the base, which is made up of equilateral triangles, the side-length is exactly equal to the radius of the circle.

To construct this polygon, a circle is drawn using a pair of compasses. Using the exact same choice of a radius, one point on the circumference is chosen, from which this distance is drawn in to cross the circumference. This step is repeated six times in total. Connecting these intersection points then yields a six-sided polygon. While I was at it, I also drew the diagonals and named all sides and angles of one of the triangles.

<img src="/assets/images/archimedes_pi_approximation__1.jpg" class="half-width-image"/>

The circumference of the polygon can be calculated as follows:

$C = 6 * r$

While the diameter of the circle is - of cource - twice it's radius:

$d = 2*r$

With this in mind, the first approximation of $\pi$ can be calculated:

$\pi \approx \frac{6*r}{2*r}$

For all further steps, $r = 1$, thus $\pi \approx \frac{6*1}{2*1} \approx 3$. That's the first approximation, using only a six-sided polygon.

## Doubling Sides

To improve the approximation, the number of sides needs to be increased. The only way of doing this without any prior knowledge is to turn each side into two sides, effectively duplicating the number of sides. Let's zoom in on one of the equilateral triangles and see what's known and what's to be figured out:

<img src="/assets/images/archimedes_pi_approximation__2.jpg" class="half-width-image"/>

In oder to avoid confusion, the side along the circumference has been renamed from $r$ to $a$, where $a = r$. A line starting at the center of $a$ and going to the center of the circle has also been added, called $h_a$. It divides $a$ in half and creates two new triangles. The two new sides which appear if $n$ (the number of sides of the original polygon) is doubled, have also been drawn in already. Their length is $a'$ (spoken a prime), and their height is $h'$.

To figure out how long $a'$ is, it is required to calculate $h'$. These relations are certain:

$\mathrm{I}$: $h_a + h' = r$<br>
$\mathrm{II}$: $h_a^2 + (\frac{a}{2})^2 = r^2$<br>
$\mathrm{III}$: $a'^2 = h'^2 + (\frac{a}{2})^2$

Let's solve $\mathrm{II}$ for $h$ first, as all required parameters are known:

$h_a^2 + (\frac{a}{2})^2 = r^2$<br>
$h_a^2 = r^2 - (\frac{a}{2})^2$<br>
$h_a^2 = r^2 - \frac{a^2}{4}$<br>
$h_a = \sqrt{r^2 - \frac{a^2}{4}}$

Substitute this result into $\mathrm{I}$ to retrieve $h'$:

$h_a + h' = r$<br>
$h' = r - h_a$<br>
$h' = r - \sqrt{r^2 - \frac{a^2}{4}}$

Since $r = 1$:

$\mathrm{IV}$: $h' = 1 - \sqrt{1 - \frac{a^2}{4}}$

Now, $a'$ is known by substituting $\mathrm{IV}$ into $\mathrm{III}$:

$a'^2 = h'^2 + (\frac{a}{2})^2$<br>
$a' = \sqrt{h'^2 + (\frac{a}{2})^2}$<br>
$a' = \sqrt{(1 - \sqrt{1 - \frac{a^2}{4}})^2 + \frac{a^2}{4}}$<br>
$a' = \sqrt{1 - 2*\sqrt{1 - \frac{a^2}{4}} + (1 - \frac{a^2}{4}) + \frac{a^2}{4}}$<br>
$a' = \sqrt{2 - 2*\sqrt{1 - \frac{a^2}{4}}}$<br>

This looks like the final result, but there's still more cleanup that can be done:

$a' = \sqrt{2 - 2*\sqrt{\frac{4 - a^2}{4}}}$<br>
$a' = \sqrt{2 - 2*\frac{\sqrt{4 - a^2}}{2}}$<br>
$a' = \sqrt{2 - \sqrt{4 - a^2}}$<br>

Let's calculate $a'$ based on $a = r = 1$:

$a' = \sqrt{2 - \sqrt{4 - 1^2}}$<br>
$a' = \sqrt{2 - \sqrt{3}}$<br>
$a' \approx 0.517638 \Rightarrow C = 12*a' = 6.211657$

$\pi \approx \frac{C}{2*r} \approx 3.105829$

The first digit after the decimal point is now correct, so progress is being made!

## Doubling Again

<img src="/assets/images/archimedes_pi_approximation__3.jpg" class="half-width-image"/>

The sides are yet again to be doubled, so that each of $a'$ gets two new members attached, called $a''$. For simplicity, this change has only been drawn once. The height $h_{a'}$ now goes from the center of the circle to $a'$, while $h''$ marks the height of the added triangles.

Again, the following relations are known:

$\mathrm{V}$: $h_{a'} + h'' = r$<br>
$\mathrm{VI}$: $h_{a'}^2 + (\frac{a'}{2})^2 = r^2$<br>
$\mathrm{VII}$: $h''^2 + (\frac{a'}{2})^2 = a''^2$<br>

Since $a'$ is known from the previous result, $h''$ is to be figured out next in order to calculate the new 24-sided polygon's side-length. First, $ha'$ is required to substitute into $\mathrm{V}$ later on, so let's solve $\mathrm{VI}$

$h_{a'}^2 + (\frac{a'}{2})^2 = r^2$<br>
$h_{a'}^2 = r^2 - (\frac{a'}{2})^2$<br>
$h_{a'} = \sqrt{r^2 - (\frac{a'}{2})^2}$<br>
$h_{a'} = \sqrt{1 - (\frac{\sqrt{2 - \sqrt{3}}}{2})^2}$<br>
$h_{a'} = \sqrt{1 - \frac{2 - \sqrt{3}}{4}}$<br>

Substituting this value into $\mathrm{V}$:

$h_{a'} + h'' = r$<br>
$h'' = r - h_{a'}$<br>
$h'' = r - \sqrt{1 - \frac{2 - \sqrt{3}}{4}}$<br>
$h'' = 1 - \sqrt{1 - \frac{2 - \sqrt{3}}{4}}$<br>

Now that $h''$ is resolved, $a''$ can be calculated using $\mathrm{VII}$:

$a''^2 = h''^2 + (\frac{a'}{2})^2$<br>
$a''^2 = (1 - \sqrt{1 - \frac{2 - \sqrt{3}}{4}})^2 + (\frac{\sqrt{2 - \sqrt{3}}}{2})^2$<br>
$a''^2 = 1 - 2*\sqrt{1 - \frac{2 - \sqrt{3}}{4}} + 1 - \frac{2 - \sqrt{3}}{4} + \frac{2 - \sqrt{3}}{4}$<br>
$a''^2 = 2 - 2*\sqrt{1 - \frac{2 - \sqrt{3}}{4}}$<br>
$a''^2 = 2 - 2*\sqrt{\frac{4 - (2 - \sqrt{3})}{4}}$<br>
$a''^2 = 2 - 2*\sqrt{\frac{2 + \sqrt{3}}{4}}$<br>
$a''^2 = 2 - 2*\frac{\sqrt{2 + \sqrt{3}}}{2}$<br>
$a''^2 = 2 - \sqrt{2 + \sqrt{3}}$<br>
$a'' = \sqrt{2 - \sqrt{2 + \sqrt{3}}}$<br>
$a'' \approx 0.261052 \Rightarrow C = 24*a'' = 6.265257$<br>

$\pi \approx \frac{C}{2*r} \approx 3.132629$

The second digit is just about approaching correctness, but it's not quite there yet.

## Recognizing A Pattern

In order to arrive at a result that's good enough for most computations, there would be many cycles of doubling sides ahead. To save on time and effort, it's necessary to extract a pattern out of the previous calculations.

Each level of $a$ is always calculated by making use of it's triangle's height $h$:

$a_{next} = \sqrt{h_{next}^2 + (\frac{a_{prev}}{2})^2}$

While $h$ progresses as follows (see $\mathrm{IV}$):

$h_{next} = 1 - \sqrt{1 - \frac{a_{prev}^2}{4}}$

Substituting $h_{next}$ into $a_{next}$'s equation:

$a_{next} = \sqrt{(1 - \sqrt{1 - \frac{a_{prev}^2}{4}})^2 + (\frac{a_{prev}}{2})^2}$<br>
$a_{next} = \sqrt{(1 - \sqrt{1 - \frac{a_{prev}^2}{4}})^2 + \frac{a_{prev}^2}{4}}$<br>
$a_{next} = \sqrt{1 - 2*\sqrt{1 - \frac{a_{prev}^2}{4}} + (1 - \frac{a_{prev}^2}{4}) + \frac{a_{prev}^2}{4}}$<br>
$a_{next} = \sqrt{2 - 2*\sqrt{1 - \frac{a_{prev}^2}{4}}}$<br>
$a_{next} = \sqrt{2 - 2*\sqrt{\frac{4 - a_{prev}^2}{4}}}$<br>
$a_{next} = \sqrt{2 - 2*\frac{\sqrt{4 - a_{prev}^2}}{2}}$<br>
$a_{next} = \sqrt{2 - \sqrt{4 - a_{prev}^2}}$<br>

The initial $a$ was just equal to $r$, which is how $a'$ is quickly determined again:

$a' = \sqrt{2 - \sqrt{4 - 1^2}}$<br>
$a' = \sqrt{2 - \sqrt{3}}$<br>

Now, to go to $a''$, just substitute in $a'$ as $a_{prev}$ and solve:

$a'' = \sqrt{2 - \sqrt{4 - (\sqrt{2 - \sqrt{3}})^2}}$<br>
$a'' = \sqrt{2 - \sqrt{4 - (2 - \sqrt{3})}}$<br>
$a'' = \sqrt{2 - \sqrt{2 + \sqrt{3}}}$<br>

That was **a lot** quicker than having to go through all of those intermediate equations! Let's solve for $a'''$:

$a''' = \sqrt{2 - \sqrt{4 - (\sqrt{2 - \sqrt{2 + \sqrt{3}}})^2}}$<br>
$a''' = \sqrt{2 - \sqrt{4 - (2 - \sqrt{2 + \sqrt{3}})}}$<br>
$a''' = \sqrt{2 - \sqrt{2 + \sqrt{2 + \sqrt{3}}}}$<br>
$a''' \approx 0.130806 \Rightarrow C = 48*a''' = 6.278700$

$\pi \approx \frac{C}{2*r} \approx 3.139350$

And - just because that was so quick, solve for $a^{(4)}$ too:

$a^{(4)} = \sqrt{2 - \sqrt{4 - (\sqrt{2 - \sqrt{2 + \sqrt{2 + \sqrt{3}}}})^2}}$<br>
$a^{(4)} = \sqrt{2 - \sqrt{4 - (2 - \sqrt{2 + \sqrt{2 + \sqrt{3}}})}}$<br>
$a^{(4)} = \sqrt{2 - \sqrt{2 + \sqrt{2 + \sqrt{2 + \sqrt{3}}}}}$<br>

$a^{(4)} \approx 0.65438 \Rightarrow C = 96*a''' = 6.282064$

$\pi \approx \frac{C}{2*r} \approx 3.141032$

Finally, the first three digits after the decimal point are correct digits of the official $\pi$ now!

## Recursive Algorithm

This is the required information needed to calculate any precision of $\pi$:

$a^{(0)} = 1$<br>
$a_{next} = \sqrt{2 - \sqrt{4 - a_{prev}^2}}$<br>
$C_n = 6 * 2^n * a^{(n)}$<br>
$\pi \approx \frac{C_n}{2}$

An example of the 5th level precision would be:

$a^{(5)} = \sqrt{2 - \sqrt{4 - (\sqrt{2 - \sqrt{2 + \sqrt{2 + \sqrt{2 + \sqrt{3}}}}})^2}}$<br>
$a^{(5)} = \sqrt{2 - \sqrt{4 - (2 - \sqrt{2 + \sqrt{2 + \sqrt{2 + \sqrt{3}}}})}}$<br>
$a^{(5)} = \sqrt{2 - \sqrt{2 + \sqrt{2 + \sqrt{2 + \sqrt{2 + \sqrt{3}}}}}}$<br>
$a^{(5)} \approx 0.032723$<br>

$C_5 = 6 * 2^5 * a^{(5)}$<br>
$C_5 = 6 * 2^5 * 0.032723$<br>
$C_5 = 6.282905$<br>

$\pi \approx \frac{C_5}{2} = 3.141452$

## Python Script

This concise python script calculates any levels of precision using the recursive formula while printing the results of each stage. The use of `Decimal` is important, as the floats otherwise drift off over time.

```python
import math
from decimal import Decimal

def a_next(a_prev: Decimal) -> Decimal:
  return (Decimal(2) - (Decimal(4) - a_prev * a_prev).sqrt()).sqrt()

def calculate_pi(a: Decimal, k: int) -> Decimal:
  return (Decimal(6) * a * Decimal(math.pow(2, k))) / Decimal(2)

def main():
  a_prev = Decimal(1)
  n = 6
  highest_level = 20

  for k in range(highest_level + 1):
    print(f'{k:02}\t{a_prev:.15f}\t{n}\t{calculate_pi(a_prev, k):.15f}')
    a_prev = a_next(a_prev)
    n *= 2

  print(f'\nPi is actually: {math.pi:.15f}')

if __name__ == '__main__':
  main()
```

This is what calculating up to 20 levels of precision looks like. The final value is correct until (including) the 12th place after the decimal point.

```text
00   1.000000000000000   6         3.000000000000000
01   0.517638090205042   12        3.105828541230249
02   0.261052384440103   24        3.132628613281238
03   0.130806258460286   48        3.139350203046867
04   0.065438165643552   96        3.141031950890510
05   0.032723463252974   192       3.141452472285462
06   0.016362279207874   384       3.141557607911858
07   0.008181208052470   768       3.141583892148318
08   0.004090612582328   1536      3.141590463228050
09   0.002045307360677   3072      3.141592105999272
10   0.001022653814027   6144      3.141592516692157
11   0.000511326923725   12288     3.141592619365384
12   0.000255663463951   24576     3.141592645033691
13   0.000127831732237   49152     3.141592651450768
14   0.000063915866151   98304     3.141592653055037
15   0.000031957933080   196608    3.141592653456104
16   0.000015978966540   393216    3.141592653556371
17   0.000007989483270   786432    3.141592653581438
18   0.000003994741635   1572864   3.141592653587704
19   0.000001997370818   3145728   3.141592653589271
20   0.000000998685409   6291456   3.141592653589662

Pi is actually: 3.141592653589793
```

Twenty levels could also be achieved while calculating sqare roots by hand, even in Archimedes' days, if one was determined. The result is - in my humble opinion - good enough for most calculations one will ever stumble accross.