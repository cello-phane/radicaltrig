## Table Of Contents {: #toc }

## Introduction

The following information has been discovered by John Gabriel; you can find out more about him and his works at the [New Calculus](/math/new-calculus) page, with a direct link to the corresponding article <a href="https://www.academia.edu/109334669/Ancient_Greek_trigonometric_formulas_better_than_anything_ever_known" target="_blank">here</a>. While the main idea behind this approach is to move away from degrees or radians, John hinted at the fact that there's a way to directly map between radians and right-angle units in one of his <a href="https://www.youtube.com/watch?v=B7a3Pq6WYUo" target="_blank">video</a>s, namely at 6:48, as follows:

> Somebody asked me: "is there a formula that can convert radians to ~degrees~ right angle units?". There is, and I'm not sharing it with you. [...] But I'll give you a clue! For any angle in radians, the arc is equal to the angle if the radius is one. [...] You can take a chord of this arc, and your next step [...] is to find the length of that chord. And then [...] there is a way to find the radical angle unit and also the parameter **without any trigonometry** [...].

So, within the unit circle, the arc-length equals the angle in radians. If this value can be related to the chord-length without trigonometry, and the chord-length can be related to the parameter, then the radian-value can be converted to the parameter. **This implies that there are closed-form versions of the mainstream trigonometric functions**, which is why I really want to follow John's clues; my journey will be captured on this site also.

## Formula Derivation

Since trigonometric functions relate similar triangles, there is no need to consider inputs representing angles greater than $90°$ or $\frac{\pi}{4}$, as all other values can be derived by symmetry. Let's start out with a quarter-circle at the origin $O$, its arc resting on $B$ and $C$, with $\overline{OB} = \overline{OC} = 1$ - the unit circle. Line $\overline{OA}$ now spans an angle $\alpha = \angle{BOA}$ in radians.

<img src="/assets/images/ancient_greek_trigonometry__1.jpg" class="half-width-image"/>

A constructed secant through points $B$ and $C$ will be of length $\sqrt{1^2 + 1^2} = \sqrt{2}$ and always intersects with line $\overline{OA}$ in point $D$. This point of section will be unique for each $\alpha$. The ratio $\frac{\overline{BD}}{\overline{BC}}$ will lie within the interval $[0;1]$, thereby assigning a unique value to each input of $\alpha$. This unique value is known as a right angle unit, **RAU**.

<img src="/assets/images/ancient_greek_trigonometry__2.jpg" class="half-width-image"/>

Dropping a perpendicular from point $D$ relative to line $\overline{OB}$ into point $E$ as well as another relative to line $\overline{OC}$ into point $F$ gives rise to four new right-angle triangles.

<img src="/assets/images/ancient_greek_trigonometry__3.jpg" class="half-width-image"/>

It is now claimed that the ratio $\frac{\overline{BD}}{\overline{BC}}$ equals to $\overline{ED}$, that $\overline{ED} = \overline{EB} = \overline{OF}$ and that $\overline{FC} = \overline{FD} = \overline{OE}$, which will be proven shortly. Thereby, the triangles $\triangle{FDC}$ and $\triangle{EBD}$ are isosceles and similar, while $\triangle{OED}$ and $\triangle{ODF}$ are similar.

<img src="/assets/images/ancient_greek_trigonometry__4.jpg" class="half-width-image"/>

Due to the fact that $\overline{OB} = \overline{OC}$, it follows that $\angle{DBO} = \angle{OCB}$. Within the large triangle $\triangle{OBC}$, $\gamma = \frac{\pi}{2}$, since $\alpha + \beta = \frac{\pi}{2}$. Within the two smaller right triangles, $\triangle{FDC}$ and $\triangle{EBD}$, the third angle is bound to be $\pi - \gamma = \frac{\pi}{2} = \gamma$, thus, they are isosceles.

$$
\begin{align*}
\triangle{EBD} \sim \triangle{OBC} &\Rightarrow \frac{\overline{BD}}{\overline{BC}} = \frac{\overline{ED}}{\overline{OC}} \\
&= \frac{\overline{BD}}{\overline{BC}} = \frac{\overline{ED}}{1} \\
&= \frac{\overline{BD}}{\overline{BC}} = \overline{ED}
\end{align*}
$$

The value $\sin(\alpha)$ is defined as opposite over hypothenuse, while $\cos(\alpha)$ is defined as adjacent over hypothenuse, and $\tan(\alpha)$ is defined as opposite over adjacent.

The second short-side of $\triangle{OED}$ can be determined as follows

$$
\begin{align*}
\overline{OE} &= \overline{OB} - \overline{EB} \\
&= 1 - \overline{EB} \\
&= 1 - \overline{ED}
\end{align*}
$$

with the hypothenuse being

$$
\begin{align*}
\overline{OD}^2 &= \overline{OE}^2 + \overline{ED}^2 \\
&= (1 - \overline{ED})^2 + \overline{ED}^2 \\
&= 1 - 2*\overline{ED} + \overline{ED}^2 + \overline{ED}^2 \\
&= 1 - 2*\overline{ED} + 2*\overline{ED}^2 \\
\overline{OD} &= \sqrt{1 - 2*\overline{ED} + 2*\overline{ED}^2} \\
\end{align*}
$$

Thus, $\sin(\alpha)$ can be described as

$$
\mathrm{sine}(\overline{ED}) = \frac{\overline{ED}}{\sqrt{1 - 2*\overline{ED} + 2*\overline{ED}^2}}
$$

and $\cos(\alpha)$ as

