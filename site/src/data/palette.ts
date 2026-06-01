// テーマ zed/themes/loos-monokai.json のカラーを、機能グループ別に「色 + 役割」で整理したデータ。
// プレビューのスウォッチ表示はすべてここから生成する。

export interface Swatch {
  /** #RRGGBB または #RRGGBBAA（末尾アルファは UI 上グレー表示される） */
  hex: string;
  /** チップの背景色に使う CSS 変数名 */
  cssVar: `--${string}`;
  /** その色が担う役割の説明 */
  role: string;
}

/** 1. シンタックスコア（Monokai キーカラー） */
export const syntaxCore: Swatch[] = [
  { hex: "#fc2f78", cssVar: "--red", role: "keyword / operator / tag" },
  { hex: "#9ed72b", cssVar: "--green", role: "type / class / attribute / selector" },
  { hex: "#60d6ec", cssVar: "--cyan", role: "function / json_key / declaration" },
  { hex: "#b389ff", cssVar: "--purple", role: "number / constant / boolean" },
  { hex: "#ff9f2f", cssVar: "--orange", role: "parameter / this" },
  { hex: "#e4d971", cssVar: "--yellow", role: "string" },
  { hex: "#f4f4ec", cssVar: "--fg", role: "fg — text / variable / punctuation" },
  { hex: "#949181", cssVar: "--comment", role: "comment" },
  { hex: "#4197f1", cssVar: "--blue", role: "punctuation.special / info（独自）" },
];

/** 2. 背景・UI クローム（純正） */
export const chrome: Swatch[] = [
  { hex: "#23241f", cssVar: "--bg", role: "editor / gutter / terminal / アクティブタブ" },
  { hex: "#292a26", cssVar: "--chrome", role: "サイドバー / タブ溝 / パネル / ポップアップ地" },
  { hex: "#30312e", cssVar: "--bar", role: "タイトルバー / ステータスバー" },
  { hex: "#414339", cssVar: "--surface", role: "border / 選択・アクティブ面" },
  { hex: "#3e3d32", cssVar: "--line", role: "行ハイライト / hover行" },
  { hex: "#75715e", cssVar: "--brown", role: "focus枠" },
  { hex: "#90908a", cssVar: "--linenum", role: "行番号 / muted文字" },
  { hex: "#464741", cssVar: "--wrap-guide", role: "不可視文字 / wrap guide" },
  { hex: "#f8f8f0", cssVar: "--cursor", role: "cursor" },
];

/** 3. 選択・ハイライト（背景フィル） */
export const highlight: Swatch[] = [
  { hex: "#788d8750", cssVar: "--hl-write", role: "document_highlight write/read（宣言・参照）" },
  { hex: "#878b9180", cssVar: "--hl-sel", role: "selection（テキスト選択）" },
  { hex: "#92926270", cssVar: "--hl-find", role: "search.match（検索一致）" },
];

/** 4. diff 系（Git） */
export const diff: Swatch[] = [
  { hex: "#9ed72b", cssVar: "--green", role: "created — 追加（文字 / ガター）" },
  { hex: "#63862130", cssVar: "--add-bg", role: "created.background — 追加行の下地" },
  { hex: "#fc2f78", cssVar: "--red", role: "deleted — 削除（文字 / ガター）" },
  { hex: "#90274a30", cssVar: "--del-bg", role: "deleted.background — 削除行の下地" },
  { hex: "#e4d971", cssVar: "--yellow", role: "modified — 変更（Unified 縦バー）" },
  { hex: "#66852840", cssVar: "--mod-bg", role: "modified.background" },
  { hex: "#ff9f2f", cssVar: "--orange", role: "conflict — コンフリクト" },
  { hex: "#60d6ec", cssVar: "--cyan", role: "renamed — リネーム" },
];

/** 5. 診断ポップアップ（独自背景） */
export const diagnostics: Swatch[] = [
  { hex: "#fc2f78", cssVar: "--red", role: "error — 文字 / 枠（＝base）" },
  { hex: "#b12f5b1a", cssVar: "--err-bg", role: "error.background — 下地（独自・α10%）" },
  { hex: "#e4d971", cssVar: "--byellow", role: "warning — 文字 / 枠（＝base）" },
  { hex: "#8485281a", cssVar: "--warn-bg", role: "warning.background — 下地（独自・α10%）" },
  { hex: "#4197f1", cssVar: "--blue", role: "info — 文字 / 枠（＝§1 blue）" },
  { hex: "#3c708c1a", cssVar: "--info-bg", role: "info.background — 下地（独自・α10%）" },
];

export interface AnsiColor {
  name: string;
  hex: string;
}

/** 6. ターミナル ANSI（前半8色 normal / 後半8色 bright） */
export const ansiColors: AnsiColor[] = [
  { name: "black", hex: "#666666" },
  { name: "red", hex: "#fc2f78" },
  { name: "green", hex: "#9ed72b" },
  { name: "yellow", hex: "#e4d971" },
  { name: "blue", hex: "#4197f1" },
  { name: "magenta", hex: "#b389ff" },
  { name: "cyan", hex: "#60d6ec" },
  { name: "white", hex: "#f4f4ec" },
  { name: "br.black", hex: "#666666" },
  { name: "br.red", hex: "#fc2f78" },
  { name: "br.green", hex: "#9ed72b" },
  { name: "br.yellow", hex: "#e4d971" },
  { name: "br.blue", hex: "#4197f1" },
  { name: "br.magenta", hex: "#b389ff" },
  { name: "br.cyan", hex: "#60d6ec" },
  { name: "br.white", hex: "#f4f4ec" },
];
