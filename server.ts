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

    await getSolvedImage(ctx, url);
  })
  .get("/episode", async (ctx) => {
    const url = ctx.request.url.searchParams.get("url");
    if (!url) {
      ctx.response.status = 400;
      ctx.response.body = "Missing url parameter";
      return;
    }

    await getSolvedEpisode(ctx, url);
  })
  .get("/download/episode", async (ctx) => {
    const url = ctx.request.url.searchParams.get("url");
    if (!url) {
      ctx.response.status = 400;
      ctx.response.body = "Missing url parameter";
      return;
    }

    await getSolvedEpisodeZip(ctx, url);
  })
  .get("/", (ctx) => {
    ctx.response.status = 404;
    ctx.response.body = "Not Found";
  });

console.log("Starting server...");
console.log(`Listening on ${BASE_URL}:${PORT}`);

await new Application()
  .use(router.routes())
  .listen({ port: Number(PORT) });
