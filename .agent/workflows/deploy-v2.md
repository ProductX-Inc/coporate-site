---
description: v2 Next.jsサイトで本番環境 (GitHub Pages / productx.jp) を完全リプレイスする手順
---

# 本番リプレイス手順 (v1 → v2)

> **前提**: 現在の本番は GitHub Pages (`productx.jp`) に静的HTML をデプロイ。  
> v2 は Next.js (output: "export") で `out/` に静的ファイルを生成。  
> v2/public に robots.txt, sitemap.xml, manifest.json, sw.js が含まれており、ビルド時にout/へ自動コピーされる。

---

## 1. v1 のバックアップブランチを作成

旧サイトをバックアップとしてブランチに保存しておく。

```bash
git checkout -b backup/v1
git push origin backup/v1
git checkout main
```

---

## 2. v2 の本番ビルド

// turbo
```bash
cd /Users/uenokenta/Desktop/10.Corporate\ Site/v2 && npm run build
```

`v2/out/` ディレクトリに静的ファイル一式が生成される。ビルドエラーがないことを確認。

---

## 3. ルートディレクトリの v1 ファイルを削除

v2 に含まれない旧ファイル群をルートから削除する。  
**v2/, .git/, .agent/, .gitignore, .cursorrules は絶対に消さないこと。**

```bash
cd /Users/uenokenta/Desktop/10.Corporate\ Site

# v1 の静的ファイルを削除 (v2/, .git/, .agent/ は保持)
rm -rf about contact css images js news privacy services terms
rm -f index.html kv_gallery.html base sitemap.xml robots.txt CNAME
```

---

## 4. v2 のビルド成果物をルートにコピー

// turbo
```bash
cd /Users/uenokenta/Desktop/10.Corporate\ Site && cp -R v2/out/* .
```

---

## 5. CNAME ファイルを配置

GitHub Pages のカスタムドメイン用 `CNAME` がルートに必要。

// turbo
```bash
cd /Users/uenokenta/Desktop/10.Corporate\ Site && echo "productx.jp" > CNAME
```

---

## 6. .nojekyll ファイルを追加

GitHub Pages で `_next/` ディレクトリが無視されないようにする（**重要**）。

// turbo
```bash
cd /Users/uenokenta/Desktop/10.Corporate\ Site && touch .nojekyll
```

---

## 7. .gitignore を更新

Next.js のビルド成果物がリポジトリに含まれるよう `.gitignore` を調整。

```gitignore
# Dependencies
node_modules/

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Local development
*.log

# Sensitive files
.env
.env.local

# v2 dev artifacts (ビルド成果物はルートにコピーするため除外しない)
v2/.next/
v2/node_modules/
v2/out/
```

---

## 8. ローカルで動作確認

// turbo
```bash
cd /Users/uenokenta/Desktop/10.Corporate\ Site && npx -y serve . -p 5555
```

ブラウザで `http://localhost:5555` を開き、全ページ（Home, About, Services, News, News詳細, Contact, Privacy, Terms）が正常に表示されることを確認。  
ダークモード / ライトモード両方を確認。

---

## 9. Git コミット & プッシュ

```bash
cd /Users/uenokenta/Desktop/10.Corporate\ Site
git add -A
git commit -m "feat: replace v1 with v2 Next.js site"
git push origin main
```

---

## 10. GitHub Pages のデプロイ確認

GitHub リポジトリの **Settings → Pages** で:
- Source: `Deploy from a branch`
- Branch: `main` / `/ (root)`

になっていることを確認。push 後、GitHub Actions のデプロイが完了するのを待つ（通常 1〜3 分）。

---

## 11. 本番サイトの最終確認

`https://productx.jp` にアクセスし、以下を確認:
- [ ] トップページが v2 デザインで表示される
- [ ] 全ページ遷移が正常（About, Services, News, News詳細, Contact, Privacy, Terms）
- [ ] ロゴ画像が表示される
- [ ] ダーク/ライトモード切り替えが動作する
- [ ] モバイルメニューが正常に開閉する
- [ ] robots.txt, sitemap.xml にアクセスできる
- [ ] OGP メタタグが正しい（SNS シェアデバッガーで確認）

---

## ロールバック手順

万が一問題が発生した場合:

```bash
git checkout backup/v1 -- .
git add -A
git commit -m "revert: rollback to v1"
git push origin main
```

これで v1 に即座に戻せる。
