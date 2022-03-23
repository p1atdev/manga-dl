import { getEpisode, getSolvedImage } from "../api/mod.ts";
import { Episode } from "../types/manga.ts";
import { compress, log } from "../util/mod.ts";
import { Feed, parseFeed } from "../deps.ts";

export class Mangadl {
  url?: string;

  seriesUrl?: string;
  episodeUrl?: string;

  episode?: Episode;
  seriesFeed?: Feed;

  saveAsZip: boolean;
  saveDir: string;
  downloadAll: boolean;

  constructor() {
    this.saveAsZip = false;
    this.saveDir = `${Deno.cwd()}/mangas`;
    this.downloadAll = false;

    try {
      if (!Deno.lstatSync(this.saveDir).isDirectory) {
        Deno.mkdir(this.saveDir, { recursive: true });
      }
    } catch {
      Deno.mkdir(this.saveDir, { recursive: true });
    }
  }

  matchToEpisodeUrl(url: string): boolean {
    return url.match(/https:\/\/.*\/episode\/\d+/) !== null;
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
      const folder = this.saveAsZip
        ? `${this.saveDir}/${this.episode!.readableProduct.series.title}`
        : `${this.saveDir}/${this.episode!.readableProduct.series.title}/${
          this.episode!.readableProduct.title
        }`;

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

    log.info(`Donwload started: ${episode.readableProduct.title}`);
    log.info(`URL: ${this.episodeUrl}`);

    if (this.saveAsZip) { // save as manga
      const images = await Promise.all(
        episode.readableProduct.pageStructure.pages.filter(
          (page) => {
            return page.type === "main";
          },
        ).map((page) => {
          if (!page.src) return null;
          return getSolvedImage(page.src!);
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

      log.success(`Download complete: ${episode.readableProduct.title}`);
      log.info(
        `Saved to ${this.saveDir}/${
          this.episode!.readableProduct.series.title
        }/${this.episode!.readableProduct.title}.zip`,
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

      log.info(`Download complete: ${episode.readableProduct.title}`);
      log.info(
        `Saved to ${this.saveDir}/${
          this.episode!.readableProduct.series.title
        }/${this.episode!.readableProduct.title}`,
      );
    }
  }

  async getSeries() {
    const episodeUrl = new URL(this.url!);
    this.seriesUrl = `https://${episodeUrl.host}/atom/series/${
      this.episode?.readableProduct.series.id
    }`;

    const xml = await fetch(this.seriesUrl).then((res) => res.text());

    this.seriesFeed = await parseFeed(xml);
  }

  async saveSeries() {
    for (const entry of this.seriesFeed!.entries) {
      try {
        const link = entry.links!.filter((link) =>
          this.matchToEpisodeUrl(link.href!)
        )[0];

        this.setEpisodeUrl(link.href!);
        await this.getEpisode();

        this.mkdirEpisode();

        await this.saveEpisode();
      } catch (err) {
        log.error(err);
        continue;
      }
    }
  }
}
