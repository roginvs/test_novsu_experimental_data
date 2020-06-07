import { getNormalSet, getEstimateMean, getEstimateD, log } from "./lib";
import { inv_standart_deviation, inv_student, inv_chi_square } from "./stat";
import { doChiSquare } from "./09lib";

function doEqual(useDistortion: boolean) {
  const a = 10;
  const b = 20;
  const F = (x: number) => (x < a ? 0 : x > b ? 1 : (x - a) / (b - a));

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

function doExponental(lambda = 0.3) {
  const F = (x: number) => (x <= 0 ? 0 : 1 - Math.exp(-lambda * x));

  log(`Используем показательное распределение, lambda=${lambda}`);
  for (const n of [20, 100]) {
    const mySelection = new Array(n).fill(0).map(() => {
      const r = Math.random();
      const val = (-1 / lambda) * Math.log(1 - r);
      return val;
    });

    doChiSquare(n, mySelection, F);
  }

  log("");
}

for (const useDistortion of [false, true]) {
  doEqual(useDistortion);
}

doExponental();
