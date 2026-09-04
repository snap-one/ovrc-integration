# Pages

<https://snap-one.github.io/ovrc-integrations-sdk>

## High level

This branch is home to the content served via GitHub Pages.

Everything authored lives in [./hugo/](./hugo/). The content served on GitHub
Pages is built in two steps, using `mise build`:

1. [Hugo](https://gohugo.io) compiles [./hugo/](./hugo/) into `./mdbook/src/`:
   markdown chapters, a generated `SUMMARY.md`, and the static assets from
   [./hugo/static/](./hugo/static/) (published under `_static/`).
2. [mdbook](https://github.com/rust-lang/mdBook) builds `./mdbook/src/`
   into `./dist/`.

`./mdbook/src/` and `./dist/` are both build output and are not committed.

### Hugo layout

- [./hugo/content/](./hugo/content/) — the chapters. Top level sections become
  mdbook "parts"; their `_index.md` is not a chapter.
- [./hugo/layouts/](./hugo/layouts/) — templates. `all.md` passes content
  through untouched (expanding shortcodes only), `home.summary.md` generates
  mdbook's `SUMMARY.md` from the content tree.
- [./hugo/layouts/\_shortcodes/packages.md](./hugo/layouts/_shortcodes/packages.md)
  — renders the package/version lists by reading `./hugo/static/packages/`.

## How static assets are added

When changes are made to a package on the `main` branch of the repository,
a script copies relevant static documentation assets over
into the [./hugo/static/](./hugo/static/) directory
on this branch. This then triggers a new deploy of the GitHub Pages.

## Draft and WIP pages

[mdbook supports "Draft Chapters"](https://rust-lang.github.io/mdBook/format/summary.html).
To add a draft chapter, add `wip: true` to our content front-matter.
These chapters **will** be included in the final build.

[hugo also supports draft pages](https://gohugo.io/methods/page/draft/).
These chapters and pages will **not** be included in the final build.

## Useful Resources

- [Hugo Sections](https://gohugo.io/content-management/sections/)
- [Hugo Content Management](https://gohugo.io/content-management/organization/)
- [Hugo Template Functions](https://gohugo.io/functions/)
- [Hugo Template Methods](https://gohugo.io/methods/)

## Local development

```bash
mise install
mise serve
```
