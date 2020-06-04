import { getNormalSet, getEstimateMean, getEstimateD } from "./lib";

const logDiv = document.getElementById("log") as HTMLDivElement;

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

function log(s: string) {
  const line = document.createElement("div");
  line.innerHTML = s;
  logDiv.appendChild(line);
}

const n = 20;
const mySelection = getNormalSet(n).map((x) => Math.round(x * 10) + 30);

mySelection.sort((a, b) => a - b);
log("Выборка:");
log(mySelection.map((x) => x).join(" "));
const min = mySelection[0];
const max = mySelection[n - 1];
const len = max - min;
log(`Размах = ${len}`);

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

const M = 1 + Math.floor(Math.log2(n));

const h = len / M;

log(`Кол-во диапазонов=${M}, размер каждого=${h}`);

const context = canvas.getContext("2d");

const X_SCALE = 5;
const Y_SCALE = 1000;
const Y_HEIGHT = 100;

let pos = 0;
for (let i = 0; i < M; i++) {
  const to = min + h * (i + 1);
  let count = 0;
  while (pos < n && mySelection[pos] < to) {
    pos++;
    count++;
  }
  if (i === M - 1) {
    count += 1;
  }

  const heightRaw = count / (n * h);
  log(
    `  Диапазон ${
      to - h
    }..${to} имеет ${count} элементов, высота = ${heightRaw}`
  );

  const x = X_SCALE * (min + h * i);
  const width = X_SCALE * h;
  const height = Y_SCALE * heightRaw;
  const y = Y_HEIGHT - 20 - height;
  console.info(x, y, width, height);
  context.rect(x, y, width, height);
  context.fill();
}
