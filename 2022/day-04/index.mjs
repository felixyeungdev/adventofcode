import fs from "fs/promises";

const input = await fs.readFile("input", "utf-8");
const pairs = input
  .trim()
  .split("\n")
  .map((pair) =>
    pair.split(",").map((range) => range.split("-").map((int) => parseInt(int)))
  );

const fullyOverlappingPairs = pairs.filter((pair) => {
  const [a, b] = pair;
  return (a[0] <= b[0] && a[1] >= b[1]) || (b[0] <= a[0] && b[1] >= a[1]);
});

console.log({
  fullyContainedPairs: fullyOverlappingPairs.length,
});

const partiallyOverlappingPairs = pairs.filter((pair) => {
  const [a, b] = pair;
  const [aStart, aEnd] = a;
  const [bStart, bEnd] = b;

  return (
    (aStart <= bStart && aEnd >= bStart && aEnd <= bEnd) ||
    (bStart <= aStart && bEnd >= aStart && bEnd <= aEnd) ||
    (aStart <= bStart && aEnd >= bEnd) ||
    (bStart <= aStart && bEnd >= aEnd)
  );
});

console.log({
  partiallyOverlappingPairs: partiallyOverlappingPairs.map((pair) =>
    pair.join(" ")
  ),
  partiallyContainedPairs: partiallyOverlappingPairs.length,
});
