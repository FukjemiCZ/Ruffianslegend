import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Inter } from "next/font/google";
import Providers from "./providers";
import { getSettings } from "@/lib/data/public";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";

import "./globals.css";

export const revalidate = 3600;

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: settings.seoTitleDefault,
    description: settings.seoDescDefault,
    metadataBase: new URL(process.env.SITE_BASE_URL ?? "http://localhost:3000")
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();

  return (
    <html lang="cs" className={inter.variable}>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <Providers>
            <AppHeader siteName={settings.siteName} />
            {children}
            <AppFooter settings={settings} />
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