$$
\mathrm{cosine}(\overline{ED}) = \frac{1 - \overline{ED}}{\sqrt{1 - 2*\overline{ED} + 2*\overline{ED}^2}}
$$

and $\tan(\alpha)$ as

$$
\mathrm{tangent}(\overline{ED}) = \frac{\overline{ED}}{1-\overline{ED}}
$$

## Chord-Length By Radians

WARNING: This section is still a work-in-progress and does not yet represent the final result.

The goal is to algebraically express the chord-length $\overline{BA}$ in terms of only the arc-length $\alpha$.

<img src="/assets/images/ancient_greek_trigonometry__12.jpg" class="half-width-image"/>

Let $M$ be the mid-point between points $A$ and $B$, then join $O$ and $M$ to produce two congruent right triangles, $\triangle{OBM}$ and $\triangle{OMA}$.

<img src="/assets/images/ancient_greek_trigonometry__13.jpg" class="half-width-image"/>

Within $\triangle{OBM}$, the following trigonometric function applies:

$$
\begin{align*}
\sin\left(\frac{\alpha}{2}\right) &= \frac{\overline{BM}}{\overline{OB}} \\
&= \overline{BM}
\end{align*}
$$

From which follows, that

$$
\begin{align*}
\overline{BA} &= 2*\overline{BM} \\
\overline{BA} &= 2*\sin\left(\frac{\alpha}{2}\right)
\end{align*}
$$

## Parameter By Chord-Length

The goal is to algebraically express the parameter of all formulas, namely $\overline{ED}$, in terms of only the chord-length $\overline{BA}$, which represents the secant of the circle's arc spanned by $\alpha$; said arc is exactly of length $\alpha$ within the unit-circle.

<img src="/assets/images/ancient_greek_trigonometry__6.jpg" class="half-width-image"/>

At first glance, this may seem like an impossible task, but since the scene at hand is fully geometrically defined for each length of $\overline{BA}$ or $\overline{ED}$, one has to be expressable in terms of the other. To accomplish this, I will make use of symmetry, as follows. Let $M$ be the mid-point between points $A$ and $B$, then join $O$ and $M$ to produce $\overline{OM}$, which will bisect angle $\alpha$. Extend this line until it meets the circle circumference in point $A'$. Said line also intersects with $\overline{BC}$ in point $D'$, from which yet another perpendicular is dropped into point $E'$. By joining $B$ and $A'$, another chord is constructed.

<img src="/assets/images/ancient_greek_trigonometry__7.jpg" class="half-width-image"/>

