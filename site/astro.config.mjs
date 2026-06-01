import { defineConfig } from 'astro/config';

// プロジェクトページ（https://ddryo.github.io/loos-monokai/）として配信するため
// site にユーザーページのオリジン、base にリポジトリ名を指定する。
export default defineConfig({
  site: 'https://ddryo.github.io',
  base: '/loos-monokai',
});
