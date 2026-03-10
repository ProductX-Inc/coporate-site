import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LangProvider } from "@/components/lang-provider";
import { GlobalEffects } from "@/components/ui/global-effects";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-noto",
  preload: false,
});

const GA_ID = "G-958FQBMXHB";

export const metadata: Metadata = {
  title: {
    default: "ProductX - Unleash Potential",
    template: "%s | ProductX",
  },
  description:
    "株式会社ProductX（プロダクトエックス）は、大手IT企業出身のエリートクリエイター集団によるプロダクト開発・DX支援会社です。",
  metadataBase: new URL("https://productx.jp"),
  alternates: { canonical: "https://productx.jp" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "ProductX",
    images: ["/images/ogp.png"],
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "株式会社ProductX",
      alternateName: "ProductX Inc.",
      url: "https://productx.jp",
      logo: "https://productx.jp/images/logo.png",
      description: "大手IT企業出身のエリートクリエイター集団によるプロダクト開発・DX支援会社。AI DXと Partner Growth の2つの事業で、中小企業のデジタル変革を支援します。",
      foundingDate: "2025-03-14",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        url: "https://productx.jp/contact",
        availableLanguage: ["Japanese", "English"],
      },
      areaServed: "JP",
      knowsAbout: ["AI DX", "プロダクト開発", "UI/UXデザイン", "業務効率化AI", "DX支援"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "ProductX サービス",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI DX — AI業務代行・導入・開発", url: "https://productx.jp/services/ai-dx" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Partner Growth — プロダクト開発・グロース支援", url: "https://productx.jp/services/partner-growth" } },
        ],
      },
    },
    {
      "@type": "WebSite",
      name: "ProductX",
      url: "https://productx.jp",
      inLanguage: ["ja", "en"],
    },
  ],
};

/* Deferred GA + SW script (runs after page load) */
const DEFERRED_SCRIPT = [
  `window.addEventListener('load',function(){`,
  `var s=document.createElement('script');s.async=true;`,
  `s.src='https://www.googletagmanager.com/gtag/js?id=${GA_ID}';`,
  `document.head.appendChild(s);`,
  `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}`,
  `gtag('js',new Date());gtag('config','${GA_ID}');`,
  `if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js')}`,
  `})`,
].join("");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning className={`${inter.variable} ${notoSansJP.variable}`}>
      <head>
        <meta name="theme-color" content="#696CFF" />
        <meta name="google-site-verification" content="317UNan5UrUQVsmkdwwrteFnJAWBFx0ZHT8pSC2DvHY" />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script dangerouslySetInnerHTML={{ __html: DEFERRED_SCRIPT }} />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LangProvider>
            <GlobalEffects>{children}</GlobalEffects>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
