# Issue draft — Git panel shows no file-type icons (hard to tell files apart)

- **Target repo:** `zed-industries/zed` (Git panel UI / default settings)
- **Type:** UX / default-setting feedback — **NOT a bug** (already configurable)
- **Status:** draft — *probably does not need to be filed*; see "Immediate fix" below
- **Related to this project:** none. `loos-monokai` is a **color theme**, not an icon
  theme, so it does not and cannot control git-panel file icons. This is purely Zed
  core behavior.

---

## Immediate fix (no issue required)

The changed files in Zed's Git panel have **no file-type icons** because the setting
that controls them is **off by default**. Zed's bundled defaults
(`assets/settings/default.json`, `zed-industries/zed@main`):

```jsonc
"git_panel": {
  "status_style": "icon",
  "file_icons": false,   // ← file-type icons in the changes list (OFF by default)
  "folder_icons": true,  // folder icons in tree view (ON by default)
  // ...
}
```

Enable it in `settings.json`:

```json
"git_panel": {
  "file_icons": true
}
```

After this, the Git panel uses the active **icon theme** (default Zed icons, or any
installed icon-theme extension) to render a file-type icon next to each changed file —
the same way the project panel already does, and matching VS Code's Source Control view.

This is independent of `loos-monokai`: the color theme never participates in icon
selection; the icon theme does.

## Why VS Code differs

VS Code's Source Control view shows file icons by default, driven by the active **File
Icon Theme** (Seti is enabled out of the box). So VS Code = icons-on by default, Zed =
icons-off by default. Hence the visible gap the user noticed.

---

## If an issue is still worth filing

Frame it as a **default / discoverability** suggestion, not a bug:

### Title

Consider enabling `git_panel.file_icons` by default (parity with the project panel and
VS Code Source Control)

### Body

#### Summary

In the Git panel's changes list, entries render without file-type icons, so files are
harder to scan and distinguish at a glance — only the filename text differentiates them.
The project panel already shows file icons by default, and VS Code's Source Control view
shows them by default too, so the Git panel feels inconsistent on first run.

The behavior is controllable via `git_panel.file_icons`, but it defaults to `false`,
which is easy to miss.

#### Request

- Consider defaulting `git_panel.file_icons` to `true` for visual consistency with
  `project_panel.file_icons` (which is on by default) and with VS Code.
- Alternatively (or additionally), surface the option more prominently — e.g. in the Git
  panel's context menu next to the existing Tree View / status-style toggles, and/or in
  the Git docs (`docs/src/git.md`), which currently do not mention `file_icons` /
  `folder_icons`.

#### Notes / scope

- Purely a default-value / discoverability change; the feature itself already exists and
  works.
- Decision is a deliberate maintainer call — they may have chosen `false` on purpose
  (e.g. to keep the changes list compact), so this may be closed as wontfix. Low priority.

### Environment

- Zed: <fill in `zed --version`>
- Confirmed against `assets/settings/default.json` on `zed-industries/zed@main`
  (`git_panel.file_icons` default `false`, `git_panel.folder_icons` default `true`).
