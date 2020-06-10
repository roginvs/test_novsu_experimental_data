import { log, getNormalSet, getEstimateMean, getEstimateD, summ } from "./lib";
import { student, inv_student } from "./stat";

const DIST_SIGMA = 4;
const DIST_A = 50;

const data1 = getNormalSet(102).map((x) => Math.round(x * DIST_SIGMA + DIST_A));

const n = data1.length;

const HIDDEN_A = 5;
const HIDDEN_B = 40;
const HIDDEN_A_RAND = 2;
const HIDDEN_B_RAND = 100;
const data2 = data1.map((x) =>
  Math.round(
    (Math.random() > 0.3 ? x : DIST_A) *
      (HIDDEN_A + Math.random() * HIDDEN_A_RAND) +
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
const TOP = yMax + 10;
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

const corr =
  summ(0, n - 1, (i) => (data1[i] - M1) * (data2[i] - M2)) /
  Math.sqrt(
    summ(0, n - 1, (i) => (data1[i] - M1) ** 2) *
      summ(0, n - 1, (i) => (data2[i] - M2) ** 2)
  );

log(`Коэффициент корреляции = ${corr}`);

const tValue = (corr * Math.sqrt(n - 2)) / Math.sqrt(1 - corr ** 2);

log(`t=${tValue}`);
// log(`Вероятность Стьюдента = ${student(n - 2, tValue)}`);
for (const alpha of [0.1, 0.05, 0.01, 0.001, 0.0001]) {
  const tCrit = inv_student(n - 2, 1 - alpha / 2);

  log(
    `  α=${alpha} tCrit = ${tCrit.toFixed(2)} ${
      tValue > tCrit ? "достоверна" : "нет оснований для достоверности"
    }`
  );
}
