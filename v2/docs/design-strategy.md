# ProductX v2 デザイン戦略（最終版）

## 1. Design Philosophy

> **"Living Digital Craft"**
> サイト自体がプロダクト。見せるのではなく、体感させる。
> 訪問者が最初の1スクロールで「この会社に任せたい」と感じるクラフトマンシップを実装する。

### 4つの柱
1. **体験が証明** — サイト自体がProductXの品質証明
2. **余白の美学** — 大胆な余白で、一つの要素に集中させる
3. **質感のレイヤー** — ノイズテクスチャ・グラデーション・ブラーの重層で奥行きを作る
4. **マイクロ快感** — ボタンの磁力、リンクのスライド、カードのグロー。微細な快感の積み重ねが高級感

---

## 2. Visual Identity

### Color

> [!CAUTION]
> **コントラスト検証済み。** 詳細は `globals.css` 参照。
> - `#696CFF`: 大テキスト・背景用 / ダークモードのテキストOK
> - `#4A48DE`: ライトモードの通常テキストOK
> - `#FEC665`: 背景色専用（テキスト不可）

### Goldの使用箇所

| 箇所 | 使い方 |
|------|--------|
| CTAボタン hover | Goldのグローシャドウ |
| Coming Soon バッジ | Gold背景 + dark text |
| ダークモードCTA | Gold背景ボタン |
| セクション装飾 | 微小なGoldライン・ドット |

### テクスチャ戦略

全てのセクション背景に**微細なノイズテクスチャ**（opacity 3〜5%）を重ねる。
デジタルの平坦さを消し、紙のような触感を与える。

```css
/* ノイズテクスチャ（CSS） */
.noise::after {
  content: '';
  position: fixed; inset: 0; z-index: 9999;
  pointer-events: none;
  background-image: url('/images/noise.svg');
  opacity: 0.03;
}
```

ダークモードでは `opacity: 0.05` に増やし、深みを出す。

### ダークモード背景の深み

ダークモードのbody背景には微細な **radial-gradient** を追加し、のっぺりした暗闇を避ける。

```css
.dark body {
  background: radial-gradient(
    ellipse at 20% 50%, oklch(0.18 0.04 270 / 30%) 0%, transparent 50%
  ), radial-gradient(
    ellipse at 80% 80%, oklch(0.15 0.03 85 / 15%) 0%, transparent 50%
  ), oklch(0.13 0.02 280);
}
```

---

## 3. Typography

| 用途 | Font | Weight | Tracking |
|------|------|--------|----------|
| 英語見出し | **Inter** | 600 / 700 | `-0.02em` |
| 英語ラベル | **Inter** | 500 | `0.08em` (uppercase) |
| 日本語本文 | **Noto Sans JP** | 400 / 500 | `0.04em` |

### Type Scale & Line Height

```
Hero:      clamp(2.5rem, 6vw, 5rem)  / line-height: 1.05
H1:        clamp(2rem, 4vw, 3.5rem)  / line-height: 1.1
H2:        clamp(1.5rem, 3vw, 2.5rem)/ line-height: 1.2
H3:        1.25rem                   / line-height: 1.4
Body (EN): 1rem                      / line-height: 1.6
Body (JP): 1rem                      / line-height: 1.9
Caption:   0.875rem                  / line-height: 1.5
Label:     0.75rem                   / line-height: 1.5
```

`clamp()` によるfluid typographyで、ブレークポイントなしに滑らかにスケールする。

---

## 4. Site Architecture

### トップページ — 5幕構成

```
01 OPEN     フルスクリーンKV + 一言コピー
02 PROOF    「大手出身」の信頼性を視覚化
03 CRAFT    サービスをBento Gridで
04 PULSE    ニュースのマーキーバンド
05 INVITE   没入型CTA + ミニマルフッター
```

### 全ページ

| ページ | パス |
|--------|------|
| Top | `/` |
| About | `/about` |
| Services | `/services` |
| News | `/news` |
| News Detail | `/news/[slug]` |
| Contact | `/contact` |
| Privacy | `/privacy` |
| Terms | `/terms` |

---

## 5. Page Design

### 5.1 Top（`/`）

#### 01 OPEN — ファーストインプレッション
- フルスクリーン、暗背景（`brand-dark`）
- **Aurora Meshオーブ** 4つ（Primary×2、Purple、Gold）がゆっくり浮遊
- コピー: `clamp(2.5rem, 6vw, 5rem)` で **"Unleash Potential."** のみ
- サブ: 「プロダクトで、可能性を解き放つ。」
- CTA: `Start a Project →`（hover時Goldグロー）
- Scroll Indicator: 下部に薄く

#### 02 PROOF — 信頼の視覚化
- **大テキスト1行 + キーワードタイル**構成
- 「大手IT企業出身のエリートクリエイター集団」を、凡庸な数字ではなくビジュアルで語る
- **キーワードタイル**: 「Enterprise Quality」「End to End」「Design × Engineering」「Strategy to Growth」
- 各タイルはscrollで順次フェードイン、微妙にずれたタイミングで現れる（stagger: 0.1s）
- 背景: ライト = white / ダーク = card

#### 03 CRAFT — Bento Grid
- **不均等2×2 Grid**（12カラムベース）
  - メインカード（8col）: Partner Growth → `/services`
  - サブカード（4col）: Original Product（Coming Soon、Goldバッジ）
  - 下段1（6col）: 「企画からグロースまで一気通貫」
  - 下段2（6col）: プロセスフロー（4ステップのアイコン列）
- hover: `scale(1.02)` + **ボーダーがPrimaryで微発光**（box-shadow glow）
- 各カードにノイズテクスチャ重畳

