A long time ago, a standard has been put into place, which describes how the DIN A papers should look. This helped to unify note-taking, printouts and thus printers, folders, clear sleeves, envelopes and the like.

But there's another very important property of this standard: If you start out with any paper, call it DIN $A_x$, and cut it in half parallel to it's short side, you'll end up with two DIN $A_{x-1}$. Technically, the definition stops at DIN A10, but nothing keeps you from cutting further.

Paper sizes are not defined by their width and height, but rather by their surface area.

$\mathrm{I}$: $A = a*b$

$a$ always represents the short side, while $b$ stands for the longer of the two.

<img src="/assets/images/din_a_paper_sizes__1.jpg" class="third-width-image"/>

The dimensions are calculated by a constraint, which can be derived as follows:

It is desired to maintain the original paper's aspect ratio after cutting it in half, so the following equation must hold:

$\mathrm{II}$: $\frac{a}{b} = \frac{\frac{b}{2}}{a} = \frac{b}{2*a}$

This equality states that the ratio of the original paper's short to the long side has to equal to the new paper's short side $a_{new}=\frac{b}{2}$ to it's long side $b_{new}=a$.

With $\mathrm{I}$ and $\mathrm{II}$ in mind, it is time to fully define DIN A0. Only one parameter is missing: it's surface area. A0 has been *chosen* to be $1m^2$. Let's calculate it's exact dimensions:

Rearranging $\mathrm{I}$ and and substituting it into $\mathrm{II}$:

$A = a*b \Rightarrow b = \frac{A}{a}$<br>

$\frac{a}{b} = \frac{b}{2*a}$<br>
$\frac{a}{\frac{A}{a}} = \frac{\frac{A}{a}}{2*a}$

Solving for $a$:

$\frac{a^2}{A} = \frac{A}{2*a^2}$<br>
$a^2 = \frac{A^2}{2*a^2}$<br>
$a^4 = \frac{A^2}{2}$<br>
$a^2 = \frac{A}{\sqrt{2}}$<br>
$\mathrm{III}$: $a = \sqrt{\frac{A}{\sqrt{2}}}$

Now that $a$ is known as a function of the paper's surface area, $b$ can be retrieved by the relation $\mathrm{II}$ describes:

$\frac{a}{b} = \frac{b}{2*a}$<br>
$a = \frac{b^2}{2*a}$<br>
$2*a^2 = b^2$<br>
$\mathrm{IV}$: $\sqrt{2}*a = b$<br>

Since $A = 1$ for DIN A0, these are it's dimensions ($\mathrm{III}$, $\mathrm{IV}$):

$a = \sqrt{\frac{1}{\sqrt{2}}}$<br>
$a = \frac{1}{\sqrt{\sqrt{2}}}$<br>
$a \approx 841mm$

$\sqrt{2}*\frac{1}{\sqrt{\sqrt{2}}} = b$<br>
$b \approx 1189mm$

By cutting one of these DIN A papers in half, their surface area is also halfed. Thus follows, that A1 will have $\frac{1}{2}m^2$ of surface area, A2 $\frac{1}{4}m^2$, A3 $\frac{1}{8}m^2$ and so on. With this in mind, the full table of available papers, ranging from A0 to A10, can be calculated:

| DIN A | Area                | $\approx a$ | $\approx b$ |
|-------|---------------------|-------------|-------------|
| A0    | $1m^2$              | 841mm       | 1189mm      |
| A1    | $\frac{1}{2}m^2$    | 595mm       | 841mm       |
| A2    | $\frac{1}{4}m^2$    | 420mm       | 595mm       |
| A3    | $\frac{1}{8}m^2$    | 297mm       | 420mm       |
| A4    | $\frac{1}{16}m^2$   | 210mm       | 297mm       |
| A5    | $\frac{1}{32}m^2$   | 149mm       | 210mm       |
| A6    | $\frac{1}{64}m^2$   | 105mm       | 149mm       |
| A7    | $\frac{1}{128}m^2$  | 74mm        | 105mm       |
| A8    | $\frac{1}{256}m^2$  | 53mm        | 74mm        |
| A9    | $\frac{1}{512}m^2$  | 37mm        | 53mm        |
| A10   | $\frac{1}{1024}m^2$ | 26mm        | 37mm        |

Some of these values might be off by $\pm1mm$, since DIN decided to sometimes floor and sometimes round regularly...