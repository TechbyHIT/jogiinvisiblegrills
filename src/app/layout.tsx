import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { BUSINESS_CONFIG } from "@/config/business";
import { SITE_CONFIG } from "@/config/site";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingCTAs } from "@/components/layout/FloatingCTAs";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildLocalBusinessSchema } from "@/lib/schema/local-business";
import { buildOrganizationSchema } from "@/lib/schema/organization";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS_CONFIG.websiteUrl),
  title: {
    default: BUSINESS_CONFIG.name,
    template: `%s | ${BUSINESS_CONFIG.name}`,
  },
  description: BUSINESS_CONFIG.description,
  icons: {
    icon: [{ url: "/images/brand/jogi-favicon-circle.png", type: "image/png" }],
    apple: [{ url: "/images/brand/jogi-favicon-circle.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    siteName: BUSINESS_CONFIG.name,
    images: [{ url: BUSINESS_CONFIG.defaultOpenGraphImage }],
  },
};

function AnalyticsScripts() {
  const { googleTagManagerId, googleAnalyticsId, metaPixelId, clarityId } =
    BUSINESS_CONFIG.analytics;

  return (
    <>
      {googleTagManagerId && (
        // Inline GTM bootstrap; swap to @next/third-parties when IDs are live.
        // eslint-disable-next-line @next/next/next-script-for-ga -- env-gated placeholder without extra dependency
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${googleTagManagerId}');`,
          }}
        />
      )}
      {googleAnalyticsId && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${googleAnalyticsId}');`,
            }}
          />
        </>
      )}
      {metaPixelId && (
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`,
          }}
        />
      )}
      {clarityId && (
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`,
          }}
        />
      )}
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={SITE_CONFIG.language} className={`${plusJakarta.variable} h-full`}>
      <head>
        <AnalyticsScripts />
      </head>
      <body className="min-h-full flex flex-col antialiased pb-[var(--cta-offset)]">
        <JsonLd data={[buildLocalBusinessSchema(), buildOrganizationSchema()]} />
        <SkipToContent />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingCTAs />
      </body>
    </html>
  );
}
