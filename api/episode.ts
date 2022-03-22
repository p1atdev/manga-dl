import { Episode } from "../types/manga.ts";
import { compress } from "../util/mod.ts";

export const getEpisode = async (url: string): Promise<Episode> => {
  const episodeUrl = url.endsWith(".json") ? url : url + ".json";

  const res = await fetch(episodeUrl);
  const episode: Episode = await res.json();

  return episode;
};

export const getSolvedEpisode = async (
  url: string,
): Promise<Episode> => {
  const episodeUrl = url.endsWith(".json") ? url : url + ".json";

  const res = await fetch(episodeUrl);
  const episode: Episode = await res.json();

  episode.readableProduct.pageStructure.pages.filter((page) => {
    // only manga pages
    return page.type === "main";
  }).forEach((page) => {
    page.src = page.src
      ? `${
        Deno.env.get("BASE_URL")
      }/image?url=${page.src}&width=${page.width}&height=${page.height}`
      : undefined;
  });

  return episode;
};

export const getSolvedEpisodeZip = async ({
  url,
  episode,
}: { url?: string; episode?: Episode }) => {
  if (url && !episode) {
    episode = await getSolvedEpisode(url);
  }

  if (!episode) {
    throw new Error("No episode given");
  }

  const images = await Promise.all(
    episode.readableProduct.pageStructure.pages.filter((page) => {
      return page.type === "main";
    })
      .map(
        async (page) => {
          const imageUrl = page.src;
          if (!imageUrl) return null;
          const res = await fetch(imageUrl);
          return new Uint8Array(await res.arrayBuffer());
        },
      ),
  );

  const nonNullImages = images.filter((image): image is Uint8Array => {
    return image !== null;
  });

  const zip = await compress(nonNullImages);

  return {
    filename: `${encodeURI(episode.readableProduct.title)}.zip`,
    zip: zip,
  };
};
