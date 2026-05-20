# task-board

## プロジェクト概要

タスクボード管理アプリケーション。

## Git 運用ルール

### コード変更のたびに GitHub へプッシュする

**コードを変更するたびに、必ず以下の手順を実行すること。**

1. 変更をステージング
   ```
   git add <変更ファイル>
   ```

2. コミット（メッセージは変更内容を端的に記述）
   ```
   git commit -m "変更内容の説明"
   ```

3. GitHub へプッシュ
   ```
   git push origin <ブランチ名>
   ```

### ブランチ戦略

- `main` — 本番相当のブランチ。直接プッシュ禁止。
- `feature/<機能名>` — 新機能開発用ブランチ。
- `fix/<バグ名>` — バグ修正用ブランチ。

### コミットメッセージ規約

```
<type>: <summary>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

`type` の種類:
- `feat` — 新機能追加
- `fix` — バグ修正
- `refactor` — リファクタリング
- `docs` — ドキュメント更新
- `test` — テスト追加・修正
- `chore` — ビルド設定やツール変更

### 注意事項

- `.env` などシークレットを含むファイルは絶対にコミットしない。
- 破壊的な操作（`git reset --hard`, `git push --force`）は必ずユーザーに確認を取る。
- `main` へのマージはプルリクエスト経由で行う。

## デプロイ先

https://kurobuchicken-cell.github.io/task-board/

`main` ブランチへのプッシュで GitHub Actions が自動ビルド & デプロイ。

## 技術スタック

| 種別 | 技術 |
|---|---|
| UI ライブラリ | React 18 |
| ビルドツール | Vite 5 |
| スタイリング | CSS Modules |
| 状態管理 | React `useState` / `useEffect` |
| 永続化 | `localStorage` |
| CI/CD | GitHub Actions |
| ホスティング | GitHub Pages |

## コンポーネントの命名規約

- **ファイル名**: PascalCase（例: `App.jsx`, `TaskItem.jsx`）
- **CSS Modules ファイル**: コンポーネントと同名（例: `App.module.css`）
- **コンポーネント関数**: PascalCase の名前付きエクスポートまたはデフォルトエクスポート
- **ローカルストレージキー**: `task-board-` プレフィックスを付ける（例: `task-board-tasks`）
- **イベントハンドラ**: `handle` プレフィックス（例: `handleKeyDown`, `handleSubmit`）

## 開発環境のセットアップ

```bash
npm install
npm run dev
```

## コマンド一覧

| コマンド | 説明 |
|---|---|
| `npm run dev` | 開発サーバー起動（http://localhost:5173） |
| `npm run build` | 本番用ビルド（`dist/` に出力） |
| `npm run preview` | ビルド結果のプレビュー |
