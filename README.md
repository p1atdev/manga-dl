# manga-dl

[![Codecov](https://github.com/p1atdev/manga-dl/actions/workflows/codecov.yaml/badge.svg)](https://github.com/p1atdev/manga-dl/actions/workflows/codecov.yaml)
[![Format](https://github.com/p1atdev/manga-dl/actions/workflows/format.yaml/badge.svg)](https://github.com/p1atdev/manga-dl/actions/workflows/format.yaml)
[![vr scripts](https://badges.velociraptor.run/flat.svg)](https://velociraptor.run)
[![codecov](https://codecov.io/gh/p1atdev/manga-dl/branch/main/graph/badge.svg?token=CNmbSQHTqS)](https://codecov.io/gh/p1atdev/manga-dl)

manga-dl - download mangas from official manga websites.

- [Installation](#installation)
- [Usage](#usage)
- [Supported sites](#supported-sites)
- [TODO](#todo)
- [Agreement](#agreement)

<h2 id="installation">Installation</h2>

### Requirements

- [Deno](https://deno.land)

#### Deno

macOS, Linux

```bash
curl -fsSL https://deno.land/install.sh | sh
```

Windows (PowerShell)

```bash
iwr https://deno.land/install.ps1 -useb | iex
```

### Install

```bash
deno install -qAn mangadl https://deno.land/x/mangadl/mangadl.ts
```

(`-qAn mangadl` means that run quietly, allow all, and name as `mangadl` )

#### Upgrade

```bash
mangadl upgrade
```

<h2 id="usage">Usage</h2>

### Help

```bash
$ mangadl --help

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
```

### Basic usage

```bash
mangadl https://shonenjumpplus.com/episode/3269754496638370192
```

After this, `mangas` directory will be created and the downloaded manga will be
stored in it.

### Download with zip

```bash
mangadl --zip https://shonenjumpplus.com/episode/3269754496638370192
```

### Download all episodes of a series [Experimental]

```bash
mangadl --all https://shonenjumpplus.com/episode/3269754496638370192 
```

### Change download directory

```bash
mangadl --dir /path/to/download https://shonenjumpplus.com/episode/3269754496638370192
```

<h2 id="supported-sites">Supported sites</h2>

Tested and verified sites

- [Shonen jump plus (少年ジャンプ+)](https://shonenjumpplus.com/)
- [Sundey webry (サンデーうぇぶり)](https://www.sunday-webry.com/)
- [Tonari no young jump (隣のヤングジャンプ)](https://tonarinoyj.jp/)

Not working site(s)

- [Ura sunday (裏サンデー)](https://urasunday.com)
- etc

<h2 id="todo">TODO</h2>

- [ ] Feature to download by `series`
- [ ] Feature to download all available episodes

<h2 id="agreement">Agreement</h2>

Do not publish mangas downloaded using this tool on the Internet.

Do not use mangas downloaded with this tool for commercial purposes. Please keep
it for personal use only.

The author of this tool is not responsible for any damage caused by the use of
this tool. Use at your own risk.
