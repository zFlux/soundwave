# Soundwave

Browser-based experiment in **generating and shaping sound** with JavaScript and the Web Audio API. The UI uses a canvas and Bézier-style control lines; the drawn path is sampled into an audio buffer for playback.

## Run locally

Open `snd.html` in a browser (or serve the project root with any static file server so relative paths like `../audio/` resolve if you use WAV loading).

## Documentation

Project documentation lives in the **[`docs/`](docs/)** folder. On GitHub, browse the repository and open `docs` to read it with rendered Markdown.

### GitHub Wiki (optional)

GitHub’s **Wiki** is a separate space from this repository: you enable it under **Repository → Settings → Features → Wikis**, then create pages in the web UI or clone the wiki git repository (`https://github.com/<owner>/<repo>.wiki.git`) and push Markdown files. The wiki is useful for informal notes and long-form exploration; keeping canonical docs in `docs/` means they stay in the main repo for review and history.

See **[`docs/github-wiki-setup.md`](docs/github-wiki-setup.md)** for a concise setup and how it relates to the files here.

## Contents

| Topic | File |
|--------|------|
| Index of all docs | [`docs/README.md`](docs/README.md) |
| Why “draw the wave” is the wrong grain | [`docs/design-grain-and-abstraction.md`](docs/design-grain-and-abstraction.md) |
| Useful, playful ways to control sound | [`docs/fun-useful-sound-control.md`](docs/fun-useful-sound-control.md) |
| How this codebase maps drawing to audio | [`docs/how-soundwave-works.md`](docs/how-soundwave-works.md) |
| GitHub Wiki setup | [`docs/github-wiki-setup.md`](docs/github-wiki-setup.md) |
