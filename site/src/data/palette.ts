// テーマ themes/loos-monokai.json のカラーを、機能グループ別に「色 + 役割」で整理したデータ。
// プレビューのスウォッチ表示はすべてここから生成する。

export interface Swatch {
  /** #RRGGBB または #RRGGBBAA（末尾アルファは UI 上グレー表示される） */
  hex: string;
  /** その色が担う役割の説明 */
  role: string;
}

/** 1. シンタックスコア（Monokai キーカラー） */
export const syntaxCore: Swatch[] = [
  { hex: "#f92672", role: "keyword / operator / tag" },
  { hex: "#a6e22e", role: "type / class / attribute / selector" },
  { hex: "#66d9ef", role: "function / json_key" },
  { hex: "#ae81ff", role: "number / constant / boolean" },
  { hex: "#fd971f", role: "parameter / this" },
  { hex: "#e6db74", role: "string" },
  { hex: "#f8f8f2", role: "fg — text / variable / punctuation" },
  { hex: "#949181", role: "comment" },
  { hex: "#3db1f5", role: "keyword.declaration / punctuation.special（独自）" },
];

/** 2. 背景・UI クローム（純正） */
export const chrome: Swatch[] = [
  { hex: "#272822", role: "editor bg" },
  { hex: "#1e1f1c", role: "sidebar / タブ溝 / ポップアップ地 / 境界" },
  { hex: "#414339", role: "surface / 選択面 / ステータスバー" },
  { hex: "#3e3d32", role: "行ハイライト / hover行" },
  { hex: "#75715e", role: "focus枠" },
  { hex: "#90908a", role: "行番号 / muted文字" },
  { hex: "#464741", role: "不可視文字 / wrap guide" },
  { hex: "#f8f8f0", role: "cursor" },
];

/** 3. 選択・ハイライト（背景フィル） */
export const highlight: Swatch[] = [
  { hex: "#6a6a9680", role: "document_highlight write（宣言・代入）" },
  { hex: "#4a4a7680", role: "document_highlight read（参照）" },
  { hex: "#878b9180", role: "selection（テキスト選択）" },
  { hex: "#75715e80", role: "search.match（検索一致）" },
];

/** 4. diff 系（Git） */
export const diff: Swatch[] = [
  { hex: "#a6e22e", role: "created — 追加（文字 / ガター）" },
  { hex: "#63862130", role: "created.background — 追加行の下地" },
  { hex: "#f92672", role: "deleted — 削除（文字 / ガター）" },
  { hex: "#90274a30", role: "deleted.background — 削除行の下地" },
  { hex: "#e6db74", role: "modified — 変更（Unified 縦バー）" },
  { hex: "#66852840", role: "modified.background" },
  { hex: "#fd971f", role: "conflict — コンフリクト" },
  { hex: "#66d9ef", role: "renamed — リネーム" },
];

/** 5. 診断ポップアップ（独自背景） */
export const diagnostics: Swatch[] = [
  { hex: "#f92672", role: "error — 文字 / 枠（＝base）" },
  { hex: "#b12f5b1a", role: "error.background — 下地（独自・α10%）" },
  { hex: "#e2e22e", role: "warning — 文字 / 枠（＝base）" },
  { hex: "#8485281a", role: "warning.background — 下地（独自・α10%）" },
  { hex: "#3db1f5", role: "info — 文字 / 枠（＝§1 blue）" },
  { hex: "#3c708c1a", role: "info.background — 下地（独自・α10%）" },
];

export interface AnsiColor {
  name: string;
  hex: string;
}

/** 6. ターミナル ANSI（前半8色 normal / 後半8色 bright） */
export const ansiColors: AnsiColor[] = [
  { name: "black", hex: "#333333" },
  { name: "red", hex: "#c4265e" },
  { name: "green", hex: "#86b42b" },
  { name: "yellow", hex: "#b3b42b" },
  { name: "blue", hex: "#6a7ec8" },
  { name: "magenta", hex: "#8c6bc8" },
  { name: "cyan", hex: "#56adbc" },
  { name: "white", hex: "#e3e3dd" },
  { name: "br.black", hex: "#666666" },
  { name: "br.red", hex: "#f92672" },
  { name: "br.green", hex: "#a6e22e" },
  { name: "br.yellow", hex: "#e2e22e" },
  { name: "br.blue", hex: "#819aff" },
  { name: "br.magenta", hex: "#ae81ff" },
  { name: "br.cyan", hex: "#66d9ef" },
  { name: "br.white", hex: "#f8f8f2" },
];
