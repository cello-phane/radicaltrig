## Table Of Contents {: #toc }

## Statement

$$
\begin{align*}
&(x+a)^c*(x+b)^c \\
&= \left(\sum_{k=0}^{c} \binom{c}{k}*x^{(c-k)}*a^{k}\right)*\left(\sum_{k=0}^{c} \binom{c}{k}*x^{(c-k)}*b^{k}\right) \\
&= (\\
&\textcolor{magenta}{\sum_{k=0}^{c-1} x^k * \sum_{i=0}^{k} \binom{c}{c-i} * \binom{c}{c-k+i} * a^{c-i} * b^{c-k+i}} \\
&+\textcolor{cyan}{x^{c} * \sum_{i=0}^{c} \binom{c}{i} * \binom{c}{c-i} * a^i * b^{c-i}} \\
&+\textcolor{orange}{\sum_{k=c+1}^{2*c} x^k * \sum_{i=0}^{c-(k-(c+1))-1} \binom{c}{i} * \binom{c}{c-(k-(c+1))-1-i} * a^i * b^{c-(k-(c+1))-1-i}} \\
)\\
&= (\\
&\textcolor{magenta}{\sum_{k=0}^{c} x^k * \sum_{i=0}^{k} \binom{c}{c-i} * \binom{c}{c-k+i} * a^{c-i} * b^{c-k+i}} \\
&+\textcolor{orange}{\sum_{k=c+1}^{2*c} x^k * \sum_{i=0}^{2*c-k} \binom{c}{i} * \binom{c}{2*c-k-i} * a^i * b^{2*c-k-i}} \\
)\\
\end{align*}
$$

<!--

Without color-codes:

(x+a)^c*(x+b)^c = \sum_{k=0}^{c} x^k * \sum_{i=0}^{k} \binom{c}{c-i} * \binom{c}{c-k+i} * a^{c-i} * b^{c-k+i} + \sum_{k=c+1}^{2*c} x^k * \sum_{i=0}^{2*c-k} \binom{c}{i} * \binom{c}{2*c-k-i} * a^i * b^{2*c-k-i}

-->

