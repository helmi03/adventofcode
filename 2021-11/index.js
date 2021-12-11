let valsstr = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;
// valsstr = `11111
// 19991
// 19191
// 19991
// 11111`;
let energyLevels = valsstr
  .split("\n")
  .map((v) => v.split(""))
  .map((v) => v.map((v) => parseInt(v)));
let fs = require("fs");
energyLevels = fs
  .readFileSync("input11.txt")
  .toString()
  .split("\n")
  .map((v) => v.split(""))
  .map((v) => v.map((v) => parseInt(v)));

class Energy {
  constructor(e) {
    this._eg = e;
  }

  getAdjacentEnergyLevels(x, y) {
    let result = [];
    const { _eg } = this;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) {
          continue;
        }
        if (x + i < 0 || x + i >= _eg.length) {
          continue;
        }
        if (y + j < 0 || y + j >= _eg[0].length) {
          continue;
        }
        result.push([x + i, y + j, _eg[x + i][y + j]]);
      }
    }
    return result;
  }

  increaseOneAllEnergyLevels() {
    const { _eg } = this;
    for (let i = 0; i < _eg.length; i++) {
      for (let j = 0; j < _eg[0].length; j++) {
        _eg[i][j] += 1;
      }
    }
  }

  sumFlashes() {
    const { _eg } = this;
    let sum = 0;
    for (let i = 0; i < _eg.length; i++) {
      for (let j = 0; j < _eg[0].length; j++) {
        const e = _eg[i][j];
        if (e === 0) {
          sum++;
        }
      }
    }
    return sum;
  }

  // if energyLevel=9, increase adjacent +1
  flash() {
    const { _eg } = this;
    for (let i = 0; i < _eg.length; i++) {
      for (let j = 0; j < _eg[0].length; j++) {
        let x = _eg[i][j];
        if (x > 9) {
          _eg[i][j] = 0;
          const adj = this.getAdjacentEnergyLevels(i, j);
          adj.forEach(([xx, yy, energy]) => {
            if (energy < 1) {
              return;
            }
            let nn = energy + 1;
            _eg[xx][yy] = nn;
          });
          this.flash();
        }
      }
    }
  }

  // sumEnergyLevel +1
  // sumEnergyLevel > 9, then flashes
  // adjacent sumEnergyLevels +1, include diagonal
  // at most once per step
  // flashed during this step has its energy level set to 0

  getTotal(steps = 1) {
    let total = 0;
    let lastFlashes = 0;
    for (let i = 0; i < steps; i++) {
      // console.log("step", i + 1);
      this.increaseOneAllEnergyLevels();
      this.flash();
      total += this.sumFlashes();
      lastFlashes = this.sumFlashes();
    }
    return [total, lastFlashes];
  }
}

// part1
let xe = JSON.parse(JSON.stringify(energyLevels));
const eg = new Energy(xe);
const x = eg.getTotal(100);
console.log("Total flashes after 100 steps=", x[1]);

// part2
let steps = 1;
let stop = false;
while (!stop) {
  // HACK: deep copy of energyLevels
  let xe2 = JSON.parse(JSON.stringify(energyLevels));
  let eg = new Energy(xe2);
  const y = eg.getTotal(steps);
  if (y[1] === 100) {
    // console.log(eg._eg.map((v) => v.join("")).join("\n"));
    stop = true;
  }
  eg = undefined;

  steps++;
}

console.log("First step all octopus flashes=", steps - 1);
