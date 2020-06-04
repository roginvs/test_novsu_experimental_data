import { getNormalSet, getEstimateMean, getEstimateD } from "./lib";

const logDiv = document.getElementById("log") as HTMLDivElement;

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

function log(s: string) {
  const line = document.createElement("div");
  line.innerHTML = s;
  logDiv.appendChild(line);
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
const mean = getEstimateMean(mySelection, n);
log(`Среднее = ${mean}`);
log(`Дисперсия = ${getEstimateD(mySelection, mean, n)}`);
