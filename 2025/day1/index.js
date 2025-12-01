import fs from "fs";
import { log, time, timeEnd } from "console";

const args = process.argv.slice(2);
const inputFile = args[0] ?? "input.txt";

const input = fs.readFileSync(inputFile, "utf8").toString();
const instructions = input
  .split("\n")
  .filter((x) => x)
  .map((line) => ({ direction: line[0], distance: Number(line.slice(1)) }));

const getNextPos = (curr, instruction) => {
  let next;
  const distance = instruction.distance % 100;
  if (instruction.direction === "L") {
    next = curr - distance;
  } else {
    next = curr + distance;
  }

  if (next > 99) return next - 100;
  if (next < 0) return next + 100;
  return next;
};

const getNumPasses = (curr, { direction, distance }) => {
  let next;
  let passes = 0;

  if (direction === "L") {
    next = curr - distance;
  } else {
    next = curr + distance;
  }

  passes = Math.floor(Math.abs(next) / 100);
  if (next === 0) {
    passes += 1;
  }
  if (curr > 0 && next < 0) passes += 1;

  return passes;
};

const part1 = () => {
  let curr = 50;
  let numZeroes = 0;
  instructions.forEach((instruction) => {
    curr = getNextPos(curr, instruction);
    if (curr === 0) numZeroes++;
  });

  return numZeroes;
};

const part2 = () => {
  let curr = 50;
  let numZeroes = 0;
  instructions.forEach((instruction) => {
    numZeroes += getNumPasses(curr, instruction);
    curr = getNextPos(curr, instruction);
  });
  return numZeroes;
};

time("part 1");
log(part1());
timeEnd("part 1");

time("part 2");
log(part2());
timeEnd("part 2");
