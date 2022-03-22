import { getSolvedEpisode } from "../api/episode.ts";
import { assertEquals } from "../deps.ts";

Deno.test("Get solved episode", async () => {
  const episodeUrl = "https://shonenjumpplus.com/episode/3269754496381675593";

  const episode = await getSolvedEpisode(episodeUrl);

  assertEquals(
    episode.readableProduct.pageStructure.pages.find((page) =>
      page.contentStart
    )?.src,
    "http://localhost:8000/image?url=https://cdn-ak-img.shonenjumpplus.com/public/page/2/3269754496381687092-379912a01bcda616c4edb048edc17835&width=822&height=1200",
  );
  assertEquals(episode.readableProduct.title, "[1話]ミス・リトルグレイ");
});
