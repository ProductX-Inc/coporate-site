# ProductX v2 技術選定

## 概要

コーポレートサイトv2リニューアルの技術スタック。
Next.js + shadcn/ui + Tailwind CSSで構築し、静的エクスポートでGitHub Pagesにデプロイする構成。

---

## コアスタック

| カテゴリ | 技術 | バージョン | 選定理由 |
|----------|------|-----------|----------|
| **Framework** | Next.js | 16 (latest) | App Router、Turbopack（デフォルト）、React 19.2対応 |
| **UI Library** | React | 19 | Server Components、use hook、Actions |
| **Component** | shadcn/ui | latest | コピー&カスタマイズ型。デザイン戦略のCSS Variablesと完全連携 |
| **Styling** | Tailwind CSS | v4 | shadcn/uiの前提。CSS Variables統合 |
| **Language** | TypeScript | 5.x | 型安全性、DX向上 |
| **Package Manager** | pnpm | latest | shadcn/uiとの互換性が最も安定 |

## 補助ライブラリ

| ライブラリ | 用途 |
|------------|------|
| **next-themes** | ダークモード管理（OS検出 + 手動トグル + FOUC防止） |
| **lucide-react** | アイコン（shadcn/ui標準） |
| **tailwind-merge** | クラス名のマージ・衝突解決 |
| **clsx** | 条件付きクラス名 |
| **framer-motion** | スクロールアニメーション、ページトランジション |

---

## アーキテクチャ

### レンダリング戦略

| アプローチ | 説明 |
|------------|------|
| **Static Export** | `output: 'export'` で全ページを静的HTML/CSS/JSに出力 |
| **Server Components** | ビルド時にHTMLへプリレンダリング |
| **Client Components** | ダークモードトグル、アニメーション等のインタラクティブ要素のみ |

> [!IMPORTANT]
> **Static Export制約**: API Routes、ISR、ミドルウェアは使用不可。
> コーポレートサイトは全ページ静的コンテンツのため問題なし。
> お問い合わせフォームは外部サービス（formspree等）で対応。

### ディレクトリ構成（案）

```
v2/
├── docs/                    ← ドキュメント管理
│   ├── design-strategy.md
│   └── tech-stack.md        ← 本ドキュメント
├── src/
│   ├── app/                 ← App Router
│   │   ├── layout.tsx       ← ルートレイアウト（共通Header/Footer）
│   │   ├── page.tsx         ← トップページ
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── news/
│   │   │   ├── page.tsx     ← 一覧
│   │   │   └── [slug]/page.tsx ← 詳細
│   │   ├── contact/page.tsx
│   │   ├── privacy/page.tsx
│   │   └── terms/page.tsx
│   ├── components/
│   │   ├── ui/              ← shadcn/uiコンポーネント
│   │   ├── layout/          ← Header, Footer, Navigation
│   │   ├── sections/        ← Hero, Mission, Services等
│   │   └── shared/          ← 共通パーツ
│   ├── lib/
│   │   ├── utils.ts         ← cn() etc.
│   │   └── news-data.ts     ← ニュースデータ
│   ├── styles/
│   │   └── globals.css      ← Tailwind + CSS Variables
│   └── types/
│       └── index.ts
├── public/
│   ├── images/
│   │   ├── logo.png
│   │   ├── favicon.png
│   │   └── ogp.png
│   └── robots.txt
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── components.json          ← shadcn/ui設定
└── package.json
```

---

## デプロイ

| 項目 | 内容 |
|------|------|
| **出力** | `next build` → `out/` ディレクトリに静的ファイル |
| **ホスティング** | GitHub Pages（既存CNAME維持） |
| **CI/CD** | GitHub Actions（push → build → deploy） |

---

## デザイン戦略との整合

| デザイン戦略の要件 | Next.js構成での実現方法 |
|-------------------|------------------------|
| shadcn CSS Variables | `globals.css` にそのまま定義 → shadcn/uiが参照 |
| ダークモード | `next-themes` で OS検出 + 手動トグル + localStorage |
| Aurora Mesh Hero | Client Component + Framer Motion |
| スクロールアニメーション | Framer Motion `whileInView` |
| reduced-motion | Framer Motion + Tailwind `motion-reduce:` |
| WCAG 2.2 AA | shadcn/uiはRadix UIベースでアクセシビリティ内蔵 |
| レスポンシブ | Tailwind のブレークポイント |
| SEO | Next.js Metadata API |

---

## 移行方針

既に作成した静的HTML/CSS/JSは**デザインリファレンス**として保持し、Next.jsプロジェクトに段階的に移植する。

1. Next.jsプロジェクト初期化
2. shadcn/uiセットアップ + デザイントークン移植
3. 共通レイアウト（Header/Footer）の実装
4. トップページの実装
5. サブページの実装
6. ビルド検証 + デプロイ設定
