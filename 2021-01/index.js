var fs = require("fs");
var array = fs.readFileSync("input.txt").toString().split("\n");

let lastVal = 0;
let sum = 0;
let lastSum = 0;
let inc = 0;
let inc2 = 0;
let isFirstSum = false;
let vals = [];
for (i in array) {
  const v = parseInt(array[i]);
  vals.push(v);

  if (vals.length === 3) {
    sum = vals.reduce((a, b) => a + b);
    // console.log("idx", idx, "lastSum", lastSum, "sum", sum);
    vals.shift(vals[0]);
    if (!isFirstSum) {
      isFirstSum = true;
    } else {
      if (sum > lastSum) {
        inc2++;
        // console.log("inc");
        lastSum = sum;
        sum = 0;
      } else {
        lastSum = sum;
      }
    }
  }
  if (lastVal > 0 && v > lastVal) {
    inc++;
  }
  lastVal = v;
}

console.log(inc, inc2);
