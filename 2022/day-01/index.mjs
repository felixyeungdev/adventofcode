import fs from "fs/promises";

const input = await fs.readFile("input", "utf-8");

const calories = input.trim().split("\n");
const caloriesByElf = [];

let index = 0;
for (const calorie of calories) {
  if (calorie === "") index++;
  if (caloriesByElf[index]) {
    caloriesByElf[index] += parseInt(calorie);
  } else {
    caloriesByElf[index] = parseInt(calorie);
  }
}

console.log(`Maximum: ${Math.max(...caloriesByElf)}`);

const top3 = caloriesByElf
  .sort((a, b) => {
    if (a > b) return -1;
    if (b > a) return 1;
    return 0;
  })
  .slice(0, 3);

const top3sum = top3.reduce((prev, current) => prev + current, 0);

console.log(`Top 3 Sum: ${top3sum}`);
