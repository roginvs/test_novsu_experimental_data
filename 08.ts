import { getNormalSet, getEstimateMean, getEstimateD, log, nbsp } from "./lib";
import { inv_standart_deviation, inv_student, inv_chi_square } from "./stat";

const DIST_SIGMA = 4;
const DIST_A = 50;

log(`Выборка из N[${DIST_A}, ${DIST_SIGMA}²]`);
const mySelection = getNormalSet(20).map((x) =>
  Math.round(x * DIST_SIGMA + DIST_A)
);

/*
const mySelection = [
  ...new Array(10).fill(-1),
  ...new Array(5).fill(0),
  ...new Array(15).fill(1),
  ...new Array(15).fill(2),
  ...new Array(5).fill(3),
];
*/

const n = mySelection.length;

mySelection.sort((a, b) => a - b);
log(`Выборка из n=${n} элементов:`);
log(mySelection.map((x) => x).join(" "));

const selectionMean = getEstimateMean(mySelection, n);
const selectionD = getEstimateD(mySelection, selectionMean, n);
const selectionS = Math.sqrt(selectionD);
log(`Среднее выборки = ${selectionMean}`);
log(`S² = ${selectionD}, S=${selectionS}`);

log(nbsp);

log("");
for (const alpha of [0.1, 0.05, 0.01]) {
  log(`𝛼=${alpha} (${((1 - alpha) * 100).toFixed(2)}%)`);
  log(`  Мат.ожидание при известной дисперсии`);

  const u_a_input = 1 - alpha / 2;
  const u: number = inv_standart_deviation(u_a_input);
  log(`    1-𝛼/a = ${u_a_input}`);
  log(`    u(1-𝛼/2)=${u}`);

  const err = (u * DIST_SIGMA) / Math.sqrt(n);

  const a = selectionMean - err;
  const b = selectionMean + err;
  log(`    Интервал = [${a.toFixed(2)} .. ${b.toFixed(2)}]`);

  log(`  Мат.ожидание при неизвестной дисперсии`);
  const student_quantile = inv_student(n - 1, u_a_input);
  log(`    τ(n-1, 1-𝛼/2)=${student_quantile}`);
  log(`    S=${selectionS}`);
  const err2 = (student_quantile * selectionS) / Math.sqrt(n);
  const a2 = selectionMean - err2;
  const b2 = selectionMean + err2;
  log(`    Интервал = [${a2.toFixed(2)} .. ${b2.toFixed(2)}]`);

  log(`  Дисперсия`);
  const z1 = inv_chi_square(n - 1, 1 - alpha / 2);
  const z2 = inv_chi_square(n - 1, alpha / 2);
  log(`    z1=${z1}`);
  log(`    z2=${z2}`);

  const Da = (n * selectionD) / z1;
  const Db = (n * selectionD) / z2;
  log(`    ВНИМАНИЕ: Еспользуется N вместо N-1`);
  log(`    Интервал = [${Da.toFixed(2)}..${Db.toFixed(2)}]`);

  log(nbsp);
}
