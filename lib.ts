export function getEstimateMean(values: number[], N: number) {
  if (values.length !== N) {
    throw new Error("Wrong N");
  }
  return values.reduce((cur, acc) => cur + acc, 0) / N;
}

export function getEstimateD(
  values: number[],
  estimatedMean: number,
  N: number
) {
  if (values.length !== N) {
    throw new Error("Wrong N");
  }
  return (
    values.map((x) => x * x).reduce((cur, acc) => cur + acc, 0) / (N - 1) -
    (N * (estimatedMean * estimatedMean)) / (N - 1)
  );
}

export function getNormalSet(n: number) {
  const a = 0;
  const b = 1;
  const M_each = (b - a) / 2 + a;
  const D_each = (b - a) ** 2 / 12;

  const sum_n = 12;

  const selection: number[] = [];
  for (let i = 0; i < n; i++) {
    let sum_value = 0;
    for (let ii = 0; ii < sum_n; ii++) {
      const rand = Math.random();
      const val_intermidiate = a + rand * (b - a);
      sum_value += val_intermidiate;
    }
    const val =
      (sum_value - sum_n * M_each) / (Math.sqrt(D_each) * Math.sqrt(sum_n));
    selection.push(val);
  }
  return selection;
}

export function log(s: string) {
  const logDiv = document.getElementById("log") as HTMLDivElement;

  const line = document.createElement("div");
  line.innerHTML = s;
  logDiv.appendChild(line);
}
