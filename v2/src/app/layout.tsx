import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { LangProvider } from "@/components/lang-provider";
import { GlobalEffects } from "@/components/ui/global-effects";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ProductX - Unleash Potential",
    template: "%s | ProductX",
  },
  description:
    "株式会社ProductX（プロダクトエックス）は、大手IT企業出身のエリートクリエイター集団によるプロダクト開発・DX支援会社です。",
  metadataBase: new URL("https://productx.jp"),
  alternates: {
    canonical: "https://productx.jp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "ProductX",
    images: ["/images/ogp.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon.png",
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
      description: "大手IT企業出身のエリートクリエイター集団によるプロダクト開発・DX支援会社",
      foundingDate: "2025-03-14",
      sameAs: [],
    },
    {
      "@type": "WebSite",
      name: "ProductX",
      url: "https://productx.jp",
      inLanguage: ["ja", "en"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#696CFF" />
        <meta name="google-site-verification" content="317UNan5UrUQVsmkdwwrteFnJAWBFx0ZHT8pSC2DvHY" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js')}`,
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LangProvider>
            <GlobalEffects>
              {children}
            </GlobalEffects>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
