import { log, getNormalSet, getEstimateMean, getEstimateD } from "./lib";

const DIST_SIGMA = 4;
const DIST_A = 50;

const data1 = getNormalSet(100).map((x) => Math.round(x * DIST_SIGMA + DIST_A));

const n = data1.length;

const HIDDEN_A = 5;
const HIDDEN_B = 10;
const HIDDEN_A_RAND = 2;
const HIDDEN_B_RAND = 4;
const data2 = data1.map((x) =>
  Math.round(
    x * (HIDDEN_A + Math.random() * HIDDEN_A_RAND) +
      HIDDEN_B +
      HIDDEN_B_RAND * Math.random()
  )
);

log(`Выборка из n=${n} элементов`);

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d");

const X_SCALE = 10;
const Y_SCALE = 1;

const xMax = Math.max(...data1);
const yMax = Math.max(...data2);

canvas.width = xMax * X_SCALE + 10;
canvas.height = yMax * Y_SCALE + 10;
const TOP = yMax - 10;
for (let i = 0; i < n; i++) {
  const xRaw = data1[i];
  const yRaw = data2[i];

  context.beginPath();
  context.arc(xRaw * X_SCALE, TOP - yRaw * Y_SCALE, 2, 0, 2 * Math.PI);
  context.stroke();
}

const M1 = getEstimateMean(data1, n);
const M2 = getEstimateMean(data2, n);
const D1 = getEstimateD(data1, M1, n);
const D2 = getEstimateD(data2, M2, n);

for (const x of [M1, M1 - Math.sqrt(D1), M1 + Math.sqrt(D1)]) {
  context.strokeText(`${x.toFixed(2)}`, x * X_SCALE, TOP - 10);
}
for (const y of [M2, M2 - Math.sqrt(D2), M2 + Math.sqrt(D2)]) {
  context.strokeText(`${y.toFixed(2)}`, 0, TOP - y * Y_SCALE);
}
