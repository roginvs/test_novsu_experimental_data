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
  const cs_distribution = new jsstats.ChiSquareDistribution(degreesOfFreedom);
  const probability = cs_distribution.cumulativeProbability(value);
  return probability;
}

const epsilon = 0.01;
function assert(x1: number, x2: number) {
  const digits = 10;
  if (Math.round(x1 * digits) != Math.round(x2 * digits)) {
    throw new Error(
      `x1=${x1} ${Math.round(x1 * digits)} x2=${x2} ${Math.round(x2 * digits)}`
    );
  }

  const warnDigits = 100;
  if (Math.round(x1 * warnDigits) != Math.round(x2 * warnDigits)) {
    console.warn(
      `Self-check warning: x1=${x1} x2=${x2} (${Math.round(
        x1 * warnDigits
      )}, ${Math.round(x2 * warnDigits)})`
    );
  }
}

console.info(`Self-testing...`);
assert(inv_chi_square(10, 0.95), 18.3);
assert(inv_chi_square(20, 0.3), 16.3);
assert(inv_chi_square(6, 0.99), 16.8);
assert(inv_chi_square(4 - 1, 0.95), 7.81);
console.info(`Self-test is done`);
