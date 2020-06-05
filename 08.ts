import { getNormalSet, getEstimateMean, getEstimateD, log, nbsp } from "./lib";
// import { icdf as icdf2 } from "norm-dist";
import * as jsstats from "js-stats";

const n = 20;

const DIST_SIGMA = 10;
const DIST_A = 30;

log(`Выборка из N[${DIST_A}, ${DIST_SIGMA}²]`);
const mySelection = getNormalSet(n).map((x) =>
  Math.round(x * DIST_SIGMA + DIST_A)
);

mySelection.sort((a, b) => a - b);
log("Выборка:");
log(mySelection.map((x) => x).join(" "));

const selectionMean = getEstimateMean(mySelection, n);
const selectionD = getEstimateD(mySelection, selectionMean, n);
log(`Среднее = ${selectionMean}`);

log(nbsp);

function icdf(n: number): number {
  const normalDistribution = new jsstats.NormalDistribution(0, 1);
  return normalDistribution.invCumulativeProbability(n);
}

log("При известной дисперсии:");
for (const alpha of [0.1, 0.05, 0.01]) {
  log(`  𝛼=${alpha}`);

  const u_a_input = 1 - alpha / 2;
  const u: number = icdf(u_a_input);
  log(`    1-𝛼/a = ${u_a_input}`);
  log(`    u(1-𝛼/2)=${u}`);
  //log(`    u(1-𝛼/2)=${icdf2(u_a_input)}`);

  const err = (u * DIST_SIGMA) / Math.sqrt(n);

  const a = selectionMean - err;
  const b = selectionMean + err;
  log(`    Интервал = [${a.toFixed(2)} .. ${b.toFixed(2)}]`);
  log(nbsp);
}
