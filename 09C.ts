import {
  chi_square,
  inv_chi_square,
  std_cumulative_distribution,
} from "./stat";
import { log, getEstimateMean, getEstimateD } from "./lib";

function validate_set(
  data: number[],
  providedMean?: number,
  providedStddev?: number
) {
  const n = data.length;
  log(`  Выборка из n=${n} элементов`);

  let mean: number;
  let stddev;
  if (providedMean !== undefined) {
    mean = providedMean;
    log(`  M=${mean.toFixed(2)}`);
  } else {
    mean = getEstimateMean(data, n);
    log(`  Оценка M=${mean.toFixed(2)}`);
    if (providedStddev) {
      stddev = providedStddev;
      log(`  stddev=${stddev.toFixed(2)}`);
    } else {
      const estimatedD = getEstimateD(data, mean, n);
      stddev = Math.sqrt(estimatedD);
      log(`  Оценка D=${estimatedD.toFixed(2)} stddev=${stddev.toFixed(2)}`);
    }
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

  log("");
}

//validate_set([1, 2, 3, 4, 5, 2, 3, 4]);
validate_set([
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  5,
  5,
  5,
  6,
  6,
  6,
  4,
  4,
  7,
  7,
  3,
  8,
]);

validate_set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
