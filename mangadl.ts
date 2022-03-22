import { Mangadl } from "./models/mangadl.ts";

const args = Deno.args;

const helpMessage = `
manga-dl v0.0.1

    Usage:
        mangadl --help
        mangadl <url>
        mangadl <url> [options]

    Options:
        --help:
            Show this message

        --zip:
            Save as zip
            example:
                mangadl https://example.com/episode/1234 --zip

        --dir:
            Change save directory
            example:
                mangadl https://example.com/episode/1234 --dir /path/to/save/mangas
`;

// console.log(args);

if (args.length < 1) {
  console.error("Not enough arguments");
  console.log(helpMessage);
  Deno.exit(1);
}

const mangadl = new Mangadl();

for (const arg of args) {
  if (arg.startsWith("https://")) {
    const url = arg;

    mangadl.url = url;

    continue;
  }

  if (arg.startsWith("--")) {
    switch (arg) {
      case "--help": {
        if (mangadl.url) {
          console.error("Cannot use --help with url");
          console.log(helpMessage);
          Deno.exit(1);
        } else {
          console.log(helpMessage);
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
          console.error("No directory given");
          Deno.exit(1);
        }
        break;
      }
      default: {
        console.error(`Unknown option ${arg}`);
        break;
      }
    }
  }
}

if (mangadl.url!.match(/https:\/\/.*\/episode\/\d+/)) {
  console.log("Downloading episode...");

  try {
    mangadl.setEpisodeUrl(mangadl.url!);
    await mangadl.getEpisode();

    mangadl.mkdirEpisode();

    await mangadl.saveEpisode();

    console.log("Done!");
  } catch (err) {
    console.error(err);
    Deno.exit(1);
  }
}

// TODO: else if url match to series
