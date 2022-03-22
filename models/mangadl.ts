import { getEpisode, getSolvedImage } from "../api/mod.ts";
import { Episode } from "../types/manga.ts";
import { compress } from "../util/mod.ts";

export class Mangadl {
  url?: string;

  seriesUrl?: string;
  episodeUrl?: string;

  episode?: Episode;

  saveAsZip: boolean;
  saveDir: string;

  constructor() {
    this.saveAsZip = false;
    this.saveDir = `${Deno.cwd()}/mangas`;

    try {
      if (!Deno.lstatSync(this.saveDir).isDirectory) {
        Deno.mkdir(this.saveDir, { recursive: true });
      }
    } catch {
      Deno.mkdir(this.saveDir, { recursive: true });
    }
  }

  setEpisodeUrl(url: string) {
    this.episodeUrl = url;
  }

  async getEpisode() {
    try {
      this.episode = await getEpisode(this.episodeUrl!);
    } catch {
      throw new Error("Could not get episode");
    }
  }

  mkdirEpisode() {
    try {
      const folder = `${this.saveDir}/${
        this.episode!.readableProduct.series.title
      }/${this.episode!.readableProduct.title}`;

      try {
        Deno.lstatSync(folder).isDirectory;
      } catch {
        Deno.mkdir(folder, { recursive: true });
      }
    } catch {
      throw new Error("Could not create folder");
    }
  }

  async saveEpisode() {
    const episode = this.episode!;

    if (this.saveAsZip) { // save as manga
      const images = await Promise.all(
        episode.readableProduct.pageStructure.pages.filter(
          (page) => {
            return page.type === "main";
          },
        ).map(async (page) => {
          if (!page.src) return null;
          return await getSolvedImage(page.src!);
        }),
      );

      const nonNullImages = images.filter((image): image is Uint8Array => {
        return image !== null;
      });

      const zip = await compress(nonNullImages);

      Deno.writeFileSync(
        `${this.saveDir}/${episode.readableProduct.series.title}/${episode.readableProduct.title}.zip`,
        new Uint8Array(await zip.arrayBuffer()),
      );
    } else { // save as images directly
      await Promise.all(
        episode.readableProduct.pageStructure.pages.filter((page) => {
          return page.type === "main";
        }).map(async (page, index) => {
          if (!page.src) return;
          const image = await getSolvedImage(
            page.src!,
            page.width,
            page.height,
          );
          Deno.writeFile(
            `${this.saveDir}/${episode.readableProduct.series.title}/${episode.readableProduct.title}/${index}.jpg`,
            image,
          );
          return;
        }),
      );
    }
  }
}
