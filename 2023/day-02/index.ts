import { read } from "../../utils/read";

type RGB = {
  red: number;
  green: number;
  blue: number;
};

const parseRecord = (data: string) => {
  const games = data.split("\n").map((game) => {
    const [gameInfo, gameLog] = game.split(": ");
    const [, gameId] = gameInfo.split(" ");
    const reveals = gameLog.split("; ").map((reveal) => {
      const counts: RGB = {
        red: 0,
        green: 0,
        blue: 0,
      };

      const cubeCounts = reveal.split(", ");

      for (const cubeCount of cubeCounts) {
        const [count, cube] = cubeCount.split(" ");
        counts[cube] = parseInt(count);
      }

      return counts;
    });
    return {
      gameId: parseInt(gameId),
      reveals,
    };
  });

  return games;
};

const theTarget: RGB = {
  red: 12,
  green: 13,
  blue: 14,
};

const findGameSum = (games: ReturnType<typeof parseRecord>, target: RGB) => {
  const gameSatisfiesTarget = games.filter((game) => {
    const { reveals } = game;

    for (const reveal of reveals) {
      const { red, green, blue } = reveal;

      if (red > target.red) return false;
      if (green > target.green) return false;
      if (blue > target.blue) return false;
    }
    return true;
  });

  const sum = gameSatisfiesTarget.reduce(
    (acc, game) => (acc += game.gameId),
    0
  );

  return sum;
};

const findCubeMultiplySum = (
  games: ReturnType<typeof parseRecord>,
  target: typeof theTarget
) => {
  const processedGames = games.map((game) => {
    const counts: RGB = { red: 0, green: 0, blue: 0 };

    for (const reveal of game.reveals) {
      if (reveal.red > counts.red) counts.red = reveal.red;
      if (reveal.green > counts.green) counts.green = reveal.green;
      if (reveal.blue > counts.blue) counts.blue = reveal.blue;
    }

    return counts;
  });

  const multiplied = processedGames.map((game) => {
    return game.red * game.green * game.blue;
  });

  const summed = multiplied.reduce((acc, val) => (acc += val), 0);

  return summed;
};

console.log(
  findGameSum(
    await read("./2023/day-02/sample.txt").then(parseRecord),
    theTarget
  )
);
console.log(
  findGameSum(
    await read("./2023/day-02/input.txt").then(parseRecord),
    theTarget
  )
);
console.log(
  findCubeMultiplySum(
    await read("./2023/day-02/sample.txt").then(parseRecord),
    theTarget
  )
);
console.log(
  findCubeMultiplySum(
    await read("./2023/day-02/input.txt").then(parseRecord),
    theTarget
  )
);
