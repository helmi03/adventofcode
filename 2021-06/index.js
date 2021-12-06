let valsstr = `3,4,3,1,2`;
let lanternfishes = valsstr.split(",").map((v) => parseInt(v));
let fs = require("fs");
lanternfishes = fs
  .readFileSync("input6.txt")
  .toString()
  .split(",")
  .map((v) => parseInt(v));

let days = 256;

//  each lanternfish creates a new lanternfish once every 7 days
// represents the number of days until it creates a new lanternfish
// So, suppose you have a lanternfish with an internal timer value of 3:

// After one day, its internal timer would become 2.
// After another day, its internal timer would become 1.
// After another day, its internal timer would become 0.
// After another day, its internal timer would reset to 6, and it would create a new lanternfish with an internal timer of 8.
// After another day, the first lanternfish would have an internal timer of 5, and the second lanternfish would have an internal timer of 7.

//Each day, a 0 becomes a 6 and adds a new 8 to the end of the list, while each other number decreases by 1 if it was present at the start of the day.
//How many lanternfish would there be after 80 days?

// if lanternfirsh = 6, minus 1 and add 8
// lanternfishes[0] = [3,4,3,1,2];
// lanternfishes[1] = [2,3,2,0,1];
// lanternfishes[2] = [1,2,1,6,0,8];
// lanternfishes[2] = [0,1,0,5,6,7,8];

//--- part1
// let totallanternfish = 0;

// for (let i = 0; i < days; i++) {
//   let newlanternfish = [];
//   for (let j = 0; j < lanternfishes.length; j++) {
//     if (lanternfishes[j] === 0) {
//       newlanternfish.push(8);
//     }
//   }
//   for (let j = 0; j < lanternfishes.length; j++) {
//     let newval = lanternfishes[j] - 1;
//     if (newval < 0) {
//       lanternfishes[j] = 6;
//     } else {
//       lanternfishes[j] = newval;
//     }
//     newval = undefined;
//   }
//   newlanternfish.forEach((v) => {
//     lanternfishes.push(v);
//   });
//   newlanternfish = undefined;
//   //   console.log(lanternfishes);
// }

// console.log(lanternfishes.length);
//--- part1

/*
state - total_lanternfish
day 0: 0,1,1,2,1,0,0,0,0
day 1: 1,1,2,1,0,0,0,0,0
day 2: 1,2,1,0,0,0,1,0,1
day 3: 2,1,0,0,0,1,1,1,1
*/

const lanternfishes_total = {};
for (let i = 0; i <= 8; i++) {
  lanternfishes_total[i] = lanternfishes.filter((v) => v === i).length;
}

// console.log(lanternfishes_total);
console.log(`day ${0}: ${Object.values(lanternfishes_total).join(",")}`);

for (let i = 0; i < days; i++) {
  const init = lanternfishes_total[0];
  for (let j = 0; j <= 8; j++) {
    lanternfishes_total[j] = lanternfishes_total[j + 1] ?? 0;
  }
  lanternfishes_total[8] = 0;
  if (init > 0) {
    lanternfishes_total[8] += init;
    lanternfishes_total[6] += init;
  }
}

console.log(Object.values(lanternfishes_total).reduce((a, b) => a + b));
