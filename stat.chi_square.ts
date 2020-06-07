/*
Copy-paste from view-source:https://www.math.ucla.edu/~tom/distributions/chisq.html
*/
function LogGamma(Z: number) {
  const S =
    1 +
    76.18009173 / Z -
    86.50532033 / (Z + 1) +
    24.01409822 / (Z + 2) -
    1.231739516 / (Z + 3) +
    0.00120858003 / (Z + 4) -
    0.00000536382 / (Z + 5);
  const LG =
    (Z - 0.5) * Math.log(Z + 4.5) - (Z + 4.5) + Math.log(S * 2.50662827465);

  return LG;
}

function Gcf(X: number, A: number) {
  // Good for X>A+1

  let A0 = 0;
  let B0 = 1;
  let A1 = 1;
  let B1 = X;
  let AOLD = 0;
  let N = 0;
  while (Math.abs((A1 - AOLD) / A1) > 0.00001) {
    AOLD = A1;
    N = N + 1;
    A0 = A1 + (N - A) * A0;
    B0 = B1 + (N - A) * B0;
    A1 = X * A0 + N * A1;
    B1 = X * B0 + N * B1;
    A0 = A0 / B1;
    B0 = B0 / B1;
    A1 = A1 / B1;
    B1 = 1;
  }
  const Prob = Math.exp(A * Math.log(X) - X - LogGamma(A)) * A1;

  return 1 - Prob;
}

function Gser(X: number, A: number) {
  // Good for X<A+1.

  let T9 = 1 / A;
  let G = T9;
  let I = 1;
  while (T9 > G * 0.00001) {
    T9 = (T9 * X) / (A + I);
    G = G + T9;
    I = I + 1;
  }
  G = G * Math.exp(A * Math.log(X) - X - LogGamma(A));

  return G;
}

function Gammacdf(x: number, a: number) {
  let GI;
  if (x <= 0) {
    GI = 0;
  } else if (x < a + 1) {
    GI = Gser(x, a);
  } else {
    GI = Gcf(x, a);
  }
  return GI;
}

export function js_chi_square(DF: number, Z: number) {
  if (DF <= 0) {
    throw new Error("Degrees of freedom must be positive");
  }
  const Chisqcdf = Gammacdf(Z / 2, DF / 2);
  return Chisqcdf;
}
