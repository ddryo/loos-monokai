# 対策プラン — tree-sitter-mdx の paragraph→JSX→fence バグをローカルで直す

- **対象バグ:** paragraph の直後に block JSX が来ると、その後のフェンスコードブロックが壊れて文末までカスケードする
- **upstream issue:** srazzak/tree-sitter-mdx #10 — https://github.com/srazzak/tree-sitter-mdx/issues/10
- **issue 詳細ドラフト:** [tree-sitter-mdx-paragraph-jsx-fence.md](./tree-sitter-mdx-paragraph-jsx-fence.md)
- **ステータス:** 未着手（プラン保存のみ）

---

## 調査でわかったこと（2026-06-02 時点）

- 壊れている実体は tree-sitter-mdx の **external scanner（`src/scanner.c` 約58KB）＋ `grammar.js`**。Zed はこれを wasm にコンパイルして読み込む。
- Zed `mdx` 拡張 v0.4.0 が固定している grammar rev は **`0f2d4b204b231e5ebb7b94ff0259bee6c83ebc58`**（`0f2d4b2`）。
- 現 main は **`3aa29e8`**。`0f2d4b2..main` の差分は **inline code span（行内バッククォート）追加が中心**で、今回の block fence × JSX 隣接バグの箇所は触っていない。
  → **単なる grammar 版上げでは直らない見込み**（要 parse 確認）。
- ローカル環境:
  - `tree-sitter` CLI 未インストール / node v22.21.1 / pnpm あり（`pnpm-lock.yaml` 同梱）
  - Zed `mdx` 拡張 installed 済み: `~/Library/Application Support/Zed/extensions/installed/mdx`
  - dev extension（symlink 方式）は既に利用中（`loos-monokai` テーマ等）。"Install Dev Extension" の運用に慣れている前提でOK。
  - 作業用 clone: `/tmp/tsmdx-src`（一時。本格作業時は永続パスへ clone し直す）

---

## 方法（軽い順）

### A. 書き方で回避（今すぐ・ツール不要・暫定）

`paragraph → block JSX → fence` の隣接を作らない。段落と JSX の間に「段落以外のブロック」（見出し / `---` / リスト / 別フェンス）を挟めば壊れない（issue で検証済み）。

- ✗ 見た目に出ない無害な区切りが無い（`{/* comment */}` は extras 扱いで効かないと確認済み）。
- 根治ではなく執筆時の運用回避。B が入るまでの暫定。

### B. grammar を直して Zed dev extension で読ませる（本命・中〜高コスト）

ローカルで本当に直す唯一の道。成果はそのまま issue #10 の upstream PR の土台になる。

1. tree-sitter-mdx を fork/clone し、`scanner.c`（必要なら `grammar.js`）の fence ペアリングを修正
2. `tree-sitter generate` → `tree-sitter parse` で repro / expected が通るまで回す（`test/` にテスト追加）
3. zed-mdx を clone し、`extension.toml` の `[grammars.mdx]` を自分の fork(rev)／ローカルパスに差し替え
4. Zed の "Install Dev Extension" で読み込む（Zed が wasm をビルド）。既存 installed `mdx` は無効化/アンインストール

- コスト: external scanner(C) のデバッグ次第。根が浅ければ数十行、深いと state 管理まで踏み込む。着手して確定する。

### C. まず main を実際に parse して「版上げで直らないか」を確定（安い切り分け）← 推奨スタート

`tree-sitter` CLI を入れて、`0f2d4b2` と `main` の両方で repro を parse。

- 万一 main で直っていれば → 対応は「grammar rev を上げた dev zed-mdx を入れる」だけで完了（scanner を触らずに済む）
- 直っていなければ → B へ。C の作業（CLI 導入・generate・parse 環境）はそのまま B のステップ2の足場になる

---

## 推奨順序

**C → (ダメなら) B**、執筆は当面 A でしのぐ。

## 次にやること（再開用チェックリスト）

- [ ] `tree-sitter` CLI 導入（`pnpm i` または `npm i -g tree-sitter-cli`）
- [ ] `/tmp/tsmdx-src` を永続パス（例: `~/DEV/Tools/tree-sitter-mdx`）へ clone し直す
- [ ] `0f2d4b2` をチェックアウト → `tree-sitter generate` → repro を `tree-sitter parse` してバグ再現を確認
- [ ] `main`(`3aa29e8`) でも同様に parse → 版上げで直るか判定（C の結論）
- [ ] 直らなければ `scanner.c` の fence 検出ロジックを読み、paragraph→block JSX 後の状態を調査（B 着手）
- [ ] 修正 → テスト追加 → zed-mdx dev extension で Zed 実機確認
- [ ] upstream PR（issue #10 リンク）

## 参考

- repro / expected parse は issue #10 および [tree-sitter-mdx-paragraph-jsx-fence.md](./tree-sitter-mdx-paragraph-jsx-fence.md) を参照
- Zed Extensions（grammar の参照方法・dev extension）: https://zed.dev/docs/extensions/languages
