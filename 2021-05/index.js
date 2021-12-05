let valsstr = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;
let vals = valsstr.split("\n");
let fs = require("fs");
vals = fs.readFileSync("input5.txt").toString().split("\n");

function hydrothermalVents(isDiagonal = false) {
  // x1,y1 -> x2,y2
  // For now, only consider horizontal and vertical lines: lines where either x1 = x2 or y1 = y2.
  let points = [];
  let maxvals = 1000;
  for (let j = 0; j < maxvals; j++) {
    points.push(Array(maxvals).fill(0));
  }

  // In this diagram, the top left corner is 0,0 and the bottom right corner is 9,9.
  // Each position is shown as the number of lines which cover that point or .
  // if no line covers that point.
  // The top-left pair of 1s, for example, comes from 2,2 -> 2,1; the very bottom row is formed by the overlapping lines 0,9 -> 5,9 and 0,9 -> 2,9.
  for (let i = 0; i < vals.length; i++) {
    let val = vals[i];
    let [x1, y1] = val.split(" -> ")[0].split(",");
    x1 = parseInt(x1);
    y1 = parseInt(y1);
    let [x2, y2] = val.split(" -> ")[1].split(",");
    x2 = parseInt(x2);
    y2 = parseInt(y2);
    // console.log(x1, y1, x2, y2);
    if (x1 === x2) {
      // Vertical line
      for (let j = y1; j <= y2; j++) {
        points[j][x1]++;
      }
      for (let j = y2; j <= y1; j++) {
        points[j][x1]++;
      }
    } else if (y1 === y2) {
      // Horizontal line
      for (let j = x1; j <= x2; j++) {
        points[y1][j]++;
      }
      for (let j = x2; j <= x1; j++) {
        points[y1][j]++;
      }
    } else if (isDiagonal) {
      // Diagonal line. Below is from copilot suggestion
      let x = x1;
      let y = y1;
      while (x <= x2 && y <= y2) {
        points[y][x]++;
        x++;
        y++;
      }
      x = x1;
      y = y1;
      while (x <= x2 && y >= y2) {
        points[y][x]++;
        x++;
        y--;
      }
      x = x1;
      y = y1;
      while (x >= x2 && y <= y2) {
        points[y][x]++;
        x--;
        y++;
      }
      x = x1;
      y = y1;
      while (x >= x2 && y >= y2) {
        points[y][x]++;
        x--;
        y--;
      }
    }
  }

  //  console.log(points);
  // determine the number of points where at least two lines overlap
  let count = 0;
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points[i].length; j++) {
      if (points[i][j] > 1) {
        count++;
      }
    }
  }

  console.log(count);
}

hydrothermalVents(false);
hydrothermalVents(true);
