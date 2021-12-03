let vals = [
  "00100",
  "11110",
  "10110",
  "10111",
  "10101",
  "01111",
  "00111",
  "11100",
  "10000",
  "11001",
  "00010",
  "01010",
];
let fs = require("fs");
vals = fs.readFileSync("input3.txt").toString().split("\n");

let bitlength = vals[0].length;
let gamma = [];
let epsilon = [];
for (let i = 0; i < bitlength; i++) {
  let total0 = 0;
  let total1 = 0;
  vals.forEach((val) => {
    val[i] === "0" ? total0++ : total1++;
  });
  // push bigger total0 total1 to gamma
  gamma.push(total0 > total1 ? "0" : "1");
  epsilon.push(total0 < total1 ? "0" : "1");
}
console.log("gamma", parseInt(gamma.join(""), 2));
console.log("epsilon", parseInt(epsilon.join(""), 2));
console.log(
  "multiplication",
  parseInt(gamma.join(""), 2) * parseInt(epsilon.join(""), 2)
);

let gamma2 = [...vals];
for (let i = 0; i < bitlength; i++) {
  let total0 = 0;
  let total1 = 0;
  gamma2.forEach((val) => {
    val[i] === "0" ? total0++ : total1++;
  });
  gamma2 = gamma2.filter((val) => {
    return val[i] === (total1 >= total0 ? "1" : "0");
  });
  if (gamma2.length === 1) {
    break;
  }
}

let epsilon2 = [...vals];

for (let i = 0; i < bitlength; i++) {
  let total0 = 0;
  let total1 = 0;
  epsilon2.forEach((val) => {
    val[i] === "0" ? total0++ : total1++;
  });
  epsilon2 = epsilon2.filter((val) => {
    return val[i] === (total0 <= total1 ? "0" : "1");
  });
  if (epsilon2.length === 1) {
    break;
  }
}

console.log(
  "multiplication",
  parseInt(gamma2[0], 2) * parseInt(epsilon2[0], 2)
);
