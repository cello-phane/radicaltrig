This page is currently a **work in progress**, as I'm still figuring out how to properly present mathematical scenes to visualize crucial steps within this proof. A visual derivation alone will not be enough in my book, even if many people, including teachers, are already satisfied with this simple observation. I'm planning on showing, step by step, how Archimedes himself proved the area of a circle rigorously, by the method of exhaustion.

## Table Of Contents {: #toc }

## Visual Derivation

There has to be a simple and intuitive visual derivation of the formula for a circle's surface area, since people were calculating it's measure long before Archimedes was even born.

By cutting a circle up into any number of slices, starting at $n = 3$ (as two half-circles are not arrangable in any other way than the original circle already was in), these slices can be aligned at their radii - at the cut edges.

In order to counteract the skewed vertical edges on the outside, one slice can be cut in half again, with one half being aligned at the beginning- and the other at the end of the sequence of slices.

With as little as $n = 10$ slices, it becomes obvious that the height of the rectangle approaches the radius $r$ of the circle, while it's width approaches half of the circle's circumference $C$, since half of the slices are facing upwards, and the other half is facing downwards.

The area of the rectangle approximates the area of the circle as $n$ increases, so

$A \approx A_{\rectangle}$<br>
$A \approx r * \frac{C}{2}$<br>
$A \approx r * \frac{2 * \pi * r}{2}$<br>
$A \approx r * \pi * r$<br>
$A \approx \pi * r^2$

Without knowing about the [approximation of pi](/math/archimedes-pi-approximation), approximating the area of a circle would still be possible, by measuring it's circumference with a string and a ruler.

<canvas class="half-width-canvas" script="/assets/scripts/circle_area_graphical_approach.class.js"></canvas>