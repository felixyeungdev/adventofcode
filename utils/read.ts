import fs from "fs/promises";

export const read = async (path: string) => {
  const data = await fs.readFile(path, "utf-8");
  return data;
};
