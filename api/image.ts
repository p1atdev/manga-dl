import { Context } from "../deps.ts";
import { solve } from "../util/solver.ts";

export const getSolvedImage = async (
  ctx: Context,
  url: string,
) => {
  const buffer = await solve(url);

  ctx.response.type = "image/jpeg";
  ctx.response.body = buffer;
};
