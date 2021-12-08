let valsstr = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;
let segments = valsstr.split("\n");
let fs = require("fs");
segments = fs.readFileSync("input8.txt").toString().split("\n");

function part1() {
  const res = segments.map((v) => {
    let vals = v.split(" | ");
    const r = vals[1]
      .split(" ")
      .filter(
        (v) =>
          v.length === 2 || v.length === 4 || v.length === 3 || v.length === 7
      );
    return r;
  });
  console.log(res.map((v) => v.length).reduce((a, b) => a + b));
}

part1();

function get1(segments) {
  const v1 = segments.find((v) => v.length === 2);
  const v7 = segments.find((v) => v.length === 3);
  let res = "";
  v7.forEach((v) => {
    if (!v1.includes(v)) {
      res = v;
    }
  });
  return res;
}

function getSegment(segments) {
  const debug = false;
  const v4 = segments.find((v) => v.length === 4);
  const found0 = get1(segments);
  const v7 = segments.find((v) => v.length === 3);
  const v7x = v7.filter((v) => v !== found0);
  const vl5 = segments.filter((v) => v.length === 5);
  debug && console.log("found0", found0);
  const ef = v4.filter((v) => !v7x.includes(v));
  let found3; // 3
  ef.forEach((v) => {
    if (!found3 && vl5.filter((x) => x.includes(v)).length === 3) {
      found3 = v;
    }
  });
  const found1 = ef.find((v) => v !== found3);
  const knows = new Set([...v4, found3, found1, found0]);
  debug && console.log("found3", found3);
  debug && console.log("found1", found1);
  const v8 = new Set(segments.find((v) => v.length === 7));
  let v8x = [];
  let res = v8;
  knows.forEach((v) => {
    if (v8.has(v)) {
      v8.delete(v);
    }
  });
  const vle5 = segments.filter((v) => v.length === 5);

  let found6;
  v8.forEach((v) => {
    if (!found6 && vl5.filter((x) => x.includes(v)).length === 3) {
      found6 = v;
    }
  });
  debug && console.log("found6", found6);
  const found4s = new Set(segments.find((v) => v.length === 7));
  [...knows, found6].forEach((v) => {
    if (found4s.has(v)) {
      found4s.delete(v);
    }
  });
  const found4 = [...found4s][0];
  debug && console.log("found4", found4);
  const vl6 = segments.filter((v) => v.length === 6);
  const founds = [found0, found1, found3, found4, found6];
  const ab = new Set(segments.find((v) => v.length === 7));
  founds.forEach((v) => {
    if (ab.has(v)) {
      ab.delete(v);
    }
  });

  let found5;
  ab.forEach((v) => {
    if (!found5 && vl6.filter((x) => x.includes(v)).length === 3) {
      found5 = v;
    }
  });

  debug && console.log("found5", found5);
  const foundx = [found0, found1, found3, found4, found6, found5];
  const abx = new Set(segments.find((v) => v.length === 7));
  foundx.forEach((v) => {
    if (abx.has(v)) {
      abx.delete(v);
    }
  });
  const found2 = [...abx][0];
  const segments7 = {
    0: found0,
    1: found1,
    2: found2,
    3: found3,
    4: found4,
    5: found5,
    6: found6,
  };
  let x = Object.entries(segments7).map(([k, v]) => {
    return [v, k];
  });
  let xy = new Map(x);
  return xy;
}

function part2(
  segments = [
    "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf",
  ]
) {
  const display = {
    "012456": 0,
    25: 1,
    "02346": 2,
    "02356": 3,
    1235: 4,
    "01356": 5,
    "013456": 6,
    "025": 7,
    "0123456": 8,
    "012356": 9,
  };
  let sum = 0;
  for (let i = 0; i < segments.length; i++) {
    let vals = segments[i].split(" | ");
    const r = vals[0].split(" ");
    const valsp = r.map((v) => v.split(""));
    let segments7 = getSegment(valsp);
    const r2 = vals[1].split(" ");
    const r3 = r2.map((v) => {
      const vv = v.split("");
      const nx = vv.map((vx) => segments7.get(vx));
      nx.sort();
      return display[nx.join("")];
    });
    sum += Number(r3.join(""));
  }
  console.log(sum);
}

part2(segments);
