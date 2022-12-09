#!/usr/bin/env node

import { Command, InvalidArgumentError } from "commander";
import { mkdir } from "fs/promises";
import { z } from "zod";
import chalk from "chalk";
import { join } from "path";

const days = new Array(25).fill(0).map((_, i) => i + 1);

const parseYear = (year) => {
  const parsedYear = parseInt(year);
  if (isNaN(parsedYear)) throw new InvalidArgumentError("not a number");
  try {
    const validated = z
      .number()
      .int()
      .min(2015)
      .max(new Date().getFullYear())
      .parse(parsedYear);
    return validated;
  } catch (err) {
    if (err instanceof z.ZodError) {
      throw new InvalidArgumentError(
        err.issues.map((e) => e.message).join(" ")
      );
    }
  }
};

const genYear = async (year) => {
  const yearPath = `./${year}`;
  await mkdir(yearPath, { recursive: true });

  for (const day of days) {
    const paddedDay = `${day}`.padStart(2, "0");
    const dayPath = join(yearPath, `day-${paddedDay}`);
    await mkdir(dayPath, { recursive: true });
  }
  console.log(`Generated folders for year ${chalk.white.bold(year)}`);
};

const program = new Command();

program
  .name("gen-year")
  .description("Generates folders for a year")
  .argument("<year>", "year", (year) => parseYear(year))
  .action(async (year, options) => {
    await genYear(year);
  });

program.parse();
