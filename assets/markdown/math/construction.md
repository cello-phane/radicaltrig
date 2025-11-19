This page tries to summarize knowledge about how to geometrically construct using only a straight edge and a compass.

INFO: In general, it is not recommended to draw out the full circles, as they tend to clutter the scene beyond readability. For these examples, though, the circles are drawn fully by intention, in order to visualize what's really going on.

## Table Of Contents {: #toc }

## Rules

The rules of construction naturally arose from Euclid's first book of *The Elements*, where the first three postulates are as follows:

1. To draw a straight line from any point to any point.
2. To produce a finite straight line continously in a straight line.
3. To describe a circle with any center and distance.

Points are the first elements that enter the scene, where one point can act as the center-point of a circle and two points define a line. Intersection points between lines and circles then yield new points onto which more lines and circles may be constructed.

## Center-Point Of A Line

Let there be a line $\overline{AB}$ of any length. To find it's centerpoint $M$, the compass is set to span any distance greater than $\frac{\overline{AB}}{2}$, with which two circles, one at $A$ and one at $B$ are drawn. They will form two points of intersection, $C$ and $D$. The line $\overline{DC}$ will intersect the line $\overline{AB}$ in it's exact midpoint $M$, while also being perpendicular to it.

<img src="/assets/images/construction__1.jpg" class="half-width-image"/>

When considering the radius of the two circles with centers $A$ and $B$, they can be categorized into three cases:

<img src="/assets/images/construction__2.jpg" class="half-width-image"/>

- $r_1$: The radius is less than $\frac{\overline{AB}}{2}$ and the circles won't meet. One needs to try again with an increased radius.

- $r_2$: The radius is greater than $\frac{\overline{AB}}{2}$ but less than $\overline{AB}$. The circles will meet, and their radius is as small as possible.

- $r_3$: The radius is greater than $\overline{AB}$. The circles will meet, but their radius is needlessly large.

The reason for why $\overline{CD}$ will not only always intersect $\overline{AB}$ in it's midpoint, but is also perpendicular to it, is the presence of $\triangle{ABC}$ and $\triangle{ADB}$, which are isosceles triangles. A key property of an isosceles triangle is that the point where it's two short sides meet is exactly above the center point of it's hypothenuse. Due to the symmetry about $\overline{AB}$, a line through $\overline{CD}$ will thus not only contain both heights $h_C$ and $h_D$ and by this be perpendicular to the hypothenuse $\overline{AB}$, but also intersect it at it's exact midpoint.

<img src="/assets/images/construction__3.jpg" class="half-width-image"/>

## Dropping A Perpendicular

Let there be a line $\overline{AB}$, as well as a point $P$, from which a perpendicular is to be dropped onto the line $\overline{AB}$. Start by setting the compass to span a distance which is greater than the distance between $P$ and $\overline{AB}$, so that two new points of intersection are formed: $C$ and $D$. If the distance has been chosen too small, the circle won't intersect with the line. Do not alter the compass and draw two new circles at the points $C$ and $D$. These two new circles will intersect in two points, where one of them will be $P$ and the other $E$. The line $\overline{EP}$ will be perpendicular to the line $\overline{AB}$ and goes through point $P$, as desired.

<img src="/assets/images/construction__4.jpg" class="half-width-image"/>

The isosceles triangle $\triangle{CDP}$ ensures that $P$ lies exactly above the centerpoint of it's hypothenuse $\overline{CD}$. By not altering the compass and drawing two new circles with midpoints $C$ and $D$, the point $P$ is mirrored about the line $\overline{AB}$, to make $E$. This process is very similar to finding the [Center-Point Of A Line](#center-point-of-a-line), just that we don't use $A$ and $B$, but rather $C$ and $D$, to make the perpendicular line go through $P$.

## Erecting A Perpendicular

Let there be a line $\overline{AB}$, as well as a point $P$ on said line, onto which a perpendicular is to be errected. Start by setting the compass to span a distance that's $\le min(\overline{AP}, \overline{PB})$ and draw a circle with center $P$. Now, increase this distance by a value significant enough to produce usable intersections between the circles that are about to be drawn. The circle with it's center at $P$ intersects with the line $\overline{AB}$ in exactly two points, which are the centerpoints for these new, bigger circles. Once drawn, they intersect in points $C$ and $D$, which satisfy $\overline{CD} \perp \overline{AB}$.

<img src="/assets/images/construction__5.jpg" class="half-width-image"/>

