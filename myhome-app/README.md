# 家づくりクエスト 🏠⚔️

住宅消費者（これから家を建てる人）のための、RPG風・家づくりタスク管理アプリ。

注文住宅の流れを「8つの章 × 40のクエスト」として表現し、ゲーム感覚で進捗管理できます。

> **Note:** このディレクトリは実験用の独立した Vite プロジェクトです。
> リポジトリルートの LP（`index.html` / `style.css`）および CLAUDE.md のルールとは無関係です。

## 機能

- 日本の注文住宅の標準フローに沿ったプリセットクエスト（情報収集 → 資金計画 → 土地探し → 会社選び → 契約 → 設計 → 着工 → 引渡し）
- クエストのチェックで EXP が貯まり、勇者がレベルアップ（3クエストごと）
- カスタムクエストの追加・編集・削除、クエスト/章ごとのメモ
- データは端末の localStorage（冒険の書）に自動保存
- スマホ最適化（モバイルファースト、44px タップ領域）

## 起動方法

```bash
npm install
npm run dev      # 開発サーバー
npm run build    # 本番ビルド
npm run preview  # ビルド結果の確認
```

## 技術構成

- Vite + React 19 + TypeScript（追加の実行時依存なし）
- 状態管理: `useReducer`（`src/state/roadmapReducer.ts`）+ localStorage 永続化（`src/storage.ts`）
- スタイル: 手書き CSS 1ファイル（`src/styles/app.css`）、DotGothic16 フォントで RPG 風に
