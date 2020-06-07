import { getNormalSet, getEstimateMean, getEstimateD, log } from "./lib";
import { inv_standart_deviation, inv_student, inv_chi_square } from "./stat";

const a = 10;
const b = 20;

log(`Используем равномерное a=${a} b=${b}`);

for (const n of [20, 100]) {
  const mySelection = new Array(n)
    .fill(0)
    .map(() => Math.random() * (b - a) + a);

  mySelection.sort((a, b) => a - b);
  log(`Выборка из n=${n} элементов:`);
  log(mySelection.map((x) => x.toFixed(2)).join(" "));

  const M = 1 + Math.floor(Math.log2(n));

  const min = mySelection[0];
  const max = mySelection[n - 1];
  const len = max - min;
  const h = len / M;
  log(
    `Кол-во диапазонов=${M}, min=${min.toFixed(2)} max=${max.toFixed(
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
      count += 1;
    }

    observedRanges[currentRange] = count;
  }

  let tmpHealthCheck = 0;
  observedRanges.forEach((r) => (tmpHealthCheck += r));
  if (tmpHealthCheck !== n) {
    log("ВНУТРЕННАЯ ОШИБКА");
  }

  const F = (x: number) => (x < a ? 0 : x > b ? 1 : (x - a) / (b - a));
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
  log(`δ=${delta}`);

  for (const alpha of [0.1, 0.05, 0.01]) {
    log(`  α=${alpha}`);
    const tau = inv_chi_square(n - 1, 1 - alpha);
    log(`    τ(n-1,1-α)=${tau.toFixed(2)}`);
    if (delta <= tau) {
      log(`    δ ≤ τ, гипотеза не отвергается`);
    } else {
      log(`    δ > τ, гипотеза отвергается`);
    }
  }
  log("");
}
