const logDiv = document.getElementById("log") as HTMLDivElement;

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

function log(s: string) {
  const line = document.createElement("div");
  line.innerHTML = s;
  logDiv.appendChild(line);
}

function getNormalSet(n: number) {
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

const n = 20;
const mySelection = getNormalSet(n).map((x) => Math.round(x * 10));

mySelection.sort((a, b) => a - b);
log("Выборка:");
log(mySelection.map((x) => x).join(" "));
log(`Размах = ${mySelection[n - 1] - mySelection[0]}`);

let longestSeries = 1;
let currentSeries = 1;
let longestSeriesValue = 0;
let previousValue = mySelection[0];
for (let i = 1; i < n; i++) {
  const val = mySelection[i];
  if (val === previousValue) {
    currentSeries++;
  } else {
    if (currentSeries > longestSeries) {
      longestSeries = currentSeries;
      longestSeriesValue = previousValue;
    }
    currentSeries = 1;
  }
  previousValue = val;
}
log(`Мода = ${longestSeriesValue} (${longestSeries} раз)`);

const median =
  (mySelection[Math.floor(n / 2) - 1] + mySelection[Math.floor(n / 2)]) / 2;
log(`Медиана = ${median}`);
