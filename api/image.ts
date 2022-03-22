import { solve } from "../util/solver.ts";

export const getSolvedImage = async (
  url: string,
  width?: number,
  height?: number,
) => {
  const buffer = await solve(url, width, height);

  return buffer;
};
