let valsstr = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;
let allChunks = valsstr.split("\n").map((v) => v.split(""));
let fs = require("fs");
allChunks = fs.readFileSync("input10.txt").toString().split("\n");

let pair = {
  ")": "(",
  "}": "{",
  ">": "<",
  "]": "[",
};
let pairc = {
  "(": ")",
  "{": "}",
  "<": ">",
  "[": "]",
};
let opentags = ["[", "(", "{", "<"];
let closetags = ["]", ")", "}", ">"];

function chunkValidator(chunks) {
  let testchunk = [];

  for (let i = 0; i < chunks.length; i++) {
    let chunk = chunks[i];
    if (opentags.includes(chunk)) {
      testchunk.push(chunk);
    }
    if (closetags.includes(chunk)) {
      last = testchunk[testchunk.length - 1];
      // console.log(`chunks=${testchunk}`, last, chunk);
      if (pair[chunk] === last) {
        testchunk.pop();
        // console.log(`after pop chunks=${testchunk}`);
      } else {
        // console.log(`found invalid: last=${last}`);
        return [i, chunk];
      }
    }
  }
  return [0, ""];
}

function completeChunk(chunks) {
  let testchunk = [];
  let last = "";
  let i = 0;
  for (let i = 0; i < chunks.length; i++) {
    let chunk = chunks[i];
    if (opentags.includes(chunk)) {
      testchunk.push(chunk);
    }
    if (closetags.includes(chunk)) {
      last = testchunk[testchunk.length - 1];
      if (pair[chunk] === last) {
        testchunk.pop();
      } else {
        return [i, chunk];
      }
    }
  }
  testchunk.reverse();

  return testchunk.map((v) => pairc[v]);
}

/*
{([(<{}[<>[]}>{[]{[(<()> - Expected ], but found } instead.
[[<[([]))<([[{}[[()]]] - Expected ], but found ) instead.
[{[{({}]{}}([{[{{{}}([] - Expected ), but found ] instead.
[<(<(<(<{}))><([]([]() - Expected >, but found ) instead.
<{([([[(<>()){}]>(<<{{ - Expected ], but found > instead.
*/

let sum = 0;
let score = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

let incomplete = [];
allChunks.forEach((testchunk) => {
  const [i, valid] = chunkValidator(testchunk);
  if (i > 0) {
    sum += score[valid];
  } else {
    incomplete.push(testchunk);
  }
});

// If a chunk opens with (, it must close with ).
// If a chunk opens with [, it must close with ].
// If a chunk opens with {, it must close with }.
// If a chunk opens with <, it must close with >.
// valid chunks include ([]), {()()()}, <([{}])>, [<>({}){}[([])<>]], and even (((((((((()))))))))).

console.log("sum", sum);

const score2 = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};
let scores = [];
incomplete
  .map((testchunk) => completeChunk(testchunk))
  .forEach((chunk) => {
    let sumscore2 = 0;
    chunk.forEach((chunk) => {
      sumscore2 = sumscore2 * 5 + score2[chunk];
    });
    scores.push(sumscore2);
  });
scores.sort((a, b) => (a < b ? 1 : -1));
const middle = Math.floor(scores.length / 2);
console.log("scores", scores[middle]);
