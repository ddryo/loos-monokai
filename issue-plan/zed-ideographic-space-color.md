# Feature request draft — color / highlight full-width (ideographic) spaces distinctly

- **Target:** `zed-industries/zed` → **GitHub Discussions**, category **Feature Requests**
  (Zed disables blank issues; feature requests go to Discussions, not Issues:
  https://github.com/zed-industries/zed/discussions/new?category=feature-requests)
- **Type:** feature request (editor whitespace rendering / theming)
- **Status:** draft (not posted yet)
- **Closest existing request:** **#55428** — "Distinguish ideographic spaces from ASCII spaces in whitespace rendering".
  That one asks for a distinct **marker glyph**; this draft is about a distinct **color / emphasis**, which #55428 does not cover. Decide whether to post this as a **comment on #55428** (preferred, to consolidate) or as a new focused discussion. See "投稿メモ" at the bottom.

---

## Title

Allow full-width (ideographic) spaces to be highlighted in a distinct color

## Body

### What are you proposing?

Add a way to render an **IDEOGRAPHIC SPACE (U+3000, "full-width space")** in a **distinct color / emphasis** (e.g. a red or warning tint), so an accidental full-width space stands out from a normal ASCII space (U+0020).

Today, with whitespace rendering enabled:

```jsonc
{
  "show_whitespaces": "all",
  "whitespace_map": {
    "space": "•",
    "tab": "→"
  }
}
```

`whitespace_map` lets you choose the **glyph**, but:

1. `whitespace_map.space` is used for **both** ASCII space and U+3000, so the two are not distinguishable, and
2. all whitespace markers are drawn in a **single muted color** — there is no way to give one kind of whitespace its own color.

The result is that an accidental full-width space is still easy to miss, even with `show_whitespaces: "all"`.

### Why does this matter?

In Japanese / CJK editing, a stray U+3000 in source code, JSON/YAML, `.env`, Markdown, etc. is a common and annoying bug source:

- In indentation-sensitive contexts (YAML, Python, Makefiles) a full-width space breaks parsing.
- In code it can produce confusing syntax errors.
- It is hard to notice because it reads like ordinary spacing.

VS Code users solve this with the **`zenkaku`** extension, which **colors** full-width spaces so they jump out, and with lint rules like `no-irregular-whitespace`. Zed currently has no equivalent: glyph substitution alone (even when #55428 lands) does not make the character *pop* the way a color does.

This is a natural fit for a theme like Monokai, where a single saturated accent (e.g. `#F92672`) on the offending character would make it unmissable.

### Example

```
ascii space:       a b
ideographic space: a　b
```

With `show_whitespaces: "all"` both render with the same `whitespace_map.space` marker, in the same color. There is no setting that makes the U+3000 case red/highlighted.

### Possible approaches (any one would solve it)

1. **Per-entry color in `whitespace_map`** — allow an object form so a specific whitespace can carry its own color:

   ```jsonc
   "whitespace_map": {
     "space": "•",
     "ideographic_space": { "char": "□", "color": "#F92672" },
     "tab": "→"
   }
   ```

2. **A theme color key for invisibles / irregular whitespace** — e.g. an editor theme key such as `editor.invisible` and/or a dedicated `editor.ideographic_space` (or `editor.irregular_whitespace`) color, so themes (not just user settings) can tint it.

3. **A general "highlight irregular whitespace" option** — independent of `show_whitespaces`, surface unusual whitespace (U+3000, NBSP U+00A0, etc.) with a warning-style highlight, similar in spirit to VS Code's `editor.renderWhitespace` + irregular-whitespace lint. This also covers the broader i18n case.

A dedicated `ideographic_space` option (approach 1 or 2) is probably enough for the common CJK case; approach 3 is the more general version.

### Why not an extension?

This needs core text-rendering / theming. The extension API does not expose decorations or custom highlights — see **#49438** ("Expose Inlay/Decoration APIs to Extensions"), which was closed (2026-02-18). Even if such an API existed, coloring a specific whitespace codepoint belongs in the editor's whitespace renderer / theme, not in a WASM extension.

### Related

- **#55428** — Distinguish ideographic spaces from ASCII spaces in whitespace rendering *(closest; proposes a separate marker **glyph**, this draft adds **color**)*
- **#44803** — Customize the font / size / opacity used for whitespace characters
- **#41647** — Ideas from VS Code: highlight trailing whitespace
- **#38585** — Highlight whitespace changes in Git diff view
- **#53037** — Configurable whitespace marker size *(per #55428)*
- **#37704 / #38355** — `whitespace_map` added / documented *(per #55428)*
- **#49186** — Whitespace rendering fix involving non-breaking spaces *(per #55428)*
- **#49438** — Extension API: expose Inlay/Decoration APIs to extensions *(closed)*

### Environment / current behavior reference

`assets/settings/default.json` (current):

```jsonc
// Whether to show tabs and spaces: "selection" | "none" | "all" | "boundary" | "trailing"
"show_whitespaces": "selection",
// Visible characters used to render whitespace when show_whitespaces is enabled.
"whitespace_map": {
  "space": "•",
  "tab": "→"
}
```

There is no `ideographic_space` entry and no per-whitespace color/theme key.

---

## 投稿メモ（下書き外・ポスト本文には含めない）

- **投稿先は Issue ではなく Discussions の Feature Requests カテゴリ**。Zed は `blank_issues_enabled: false` で、Issue テンプレートは bug/crash のみ。
  → https://github.com/zed-industries/zed/discussions/new?category=feature-requests
- **重複に注意**: #55428 が「全角スペースを別の**記号**で表示する」をすでに提案済み（2026-05-01 時点で upvote 3・コメント 0）。
  - 推奨は **#55428 にコメントを追加**して「記号だけでなく**色**も付けられるように」と上乗せする形。議論が分散せず、既存の文脈に乗せられる。
  - 独立した強い要望として立てたい場合のみ、新規 Discussion を作成（タイトルは「色」を主語にして #55428 と差別化する）。
- 投稿後は upvote が伸びるかが採否に効くタイプ。本文末尾の Related で文脈をつないであるので、リンク先（特に #55428）にも一言コメントして相互参照しておくと拾われやすい。
- 本文は英語（国際リポジトリ向け）。コードフェンス/バッククォートを含むので、実際に投稿する際は本文を一時ファイルに書き出して貼り付ける運用が安全。
