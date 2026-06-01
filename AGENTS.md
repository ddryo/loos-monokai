# Repository Guidelines

## Project Structure & Module Organization

- `extension.toml` defines the Zed extension metadata.
- `themes/loos-monokai.json` is the source theme file. Treat it as the canonical color definition.
- `site/` contains the Astro preview site published to GitHub Pages.
- `site/src/components/` holds reusable UI components; `site/src/components/sections/` holds preview sections.
- `site/src/data/palette.ts` maps theme colors for the site.
- Zed user settings are managed outside this repo in `/Users/ryo/dotfiles/zed/` (`settings.json`, `keymap.json`). Do not add personal Zed config here.

## Testing Guidelines

There is no automated test suite yet. Before submitting changes:

- Run `nr build` in `site/` only when explicitly requested.
- Visually check important preview sections when changing colors or layout.
- Test the theme in Zed when editing `themes/loos-monokai.json`.

## Commit & Pull Request Guidelines

Use Conventional Commit style seen in history:

- `feat: ...`
- `fix(site): ...`
- `refactor(site): ...`
- `docs: ...`

PRs should include a short summary, affected areas (`theme`, `site`, or both), linked issues when relevant, and screenshots for visible preview-site changes.
