let valsstr = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;
let input = valsstr.split("\n");
let fs = require("fs");
input = fs.readFileSync("input13.txt").toString().split("\n");

function minmax(coords) {
  let x = coords.map((v) => v[0]);
  let y = coords.map((v) => v[1]);
  return {
    minx: Math.min(...x),
    maxx: Math.max(...x),
    maxy: Math.max(...y),
    miny: Math.min(...y),
  };
}

// assume fold is half way
function foldY(coords, offset = 7) {
  const mm = minmax(coords);
  const newcoords = [];
  const cs = coords.map((v) => v.join(","));
  // 3,0 to right or 0,0
  // 0,7 below 0
  for (let y = 0; y <= mm.maxy; y++) {
    for (let x = 0; x <= mm.maxx; x++) {
      if (y < offset && cs.includes(`${x},${y}`)) {
        newcoords.push([x, y]);
      } else if (y >= offset) {
        const ny = offset - (y - offset);
        if (
          cs.includes(`${x},${y}`) &&
          !newcoords.map((v) => v.join(",")).includes(`${x},${ny}`)
        ) {
          // console.log(x, y, ny);
          newcoords.push([x, ny]);
        }
      }
    }
  }
  return newcoords;
}

function foldX(coords, offset = 5) {
  const mm = minmax(coords);
  const newcoords = [];
  const cs = coords.map((v) => v.join(","));
  // 3,0 to right or 0,0
  // 0,7 below 0
  for (let x = 0; x <= mm.maxx; x++) {
    for (let y = 0; y <= mm.maxy; y++) {
      if (x < offset && cs.includes(`${x},${y}`)) {
        newcoords.push([x, y]);
      } else if (x >= offset) {
        const nx = offset - (x - offset);
        if (
          cs.includes(`${x},${y}`) &&
          !newcoords.map((v) => v.join(",")).includes(`${nx},${y}`)
        ) {
          // console.log(x, y, ny);
          newcoords.push([nx, y]);
        }
      }
    }
  }
  return newcoords;
}

let coords = input
  .filter((v) => v.includes(","))
  .map((v) => v.split(",").map((v) => parseInt(v)));
let instructions = input
  .filter((v) => v.includes("="))
  .map((v) => v.split("="));

if (0) {
  const fy = foldY(coords, 7);
  const fx = foldX(coords, 5);
  // console.log("coords", coords);
  // console.log("instructions", instructions);
  // console.log("fy", fy.map((v) => v.join(",")).join("\n"), fy.length);
  console.log("fx", fx.map((v) => v.join(",")).join("\n"), fx.length);
}

if (0) {
  // part1
  const ins = instructions[0];
  let res;
  if (ins[0].endsWith("y")) {
    res = foldY(coords, parseInt(ins[1]));
  } else {
    res = foldX(coords, parseInt(ins[1]));
  }
  console.log("ins", ins, res, res.length);
}

// part2
let res = coords;
instructions.forEach((instruction) => {
  if (instruction[0].endsWith("y")) {
    res = foldY(res, parseInt(instruction[1]));
  } else {
    res = foldX(res, parseInt(instruction[1]));
  }
});

const mm = minmax(res);
for (let y = mm.miny; y <= mm.maxy; y++) {
  for (let x = mm.minx; x <= mm.maxx; x++) {
    if (res.map((v) => v.join(",")).includes(`${x},${y}`)) {
      process.stdout.write("#");
    } else {
      process.stdout.write(".");
    }
  }
  console.log();
}
