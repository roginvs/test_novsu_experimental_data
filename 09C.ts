import { stdcdf } from "./stat";
import { log, getEstimateMean, getEstimateD } from "./lib";

function validate_set(data: number[]) {
  const n = data.length;
  log(`  Выборка из n=${n} элементов`);
  const M = getEstimateMean(data, n);
  const D = getEstimateD(data, M, n);
  const stddev = Math.sqrt(D);
  log(
    `  Оценка M=${M.toFixed(2)} D=${D.toFixed(2)} stddev=${stddev.toFixed(2)}`
  );

  data.sort();

  const observedValuesCount = new Array(6);
}

validate_set([1, 2, 3, 4, 5, 2, 3, 4]);
