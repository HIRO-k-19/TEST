# salon hiro LP — Design System Rules

Figma連携時の参考用ドキュメント。Figma MCPでデザインを読み込んでコード化する際は、このルールに沿って既存トークン・パターンを再利用してください。

## 1. プロジェクト概要

- **種別:** 静的ランディングページ（フレームワーク非使用）
- **構成:** `index.html` + `style.css` の2ファイル構成
- **ターゲット:** 25〜40代女性（ネイルサロン）
- **トーン:** 白基調・ミニマル・上品

## 2. Token Definitions（デザイントークン）

### 場所
`style.css` の `:root` ブロック（行 1-16）に CSS Custom Properties で集約。

### カラートークン

| トークン | 値 | 用途 |
|---|---|---|
| `--color-bg` | `#ffffff` | メイン背景（純白） |
| `--color-bg-soft` | `#f7f6f4` | セカンダリ背景（オフホワイト） |
| `--color-bg-cream` | `#fbfaf8` | カード/メニュー背景（クリーム） |
| `--color-text` | `#1f1d1b` | 本文テキスト（ほぼ黒） |
| `--color-muted` | `#8c8680` | サブテキスト/補足 |
| `--color-line` | `#ececea` | 区切り線（標準） |
| `--color-line-soft` | `#f1efec` | 区切り線（薄め） |
| `--color-accent` | `#c9b8a0` | アクセント（ウォームベージュ） |
| `--color-accent-dark` | `#a89377` | アクセント濃色 |
| `--color-white` | `#ffffff` | 白固定（コンポーネント反転用） |

### タイポグラフィトークン

| トークン | 値 | 用途 |
|---|---|---|
| `--font-serif-en` | `'Cormorant Garamond', serif` | 英文見出し・装飾 |
| `--font-sans-jp` | `'Noto Sans JP', sans-serif` | 日本語本文（デフォルト） |
| `--font-serif-jp` | `'Noto Serif JP', serif` | 日本語見出し（タイトル系） |

### レイアウトトークン
- `--max-w: 1120px` — コンテンツ最大幅

### ルール
- **新色を増やさず、既存トークンの組み合わせで対応する**
- ハードコードされた hex は使わない（既存コードの `linear-gradient` 内のみ例外）
- Figmaの色がトークンと完全一致しない場合は、最も近いトークンを採用

## 3. Component Library

### 構造
コンポーネントフレームワーク（React等）は使用していない。HTMLセクション + CSSクラスで構成される擬似コンポーネント方式。

### 主要パターン

**ボタン (`.btn`)**
```html
<a href="#" class="btn">ご予約</a>
<a href="#" class="btn btn--small">小サイズ</a>
<a href="#" class="btn btn--light">白背景用</a>
<a href="#" class="btn btn--ghost">ダーク背景用透明</a>
```

**セクション共通**
```html
<section class="section">
  <div class="container">
    <p class="section__label">Concept</p>
    <h2 class="section__title">タイトル</h2>
    <p class="section__lead">リード文</p>
    <!-- content -->
  </div>
</section>
```

**プライステーブル**
```html
<table class="price-table">
  <tbody>
    <tr>
      <th>メニュー名 <span class="tag">人気</span></th>
      <td class="desc">説明文</td>
      <td class="price">¥9,900</td>
    </tr>
  </tbody>
</table>
```

### 命名規則（BEM風）
- ブロック: `.feature`
- エレメント: `.feature__num`, `.feature__title`
- モディファイア: `.btn--small`, `.btn--light`, `.gallery__item--1`

## 4. Frameworks & Libraries

| 分類 | 採用 |
|---|---|
| UIフレームワーク | なし（Vanilla HTML/CSS） |
| CSS前処理 | なし |
| ビルドシステム | なし（ファイル直配信） |
| 外部CSSライブラリ | なし |
| フォント | Google Fonts CDN（`<link>` で読み込み） |

**重要:** ビルドステップなし・依存関係なしを維持する。新規依存追加は明示的な要件がある場合のみ。

## 5. Asset Management

### 現状
- 画像/動画ファイルは未使用（CSSグラデーションでプレースホルダ表現）
- Galleryセクションは `linear-gradient` で6つの色違いブロックを配置

