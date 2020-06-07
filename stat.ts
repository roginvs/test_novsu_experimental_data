import * as jsstats from "js-stats";
import { invChiSquareCDF } from "inv-chisquare-cdf";

export function std_cumulative_distribution(n: number): number {
  const normalDistribution = new jsstats.NormalDistribution(0, 1);
  return normalDistribution.cumulativeProbability(n);
}

export function inv_standart_deviation(n: number): number {
  const normalDistribution = new jsstats.NormalDistribution(0, 1);
  return normalDistribution.invCumulativeProbability(n);
}
export function inv_student(
  degreesOfFreedom: number,
  probabilty: number
): number {
  const t_distribution = new jsstats.TDistribution(degreesOfFreedom);
  const t_df = t_distribution.invCumulativeProbability(probabilty);
  return t_df;
}

export function inv_chi_square(
  degreesOfFreedom: number,
  probabilty: number
): number {
  const val = invChiSquareCDF(probabilty, degreesOfFreedom);
  return val;
}

export function chi_square(degreesOfFreedom: number, value: number): number {
  const cs_distribution = new jsstats.ChiSquareDistribution(
    degreesOfFreedom - 1
  );
  const probability = cs_distribution.cumulativeProbability(value);
  return probability;
}

const epsilon = 0.01;
function assert(x1: number, x2: number, errDigits = 3) {
  const digits = 10 ** errDigits;
  if (Math.round(x1 * digits) != Math.round(x2 * digits)) {
    throw new Error(
      `x1=${x1} ${Math.round(x1 * digits)} x2=${x2} ${Math.round(x2 * digits)}`
    );
  }

  const warnDigits = 10 ** (errDigits + 2);
  if (Math.round(x1 * warnDigits) != Math.round(x2 * warnDigits)) {
    console.warn(
      `Self-check warning: x1=${x1} x2=${x2} (${Math.round(
        x1 * warnDigits
      )}, ${Math.round(x2 * warnDigits)})`
    );
  }
}

console.info(`Self-testing inv_chi_square...`);
assert(inv_chi_square(10, 0.95), 18.3, 1);
assert(inv_chi_square(20, 0.3), 16.3, 1);
assert(inv_chi_square(6, 0.99), 16.8, 1);
assert(inv_chi_square(4 - 1, 0.95), 7.81, 1);

/*
console.info(`Self-testing chi_square...`);
assert(chi_square(10, 18.3), 0.95);
assert(chi_square(20, 16.3), 0.3);
assert(chi_square(6, 16.8), 0.99);
assert(chi_square(4 - 1, 7.81), 0.95);
*/

console.info(`Self-testing int_student...`);
assert(inv_student(10, 0.75), 0.7);
assert(inv_student(10, 0.995), 3.169);
assert(inv_student(20, 0.95), 1.725);
assert(inv_student(15, 0.95), 1.753);
console.info(`Self-test is done`);
