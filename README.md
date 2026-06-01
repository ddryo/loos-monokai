# LOOS Monokai

[Zed](https://zed.dev)向けにカスタマイズしたMonokaiテーマ。シンタックス・Git diff・LSP診断・統合ターミナルの配色を調整しています。

🎨 **[カラーパレット & プレビュー](https://ddryo.github.io/loos-monokai/)**

## Packages

- `zed/`: Zed拡張機能
- `vscode/`: VSCode拡張機能（ローカルシンボリックリンク運用）

## Zed

### From Zed Extensions（公開後）

Zedの拡張機能パネル（`cmd-shift-x`）で`LOOS Monokai`を検索してインストール。

### Dev Extension（開発・ローカル利用）

1. このリポジトリをクローン
2. Zedのコマンドパレット（`cmd-shift-p`）で`zed: install dev extension`を実行
3. `zed/`ディレクトリを選択

その後`settings.json`でテーマを指定:

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
├── zed/             # Zed拡張機能として公開するパッケージ
│   ├── extension.toml
│   ├── LICENSE
│   └── themes/
├── vscode/          # VSCode拡張機能としてローカル利用するパッケージ
│   ├── package.json
│   └── themes/
└── site/            # Astro製プレビューサイト（GitHub Pages）
```

Zedの拡張機能申請時は、`zed-industries/extensions`側で`path = "zed"`を指定します。

## VSCode

現在のVSCode版は、拡張IDを`theme-loos-monokai`、テーマ名を`LOOS-Monokai`として管理しています。

ローカルで使う場合は、VSCodeのextensions配下に`vscode/`をシンボリックリンクします。

```sh
mv ~/dotfiles/vscode/extensions/theme-monokai-customized \
  ~/dotfiles/vscode/extensions/theme-monokai-customized.bak

ln -s ~/DEV/Tools/loos-monokai/vscode \
  ~/dotfiles/vscode/extensions/theme-loos-monokai
```

貼り直し後は、`vscode/themes/monokai-color-theme.json`を編集すればVSCode/Cursor側にも反映されます。

`settings.json`ではテーマ名を指定します。

```json
{
  "workbench.colorTheme": "LOOS-Monokai"
}
```

## License

[MIT](./LICENSE)
