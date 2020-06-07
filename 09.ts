import { getNormalSet, getEstimateMean, getEstimateD, log } from "./lib";
import { inv_standart_deviation, inv_student, inv_chi_square } from "./stat";
import { doChiSquare } from "./09lib";

const a = 10;
const b = 20;
const F = (x: number) => (x < a ? 0 : x > b ? 1 : (x - a) / (b - a));

for (const useDistortion of [false, true]) {
  if (useDistortion) {
    log(`Используем равномерное a=${a} b=${b} с искажениями`);
  } else {
    log(`Используем равномерное a=${a} b=${b}`);
  }

  for (const n of [20, 100]) {
    const mySelection = new Array(n)
      .fill(0)
      .map(() => Math.random() * (b - a) + a);

    if (useDistortion) {
      for (let i = 0; i < n / 2; i++) {
        mySelection[i] = (b - a) / 2 + a;
      }
    }

    doChiSquare(n, mySelection, F);
  }

  log("");
}
