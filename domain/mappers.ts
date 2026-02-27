import {
  DogSchema,
  GalleryAlbumSchema,
  LitterSchema,
  PageSchema,
  PartnerSchema,
  ResultSchema,
  SettingsSchema,
  PuppySchema
} from "./schemas";

export function parseCsvList(v?: string): string[] {
  if (!v) return [];
  return v
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function parseCsvUrlList(v?: string): string[] {
  return parseCsvList(v).filter((x) => /^https?:\/\//.test(x));
}

export function parseNullableNumber(v?: string): number | undefined {
  if (!v) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

export function unescapeNewlines(v?: string): string | undefined {
  if (v == null) return undefined;
  return v.replace(/\\n/g, "\n");
}

function str(row: Record<string, string | undefined>, key: string): string | undefined {
  const v = row[key];
  if (v == null) return undefined;
  const t = v.trim();
  return t.length ? t : undefined;
}

export function mapSettings(rows: Array<Record<string, string | undefined>>) {
  const record: Record<string, string> = {};
  for (const r of rows) {
    const k = str(r, "key");
    const v = str(r, "value") ?? "";
    if (k) record[k] = v;
  }
  const normalized = {
    ...record,
    announcementText: record.announcementText ?? ""
  };
  return SettingsSchema.parse(normalized);
}

export function mapPages(rows: Array<Record<string, string | undefined>>) {
  return rows.map((r) =>
    PageSchema.parse({
      slug: str(r, "slug"),
      title: str(r, "title"),
      contentMd: unescapeNewlines(str(r, "contentMd")) ?? ""
    })
  );
}

export function mapDogs(rows: Array<Record<string, string | undefined>>) {
  return rows.map((r) =>
    DogSchema.parse({
      slug: str(r, "slug"),
      breed: str(r, "breed"),
      nameOfficial: str(r, "nameOfficial"),
      nameCall: str(r, "nameCall"),
      sex: str(r, "sex"),
      birthDate: str(r, "birthDate"),
      deathDate: str(r, "deathDate"),
      status: str(r, "status"),
      fatherName: str(r, "fatherName"),
      motherName: str(r, "motherName"),
      fatherSlug: str(r, "fatherSlug"),
      motherSlug: str(r, "motherSlug"),
      hips: str(r, "hips"),
      eyes: str(r, "eyes"),
      heightCm: parseNullableNumber(str(r, "heightCm")),
      certs: parseCsvList(str(r, "certsCsv")),
      titles: parseCsvList(str(r, "titlesCsv")),
      showNotes: str(r, "showNotes"),
      heroImageUrl: str(r, "heroImageUrl"),
      galleryUrls: parseCsvUrlList(str(r, "galleryUrlsCsv")),
      bioMd: unescapeNewlines(str(r, "bioMd"))
    })
  );
}

export function mapLitters(rows: Array<Record<string, string | undefined>>) {
  return rows.map((r) =>
    LitterSchema.parse({
      code: str(r, "code"),
      slug: str(r, "slug"),
      status: str(r, "status"),
      title: str(r, "title"),
      birthDate: str(r, "birthDate"),
      motherSlug: str(r, "motherSlug"),
      fatherName: str(r, "fatherName"),
      fatherLink: str(r, "fatherLink"),
      summaryMd: unescapeNewlines(str(r, "summaryMd")),
      storyMd: unescapeNewlines(str(r, "storyMd")),
      heroImageUrl: str(r, "heroImageUrl"),
      motherImageUrl: str(r, "motherImageUrl"),
      fatherImageUrl: str(r, "fatherImageUrl"),
      albumUrl: str(r, "albumUrl")
    })
  );
}

export function mapPuppies(rows: Array<Record<string, string | undefined>>) {
  return rows.map((r) =>
    PuppySchema.parse({
      litterCode: str(r, "litterCode"),
      name: str(r, "name"),
      sex: str(r, "sex"),
      collarColor: str(r, "collarColor"),
      status: str(r, "status"),
      imageUrl: str(r, "imageUrl")
    })
  );
}

export function mapPartners(rows: Array<Record<string, string | undefined>>) {
  return rows.map((r) =>
    PartnerSchema.parse({
      name: str(r, "name"),
      logoUrl: str(r, "logoUrl"),
      link: str(r, "link"),
      note: str(r, "note")
    })
  );
}

export function mapGalleryAlbums(rows: Array<Record<string, string | undefined>>) {
  return rows.map((r) => {
    const items = parseCsvUrlList(str(r, "itemsCsv"));
    // FIX: pokud coverImageUrl chybí, použij první item z itemsCsv
    const coverImageUrl = str(r, "coverImageUrl") ?? items[0];

    return GalleryAlbumSchema.parse({
      slug: str(r, "slug"),
      title: str(r, "title"),
      description: str(r, "description"),
      coverImageUrl,
      items
    });
  });
}

export function mapResults(rows: Array<Record<string, string | undefined>>) {
  return rows.map((r) =>
    ResultSchema.parse({
      date: str(r, "date"),
      event: str(r, "event"),
      discipline: str(r, "discipline"),
      category: str(r, "category"),
      placement: str(r, "placement"),
      dogSlug: str(r, "dogSlug"),
      note: str(r, "note"),
      link: str(r, "link")
    })
  );
}