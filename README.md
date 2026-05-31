# LOOS Monokai for Zed

[Zed](https://zed.dev) 向けにカスタマイズした Monokai テーマ。シンタックス・Git diff・LSP 診断・統合ターミナルの配色を調整しています。

🎨 **[カラーパレット & プレビュー](https://ddryo.github.io/zed-loos-monokai/)**

## Themes

- **LOOS Monokai** (dark)

## Install

### From Zed Extensions (公開後)

Zed の拡張機能パネル（`cmd-shift-x`）で `LOOS Monokai` を検索してインストール。

### Dev Extension（開発・ローカル利用）

1. このリポジトリをクローン
2. Zed のコマンドパレット（`cmd-shift-p`）で `zed: install dev extension` を実行
3. このリポジトリのルートディレクトリを選択

その後 `settings.json` でテーマを指定:

```json
{
  "theme": {
    "mode": "dark",
    "dark": "LOOS Monokai"
  }
}
```

## Repository layout

```
.
├── extension.toml   # Zed 拡張マニフェスト
├── themes/          # テーマ JSON（正本）
└── site/            # Astro 製プレビューサイト（GitHub Pages）
```

## License

[MIT](./LICENSE)

---

# Dummy Title

Lorem ipsum **bold**, *italic*, ~~strikethrough~~, `code`
- item one
- item two

> blockquote sample

[link text](https://example.com)
![alt text](http://example.com/img.jpg)
