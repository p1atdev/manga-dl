import { Application, Router } from "./deps.ts";
import {
  getSolvedEpisode,
  getSolvedEpisodeZip,
  getSolvedImage,
} from "./api/mod.ts";

const BASE_URL = Deno.env.get("BASE_URL") || "http://localhost:8000";
const PORT = Deno.env.get("PORT") || 8000;

const router = new Router()
  .get("/image", async (ctx) => {
    const url = ctx.request.url.searchParams.get("url");
    if (!url) {
      ctx.response.status = 400;
      ctx.response.body = "Missing url parameter";
      return;
    }

    const width: number | undefined = (() => {
      const width = ctx.request.url.searchParams.get("width");
      return width ? parseInt(width) : undefined;
    })();
    const height: number | undefined = (() => {
      const height = ctx.request.url.searchParams.get("height");
      return height ? parseInt(height) : undefined;
    })();

    ctx.response.type = "image/jpeg";
    ctx.response.body = await getSolvedImage(url, width, height);
  })
  .get("/episode", async (ctx) => {
    const url = ctx.request.url.searchParams.get("url");
    if (!url) {
      ctx.response.status = 400;
      ctx.response.body = "Missing url parameter";
      return;
    }

    ctx.response.type = "application/json";
    ctx.response.body = await getSolvedEpisode(url);
  })
  .get("/download/episode", async (ctx) => {
    const url = ctx.request.url.searchParams.get("url");
    if (!url) {
      ctx.response.status = 400;
      ctx.response.body = "Missing url parameter";
      return;
    }

    const { zip, filename } = await getSolvedEpisodeZip(url);

    ctx.response.type = "application/zip";
    ctx.response.headers.set(
      "Content-Disposition",
      `attachment; filename="${filename}"`,
    );
    ctx.response.body = zip;
  })
  .get("/", (ctx) => {
    ctx.response.status = 404;
    ctx.response.body = "Not Found";
  });

console.log("Starting server...");
console.log(`Listening on ${BASE_URL}`);

await new Application()
  .use(router.routes())
  .listen({ port: Number(PORT) });
