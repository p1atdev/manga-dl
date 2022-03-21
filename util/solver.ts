import { getImage, Solver } from "../deps.ts";

export const solve = async (url: string): Promise<Uint8Array> => {
  const image = await getImage(url);

  const solver = new Solver(image);

  solver.solve();

  return solver.buffer();
};