### 画像追加時のルール
- 配置場所: `/assets/images/` 配下に新規ディレクトリ作成
- フォーマット: WebP優先、フォールバックでJPG/PNG
- 命名: `kebab-case`（例: `nail-design-01.webp`）

## 6. Icon System

### 現状
アイコンは未使用。装飾は以下で代替：
- `::before` `::after` 擬似要素
- 引用符（`"` の文字装飾）— `.voice blockquote::before`
- 円（`map-pin` クラス）

### アイコン追加時の方針
SVGインライン埋め込みを推奨（リクエスト数削減・色変更容易）。アイコンライブラリを導入する場合は事前に方針を確認。

## 7. Styling Approach

### CSS方法論
- **手書きCSS + BEM風命名**
- CSS Modules / styled-components / Tailwind は不使用

### グローバルスタイル
`style.css` 行 18-35 に定義：
- `* { box-sizing: border-box; }`
- `html { scroll-behavior: smooth; }`
- `body` のフォント・色・letter-spacing デフォルト
- `img`, `a` のリセット

### レスポンシブ
**モバイルファーストではなく、デスクトップ → タブレット/モバイルへの上書き方式**。

ブレークポイント：

| 幅 | 用途 |
|---|---|
| `860px` 以下 | ヒーローを縦積みに |
| `768px` 以下 | ナビ非表示・グリッド1列化・セクションpadding縮小 |
| `600px` 以下 | ギャラリー2列化 |

```css
@media (max-width: 768px) {
  .features { grid-template-columns: 1fr; }
  .section { padding: 90px 0; }
}
```

### スペーシング・タイポのスケール
- セクション縦余白: `140px`（PC） / `90px`（SP）
- セクションタイトル: `clamp(26px, 3.4vw, 38px)`
- ヒーロータイトル: `clamp(34px, 5vw, 56px)`
- 本文 `letter-spacing`: `0.06em`
- 英文ラベル `letter-spacing`: `0.18em〜0.32em`（高めに設定して上品さを演出）

### アニメーション
- 標準遷移: `transition: ... .2s〜.35s`
- ホバー: `transform: translateY(-1px〜-6px)` + `box-shadow`
- カスタム: `@keyframes pulse`（map-pin用、2.5s loop）

## 8. Project Structure

```
/
├── index.html              # ページ本体（セクション順に記述）
├── style.css               # 全スタイル（セクション別にコメント区切り）
├── .mcp.json               # Higgsfield MCP設定（環境変数参照）
├── .gitignore              # local設定/秘密ファイル除外
├── .claude/
│   └── settings.local.json # MCP承認設定（git追跡外）
└── CLAUDE.md               # このファイル
```

### `style.css` 内のセクション順
コメントヘッダー `/* ---------- セクション名 ---------- */` で区切り：
1. `:root` トークン定義
2. グローバルリセット
3. `.container`
4. Header / Buttons / Hero
5. Section共通
6. Concept / Menu / Gallery / Voice / Access
7. Reserve / Footer

### `index.html` のセクション順
1. `<header>`
2. Hero
3. Concept
4. Menu (Hand / Foot / Care 3グループ)
5. Gallery
6. Voice
7. Access
8. Reserve（CTA）
9. `<footer>`

## 9. Figmaからコード化する際の方針

1. **既存トークンを最優先で使う** — Figmaに同等の色/サイズが見つからない場合は近似トークンに置換
2. **新規セクションは既存セクションの構造を踏襲** — `.section` + `.container` + `.section__label/__title/__lead` パターン
3. **画像はCSSグラデーションのプレースホルダで先行実装** — 実画像差し替えは別タスク
4. **コンポーネント化はしない** — Vanilla CSSのまま `style.css` に追記
5. **クラス命名はBEM風で統一** — `.block__element--modifier`
6. **レスポンシブは必ず3段階** — 860px / 768px / 600px のメディアクエリを意識

## 10. やってはいけないこと

- React/Vue等のフレームワーク導入（要件にない）
- Tailwindなどユーティリティクラスへの移行
- 新規依存パッケージ追加
- ハードコード hex を `:root` 外に書く
- ビルドツール導入
