# manga-dl

[![Codecov](https://github.com/p1atdev/manga-dl/actions/workflows/codecov.yaml/badge.svg)](https://github.com/p1atdev/manga-dl/actions/workflows/codecov.yaml)
[![Format](https://github.com/p1atdev/manga-dl/actions/workflows/format.yaml/badge.svg)](https://github.com/p1atdev/manga-dl/actions/workflows/format.yaml)
[![vr scripts](https://badges.velociraptor.run/flat.svg)](https://velociraptor.run)
[![codecov](https://codecov.io/gh/p1atdev/manga-dl/branch/main/graph/badge.svg?token=CNmbSQHTqS)](https://codecov.io/gh/p1atdev/manga-dl)

manga-dl - download mangas from official manga websites.

- [Installation](#installation)
- [Usage](#usage)
- [Supported sites](#supported-sites)
- [Agreement](#agreement)

<h2 id="installation">Installation</h2>

You have to build from source on this version (v0.0.1).

### Requirements

- [Deno](https://deno.land)
- [Velociraptor](https://velociraptor.run) (Optional)

First, install deno.

#### Deno

macOS, Linux
```bash
curl -fsSL https://deno.land/install.sh | sh
```

Windows (PowerShell)
```bash
iwr https://deno.land/install.ps1 -useb | iex
```

#### Velociraptor

```bash
deno install -qAn vr https://deno.land/x/velociraptor@1.4.0/cli.ts
```

### Build

Clone the repository.
```bash
git clone https://github.com/p1atdev/manga-dl
```

By using deno
```bash
deno compile --allow-net --allow-write --allow-read ./mangadl.ts
```

By using velociraptor
```bash
vr build
```

mangadl binary will be generated in the current directory.

<h2 id="usage">Usage</h2>

### Help

```bash
$ ./mangadl --help

manga-dl v1.0.0

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
```

### Basic usage

```bash
./mangadl https://shonenjumpplus.com/episode/3269754496638370192
```

After this, `mangas` directory will be created and the downloaded manga will be stored in it.

### Download with zip

```bash
./mangadl https://shonenjumpplus.com/episode/3269754496638370192 --zip
```

### Change download directory

```bash
./mangadl https://shonenjumpplus.com/episode/3269754496638370192 --dir /path/to/download
```

<h2 id="supported-sites">Supported sites</h2>

Tested and verified sites

- [Shonen jump plus (少年ジャンプ+)](https://shonenjumpplus.com/)
- [Sundey webry (サンデーうぇぶり)](https://www.sunday-webry.com/)
- [Tonari no young jump (隣のヤングジャンプ)](https://tonarinoyj.jp/)

Not working site(s)

- [Ura sunday (裏サンデー)](https://urasunday.com)
- etc

<h2 id="agreement">Agreement</h2>

Do not publish mangas downloaded using this tool on the Internet.

Do not use mangas downloaded with this tool for commercial purposes.
Please keep it for personal use only.

The author of this tool is not responsible for any damage caused by the use of this tool. Use at your own risk.

