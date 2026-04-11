# GitHub Wiki setup

GitHub provides an optional **Wiki** per repository. It is **not** the same git tree as your main project: it is a second repository whose clone URL is:

```text
https://github.com/<owner>/<repository>.wiki.git
```

Wikis support Markdown pages, a home page, and optional sidebar/footer files (`_Sidebar.md`, `_Footer.md`).

## Enable the wiki

1. Open the repository on GitHub.
2. Go to **Settings → General → Features**.
3. Enable **Wikis** (and optionally restrict editing to collaborators only).

You can then use **Wiki** in the top navigation to create and edit pages in the browser.

## Relationship to `docs/` in this repo

The **`docs/`** folder in the main repository is **version-controlled alongside the code**, shows up in pull requests, and renders when visitors browse files on GitHub. That makes it a good **canonical** place for documentation.

The **Wiki** is better suited for:

- Quick notes or brainstorming without a PR workflow.
- Long pages you edit only in the GitHub UI.
- Content you intentionally *do not* want in the default clone of the app repo.

A practical workflow is:

- Keep **authoritative** docs in **`docs/`** (this project).
- **Copy** or summarize into Wiki pages when you want the wiki tab populated, **or** clone the wiki repo and add Markdown files that mirror `docs/` (accepting some duplication unless you automate sync).

## Clone the wiki locally (optional)

```bash
git clone https://github.com/<owner>/<repository>.wiki.git
cd <repository>.wiki
# Add or edit .md files, then:
git add .
git commit -m "Add wiki pages from project documentation"
git push
```

Convention: the default landing page is **`Home.md`**.

## Suggested wiki page titles

If you mirror the conceptual docs, these titles align with the files in `docs/`:

| Wiki page | Source in repo |
|-----------|------------------|
| Home | Short intro + link to the main repo `docs/` |
| Design grain and abstraction | `docs/design-grain-and-abstraction.md` |
| Fun useful sound control | `docs/fun-useful-sound-control.md` |
| How Soundwave works | `docs/how-soundwave-works.md` |

You can paste Markdown from those files into the wiki editor, or maintain the wiki clone and push equivalent `.md` files.

## Local working copy in this repository

A separate clone initialized at **`soundwave.wiki/`** (ignored by the main repo’s `.gitignore`) holds the same pages for `git push` to `git@github.com:zFlux/soundwave.wiki.git`. If the wiki remote was empty or uninitialized, create the first page on GitHub once, then push from that directory. See **`soundwave.wiki/README.md`** in a checkout that includes ignored files (or list the folder locally).
