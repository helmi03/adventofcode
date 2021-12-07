let valsstr = `16,1,2,0,4,2,7,1,2,14`;
let crabs = valsstr.split(",").map((v) => parseInt(v));
let fs = require("fs");
crabs = fs
  .readFileSync("input7.txt")
  .toString()
  .split(",")
  .map((v) => parseInt(v));

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

// crab submarines can only move horizontally
// list of the horizontal position of each crab
function cost(leastFuel = 2) {
  const f = crabs
    .map((c) => {
      return Math.abs(c - leastFuel);
    })
    .reduce((a, b) => a + b);
  return f;
}

const x = crabs.filter(onlyUnique).map((c) => cost(c));
console.log(Math.min(...x));

function costpart2(leastFuel = 5) {
  // console.log(crabs);
  let sum = 0;
  const f = crabs
    .map((c) => {
      return Math.abs(c - leastFuel);
    })
    .forEach((c) => {
      for (let i = 1; i <= c; i++) {
        sum += i;
      }
    });
  return sum;
}

const x2 = [...Array(Math.max(...crabs)).keys()].map((c) => costpart2(c));
console.log("min2", Math.min(...x2));
