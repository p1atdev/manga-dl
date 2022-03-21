import { Context } from "../deps.ts";
import { Episode } from "../types/manga.ts";
import { compress } from "../util/mod.ts";

export const getSolvedEpisode = async (
  ctx: Context,
  url: string,
) => {
  const episodeUrl = url.endsWith(".json") ? url : url + ".json";

  const res = await fetch(episodeUrl);
  const json: Episode = await res.json();

  json.readableProduct.pageStructure.pages.forEach((page) => {
    page.src = page.src
      ? `${Deno.env.get("BASE_URL")}/image?url=${page.src}`
      : undefined;
  });

  ctx.response.type = "application/json";
  ctx.response.body = json;
  // return ctx;
};

export const getSolvedEpisodeZip = async (
  ctx: Context,
  url: string,
) => {
  const episodeUrl = url.endsWith(".json") ? url : url + ".json";

  const res = await fetch(episodeUrl);
  const json: Episode = await res.json();

  json.readableProduct.pageStructure.pages.forEach((page) => {
    page.src = page.src
      ? `${Deno.env.get("BASE_URL")}/image?url=${page.src}`
      : undefined;
  });

  const images = await Promise.all(json.readableProduct.pageStructure.pages.map(
    async (page) => {
      const imageUrl = page.src;
      if (!imageUrl) return null;
      const res = await fetch(imageUrl);
      return new Uint8Array(await res.arrayBuffer());
    },
  ));

  const zip = await compress(images.filter((image) => image));

  ctx.response.type = "application/zip";
  ctx.response.headers.set(
    "Content-Disposition",
    `attachment; filename="${encodeURI(json.readableProduct.title)}.zip"`,
  );
  ctx.response.body = zip;
};
