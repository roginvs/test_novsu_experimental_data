import { getNormalSet, getEstimateMean, getEstimateD, log, nbsp } from "./lib";
// import { icdf as icdf2 } from "norm-dist";
import * as jsstats from "js-stats";

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

function icdf(n: number): number {
  const normalDistribution = new jsstats.NormalDistribution(0, 1);
  return normalDistribution.invCumulativeProbability(n);
}
function student(degreesOfFreedom: number, probabilty: number) {
  const t_distribution = new jsstats.TDistribution(degreesOfFreedom);
  const t_df = t_distribution.invCumulativeProbability(probabilty);
  return t_df;
}

log("");
for (const alpha of [0.1, 0.05, 0.01]) {
  log(`𝛼=${alpha} (${((1 - alpha) * 100).toFixed(2)}%)`);
  log(`  При известной дисперсии`);

  const u_a_input = 1 - alpha / 2;
  const u: number = icdf(u_a_input);
  log(`    1-𝛼/a = ${u_a_input}`);
  log(`    u(1-𝛼/2)=${u}`);
  //log(`    u(1-𝛼/2)=${icdf2(u_a_input)}`);

  const err = (u * DIST_SIGMA) / Math.sqrt(n);

  const a = selectionMean - err;
  const b = selectionMean + err;
  log(`    Интервал = [${a.toFixed(2)} .. ${b.toFixed(2)}]`);

  log(`  При неизвестной дисперсии`);
  const student_quantile = student(n - 1, u_a_input);
  log(`    τ(n-1, 1-𝛼/2)=${student_quantile}`);
  log(`    S=${selectionS}`);
  const err2 = (student_quantile * selectionS) / Math.sqrt(n);
  const a2 = selectionMean - err2;
  const b2 = selectionMean + err2;
  log(`    Интервал = [${a2.toFixed(2)} .. ${b2.toFixed(2)}]`);

  log(nbsp);
}