#### 04 PULSE — ニュースマーキー
- **全幅マーキーバンド**: ニュースタイトルがゆっくり水平スクロール
- `prefers-reduced-motion` 時は静的リスト表示に自動フォールバック
- バンドの上下に細い `border` ライン
- ダークモードではテキストが微妙なグラデーション文字

#### 05 INVITE — CTA + Footer
- Aurora Mesh背景（01 OPENの対称、同じオーブ構成）
- コピー: **"Ready to build the future?"**
- CTA 2つ: Primary Button + Ghost Link（「まずは話を聞く」）
- その下にミニマルフッター統合（ロゴ + ナビ + 法的リンク + ©）

> [!TIP]
> フッターをCTAセクションに統合し「終わり」ではなく「始まり」を感じさせる。

---

### 5.2 About（`/about`）

| セクション | デザイン |
|------------|---------|
| **Hero** | `"Products that build futures."` fluid typography、余白たっぷり |
| **Mission** | ミッション全文を中央揃え大判テキストで。背景にPrimary→Goldの超薄いグラデーション |
| **Values** | **5枚グリッド**。hover時に**Spotlightエフェクト**: フォーカスカードが浮遊+発光、他カードが`opacity: 0.5`に暗転 |
| **Company** | shadcn Tableで会社概要。ミニマル |

---

### 5.3 Services（`/services`）

| セクション | デザイン |
|------------|---------|
| **Intro** | 大テキスト + サブテキスト |
| **3つの特徴** | 番号付きカード（01, 02, 03）、各カードにアイコン |
| **プロセスフロー** | 横並びの4ステップ（企画→デザイン→開発→グロース）。ステップ間を線で接続。scrollで各ステップが順次ハイライト |
| **支援内容** | ピルバッジ群（shadcn Badge） |
| **CTA** | `/contact` への導線 |

---

### 5.4 News（`/news`）
- 2列カードグリッド（モバイル1列）
- 各カード: タグBadge + 日付 + タイトル
- hover: 微浮遊 + ボーダーグロー

### 5.5 Contact（`/contact`）
- **1画面フォーム**（3ステップではなく、1画面でリアルタイムバリデーション）
- フィールド: 担当者名、会社名、Web(任意)、メール、メール確認、電話、内容
- shadcn Input + Textarea + Button
- 送信成功時: 全フォームがフェードアウト→サンクスメッセージ

### 5.6 Privacy / Terms
- prose（max-width: 768px）
- デスクトップ: 左スティッキー目次
- モバイル: トップに折りたたみ目次

---

## 6. Motion Design

### 原則
1. **Scroll-driven** — スクロールが物語を進める
2. **Micro-first** — 微細な快感の積み重ねが高級感
3. **reduced-motion 完全対応**

### セクション間トランジション
各セクションは独立せず、**スクロールで滑らかに変化する**。
- 背景色のcrossfade（CSS `scroll-timeline` or Framer Motion）
- 要素の stagger fade-in で「波のように」出現

### 実装マップ

| 要素 | 手法 | 詳細 |
|------|------|------|
| Aurora Orbs | Framer Motion `float` | ease-in-out infinite, 12-15s周期 |
| テキスト出現 | `whileInView` | y: 40→0, opacity 0→1, duration 0.6s |
| 数字/キーワード | stagger 0.1s | 順次フェードイン |
| Bento hover | `whileHover` | scale 1.02 + boxShadow glow |
| マーキー | CSS `@keyframes` | translateX, duration 30s linear |
| Values Spotlight | `onHoverStart/End` | 対象card: 浮遊+glow, 他: opacity 0.5 |
| ヘッダーロゴ | scroll-linked | scrollY > 50 で scale 0.85 |
| CTA Button | magnetic effect | カーソル追従の微小な傾き |

### Magnetic Button（CTAのみ）

```tsx
// カーソルがボタン付近に来たとき、ボタンがカーソルに引き寄せられる
const handleMouse = (e) => {
  const { left, top, width, height } = ref.current.getBoundingClientRect();
  const x = (e.clientX - left - width / 2) * 0.15;
  const y = (e.clientY - top - height / 2) * 0.15;
  // Framer motion で x, y を animate
};
```

---

## 7. Layout System

### 12カラムグリッド

```
max-width: 1280px
columns: 12
gutter: 24px (mobile: 16px)
margin: auto (side padding: 24px / mobile: 16px)
```

Tailwindの `grid-cols-12` で実装。Bento Gridは `col-span-*` で不均等レイアウト。

---

## 8. Component Library (shadcn/ui)

| Component | 用途 |
|-----------|------|
| `Button` | CTA (Primary, Ghost) |
| `Card` | Bento, Values, News |
| `Badge` | ニュースタグ, Coming Soon |
| `Input` / `Textarea` | Contact |
| `Table` | 会社概要 |
| `Separator` | セクション区切り |
| `Sheet` | モバイルナビ |

---

## 9. Accessibility — WCAG 2.2 AA

- コントラスト検証済み
- `:focus-visible` フォーカスリング
- セマンティックHTML + ARIA ランドマーク・ラベル
- `prefers-reduced-motion` 完全対応（マーキー→静的リスト）
- タッチターゲット 44×44px
- next-themes ダークモード（OS検出 + 手動）

---

## 10. Responsive

| BP | 方針 |
|----|------|
| **Mobile** `<640px` | 1カラム, Bento→縦積み, マーキー→静的リスト, fluid typo最小値 |
| **Tablet** `640-1024px` | 2カラム適応, Bento 2カラム化 |
| **Desktop** `>1024px` | フル12カラム, Bento Grid, スティッキー目次 |

Tailwind `sm:` / `md:` / `lg:` でモバイルファースト。
