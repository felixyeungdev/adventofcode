import fs from "fs/promises";
const input = await fs.readFile("input", "utf-8");

const isUppercase = (char) => char.toUpperCase() == char;

const itemTypeToPriority = (/** @type {string} */ itemType) => {
  if (isUppercase(itemType))
    return itemType.charCodeAt(0) - "A".charCodeAt(0) + 26 + 1;
  return itemType.charCodeAt(0) - "a".charCodeAt(0) + 1;
};

const checkCompartments = (compartment1, compartment2) => {
  const size = compartment1.length;

  compartment1 = compartment1.split("").sort().join("");
  compartment2 = compartment2.split("").sort().join("");

  let index1 = 0,
    index2 = 0;

  while (index1 < size) {
    if (compartment1[index1] == compartment2[index2])
      return compartment1[index1];
    if (compartment1[index1] > compartment2[index2]) index2++;
    else index1++;
  }
};

const checkRucksacks = (rucksack1, rucksack2, rucksack3) => {
  const size = Math.max(rucksack1.length, rucksack2.length, rucksack3.length);

  rucksack1 = rucksack1.split("").sort().join("");
  rucksack2 = rucksack2.split("").sort().join("");
  rucksack3 = rucksack3.split("").sort().join("");

  let index1 = 0,
    index2 = 0,
    index3 = 0;

  while (index1 < size) {
    if (
      rucksack1[index1] == rucksack2[index2] &&
      rucksack2[index2] == rucksack3[index3]
    )
      return rucksack1[index1];
    if (rucksack1[index1] > rucksack2[index2]) {
      if (rucksack2[index2] > rucksack3[index3]) index3++;
      else index2++;
    } else {
      if (rucksack1[index1] > rucksack3[index3]) index3++;
      else index1++;
    }
  }
};

const rucksacks = input.trim().split("\n");
let sumOfPrioritiesA = 0;

for (const rucksack of rucksacks) {
  const size = rucksack.length;
  const compartment1 = rucksack.slice(0, size / 2);
  const compartment2 = rucksack.slice(size / 2);

  const common = checkCompartments(compartment1, compartment2);

  console.table({
    compartment1,
    compartment2,
    common,
  });
  sumOfPrioritiesA += itemTypeToPriority(common);
}

console.log({ sumOfPrioritiesA });

let sumOfPrioritiesB = 0;

for (let i = 0; i < rucksacks.length; i += 3) {
  const rucksack1 = rucksacks[i];
  const rucksack2 = rucksacks[i + 1];
  const rucksack3 = rucksacks[i + 2];

  const common = checkRucksacks(rucksack1, rucksack2, rucksack3);
  sumOfPrioritiesB += itemTypeToPriority(common);

  console.table({
    rucksack1,
    rucksack2,
    rucksack3,
    common,
  });
}

console.log({ sumOfPrioritiesB });
