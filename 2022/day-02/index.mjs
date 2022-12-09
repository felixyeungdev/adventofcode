import fs from "fs/promises";
const input = await fs.readFile("input", "utf-8");

const choices = {
  rock: "rock",
  paper: "paper",
  scissors: "scissors",
};

const outcomes = {
  lose: "lose",
  draw: "draw",
  win: "win",
};

const choiceToScore = {
  [choices.rock]: 1,
  [choices.paper]: 2,
  [choices.scissors]: 3,
};

const playDuel = (playerA, playerB) => {
  if (playerA == choices.rock && playerB == choices.paper) return "b";
  if (playerA == choices.rock && playerB == choices.scissors) return "a";
  if (playerA == choices.paper && playerB == choices.rock) return "a";
  if (playerA == choices.paper && playerB == choices.scissors) return "b";
  if (playerA == choices.scissors && playerB == choices.rock) return "b";
  if (playerA == choices.scissors && playerB == choices.paper) return "a";
  return null;
};

const deduceChoiceFromOutcome = (player, outcome) => {
  if (player == choices.rock && outcome == outcomes.win) return choices.paper;
  if (player == choices.rock && outcome == outcomes.lose)
    return choices.scissors;
  if (player == choices.paper && outcome == outcomes.win)
    return choices.scissors;
  if (player == choices.paper && outcome == outcomes.lose) return choices.rock;
  if (player == choices.scissors && outcome == outcomes.win)
    return choices.rock;
  if (player == choices.scissors && outcome == outcomes.lose)
    return choices.paper;

  return player;
};

const keyToChoice = {
  A: choices.rock,
  B: choices.paper,
  C: choices.scissors,
  X: choices.rock,
  Y: choices.paper,
  Z: choices.scissors,
};

const keyToOutcome = {
  X: outcomes.lose,
  Y: outcomes.draw,
  Z: outcomes.win,
};

const duels = input.split("\n");

let totalScoreA = 0;

for (const duel of duels) {
  if (duel == "") continue;
  let [them, me] = duel.split(" ");
  them = keyToChoice[them];
  me = keyToChoice[me];
  const winner = playDuel(them, me);

  const outcomeScore = winner ? (winner == "a" ? 0 : 6) : 3;
  const shapeScore = choiceToScore[me];

  totalScoreA += outcomeScore + shapeScore;
}

console.log(`Total Score A: ${totalScoreA}`);

let totalScoreB = 0;

for (const duel of duels) {
  if (duel == "") continue;
  let [them, me] = duel.split(" ");
  them = keyToChoice[them];
  me = deduceChoiceFromOutcome(them, keyToOutcome[me]);
  const winner = playDuel(them, me);

  const outcomeScore = winner ? (winner == "a" ? 0 : 6) : 3;
  const shapeScore = choiceToScore[me];

  totalScoreB += outcomeScore + shapeScore;
}

console.log(`Total Score B: ${totalScoreB}`);
