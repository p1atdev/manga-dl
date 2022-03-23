import { Mangadl } from "./models/mangadl.ts";
import { log } from "./util/mod.ts";

const args = Deno.args;

const helpMessage = `
manga-dl v0.0.2

    Usage:
        mangadl upgrade
        mangadl --help
        mangadl <url>
        mangadl [options] <url> 

    Commands:
        upgrade:
            Upgrade mangadl to the latest version.

    Options:
        --help:
            Show this message

        --zip:
            Save as zip
            example:
                mangadl --zip https://example.com/episode/1234 

        --all: [Experimental]
            Download all episodes of a series
            This is an experimental feature.
            example:
                mangadl --all https://example.com/series/1234 

        --dir:
            Change save directory
            example:
                mangadl --dir /path/to/save/mangas https://example.com/episode/1234 
`;

// log.message(args);

if (args.length < 1) {
  log.error("Not enough arguments");
  log.info(helpMessage);
  Deno.exit(1);
}

const mangadl = new Mangadl();

for (const arg of args) {
  switch (arg) {
    case "upgrade": {
      log.info("Upgrading...");
      const process = Deno.run({
        cmd: [
          "deno",
          "install",
          "-f",
          "-qAn",
          "mangadl",
          "https://deno.land/x/mangadl/mangadl.ts",
        ],
      });

      const { success } = await process.status();
      if (success) {
        log.success("Successfully upgraded!");
      } else {
        log.error("Failed to upgrade!");
      }
      Deno.exit(0);
      break;
    }
    default: {
      break;
    }
  }

  if (arg.startsWith("https://")) {
    const url = arg;

    mangadl.url = url;

    continue;
  }

  if (arg.startsWith("--")) {
    switch (arg) {
      case "--help": {
        if (mangadl.url) {
          log.error("Cannot use --help with url");
          log.info(helpMessage);
          Deno.exit(1);
        } else {
          log.error(helpMessage);
          Deno.exit(0);
        }
        break;
      }
      case "--zip": {
        mangadl.saveAsZip = true;
        break;
      }
      case "--dir": {
        try {
          mangadl.saveDir = args[args.indexOf(arg) + 1];
        } catch {
          log.error("No directory given");
          Deno.exit(1);
        }
        break;
      }
      case "--all": {
        mangadl.downloadAll = true;
        break;
      }
      default: {
        log.error(`Unknown option ${arg}`);
        break;
      }
    }
  }
}

if (mangadl.matchToEpisodeUrl(mangadl.url!)) {
  log.info("Download started");
  log.info(`Target URL: ${mangadl.url}`);

  if (mangadl.downloadAll) {
    log.info("Type: Series");
    try {
      mangadl.setEpisodeUrl(mangadl.url!);
      await mangadl.getEpisode();

      await mangadl.getSeries();

      await mangadl.saveSeries();
    } catch (err) {
      log.error(err);
      Deno.exit(1);
    }
  } else {
    log.info(`Type: Episode`);

    try {
      mangadl.setEpisodeUrl(mangadl.url!);
      await mangadl.getEpisode();

      mangadl.mkdirEpisode();

      await mangadl.saveEpisode();
    } catch (err) {
      log.error(err);
      Deno.exit(1);
    }
  }
}

// TODO: else if url match to series
