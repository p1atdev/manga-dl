import { getImage, Solver } from "../deps.ts";

export const solve = async (
  url: string,
  width?: number,
  height?: number,
): Promise<Uint8Array> => {
  try {
    const image = await getImage(url);

    const solver = new Solver(image, width, height);

    solver.solve();

    return solver.answer();
  } catch (err) {
    throw new Error(err);
  }
};
