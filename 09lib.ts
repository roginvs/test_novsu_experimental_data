import { log } from "./lib";
import { inv_chi_square, chi_square } from "./stat";

export function doChiSquare(
  n: number,
  mySelection: number[],
  F: (x: number) => number
) {
  mySelection.sort((a, b) => a - b);
  log(`  Выборка из n=${n} элементов:`);
  //log(mySelection.map((x) => x.toFixed(2)).join(" "));

  const M = 1 + Math.floor(Math.log2(n));

  const min = mySelection[0];
  const max = mySelection[n - 1];
  const len = max - min;
  const h = len / M;
  log(
    `  Кол-во диапазонов=${M}, min=${min.toFixed(2)} max=${max.toFixed(
      2
    )} len=${len.toFixed(2)} h=${h.toFixed(2)}`
  );

  const observedRanges = new Array(M).fill(0);
  let currentPos = 0;
  for (let currentRange = 0; currentRange < M; currentRange++) {
    const to = min + h * (currentRange + 1);

    let count = 0;
    while (currentPos < n && mySelection[currentPos] < to) {
      currentPos++;
      count++;
    }

    if (currentRange === M - 1) {
      if (to <= max) {
        count += 1;
      }
    }

    observedRanges[currentRange] = count;
  }

  let tmpHealthCheck = 0;
  observedRanges.forEach((r) => (tmpHealthCheck += r));
  if (tmpHealthCheck !== n) {
    log(` ВНУТРЕННАЯ ОШИБКА o=${tmpHealthCheck} n=${n}`);
    console.info(mySelection);
    throw new Error();
  }

  const expectedProbability = new Array(M).fill(0).map((_, idx) => {
    return F(min + (idx + 1) * h) - F(min + idx * h);
  });

  expectedProbability.forEach((x) => (tmpHealthCheck += x));

  let delta = 0;
  for (let i = 0; i < M; i++) {
    delta +=
      (observedRanges[i] / n - expectedProbability[i]) ** 2 /
      expectedProbability[i];
  }
  delta *= n;
  log(`  δ=${delta}`);
  const probability = chi_square(n - 1, delta);
  log(
    `    Вероятность ошибки при отвергнутой гипотезе = ${(
      (1 - probability) *
      100
    ).toFixed(4)}%`
  );

  for (const alpha of [0.1, 0.05, 0.01]) {
    log(`    α=${alpha} (${alpha * 100}%)`);
    const tau = inv_chi_square(M - 1, 1 - alpha);
    log(`      τ(M-1,1-α)=${tau.toFixed(2)}`);
    if (delta <= tau) {
      log(`      δ ≤ τ, гипотеза не отвергается`);
    } else {
      log(`      δ > τ, гипотеза отвергается`);
    }
  }
  //log("");
}
