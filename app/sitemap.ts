import type { MetadataRoute } from "next";
import { getDogs, getLitters, getPages } from "@/lib/data/public";
import { siteBaseUrl } from "@/lib/utils";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteBaseUrl();
  const [dogs, litters, pages] = await Promise.all([getDogs(), getLitters(), getPages()]);

  const staticRoutes = [
    "/",
    "/o-nas",
    "/nase-hodnoty",
    "/psi",
    "/vrhy",
    "/stenata",
    "/stenata/prihlaska",
    "/galerie",
    "/podporuji-nas",
    "/kontakt"
  ];

  const items: MetadataRoute.Sitemap = [
    ...staticRoutes.map((p) => ({
      url: `${base}${p}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: p === "/" ? 1 : 0.7
    })),
    ...pages.map((p) => ({
      url: `${base}/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6
    })),
    ...dogs.map((d) => ({
      url: `${base}/psi/${d.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6
    })),
    ...litters.map((l) => ({
      url: `${base}/vrhy/${l.code}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6
    }))
  ];

  return items;
}