import {
  chi_square,
  inv_chi_square,
  std_cumulative_distribution,
} from "./stat";
import { log, getEstimateMean, getEstimateD, getNormalSet } from "./lib";

function validate_set(
  data: number[],
  providedMean?: number,
  providedStddev?: number
) {
  const n = data.length;

  let mean: number;
  let stddev: number;
  if (providedMean !== undefined) {
    mean = providedMean;
    log(`  M=${mean.toFixed(2)}`);
  } else {
    mean = getEstimateMean(data, n);
    log(`  Оценка M=${mean.toFixed(2)}`);
  }
  if (providedStddev) {
    stddev = providedStddev;
    log(`  stddev=${stddev.toFixed(2)}`);
  } else {
    const estimatedD = getEstimateD(data, mean, n);
    stddev = Math.sqrt(estimatedD);
    log(`  Оценка D=${estimatedD.toFixed(2)} stddev=${stddev.toFixed(2)}`);
  }

  data.sort();

  const M = 6;
  const step = stddev;
  if (M % 2 != 0) {
    throw new Error("Unsupported M");
  }
  const observedValuesCount = new Array(M);
  const expectedProbabilities = new Array(M);
  const Mhalf = Math.floor(M / 2);
  for (let i = 0; i < M; i++) {
    const from = mean + (i - Mhalf) * step;
    const to = from + step;

    let count = 0;
    data.forEach((v) => {
      if (v >= from && (i == M - 1 ? v <= to : v < to)) {
        count += 1;
      }
    });
    observedValuesCount[i] = count;

    const expectedProbability =
      std_cumulative_distribution((to - mean) / stddev) -
      std_cumulative_distribution((from - mean) / stddev);
    expectedProbabilities[i] = expectedProbability;
    log(
      `    Диапазон ${from.toFixed(2)}..${to.toFixed(
        2
      )} полученно=${count} доля=${(count / n).toFixed(2)}` +
        ` ожидаемая_вероятность=${expectedProbability.toFixed(2)}`
    );
  }
  let delta = 0;
  for (let i = 0; i < M; i++) {
    delta +=
      (observedValuesCount[i] / n - expectedProbabilities[i]) ** 2 /
      expectedProbabilities[i];
  }
  delta *= n;
  log(`  δ=${delta}`);
  const probability = chi_square(M - 1, delta);
  log(
    `  Вероятность ошибки при отвергнутой гипотезе = ${(
      (1 - probability) *
      100
    ).toFixed(4)}%`
  );
}

const DIST_SIGMA = 4;
const DIST_A = 50;

for (const n of [20, 100]) {
  log(
    `Выборка из случайного распередения N[${DIST_A}, ${DIST_SIGMA}²] из n=${n} элементов`
  );

  const mySelection = getNormalSet(n).map((x) =>
    Math.round(x * DIST_SIGMA + DIST_A)
  );
  log(`При известных α и σ`);
  validate_set(mySelection, DIST_A, DIST_SIGMA);
  log(`При неизвестных α и σ`);
  validate_set(mySelection);

  log("");
}

const equalSet = [
  ...new Array(40).fill(10),
  ...new Array(40).fill(11),
  ...new Array(40).fill(12),
  ...new Array(40).fill(13),
  ...new Array(40).fill(14),
  ...new Array(40).fill(15),
];
log(`Выборка из равномерного распределения n=${equalSet.length}`);
validate_set(equalSet);
