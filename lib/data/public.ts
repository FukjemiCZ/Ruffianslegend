import "server-only";
import { unstable_cache } from "next/cache";
import {
  mapDogs,
  mapGalleryAlbums,
  mapLitters,
  mapPages,
  mapPartners,
  mapPuppies,
  mapResults,
  mapSettings
} from "@/domain/mappers";
import type { Dog, GalleryAlbum, Litter, Page, Partner, Puppy, ResultRow, Settings } from "@/domain/types";
import { readSheetAsObjects } from "@/lib/google/sheets";

const REVALIDATE_SECONDS = 3600;

export const getSettings = unstable_cache(
  async (): Promise<Settings> => {
    const rows = await readSheetAsObjects("settings");
    return mapSettings(rows);
  },
  ["sheets:settings"],
  { revalidate: REVALIDATE_SECONDS }
);

export const getPages = unstable_cache(
  async (): Promise<Page[]> => {
    const rows = await readSheetAsObjects("pages");
    return mapPages(rows);
  },
  ["sheets:pages"],
  { revalidate: REVALIDATE_SECONDS }
);

export const getPageBySlug = unstable_cache(
  async (slug: string): Promise<Page | null> => {
    if (!slug) return null;
    const pages = await getPages();
    return pages.find((p) => p.slug === slug) ?? null;
  },
  ["sheets:pageBySlug"],
  { revalidate: REVALIDATE_SECONDS }
);

export const getDogs = unstable_cache(
  async (): Promise<Dog[]> => {
    const rows = await readSheetAsObjects("dogs");
    return mapDogs(rows);
  },
  ["sheets:dogs"],
  { revalidate: REVALIDATE_SECONDS }
);

export const getDogBySlug = unstable_cache(
  async (slug: string): Promise<Dog | null> => {
    if (!slug) return null;
    const dogs = await getDogs();
    return dogs.find((d) => d.slug === slug) ?? null;
  },
  ["sheets:dogBySlug"],
  { revalidate: REVALIDATE_SECONDS }
);

export const getLitters = unstable_cache(
  async (): Promise<Litter[]> => {
    const rows = await readSheetAsObjects("litters");
    return mapLitters(rows);
  },
  ["sheets:litters"],
  { revalidate: REVALIDATE_SECONDS }
);

export const getLitterByCode = unstable_cache(
  async (code: string): Promise<Litter | null> => {
    if (!code) return null;
    const litters = await getLitters();

    const needle = code.toUpperCase();
    return (
      litters.find((l) => (l?.code ? l.code.toUpperCase() : "") === needle) ??
      null
    );
  },
  ["sheets:litterByCode"],
  { revalidate: REVALIDATE_SECONDS }
);

export const getPuppies = unstable_cache(
  async (): Promise<Puppy[]> => {
    const rows = await readSheetAsObjects("puppies");
    return mapPuppies(rows);
  },
  ["sheets:puppies"],
  { revalidate: REVALIDATE_SECONDS }
);

export const getPuppiesByLitterCode = unstable_cache(
  async (litterCode: string): Promise<Puppy[]> => {
    if (!litterCode) return [];
    const puppies = await getPuppies();

    const needle = litterCode.toUpperCase();
    return puppies.filter((p) => (p?.litterCode ? p.litterCode.toUpperCase() : "") === needle);
  },
  ["sheets:puppiesByLitter"],
  { revalidate: REVALIDATE_SECONDS }
);

export const getPartners = unstable_cache(
  async (): Promise<Partner[]> => {
    const rows = await readSheetAsObjects("partners");
    return mapPartners(rows);
  },
  ["sheets:partners"],
  { revalidate: REVALIDATE_SECONDS }
);

export const getGalleryAlbums = unstable_cache(
  async (): Promise<GalleryAlbum[]> => {
    const rows = await readSheetAsObjects("gallery_albums");
    return mapGalleryAlbums(rows);
  },
  ["sheets:gallery_albums"],
  { revalidate: REVALIDATE_SECONDS }
);

export const getResults = unstable_cache(
  async (): Promise<ResultRow[]> => {
    const rows = await readSheetAsObjects("results");
    return mapResults(rows);
  },
  ["sheets:results"],
  { revalidate: REVALIDATE_SECONDS }
);

export function searchDogs(dogs: Dog[], q?: string, status?: string) {
  const qq = (q ?? "").trim().toLowerCase();
  return dogs
    .filter((d) => (status ? d.status === status : true))
    .filter((d) => {
      if (!qq) return true;
      return (
        d.nameCall.toLowerCase().includes(qq) ||
        d.nameOfficial.toLowerCase().includes(qq) ||
        d.breed.toLowerCase().includes(qq)
      );
    });
}