let fs = require("fs");
let array = fs.readFileSync("input_day2.txt").toString().split("\n");

let totalHorizontal = 0;
let totalDepth = 0;
for (i in array) {
  const val = array[i];
  const [dir, dirv] = val.split(" ");
  const dirvi = parseInt(dirv);
  if (dir === "forward") {
    totalHorizontal += dirvi;
  } else if (dir === "down") {
    totalDepth += dirvi;
  } else if (dir === "up") {
    totalDepth -= dirvi;
  }
}
console.log(
  `forward=${totalHorizontal}, depth=${totalDepth}, forward x depth=${
    totalHorizontal * totalDepth
  }`
);

totalHorizontal = 0;
totalDepth = 0;
let aim = 0;
for (i in array) {
  const val = array[i];
  const [dir, dirv] = val.split(" ");
  const dirvi = parseInt(dirv);
  if (dir === "forward") {
    totalHorizontal += dirvi;
    totalDepth = totalDepth + aim * dirvi;
  } else if (dir === "down") {
    aim = aim + dirvi;
  } else if (dir === "up") {
    aim = aim - dirvi;
  }
}

console.log(
  `forward=${totalHorizontal}, depth=${totalDepth}, forward x depth=${
    totalHorizontal * totalDepth
  }`
);
