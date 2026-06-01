# Repository Guidelines

## Project Structure & Module Organization

- `zed/extension.toml` defines the Zed extension metadata.
- `zed/themes/loos-monokai.json` is the source theme file. Treat it as the canonical color definition.
- `vscode/` contains the VSCode extension package used locally via symlink.
- `site/` contains the Astro preview site published to GitHub Pages.
- `site/src/components/` holds reusable UI components; `site/src/components/sections/` holds preview sections.
- `site/src/data/palette.ts` maps theme colors for the site.
- Zed user settings are managed outside this repo in `~/dotfiles/zed/` (`settings.json`, `keymap.json`). Do not add personal Zed config here.

## Testing Guidelines

There is no automated test suite yet. Before submitting changes:

- Run `nr build` in `site/` only when explicitly requested.
- Visually check important preview sections when changing colors or layout.
- Test the theme in Zed when editing `zed/themes/loos-monokai.json`.
- Test the theme in VSCode/Cursor when editing `vscode/themes/monokai-color-theme.json`.

## Commit & Pull Request Guidelines

Use Conventional Commit style seen in history:

- `feat: ...`
- `fix(site): ...`
- `refactor(site): ...`
- `docs: ...`

PRs should include a short summary, affected areas (`theme`, `site`, or both), linked issues when relevant, and screenshots for visible preview-site changes.
