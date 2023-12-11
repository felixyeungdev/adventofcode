import { read } from "../../utils/read";

const findSum = (data: string) => {
  const lines = data.split("\n");

  const sum = lines
    .map((line) => {
      return line
        .split("")
        .map((char) => parseInt(char))
        .filter((num) => !isNaN(num));
    })
    .map((line) => {
      const first = line[0];
      const last = line[line.length - 1];
      return first * 10 + last;
    })
    .reduce((acc, curr) => acc + curr, 0);

  return sum;
};

const nameToNumber = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const normaliseLine = (line: string) => {
  let normalised = line;
  let first: {
    index: number;
    name: string;
  } | null = null;
  let last: {
    index: number;
    name: string;
  } | null = null;

  for (const [name] of Object.entries(nameToNumber)) {
    const indexFirst = line.indexOf(name);
    const indexLast = line.lastIndexOf(name);

    if (indexFirst !== -1 && (first === null || indexFirst < first.index)) {
      first = { index: indexFirst, name };
    }

    if (indexLast !== -1 && (last === null || indexLast > last.index)) {
      last = { index: indexLast, name };
    }
  }

  if (last) {
    let head = line.substring(0, last.index);
    let tail = line.substring(last.index);

    const alreadySomeNumber = tail
      .split("")
      .map((char) => parseInt(char))
      .some((num) => !isNaN(num));

    if (!alreadySomeNumber)
      normalised = head + tail.replace(last.name, nameToNumber[last.name]);
  }

  if (first) {
    let head = line.substring(0, first.index);
    const alreadySomeNumber = head
      .split("")
      .map((char) => parseInt(char))
      .some((num) => !isNaN(num));

    if (!alreadySomeNumber)
      normalised = normalised.replace(first.name, nameToNumber[first.name]);
  }

  return normalised;
};

const normalise = (data: string) => {
  return data.split("\n").map(normaliseLine).join("\n");
};

await read("./2023/day-01/sample-1.txt").then(findSum).then(console.log);
await read("./2023/day-01/input.txt").then(findSum).then(console.log);

await read("./2023/day-01/sample-2.txt")
  .then(normalise)
  .then(findSum)
  .then(console.log);
await read("./2023/day-01/input.txt")
  .then(normalise)
  .then(findSum)
  .then(console.log);