It now becomes apparent that as $\overline{BA}$ represents the chord for angle $\alpha$ with the parameter being $\overline{ED}$, $\overline{BA'}$ represents the chord for angle $\frac{\alpha}{2}$ with parameter $\overline{E'D'}$. Let's identify some angles.

<img src="/assets/images/ancient_greek_trigonometry__8.jpg" class="half-width-image"/>

As dictated by $\triangle{OE'D'}$, $\sigma = \frac{\pi}{2} - \frac{\alpha}{2}$. Since $\triangle{OBM}$ shares a right-angle as well as angle $\frac{\alpha}{2}$ with $\triangle{OE'D'}$, its third angle will be $\sigma$ as well; the same holds true for $\triangle{OMA}$, by symmetry. There are some similar triangles already, whose relations are to be taken note of.

$$
\begin{align*}
\triangle{E'BD'} \sim \triangle{EBD} &\Rightarrow \frac{\overline{E'B}}{\overline{EB}} = \frac{\overline{E'D'}}{\overline{ED}} = \frac{\overline{BD'}}{\overline{BD}} \tag{1} \\
\,\\
\triangle{OBM} \sim \triangle{OE'D'} &\Rightarrow \frac{\overline{BM}}{\overline{E'D'}} = \frac{\overline{OB}}{\overline{OD'}} = \frac{\overline{OM}}{\overline{OE'}} \tag{2}
\end{align*}
$$

Right-angle triangles allow for the application of the Pythagorean Theorem.

$$
\begin{align*}
\triangle{E'BD'} &\Rightarrow 2 * \overline{E'D'}^2 = \overline{BD'}^2 \tag{3} \\
\triangle{EBD} &\Rightarrow 2 * \overline{ED}^2 = \overline{BD} \tag{4} \\
\triangle{OE'D'} &\Rightarrow \overline{OE'}^2 + \overline{E'D'}^2 = \overline{OD'}^2 \tag{5} \\
\triangle{OED} &\Rightarrow \overline{OE}^2 + \overline{ED}^2 = \overline{OD}^2 \tag{6} \\
\triangle{BA'M} &\Rightarrow \overline{BM}^2 + \overline{MA'}^2 = \overline{BA'}^2 \tag{7} \\
\triangle{OBM} &\Rightarrow \overline{OM}^2 + \overline{BM}^2 = \overline{OB}^2 \tag{8} \\
\triangle{BMD'} &\Rightarrow \overline{BM}^2 + \overline{D'M}^2 = \overline{BD'}^2 \tag{9}
\end{align*}
$$

Drop a perpendicular from $M$ into $G$.

<img src="/assets/images/ancient_greek_trigonometry__10.jpg" class="half-width-image"/>

We know that

$$
\begin{align*}
\triangle{OGM} \sim \triangle{GBM} &\Rightarrow \frac{\overline{OG}}{\overline{GM}} = \frac{\overline{GM}}{\overline{GB}} = \frac{\overline{OM}}{\overline{BM}} \tag{10} \\
\, \\
\triangle{OGM} &\Rightarrow \overline{OG}^2 + \overline{GM}^2 = \overline{OM}^2 \tag{11}
\, \\
\triangle{GBM} &\Rightarrow \overline{GM}^2 + \overline{GB}^2 = \overline{BM}^2 \tag{12}
\end{align*}
$$

Drop a perpendicular from $D'$ relative to $\overline{GM}$ into $I$.

<img src="/assets/images/ancient_greek_trigonometry__11.jpg" class="half-width-image"/>

Another right triangle emerges, with the following sides:

$$
\begin{align*}
\overline{IM} &= \overline{GM} - \overline{E'D'} \\
\overline{D'I} &= \overline{E'G} \\
\end{align*}
$$

By applying the above relations, we receive

$$
\begin{align*}
\triangle{D'IM} &\Rightarrow \overline{D'I}^2 + \overline{IM}^2 = \overline{D'M}^2 \Leftrightarrow \overline{E'G}^2 + (\overline{GM} - \overline{E'D'})^2 = \overline{D'M}^2 \tag{13}
\end{align*}
$$

With the following similarities

$$
\begin{align*}
\triangle{OE'D'} \sim \triangle{D'IM} &\Rightarrow \frac{\overline{OE'}}{\overline{E'G}} = \frac{\overline{E'D'}}{\overline{GM} - \overline{E'D'}} = \frac{\overline{OD'}}{\overline{D'M}} \tag{14} \\
\,\\
\triangle{OGM} \sim \triangle{D'IM} &\Rightarrow \frac{\overline{OG}}{\overline{E'G}} = \frac{\overline{GM}}{\overline{\overline{GM} - \overline{E'D'}}} = \frac{\overline{OM}}{\overline{D'M}} \tag{15}
\end{align*}
$$

$$
\begin{align*}
(\text{8}) \Rightarrow \overline{OM}^2 + \overline{BM}^2 &= 1 \\
(1 - \overline{MA'})^2 + \overline{BM}^2 &= 1 \\
(1 - \overline{MA'})^2 &= 1 - \overline{BM}^2 \\
1 - \overline{MA'} &= \sqrt{1 - \overline{BM}^2} \\
-\overline{MA'} &= \sqrt{1 - \overline{BM}^2} - 1 \\
\overline{MA'} &= 1 - \sqrt{1 - \overline{BM}^2} \tag{16} \\
\end{align*}
$$

$$
\begin{align*}
(\text{16}) \rightarrow (\text{7}) \Rightarrow \overline{BA'}^2 &= \overline{BM}^2 + \overline{MA'}^2 \\
\overline{BA'}^2 &= \overline{BM}^2 + \left(1 - \sqrt{1 - \overline{BM}^2}\right)^2 \\
\overline{BA'}^2 &= \cancel{\overline{BM}^2} + 1 - 2*\sqrt{1 - \overline{BM}^2} + 1 - \cancel{\overline{BM}^2} \\
\overline{BA'}^2 &= 2 - 2*\sqrt{1 - \overline{BM}^2} \\
\overline{BA'}^2 &= 2 * \left(1 - \sqrt{1 - \overline{BM}^2}\right) \\
\overline{BA'} &= \sqrt{2 * \left(1 - \sqrt{1 - \overline{BM}^2}\right)} \\
\overline{BA'} &= \sqrt{2 * \overline{MA'}} \tag{17} \\
\end{align*}
$$

$$
\begin{align*}
(\text{10}) \Rightarrow \frac{\overline{OG}}{\overline{GM}} &= \frac{\overline{GM}}{\overline{GB}} \\
\overline{GM}^2 &= \overline{OG} * \overline{GB} \\
\overline{GM}^2 &= (1-\overline{GB}) * \overline{GB} \\
\overline{GM}^2 &= \overline{GB} - \overline{GB}^2 \tag{10a}
\end{align*}
$$

$$
\begin{align*}
(\text{10a}) = (\text{12}) \Rightarrow \overline{GB} - \cancel{\overline{GB}^2} &= \overline{BM}^2 - \cancel{\overline{GB}^2} \\
\overline{GB} &= \overline{BM}^2 \tag{18}
\end{align*}
$$

$$
\begin{align*}
(\text{16}),(\text{10a}),(\text{18}) \rightarrow (\text{11}) \Rightarrow \overline{OG}^2 &= (1 - \overline{MA'})^2 - \overline{GM}^2 \\
\overline{OG}^2 &= (1 - (1 - \sqrt{1 - \overline{BM}^2}))^2 - (\overline{GB} - \overline{GB}^2) \\
\overline{OG}^2 &= 1 - \overline{BM}^2 - (\overline{BM}^2 - \overline{BM}^4) \\
\overline{OG}^2 &= 1 - 2*\overline{BM}^2 + \overline{BM}^4 \\
\overline{OG}^2 &= (1 - \overline{BM}^2)^2 \\
\overline{OG} &= 1 - \overline{BM}^2 \tag{19} \\
\end{align*}
$$

$$
\begin{align*}
(\text{16}),(\text{19}) \rightarrow (\text{15}) \Rightarrow \frac{\overline{E'G}}{\overline{OG}} &= \frac{\overline{D'M}}{\overline{OM}} \\
\overline{E'G} &= \overline{OG} * \frac{\overline{D'M}}{1 - \overline{MA'}} \\
\overline{E'G} &= (1 - \overline{BM}^2) * \frac{\overline{D'M}}{\cancel{1} - (\cancel{1} - \sqrt{1 - \overline{BM}^2})} \\
\overline{E'G} &= (1 - \overline{BM}^2) * \frac{\overline{D'M}}{\sqrt{1 - \overline{BM}^2}} \\
\overline{E'G} &= \cancel{(1 - \overline{BM}^2)} * \frac{\overline{D'M} * \sqrt{1 - \overline{BM}^2}}{\cancel{1 - \overline{BM}^2}} \\
\overline{E'G} &= \overline{D'M} * \sqrt{1 - \overline{BM}^2} \Leftrightarrow \overline{D'M} = \frac{\overline{E'G}}{\sqrt{1 - \overline{BM}^2}} \tag{20}
\end{align*}
$$

$$
\begin{align*}
(\text{16}),(\text{19}),(\text{20}) \rightarrow (\text{5}) \Rightarrow \overline{OD'}^2 &= \overline{OE'}^2 + \overline{E'D'}^2 \\
(1 - \overline{D'M} - \overline{MA'})^2 &= \overline{OE'}^2 + \overline{E'B}^2 \\
(1 - \overline{D'M} - \overline{MA'})^2 &= \overline{OE'}^2 + (\overline{E'G} + \overline{GB})^2 \\
(\cancel{1} - \overline{D'M} - (\cancel{1} - \sqrt{1 - \overline{BM}^2}))^2 &= \overline{OE'}^2 + (\overline{E'G} + \overline{BM}^2)^2 \\
(\sqrt{1 - \overline{BM}^2} - \overline{D'M})^2 &= \overline{OE'}^2 + (\overline{E'G} + \overline{BM}^2)^2 \\
(\sqrt{1 - \overline{BM}^2} - \overline{D'M})^2 &= (\overline{OG} - \overline{E'G})^2 + (\overline{E'G} + \overline{BM}^2)^2 \\
(\sqrt{1 - \overline{BM}^2} - \overline{D'M})^2 &= ((1 - \overline{BM}^2) - \overline{E'G})^2 + (\overline{E'G} + \overline{BM}^2)^2 \\
(\sqrt{1 - \overline{BM}^2} - \overline{D'M})^2 &= (1 - \overline{BM}^2)^2 - 2*(1 - \overline{BM}^2)*\overline{E'G} + \overline{E'G}^2 + (\overline{E'G} + \overline{BM}^2)^2 \\
(\sqrt{1 - \overline{BM}^2} - \overline{D'M})^2 &= (1 - \overline{BM}^2)^2 - 2*(1 - \overline{BM}^2)*\overline{E'G} + \overline{E'G}^2 + \overline{E'G}^2 + 2*\overline{E'G}*\overline{BM}^2 + \overline{BM}^4 \\
(\sqrt{1 - \overline{BM}^2} - \overline{D'M})^2 &= 2*\overline{E'G}^2 - \overline{E'G}*(2*(1 - \overline{BM}^2) - 2*\overline{BM}^2) + (1 - \overline{BM}^2)^2 + \overline{BM}^4 \\
(\sqrt{1 - \overline{BM}^2} - \overline{D'M})^2 &= 2*\overline{E'G}^2 - \overline{E'G}*(2 - 4*\overline{BM}^2) + (1 - \overline{BM}^2)^2 + \overline{BM}^4 \\
(\sqrt{1 - \overline{BM}^2} - \overline{D'M})^2 &= 2*\overline{E'G}^2 - \overline{E'G}*(2 - 4*\overline{BM}^2) + 1 - 2*\overline{BM}^2 + 2*\overline{BM}^4 \\
(\sqrt{1 - \overline{BM}^2} - \frac{\overline{E'G}}{\sqrt{1-\overline{BM}^2}})^2 &= 2*\overline{E'G}^2 - \overline{E'G}*(2 - 4*\overline{BM}^2) + 1 - 2*\overline{BM}^2 + 2*\overline{BM}^4 \\
\cancel{1} - \cancel{\overline{BM}^2} - 2*\overline{E'G} + \frac{\overline{E'G}^2}{1-\overline{BM}^2} &= 2*\overline{E'G}^2 - \overline{E'G}*(2 - 4*\overline{BM}^2) + \cancel{1} - \cancel{2}*\overline{BM}^2 + 2*\overline{BM}^4 \\
\cancel{-2*\overline{E'G}} + \frac{\overline{E'G}^2}{1-\overline{BM}^2} &= 2*\overline{E'G}^2 - \overline{E'G}*(\cancel{2} - 4*\overline{BM}^2) - \overline{BM}^2 + 2*\overline{BM}^4 \\
\frac{\overline{E'G}^2}{1-\overline{BM}^2} &= 2*\overline{E'G}^2 + \overline{E'G}*(4*\overline{BM}^2) - \overline{BM}^2 + 2*\overline{BM}^4 \\
0 &= 2*\overline{E'G}^2 - \frac{\overline{E'G}^2}{1-\overline{BM}^2} + \overline{E'G}*(4*\overline{BM}^2) - \overline{BM}^2 + 2*\overline{BM}^4 \\
0 &= \overline{E'G}^2 * (2 - \frac{1}{1-\overline{BM}^2}) + \overline{E'G}*(4*\overline{BM}^2) - \overline{BM}^2 + 2*\overline{BM}^4 \\
\end{align*}
$$

Let's express $\overline{E'G}$ in terms of $\overline{BM}$ by solving the quadratic equation with the following coefficients

$$
a = (2-\frac{1}{1-\overline{BM}^2}) \\
b = (4*\overline{BM}^2) \\
c = (2*\overline{BM}^4 - \overline{BM}^2) \\
$$

yielding

$$
\begin{align*}
\overline{E'G}_{1,2} &= \frac{-b \pm \sqrt{b^2 - 4*a*c}}{2*a} \\
&= \frac{-(4*\overline{BM}^2) \pm \sqrt{(4*\overline{BM}^2)^2 - 4*(2-\frac{1}{1-\overline{BM}^2})*(2*\overline{BM}^4 - \overline{BM}^2)}}{2*(2-\frac{1}{1-\overline{BM}^2})} \\
&= \frac{-4*\overline{BM}^2 \pm \sqrt{16*\overline{BM}^4 - 4*(2*(2*\overline{BM}^4 - \overline{BM}^2)-\frac{(2*\overline{BM}^4 - \overline{BM}^2)}{1-\overline{BM}^2})}}{2*(2-\frac{1}{1-\overline{BM}^2})} \\
&= \frac{-4*\overline{BM}^2 \pm \sqrt{16*\overline{BM}^4 -8*(2*\overline{BM}^4 - \overline{BM}^2)+\frac{4*(2*\overline{BM}^4 - \overline{BM}^2)}{1-\overline{BM}^2}}}{2*(2-\frac{1}{1-\overline{BM}^2})} \\
&= \frac{-4*\overline{BM}^2 \pm \sqrt{16*\overline{BM}^4 -16*\overline{BM}^4 + 8*\overline{BM}^2+\frac{4*(2*\overline{BM}^4 - \overline{BM}^2)}{1-\overline{BM}^2}}}{2*(2-\frac{1}{1-\overline{BM}^2})} \\
&= \frac{-4*\overline{BM}^2 \pm \sqrt{8*\overline{BM}^2+\frac{8*\overline{BM}^4 - 4*\overline{BM}^2}{1-\overline{BM}^2}}}{2*(2-\frac{1}{1-\overline{BM}^2})} \\
&= \frac{-4*\overline{BM}^2 \pm \sqrt{\frac{8*\overline{BM}^2*(1-\overline{BM}^2)}{1-\overline{BM}^2}+\frac{8*\overline{BM}^4 - 4*\overline{BM}^2}{1-\overline{BM}^2}}}{2*(2-\frac{1}{1-\overline{BM}^2})} \\
&= \frac{-4*\overline{BM}^2 \pm \sqrt{\frac{8*\overline{BM}^2 - 8*\overline{BM}^4}{1-\overline{BM}^2}+\frac{8*\overline{BM}^4 - 4*\overline{BM}^2}{1-\overline{BM}^2}}}{2*(2-\frac{1}{1-\overline{BM}^2})} \\
&= \frac{-4*\overline{BM}^2 \pm \sqrt{\frac{8*\overline{BM}^2 - \cancel{8*\overline{BM}^4} + \cancel{8*\overline{BM}^4} - 4*\overline{BM}^2}{1-\overline{BM}^2}}}{2*(2-\frac{1}{1-\overline{BM}^2})} \\
&= \frac{-4*\overline{BM}^2 \pm \sqrt{\frac{4*\overline{BM}^2}{1-\overline{BM}^2}}}{2*(2-\frac{1}{1-\overline{BM}^2})} \\
&= \frac{-4*\overline{BM}^2 \pm \frac{2*\overline{BM}}{\sqrt{1-\overline{BM}^2}}}{2*(2-\frac{1}{1-\overline{BM}^2})} \\
&= \frac{-2*\overline{BM}^2 \pm \frac{\overline{BM}}{\sqrt{1-\overline{BM}^2}}}{2-\frac{1}{1-\overline{BM}^2}} \\
&= \frac{-2*\overline{BM}^2 \pm \frac{\overline{BM}}{\sqrt{1-\overline{BM}^2}}}{\frac{2 - 2*\overline{BM}^2 -1}{1-\overline{BM}^2}} \\
&= \frac{-2*\overline{BM}^2 \pm \frac{\overline{BM}}{\sqrt{1-\overline{BM}^2}}}{\frac{1 - 2*\overline{BM}^2}{1-\overline{BM}^2}} \\
&= \frac{-2*\overline{BM}^2 \pm \frac{\overline{BM}*\sqrt{1-\overline{BM}^2}}{1-\overline{BM}^2}}{\frac{1 - 2*\overline{BM}^2}{1-\overline{BM}^2}} \\
&= \frac{\frac{-2*\overline{BM}^2*(1-\overline{BM}^2)}{1-\overline{BM}^2} \pm \frac{\overline{BM}*\sqrt{1-\overline{BM}^2}}{1-\overline{BM}^2}}{\frac{1 - 2*\overline{BM}^2}{1-\overline{BM}^2}} \\
&= \frac{\frac{-2*\overline{BM}^2*(1-\overline{BM}^2) \pm \overline{BM}*\sqrt{1-\overline{BM}^2}}{\cancel{1-\overline{BM}^2}}}{\frac{1 - 2*\overline{BM}^2}{\cancel{1-\overline{BM}^2}}} \\
&= \frac{-2*(\overline{BM}^2-\overline{BM}^4) \pm \sqrt{\overline{BM}^2-\overline{BM}^4}}{1 - 2*\overline{BM}^2} \\
\end{align*}
$$

Since $\overline{BM}$ is equal to half of $\overline{BA}$, and $\overline{BA}$ lies within the interval $[0;\sqrt{2}]$, $\overline{BM}$ is strictly less than one, as is any positive power of it. Thus, the denominator is positive, as is the root, but the LHS of the $\pm$ operator is negative; as lengths are always positive, adding yields the valid result.

$$
\overline{E'G} = \frac{-2*(\overline{BM}^2-\overline{BM}^4) + \sqrt{\overline{BM}^2-\overline{BM}^4}}{1 - 2*\overline{BM}^2} \tag{21}
$$

$$
\begin{align*}
\overline{E'D'} &= \overline{E'G} + \overline{GB} \\
\overline{E'D'} &= \overline{E'G} + \overline{BM}^2 \\
&= \frac{-2*(\overline{BM}^2-\overline{BM}^4) + \sqrt{\overline{BM}^2-\overline{BM}^4}}{1 - 2*\overline{BM}^2} + \overline{BM}^2 \\
&= \frac{-2*(\overline{BM}^2-\overline{BM}^4) + \sqrt{\overline{BM}^2-\overline{BM}^4}}{1 - 2*\overline{BM}^2} + \frac{\overline{BM}^2*(1 - 2*\overline{BM}^2)}{1 - 2*\overline{BM}^2} \\
&= \frac{-\cancel{2}*\overline{BM}^2+\cancel{2*\overline{BM}^4} + \sqrt{\overline{BM}^2-\overline{BM}^4} + \cancel{\overline{BM}^2} - \cancel{2*\overline{BM}^4}}{1 - 2*\overline{BM}^2} \\
&= \frac{\sqrt{\overline{BM}^2-\overline{BM}^4} - \overline{BM}^2}{1 - 2*\overline{BM}^2} \tag{22}
\end{align*}
$$

Due to symmetry, as $\overline{BA'}$ relates to $\overline{E'D'}$, so does $\overline{BA}$ to $\overline{ED}$. Let's express $E'D'$ in terms of $\overline{BA'}$ by expressing $\overline{BM}$ in terms of $\overline{BA'}$ first, then substitute.

$$
\begin{align*}
(\text{16}) \rightarrow (\text{17}) \Rightarrow \overline{BA'} &= \sqrt{2*\overline{MA'}} \\
\overline{BA'} &= \sqrt{2*(1 - \sqrt{1-\overline{BM}^2})} \\
\overline{BA'}^2 &= 2*(1 - \sqrt{1-\overline{BM}^2}) \\
\frac{\overline{BA'}^2}{2} &= 1 - \sqrt{1-\overline{BM}^2} \\
1 - \frac{\overline{BA'}^2}{2} &= \sqrt{1-\overline{BM}^2} \\
(1 - \frac{\overline{BA'}^2}{2})^2 &= 1-\overline{BM}^2 \\
1 - (1 - \frac{\overline{BA'}^2}{2})^2 &= \overline{BM}^2 \\
\overline{BM}^2 &= 1 - (1 - \overline{BA'}^2 + \frac{\overline{BA'}^4}{4}) \\
\overline{BM}^2 &= 1 - 1 + \overline{BA'}^2 - \frac{\overline{BA'}^4}{4} \\
\overline{BM}^2 &= \overline{BA'}^2 - \frac{\overline{BA'}^4}{4} \\
\overline{BM}^2 &= \overline{BA'}^2 * \left(1-\frac{\overline{BA'}^2}{4}\right) \tag{23} \\
\end{align*}
$$

The above can now substitute all occurrences of $\overline{BM}^2$, as follows.

$$
\begin{align*}
(\text{23}) \rightarrow (\text{22}) \Rightarrow \overline{E'D'} &= \frac{\sqrt{\overline{BM}^2-\overline{BM}^4} - \overline{BM}^2}{1 - 2*\overline{BM}^2} \\
\overline{E'D'} &= \frac{\sqrt{(\overline{BA'}^2 * (1-\frac{\overline{BA'}^2}{4}))-(\overline{BA'}^2 * (1-\frac{\overline{BA'}^2}{4}))^2} - (\overline{BA'}^2-\frac{\overline{BA'}^4}{4})}{1-2*(\overline{BA'}^2-\frac{\overline{BA'}^4}{4})} \\
\overline{E'D'} &= \frac{\sqrt{(\overline{BA'}^2 * (1-\frac{\overline{BA'}^2}{4}))-\overline{BA'}^4 * (1-\frac{\overline{BA'}^2}{4})^2} - (\overline{BA'}^2-\frac{\overline{BA'}^4}{4})}{1-2*(\overline{BA'}^2-\frac{\overline{BA'}^4}{4})} \\
\overline{E'D'} &= \frac{\overline{BA'}*\sqrt{1-\frac{\overline{BA'}^2}{4}-\overline{BA'}^2 * (1-\frac{\overline{BA'}^2}{4})^2} - (\overline{BA'}^2-\frac{\overline{BA'}^4}{4})}{1-2*(\overline{BA'}^2-\frac{\overline{BA'}^4}{4})} \\
\overline{E'D'} &= \frac{\overline{BA'}*\sqrt{1-\frac{\overline{BA'}^2}{4}-\overline{BA'}^2 * (1-\frac{\overline{BA'}^2}{2} + \frac{\overline{BA'}^4}{16})} - (\overline{BA'}^2-\frac{\overline{BA'}^4}{4})}{1-2*(\overline{BA'}^2-\frac{\overline{BA'}^4}{4})} \\
\overline{E'D'} &= \frac{\overline{BA'}*\sqrt{1-\frac{\overline{BA'}^2}{4}-\overline{BA'}^2 +\frac{\overline{BA'}^4}{2} - \frac{\overline{BA'}^6}{16}} - (\overline{BA'}^2-\frac{\overline{BA'}^4}{4})}{1-2*(\overline{BA'}^2-\frac{\overline{BA'}^4}{4})} \\
\overline{E'D'} &= \frac{\overline{BA'}*\sqrt{\frac{16}{16}-\frac{4*\overline{BA'}^2}{16}-\frac{16*\overline{BA'}^2}{16} +\frac{8*\overline{BA'}^4}{16} - \frac{\overline{BA'}^6}{16}} - (\overline{BA'}^2-\frac{\overline{BA'}^4}{4})}{1-2*(\overline{BA'}^2-\frac{\overline{BA'}^4}{4})} \\
\overline{E'D'} &= \frac{\overline{BA'}*\frac{1}{4}*\sqrt{16-4*\overline{BA'}^2-16*\overline{BA'}^2 +8*\overline{BA'}^4 - \overline{BA'}^6} - (\overline{BA'}^2-\frac{\overline{BA'}^4}{4})}{1-2*(\overline{BA'}^2-\frac{\overline{BA'}^4}{4})} \\
\overline{E'D'} &= \frac{\overline{BA'}*\frac{1}{4}*\sqrt{16-20*\overline{BA'}^2 +8*\overline{BA'}^4 - \overline{BA'}^6} - (\overline{BA'}^2-\frac{\overline{BA'}^4}{4})}{1-2*(\overline{BA'}^2-\frac{\overline{BA'}^4}{4})} \\
\overline{E'D'} &= \frac{\overline{BA'}*\frac{1}{4}*\sqrt{(2+\overline{BA'})*(2-\overline{BA'})*(\overline{BA'}^2-2)^2} - (\overline{BA'}^2-\frac{\overline{BA'}^4}{4})}{1-2*(\overline{BA'}^2-\frac{\overline{BA'}^4}{4})} \\
\overline{E'D'} &= \frac{\overline{BA'}*\frac{1}{4}*(2-\overline{BA'}^2)*\sqrt{(2+\overline{BA'})*(2-\overline{BA'})} - (\overline{BA'}^2-\frac{\overline{BA'}^4}{4})}{1-2*(\overline{BA'}^2-\frac{\overline{BA'}^4}{4})} \\
\overline{E'D'} &= \frac{\overline{BA'}*\frac{1}{4}*(2-\overline{BA'}^2)*\sqrt{4-\overline{BA'}^2} - \overline{BA'}^2+\frac{\overline{BA'}^4}{4}}{1-2*\overline{BA'}^2+\frac{\overline{BA'}^4}{2}} \\
\overline{E'D'} &= \frac{-4*(\overline{BA'}*\frac{1}{4}*(2-\overline{BA'}^2)*\sqrt{4-\overline{BA'}^2} - \overline{BA'}^2+\frac{\overline{BA'}^4}{4})}{-4*(1-2*\overline{BA'}^2+\frac{\overline{BA'}^4}{2})} \\
\overline{E'D'} &= \frac{\overline{BA'}*(\overline{BA'}^2-2)*\sqrt{4-\overline{BA'}^2} + 4*\overline{BA'}^2-\overline{BA'}^4}{8*\overline{BA'}^2-2*\overline{BA'}^4-4} \\
\overline{E'D'} &= \frac{\overline{BA'}*(\overline{BA'}^2-2)*\sqrt{4-\overline{BA'}^2} + \overline{BA'}^2*(4-\overline{BA'}^2)}{2*\overline{BA'}^2*(4-\overline{BA'}^2)-4} \tag{24} \\
\end{align*}
$$

As stated earlier, $\overline{E'D'}(\overline{BA'})$ is equal to $\overline{ED}(\overline{BA})$, thus, these variables may just be exchanged to arrive at the final relation.

$$
\overline{ED} = \frac{\overline{BA}*(\overline{BA}^2-2)*\sqrt{4-\overline{BA}^2} + \overline{BA}^2*(4-\overline{BA}^2)}{2*\overline{BA}^2*(4-\overline{BA}^2)-4} \tag{25}
$$

## Right Angle At B

While analyzing the scene to discover the chord-length relation, I came accross the following insights, which may or may not be of any use in the future. Since $\sigma = \frac{\pi}{2} - \frac{\alpha}{2}$, $\sigma$ is short of a right-angle by exactly $\frac{\alpha}{2}$. Constructing a perpendicular from $B$ relative to $\overline{OB}$, while producing line $\overline{OA'}$ until it meets said perpendicular will result in the point of section $A''$, with $\angle{A''BM} = \frac{\alpha}{2}$.

<img src="/assets/images/ancient_greek_trigonometry__9.jpg" class="half-width-image"/>

The following relations become revealed:

$$
\begin{align*}
\triangle{BA''M} \sim \triangle{OE'D'} &\Rightarrow \frac{\overline{MA''}}{\overline{E'D'}} = \frac{\overline{BM}}{\overline{OE'}} = \frac{\overline{BA''}}{\overline{OD'}} \tag{26} \\
\, \\
\triangle{BA''M} &\Rightarrow \overline{BM}^2 + \overline{MA''}^2 = \overline{BA''}^2 \tag{27} \\
\triangle{OBA''} &\Rightarrow \overline{OB}^2 + \overline{BA''}^2 = \overline{OA''}^2 \tag{28}
\end{align*}
$$

$$
\begin{align*}
(\text{28}) \Rightarrow 1 + \overline{BA''}^2 &= \overline{OA''}^2 \\
1 + \overline{BA''}^2 &= (1 + \overline{A'A''})^2 \\
\overline{BA''}^2 &= (1 + \overline{A'A''})^2 - 1 \tag{28a} \\
\end{align*}
$$

$$
\begin{align*}
(\text{16}) \rightarrow (\text{27}) \Rightarrow \overline{BA''}^2 &= \overline{BM}^2 + \overline{MA''}^2 \\
\overline{BA''}^2 &= \overline{BM}^2 + (\overline{MA'} + \overline{A'A''})^2  \\
\overline{BA''}^2 &= \overline{BM}^2 + \left(\left(1 - \sqrt{1 - \overline{BM}^2}\right) + \overline{A'A''}\right)^2 \tag{29} \\
\end{align*}
$$

$$
\begin{align*}
(\text{28a}) = (\text{29}) \Rightarrow (1 + \overline{A'A''})^2 - 1 &= \overline{BM}^2 + \left(\left(1 - \sqrt{1 - \overline{BM}^2}\right) + \overline{A'A''}\right)^2 \\
\cancel{1} + 2*\overline{A'A''} + \overline{A'A''}^2 - \cancel{1} &= \overline{BM}^2 + \left(\left(1 - \sqrt{1 - \overline{BM}^2}\right) + \overline{A'A''}\right)^2 \\
2*\overline{A'A''} + \cancel{\overline{A'A''}^2} &= \overline{BM}^2 + \left(1 - \sqrt{1 - \overline{BM}^2}\right)^2 + 2*\left(1 - \sqrt{1 - \overline{BM}^2}\right)*\overline{A'A''} + \cancel{\overline{A'A''}^2} \\
2*\overline{A'A''} &= \cancel{\overline{BM}^2} + 1 - 2*\sqrt{1 - \overline{BM}^2} + 1 - \cancel{\overline{BM}^2} + 2*\left(1 - \sqrt{1 - \overline{BM}^2}\right)*\overline{A'A''} \\
2*\overline{A'A''} &= 2 - 2*\sqrt{1 - \overline{BM}^2} + 2*\left(1 - \sqrt{1 - \overline{BM}^2}\right)*\overline{A'A''} \\
\overline{A'A''} &= 1 - \sqrt{1 - \overline{BM}^2} + \left(1 - \sqrt{1 - \overline{BM}^2}\right)*\overline{A'A''} \\
\overline{A'A''} - \left(1 - \sqrt{1 - \overline{BM}^2}\right)*\overline{A'A''} &= 1 - \sqrt{1 - \overline{BM}^2} \\
\overline{A'A''} * \left(1 - \left(1 - \sqrt{1 - \overline{BM}^2}\right)\right) &= 1 - \sqrt{1 - \overline{BM}^2} \\
\overline{A'A''} * \left(\sqrt{1 - \overline{BM}^2}\right) &= 1 - \sqrt{1 - \overline{BM}^2} \\
\overline{A'A''} &= \frac{1 - \sqrt{1 - \overline{BM}^2}}{\sqrt{1 - \overline{BM}^2}} \\
\overline{A'A''} &= \frac{1}{\sqrt{1 - \overline{BM}^2}} - 1 \tag{30}
\end{align*}
$$

$$
\begin{align*}
(\text{30}) \rightarrow (\text{28a}) \Rightarrow \overline{BA''}^2 &= \left(\cancel{1} + \left(\frac{1}{\sqrt{1 - \overline{BM}^2}} - \cancel{1}\right)\right)^2 - 1 \\
\overline{BA''}^2 &= \left(\frac{1}{\sqrt{1 - \overline{BM}^2}}\right)^2 - 1 \\
\overline{BA''}^2 &= \frac{1}{1 - \overline{BM}^2} - 1 \\
\overline{BA''} &= \sqrt{\frac{1}{1 - \overline{BM}^2} - 1} \tag{31} \\
\end{align*}
$$

If line $\overline{BA'}$ bisects the angle $\angle{A''BM}$, then $\frac{\overline{BM}}{\overline{BA''}}$ has to be equal to $\frac{\overline{MA'}}{\overline{A'A''}}$.

$$
\begin{align*}
\frac{\overline{BM}}{\overline{BA''}} &= \frac{\overline{MA'}}{\overline{A'A''}} \\
\frac{\overline{BM}}{\sqrt{\frac{1}{1 - \overline{BM}^2} - 1}} &= \frac{1 - \sqrt{1 - \overline{BM}^2}}{\frac{1}{\sqrt{1 - \overline{BM}^2}} - 1} \\
\frac{\overline{BM}}{\sqrt{\frac{1}{1 - \overline{BM}^2} - 1}} &= \frac{1 - \sqrt{1 - \overline{BM}^2}}{\frac{1 - \sqrt{1 - \overline{BM}^2}}{\sqrt{1 - \overline{BM}^2}}} \\
\frac{\overline{BM}}{\sqrt{\frac{1}{1 - \overline{BM}^2} - 1}} &= \cancel{\left(1 - \sqrt{1 - \overline{BM}^2}\right)} * \frac{\sqrt{1 - \overline{BM}^2}}{\cancel{1 - \sqrt{1 - \overline{BM}^2}}} \\
\frac{\overline{BM}^2}{\frac{1}{1 - \overline{BM}^2} - 1} &= 1 - \overline{BM}^2 \\
\frac{\overline{BM}^2}{\frac{1 - (1 - \overline{BM}^2)}{1 - \overline{BM}^2}} &= 1 - \overline{BM}^2 \\
\cancel{\overline{BM}^2} * \frac{1 - \overline{BM}^2}{\cancel{\overline{BM}^2}} &= 1 - \overline{BM}^2 \\
1 - \cancel{\overline{BM}^2} &= 1 - \cancel{\overline{BM}^2} \\
1 &= 1
\end{align*}
$$

Since this equation is satisfied, we know that $\angle{A''BA'} = \angle{A'BM} = \frac{\alpha}{4}$.
