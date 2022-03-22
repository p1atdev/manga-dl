import { Episode } from "../types/manga.ts";
import { compress } from "../util/mod.ts";

export const getSolvedEpisode = async (
  url: string,
) => {
  const episodeUrl = url.endsWith(".json") ? url : url + ".json";

  const res = await fetch(episodeUrl);
  const json: Episode = await res.json();

  json.readableProduct.pageStructure.pages.filter((page) => {
    // only manga pages
    return page.type === "main";
  }).forEach((page) => {
    page.src = page.src
      ? `${
        Deno.env.get("BASE_URL")
      }/image?url=${page.src}&width=${page.width}&height=${page.height}`
      : undefined;
  });

  return json;
};

export const getSolvedEpisodeZip = async (
  url: string,
) => {
  const json: Episode = await getSolvedEpisode(url);

  const images = await Promise.all(json.readableProduct.pageStructure.pages.map(
    async (page) => {
      const imageUrl = page.src;
      if (!imageUrl) return null;
      const res = await fetch(imageUrl);
      return new Uint8Array(await res.arrayBuffer());
    },
  ));

  const zip = await compress(images.filter((image) => image));

  return {
    filename: `${encodeURI(json.readableProduct.title)}.zip`,
    zip: zip,
  };
};
