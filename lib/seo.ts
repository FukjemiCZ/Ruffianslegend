import type { Metadata } from "next";
import type { Settings } from "@/domain/types";
import { siteBaseUrl } from "@/lib/utils";

export function buildMetadata(args: {
  settings: Settings;
  title?: string;
  description?: string;
  ogImageUrl?: string;
  path?: string;
}): Metadata {
  const base = siteBaseUrl();
  const title = args.title ? `${args.title} | ${args.settings.siteName}` : args.settings.seoTitleDefault;
  const description = args.description ?? args.settings.seoDescDefault;
  const url = new URL(args.path ?? "/", base).toString();
  const ogImage = args.ogImageUrl ?? args.settings.heroImageUrl;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: args.settings.siteName,
      images: ogImage ? [{ url: ogImage }] : []
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : []
    }
  };
}
