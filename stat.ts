import * as jsstats from "js-stats";
import { invChiSquareCDF } from "inv-chisquare-cdf";
import { js_chi_square } from "./stat.chi_square";
import { fdistr } from "./stat.statistics-distributions-001";

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

export function student(degreesOfFreedom: number, tValue: number): number {
  const t_distribution = new jsstats.TDistribution(degreesOfFreedom);
  const probability = t_distribution.cumulativeProbability(tValue);
  return probability;
}

export function inv_chi_square(
  degreesOfFreedom: number,
  probabilty: number
): number {
  const val = invChiSquareCDF(probabilty, degreesOfFreedom);
  return val;
}

export function chi_square(degreesOfFreedom: number, value: number): number {
  // js-stats version gives wrong data
  return js_chi_square(degreesOfFreedom, value);
}

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

export function fisher(df1: number, df2: number, value: number) {
  const f_distribution = new jsstats.FDistribution(df1, df2);
  const p = f_distribution.cumulativeProbability(value); // cumulative probability
  return p;
}
export function inv_fisher(df1: number, df2: number, probability = 0.05) {
  return fdistr(df1, df2, probability) as number;
}

console.info(`Self-testing inv_chi_square...`);
assert(inv_chi_square(10, 0.95), 18.3, 1);
assert(inv_chi_square(20, 0.3), 16.3, 1);
assert(inv_chi_square(6, 0.99), 16.8, 1);
assert(inv_chi_square(4 - 1, 0.95), 7.81, 1);

console.info(`Self-testing chi_square...`);
assert(chi_square(10, 18.3), 0.95);
assert(chi_square(20, 16.3), 0.3, 2);
assert(chi_square(6, 16.8), 0.99);
assert(chi_square(4 - 1, 7.81), 0.95);

console.info(`Self-testing int_student...`);
assert(inv_student(10, 0.75), 0.7);
assert(inv_student(10, 0.995), 3.169);
assert(inv_student(20, 0.95), 1.725);
assert(inv_student(15, 0.95), 1.753);

console.info(`Self-testing student...`);
assert(student(10, 0.7), 0.75);
assert(student(10, 3.169), 0.995);
assert(student(20, 1.725), 0.95);
assert(student(15, 1.753), 0.95);

console.info(`Self-testing inv_standart_deviation...`);
assert(inv_standart_deviation(0.9), 1.282);
assert(inv_standart_deviation(0.95), 1.645);
assert(inv_standart_deviation(0.99), 2.326, 1);
assert(inv_standart_deviation(0.999), 3.09, 1);

console.info(`Self-testing standart_deviation...`);
assert(std_cumulative_distribution(0), 0.5, 4);
assert(std_cumulative_distribution(1.05), 0.8531, 4);
assert(std_cumulative_distribution(0.59), 0.7224, 4);
assert(std_cumulative_distribution(3.14), 0.9992, 4);

console.info(`Self-testing fisher...`);
assert(fisher(3, 5, 5.41), 1 - 0.05);
assert(fisher(2, 12, 3.88), 1 - 0.05);
assert(fisher(12, 13, 2.6), 1 - 0.05);
assert(fisher(5, 150, 2.27), 1 - 0.05);

console.info(`Self-testing inv_fisher...`);

assert(inv_fisher(4, 7, 0.05), 4.12);
assert(inv_fisher(3, 5, 0.05), 5.41, 2);
assert(inv_fisher(2, 12, 0.05), 3.88, 1);
assert(inv_fisher(12, 13, 0.05), 2.6, 2);
assert(inv_fisher(5, 150, 0.05), 2.27, 2);

console.info(`Self-test is done`);