Color codes mark the $\textcolor{magenta}{\mathrm{first\,half}}$, $\textcolor{cyan}{\mathrm{middle}}$ and $\textcolor{orange}{\mathrm{second\,half}}$ of the pattern as shown within the [Input File](#concrete-example_playground_tests_input-txt). No matter the value of $c$, there will always be an odd number of powers of $x$, as $x$ ranges from $0$ to $2*c$, thereby has $2*c+1$ variants - thus, a "middle" exists in all cases.

## Combinatorical Pattern

When multiplying out $(x+a)^c*(x+b)^c$, all powers of $x$ between $2*c$ and and $0$ occur in the result. Different permutations of $a$ and $b$ will occur for the same power of $x^n$, where $x^n$ can be factored out.

$$
\begin{align*}
&(x+a)^3*(x+b)^3 \\
&=(x^3 + 3*x^2*a + 3*x*a^2 + a^3)*(x^3 + 3*x^2*b + 3*x*b^2 + b^3) \\
&=x^3*x^3 + x^3*3*x^2*b + x^3*3*x*b^2 * x^3*b^3 \\
&+3*x^2*a*x^3 + 3*x^2*a*3*x^2*b + 3*x^2*a*3*x*b^2 + 3*x^2*a*b^3 \\
&+3*x*a^2*x^3 + 3*x*a^2*3*x^2*b + 3*x*a^2*3*x*b^2 + 3*x*a^2*b^3 \\
&+a^3*x^3 + a^3*3*x^2*b + a^3*3*x*b^2 + a^3*b^3 \\
\end{align*}
$$

Adding the exponents of $x$, aligning and color-coding helps to spot the pattern of equal powers of $x$ on diagonals.

$$
\begin{align*}
\textcolor{magenta}{x^6}& + &\textcolor{cyan}{x^5*3*b}& + &\textcolor{magenta}{x^4*3*b^2}& + &\textcolor{cyan}{x^3*b^3}& + \\
\textcolor{cyan}{x^5*3*a}& + &\textcolor{magenta}{x^4*3*3*a*b}& + &\textcolor{cyan}{x^3*3*3*a*b^2}& + &\textcolor{magenta}{x^2*3*a*b^3}& + \\
\textcolor{magenta}{x^4*3*a^2}& + &\textcolor{cyan}{x^3*3*3*a^2*b}& + &\textcolor{magenta}{x^2*3*a^2*b^2}& + &\textcolor{cyan}{x^1*3*a^2*b^3}& + \\
\textcolor{cyan}{x^3*a^3}& + &\textcolor{magenta}{x^2*3*a^3*b}& + &\textcolor{cyan}{x^1*3*a^3*b^2}& + &\textcolor{magenta}{x^0*a^3*b^3}&
\end{align*}
$$

The result of the generator below can be viewed at the [Input File](#concrete-example_playground_tests_input-txt) contents.

### sum_pattern.py {: .collapsible }

```python
class Term:
  def __init__(self, binom_n, binom_k, power_x, power_other, letter_other) -> None:
    self.binom_n     = binom_n
    self.binom_k     = binom_k
    self.power_x     = power_x
    self.power_other = power_other
    self.letter_other = letter_other

  def stringify(self) -> str:
    return f"nCr({self.binom_n},{self.binom_k})*x^{self.power_x}*{self.letter_other}^{self.power_other}"

class ResultTerm:
  def __init__(self, lhs: Term, rhs: Term):
    self.lhs = lhs
    self.rhs = rhs

def generate_result_terms(a: int) -> list[ResultTerm]:
  result_terms: list[ResultTerm] = []
  terms_n: list[Term] = []
  terms_m: list[Term] = []

  for i in range(0, a + 1):
    terms_n.append(Term(a, i, a-i, i, 'n'))
    terms_m.append(Term(a, i, a-i, i, '(-m)'))

  for i in range(0, len(terms_n)):
    n_term = terms_n[i]

    for j in range(0, len(terms_m)):
      m_term = terms_m[j]

      result_terms.append(ResultTerm(n_term, m_term))

  return result_terms

def collect_terms_by_x_power(result_terms: list[ResultTerm]) -> dict[int, list[ResultTerm]]:
  result_terms_by_x_power: dict[int, list[ResultTerm]] = {}

  for i in range(0, len(result_terms)):
    current_term = result_terms[i]
    current_x_power = current_term.lhs.power_x + current_term.rhs.power_x

    if current_x_power not in result_terms_by_x_power:
      result_terms_by_x_power[current_x_power] = []

    result_terms_by_x_power[current_x_power].append(current_term)

  return result_terms_by_x_power

def print_terms_by_x_power(a: int, result_terms_by_x_power: dict[int, list[ResultTerm]]):

  print(f"a={a}\n")

  for x_power in result_terms_by_x_power:
    result_terms = result_terms_by_x_power[x_power]

    print(f"x^{x_power}*(")

    num_result_terms = len(result_terms)
    for i in range(0, num_result_terms):
      result_term = result_terms[i]

      print(f"nCr({result_term.lhs.binom_n},{result_term.lhs.binom_k})*nCr({result_term.rhs.binom_n},{result_term.rhs.binom_k})", end="")
      print(f"*{result_term.lhs.letter_other}^{result_term.lhs.power_other}*{result_term.rhs.letter_other}^{result_term.rhs.power_other}", end="")

      if i != num_result_terms - 1:
        print(" +", end="")

      print()

    print(")\n")

def main():
  a = 5
  print_terms_by_x_power(a, collect_terms_by_x_power(generate_result_terms(a)))

if __name__ == "__main__":
  main()
```

## Concrete Example

When evaluating $(x+a)^c * (x+b)^c$ with $x=5$, $a=7$, $b=3$ and $c=4$, one receives $(5+7)^4 * (5+3)^4 = 84934656$. Expanding the same pattern as dictated by the statement offered on this page yields the same value, so things seem to check out. I have used <a href="https://github.com/blvckBytes/GPEEE" target="_blank">GPEEE</a> in order to evaluate the following long expression and attached enough information below to reproduce this execution.

### playground_tests_input.txt {: .collapsible }

```txt
5^0 * (
  nCr(4,4)*nCr(4,4)*7^4*3^4
) +
5^1 * (
  nCr(4,4)*nCr(4,3)*7^4*3^3 +
  nCr(4,3)*nCr(4,4)*7^3*3^4
) +
5^2 * (
  nCr(4,4)*nCr(4,2)*7^4*3^2 +
  nCr(4,3)*nCr(4,3)*7^3*3^3 +
  nCr(4,2)*nCr(4,4)*7^2*3^4
) +
5^3 * (
  nCr(4,4)*nCr(4,1)*7^4*3^1 +
  nCr(4,3)*nCr(4,2)*7^3*3^2 +
  nCr(4,2)*nCr(4,3)*7^2*3^3 +
  nCr(4,1)*nCr(4,4)*7^1*3^4
) +
5^4 * (
  nCr(4,4)*nCr(4,0)*7^4*3^0 +
  nCr(4,3)*nCr(4,1)*7^3*3^1 +
  nCr(4,2)*nCr(4,2)*7^2*3^2 +
  nCr(4,1)*nCr(4,3)*7^1*3^3 +
  nCr(4,0)*nCr(4,4)*7^0*3^4
) +
5^5 * (
  nCr(4,0)*nCr(4,3)*7^0*3^3 +
  nCr(4,1)*nCr(4,2)*7^1*3^2 +
  nCr(4,2)*nCr(4,1)*7^2*3^1 +
  nCr(4,3)*nCr(4,0)*7^3*3^0
) +
5^6 * (
  nCr(4,0)*nCr(4,2)*7^0*3^2 +
  nCr(4,1)*nCr(4,1)*7^1*3^1 +
  nCr(4,2)*nCr(4,0)*7^2*3^0
) +
5^7 * (
  nCr(4,0)*nCr(4,1)*7^0*3^1 +
  nCr(4,1)*nCr(4,0)*7^1*3^0
) +
5^8 * (
  nCr(4,0)*nCr(4,0)*7^0*3^0
)
```
### PlaygroundTests.java {: .collapsible }

```java
package me.blvckbytes.gpeee;

import me.blvckbytes.gpeee.functions.AExpressionFunction;
import me.blvckbytes.gpeee.functions.ExpressionFunctionArgument;
import me.blvckbytes.gpeee.interpreter.EvaluationEnvironmentBuilder;
import me.blvckbytes.gpeee.interpreter.IEvaluationEnvironment;
import me.blvckbytes.gpeee.parser.expression.AExpression;
import org.jetbrains.annotations.Nullable;
import org.junit.jupiter.api.Test;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Logger;

public class PlaygroundTests {

  private int factorial(int n) {
    int result = 1;

    if (n > 1) {
      for (int i = 2; i <= n; ++i)
        result *= i;
    }

    return result;
  }

  private String readInputFile() {
    StringBuilder result = new StringBuilder();

    try (
      InputStream resourceStream = getClass().getResourceAsStream("/playground_tests_input.txt")
    ) {
      if (resourceStream == null)
        throw new IllegalStateException("Could not find input file in resources folder");

      BufferedReader reader = new BufferedReader(new InputStreamReader(resourceStream));

      String line;
      while ((line = reader.readLine()) != null)
        result.append(line);
    } catch (IOException e) {
      throw new RuntimeException(e);
    }

    return result.toString();
  }

  @Test
  void myTests() {
    GPEEE evaluator = new GPEEE(Logger.getGlobal());

    IEvaluationEnvironment environment = new EvaluationEnvironmentBuilder()
      .withFunction("ncr", new AExpressionFunction() {

        @Override
        public Object apply(IEvaluationEnvironment environment, List<@Nullable Object> args) {
          assert args.size() == 2;

          int n = (int) environment.getValueInterpreter().asLong(args.get(0));
          int k = (int) environment.getValueInterpreter().asLong(args.get(1));

          return factorial(n) / (factorial(k) * factorial(n-k));
        }

        @Override
        public List<ExpressionFunctionArgument> getArguments() {
          return Arrays.asList(
            new ExpressionFunctionArgument("n", "binomial coefficient n", true),
            new ExpressionFunctionArgument("k", "binomial coefficient k", true)
          );
        }
      })
      .build();

    AExpression inputExpression = evaluator.parseString(readInputFile());
    Object result = evaluator.evaluateExpression(inputExpression, environment);
    System.out.println("result=" + result);
  }
}
```