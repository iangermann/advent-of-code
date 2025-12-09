import fs from "fs";
import { log, time, timeEnd } from "console";

const args = process.argv.slice(2);
const inputFile = args[0] ?? "input.txt";

const input = fs.readFileSync(inputFile, "utf8").toString().split("\n")[0];
const ranges = input
  .split(",")
  .map((range: string) => range.split("-").map((n) => Number(n)));

const part1 = () => {
  const isValidId = (id: number) => {
    // is valid if it isn't the same pattern repeated twice
    const str = id.toString();
    const a = str.slice(0, str.length / 2);
    const b = str.slice(str.length / 2);

    return a !== b;
  };

  let sum = 0;
  ranges.forEach(([start, end]) => {
    for (let i = start; i <= end; i++) {
      if (!isValidId(i)) {
        sum += i;
      }
    }
  });

  return sum;
};

const part2 = () => {
  const isValidId = (id: number) => {
    // valid if there are no repeating patterns (ex. 11, 121212)
    const str = id.toString();
    const regex = /^(.+)\1+$/;
    return !regex.test(str);
  };

  let sum = 0;
  ranges.forEach(([start, end]) => {
    for (let i = start; i <= end; i++) {
      if (!isValidId(i)) {
        sum += i;
      }
    }
  });

  return sum;
};

time("part 1");
log(part1());
timeEnd("part 1");

time("part 2");
log(part2());
timeEnd("part 2");
