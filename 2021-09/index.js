let valsstr = `2199943210
3987894921
9856789892
8767896789
9899965678`;
let coordinates = valsstr.split("\n").map((row) => row.split("").map(Number));
let fs = require("fs");
coordinates = fs
  .readFileSync("input9.txt")
  .toString()
  .split("\n")
  .map((row) => row.split("").map(Number));
// console.log(coordinates);

function getAdjacent(x, y) {
  let adj = [];
  if (x > 0) {
    const [_x, _y] = [y, x - 1];
    adj.push([_x, _y, coordinates[_x][_y]]);
  }
  if (x < coordinates[y].length - 1) {
    const [_x, _y] = [y, x + 1];
    adj.push([_x, _y, coordinates[_x][_y]]);
  }
  if (y > 0) {
    const [_x, _y] = [y - 1, x];
    adj.push([_x, _y, coordinates[_x][_y]]);
  }
  if (y < coordinates.length - 1) {
    const [_x, _y] = [y + 1, x];
    adj.push([_x, _y, coordinates[_x][_y]]);
  }
  return adj;
}

// return [x, y, height][]
function lowestHeightCoords() {
  // get lowest position from adjacent cells
  let lowest = Number.MAX_SAFE_INTEGER;
  let adjres = [];
  let adjrescoords = [];
  for (let y = 0; y < coordinates.length; y++) {
    for (let x = 0; x < coordinates[y].length; x++) {
      let cell = coordinates[y][x];
      let adjs = getAdjacent(x, y);
      let adj = adjs.map((v) => v[2]);
      let lowestAdj = Math.min(...adj);
      if (cell < lowestAdj) {
        lowest = cell;
      }
      let low = adj.every((a) => cell < a);
      if (low) {
        adjres.push(cell);
        adjrescoords.push([x, y, cell]);
      }
    }
  }

  const res = adjres.map((v) => v + 1).reduce((a, b) => a + b);
  console.log("sum low points", res);
  return adjrescoords;
}

let visited = new Set();

function getBasin([x, y, cell]) {
  let adj = getAdjacent(x, y);
  let basin = [cell];
  visited.add([y, x].join(","));
  let adj2 = adj.filter((v) => v[2] < 9);
  // console.log("adj2", adj2);
  while (adj2.length) {
    h = adj2.pop();
    const kh = [h[0], h[1]].join(",");
    // console.log("not visited", h);
    if (!visited.has(kh)) {
      basin.push(h[2]);
    }
    visited.add(kh);
    let adj3 = getAdjacent(h[1], h[0]);
    // console.log("adj3", adj3);
    const xy = adj3.filter((v) => v[2] < 9);
    for (let i = 0; i < xy.length; i++) {
      const v = xy[i];
      let k = [v[0], v[1]].join(",");
      if (!visited.has(k)) {
        basin.push(v[2]);
        adj2.push(v);
        // console.log("push", v, "adj2_length", adj2.length);
        visited.add(k);
      }
    }
    // console.log("adj2_length", adj2.length);
  }
  return basin;
}

function part2() {
  let basinheight = lowestHeightCoords();
  let basins = [];
  for (let i = 0; i < basinheight.length; i++) {
    basins.push(getBasin(basinheight[i]));
  }
  let x = basins.map((v) => [v, v.length]);
  x.sort((a, b) => (a[1] < b[1] ? 1 : -1));
  let init = 1;

  x.slice(0, 3).forEach((a) => (init *= a[1]));
  console.log("product of 3 largest", init);
}

// part1();
part2();
