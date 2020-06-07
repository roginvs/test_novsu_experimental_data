import { chi_square } from "./stat";

// Кол-во бросков
const n = 100;

// Сколько выпало орлов
const a = 40;

const delta = n*(
    (a/n - 0.5)** 2 / 0.5 +
    ((n-a)/n - 0.5)** 2 / 0.5 
);

console.info(`delta=${delta}`);

const probability = chi_square(2 - 1, delta);
console.info(`Вероятность ошибки при отвергнутой гипотезе о том, что монетка честная = ${(1-probability).toFixed(8)}`)