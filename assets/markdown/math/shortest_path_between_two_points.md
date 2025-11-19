The shortest path between two points, $P_1$ and $P_2$ is a straight line $\overline{P_1P_2}$.

<img src="/assets/images/shortest_path_between_two_points__1.jpg" class="third-width-image"/>

The base case of this statement is made up by two lines, passing through a third point $A$, so that $\triangle{P_1P_2A}$ is formed.

<img src="/assets/images/shortest_path_between_two_points__2.jpg" class="third-width-image"/>

As described in [Triangle Side Length Inequality](/math/triangles#generic-triangle_side-length-inequality), $\overline{P_1A} + \overline{P_2A} > \overline{P_1P_2}$. Any other path, no matter how complicated, can be described by an arbitrarily high number of straight lines. For the following visualization, a circular arc is being used, to keep the scene as clean as possible.

<img src="/assets/images/shortest_path_between_two_points__3.jpg" class="third-width-image"/>

This time, the main distance is $\overline{P_1P_n}$, while $P_2 \dotsm P_{n - 1}$ are other points on the curve, inbetween the beginning and the end. Let's look at a concrete example of $n = 7$.

<img src="/assets/images/shortest_path_between_two_points__4.gif" class="third-width-image"/>

$\overline{P_1P_2P_3P_4P_5P_7} < \overline{P_1P_2P_3P_4P_5P_6P_7}$, since $\overline{P_5P_6} + \overline{P_6P_7} > \overline{P_5P_7}$<br>
$\overline{P_1P_2P_3P_4P_7} < \overline{P_1P_2P_3P_4P_5P_7}$, since $\overline{P_4P_5} + \overline{P_5P_7} > \overline{P_4P_7}$<br>
$\overline{P_1P_2P_3P_7} < \overline{P_1P_2P_3P_4P_7}$, since $\overline{P_3P_4} + \overline{P_4P_7} > \overline{P_3P_7}$<br>
$\overline{P_1P_2P_7} < \overline{P_1P_2P_3P_7}$, since $\overline{P_2P_3} + \overline{P_3P_7} > \overline{P_2P_7}$<br>
$\overline{P_1P_7} < \overline{P_1P_2P_7}$, since $\overline{P_1P_2} + \overline{P_2P_7} > \overline{P_1P_7}$

$\Rightarrow \overline{P_1P_7} < \overline{P_1P_2P_3P_4P_5P_6P_7}$

More generally formulated, it can be said, that

$\overline{P_1 \dotsm P_kP_7} < \overline{P_1 \dotsm P_{k + 1}P_7}$, where $k \in [1;n - 1]$, because $\triangle{P_kP_{k+1}P_7}$ ensures, that $\overline{P_kP_7} < \overline{P_kP_{k + 1}} + \overline{P_{k + 1}P7}$.

It may help to think about a line, starting from $P_n$ that iterates over $P_{n - 1} \dotsm P_1$, each time becoming shorter than the curve until the point it connects to, as this side of the triangle is shorter than the previous line segment plus the predecessor's shortest side. By continuing this journey, one will eventually end up at $P_1$, with the shortest possible line, $\overline{P_1P_n}$.

<img src="/assets/images/shortest_path_between_two_points__5.jpg" class="third-width-image"/>