This process is very similar to [Dropping A Perpendicular](#dropping-a-perpendicular), just that $P$ now lies on $\overline{AB}$.

## Constructing A Parallel Line

Let there be a line $\overline{AB}$, as well as a point $P$ that's not on said line, through which a parallel line, relative to $\overline{AB}$ is to be constructed. Start by setting the compass to span a distance which is greater than the distance between $P$ and $\overline{AB}$, so that two new points of intersection are formed: $C$ and $D$. If the distance has been chosen too small, the circle won't intersect with the line. Draw a line through $P$ and $C$. Do not alter the compass and draw another circle at $C$, to produce the intersection $P'$, which is a mirror of $P$ about $C$ on this line. Draw a line through $P'$ and $D$. Now, set the compass to span the distance $\overline{P'D}$ and draw a circle with it's center at $D$, which produces the intersection $P''$, which is a mirror of $P'$ about $D$ on this line. Connecting $P$ and $P''$ will yield a line that satisfies $\overline{PP''} \parallel \overline{AB}$.

INFO: The points $C$ and $D$ can be at arbitrary positions on the line $\overline{AB}$, all other steps are executed as described. The reason that a circle on $P$ has been chosen is to remove the burden which one more decision attaches to the process.

<img src="/assets/images/construction__6.jpg" class="half-width-image"/>

To reason about why this works, the scene needs to be extended by a few lines to visualize hidden right triangles.

<img src="/assets/images/construction__7.jpg" class="half-width-image"/>

Since $\overline{AB} \parallel \overline{PP''} \Leftrightarrow h_1 = h_2$, the equality of $h_1$ and $h_2$ needs to be assured. Due to the point $P$ being mirrored about $C$ into $P'$, it follows, that $h_3 = h_1$. Due to the point $P'$ being mirrored about $D$ into $P''$, it follows, that $h_2 = h_3$. So, finally, $h_1 = h_2$. The key reason thus is, that both $\overline{P'P}$ and $\overline{P'P''}$ share the common point $P'$, constraining the triangles $\triangle{CH_1P}$ and $\triangle{DH_2P''}$ to have the same height.

## Bisecing An Angle

Let there be two lines, $\overline{OA}$ and $\overline{OB}$, which span an angle $\alpha = \angle{BOA}$. Start by setting the compass to span an arbitrary value greater than zero. Draw a circle with it's origin at $O$. This circle will produce two points of intersection, namely $C$ and $D$. Don't manipulate the compass and draw two more circles with their centers at these new points. The circles with their centers at $C$ and $D$ will intersect twice, once in $O$ and once in a new point, $E$. The line $\overline{OE}$ will now bisect $\alpha$.

<img src="/assets/images/construction__8.jpg" class="half-width-image"/>

Due to $C$ and $D$ lying at equal distances from $O$ on the lines $\overline{OA}$ and $\overline{OB}$ respectively, the circles with centers at $C$ and $D$ and equal radius will meet exactly at half the vertical distance between $A$ and $B$, thus bisecting the angle.

## Trisecing A Right Angle

Let there be two lines, $\overline{OA}$ and $\overline{OB}$, which span a right angle. Start by setting the compass to span an arbitrary value greater than zero. Draw a circle with it's origin at $O$, which produces two points of intersection, namely $C$ and $D$. Don't manipulate the compass and draw two more circles with their centers at these new points. The circles with their centers at $C$ and $D$ will intersect twice each with the circle at origin $O$. Choose the points inside of the spanned angle, $F$ and $E$, and connect them with $O$. The lines $\overline{OF}$ and $\overline{OE}$ will trisect the right angle, producing three new angles of $30°$ each.

<img src="/assets/images/construction__9.jpg" class="half-width-image"/>

Due to $\overline{OD} = \overline{DF} = \overline{OF}$ and $\overline{OC} = \overline{OE} = \overline{EC}$, two [Equilateral Triangles](/math/triangles#equilateral-triangle) emerge, which are not only similar, but also congruent, due to $\overline{OD} = \overline{OC}$.

<img src="/assets/images/construction__10.jpg" class="half-width-image"/>

It thus follows, that $\angle{DOF} = \angle{CEO} = 60°$ Their respective [Complementary Angles](./angles.md#complementary-angles), $\angle{FOC}$ and $\angle{DOE}$ will be equal to $90° - 60° = 30°$. The remaining angle, $\angle{EOF}$ now has to be equal to $30°$ just as well, as it has to sum up to a right angle with the other two supplementary angles.