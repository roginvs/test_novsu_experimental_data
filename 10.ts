import {
  chi_square,
  inv_chi_square,
  std_cumulative_distribution,
  fisher,
  inv_fisher,
} from "./stat";
import { log, getEstimateMean, getEstimateD, getNormalSet } from "./lib";

function rDistribution(data: number[][]) {
  const r = data.length;
  let n = 0;
  data.forEach((arr) => (n += arr.length));
  log(
    `Имеется ${r} массивов: ${data
      .map((arr) => arr.length)
      .join(", ")}. Всего ${n} элементов`
  );
  const Aj = new Array(r).fill(0);
  data.forEach((arr, idx) => {
    arr.forEach((value) => {
      Aj[idx] += value;
    });
  });
  let A = 0;
  Aj.forEach((aj) => (A += aj));
  log(`Суммы Aj = ${Aj.join(", ")}`);
  log(`Сумма A = ${A}`);

  let Q = 0;
  data.forEach((arr) => arr.forEach((val) => (Q += val ** 2)));
  Q = Q - (A * A) / n;
  log(`Q=${Q.toFixed(2)}`);

  let Q1 = 0;
  Aj.forEach((ajVal, idx) => (Q1 += Aj[idx] ** 2 / data[idx].length));
  Q1 = Q1 - (A * A) / n;
  log(`Q1 = ${Q1.toFixed(2)}`);

  const Q2 = Q - Q1;
  log(`Q2 = ${Q2.toFixed(2)}`);

  const S12 = Q1 / (r - 1);
  const S22 = Q2 / (n - r);
  log(`S₁²=${S12.toFixed(2)}`);
  log(`S₂²=${S22.toFixed(2)}`);
  const Z = S12 / S22;
  log(`Z = ${Z.toFixed(2)}`);

  const p = fisher(r - 1, n - r, Z);
  log(
    `Достоверность = F(${r - 1}, ${n - r}, ${Z.toFixed(2)}) = ${p.toFixed(4)}`
  );

  for (const alpha of [0.1, 0.05, 0.01]) {
    log(`  α=${alpha} (${alpha * 100}%)`);
    const fisherPercentile = inv_fisher(r - 1, n - r, alpha);
    if (fisherPercentile > Z) {
      log(`  Перцентиль=${fisherPercentile} > Z, гипотеза не отвергается`);
    } else {
      log(`  Перцентиль=${fisherPercentile} ≤ Z, гипотеза отвергается`);
    }
  }
}

const DIST_SIGMA = 4;
const DIST_A = 50;

const mySelections = [50, 80, 70].map((n) =>
  getNormalSet(n).map((x) => Math.round(x * DIST_SIGMA + DIST_A))
);
mySelections.push(
  getNormalSet(60).map((x) => Math.round(x * DIST_SIGMA + DIST_A + 1))
);

// https://www.matburo.ru/Examples/Files/ms_da_1.pdf
const sampleData = [
  [18, 28, 12, 14, 32],
  [24, 36, 28, 40, 16],
  [36, 12, 22, 45, 40],
];

rDistribution(mySelections);
