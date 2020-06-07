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
