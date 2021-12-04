let valsstr = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7

`;
let vals = valsstr.split("\n");
let fs = require("fs");
vals = fs.readFileSync("input4.txt").toString().split("\n");

const draw = vals[0];

const boardvals = vals.slice(2, vals.length - 1);

let boards = [];

let boardcols = [];
let boardrows = [];
let part1 = false;
for (let i = 0; i < boardvals.length; i++) {
  if (boardvals[i] !== "") {
    let row = boardvals[i].trim().split(/\s+/);
    boardrows.push(row);
  }
  if (boardvals[i] === "") {
    boards.push(boardrows);
    boardrows = [];
  }
}

let draws = draw.split(",");
let scoreboard = [];
boards.forEach((board, i) => {
  const nb = [];
  for (let j = 0; j < 5; j++) {
    nb.push(Array(5).fill(0));
  }
  scoreboard.push(nb);
});

let foundwinner = false;
let foundwinner2 = false;
let totalboardwin = 0;
let w2 = {};
for (let j = 0; j < draws.length; j++) {
  if (part1 && foundwinner) {
    continue;
  }
  if (!part1 && foundwinner2) {
    continue;
  }
  //   boards.forEach((board, i) => {
  for (let i = 0; i < boards.length; i++) {
    if (!part1 && foundwinner2) {
      continue;
    }
    const board = boards[i];
    for (let r = 0; r < 5; r++) {
      const idx = board[r].findIndex((v) => v === draws[j]);
      if (idx > -1) {
        scoreboard[i][r][idx] = 1;
      }
    }
    let maxrow = 0;
    let maxcol = 0;
    for (let r = 0; r < 5; r++) {
      let row = scoreboard[i][r].reduce((a, b) => a + b);
      if (row > maxrow) {
        maxrow = row;
      }
    }
    // copilot suggestion is better than mine!
    // max sumcols from scoreboard rows
    for (let c = 0; c < 5; c++) {
      let col = 0;
      for (let r = 0; r < 5; r++) {
        col += scoreboard[i][r][c];
      }
      if (col > maxcol) {
        maxcol = col;
      }
    }

    if (maxrow === 5 || maxcol === 5) {
      const ss = scoreboard[i];
      let totalunmarked = 0;
      w2[i] = true;
      console.log(`board=${i}, maxrow=${maxrow}, maxcol=${maxcol}`);
      //   console.log(scoreboard);
      for (let r = 0; r < 5; r++) {
        for (let j = 0; j < 5; j++) {
          if (scoreboard[i][r][j] === 0) {
            // if (totalboardwin === board.length) {
            //   console.log(`unmarked val=${parseInt(board[r][j], 10)}`);
            // }
            totalunmarked += parseInt(board[r][j], 10);
          }
        }
      }
      //   console.log(board);
      console.log(
        "board",
        i,
        "won",
        "draws=",
        draws[j],
        "totalunmarked=",
        totalunmarked,
        "finalscore",
        draws[j] * totalunmarked
      );
      foundwinner = true;
      if (Object.keys(w2).length === boards.length) {
        console.log("found winner2");
        foundwinner2 = true;
        break;
      }
    }
  }
}

console.log(scoreboard);
