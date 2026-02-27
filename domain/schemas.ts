import { z } from "zod";

export const SettingsSchema = z.object({
  siteName: z.string().min(1),
  tagline: z.string().min(1),
  owners: z.string().min(1),
  announcementText: z.string().optional().default(""),
  currentLitterCode: z.string().min(1),
  location: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  facebookUrl: z.string().url().optional().or(z.literal("")).default(""),
  instagramHandle: z.string().optional().or(z.literal("")).default(""),
  heroImageUrl: z.string().url(),
  seoTitleDefault: z.string().min(1),
  seoDescDefault: z.string().min(1)
});

export const PageSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  contentMd: z.string().min(1)
});

export const SexSchema = z.enum(["M", "F"]);

export const DogStatusSchema = z.enum(["active", "retired", "memory"]);

export const DogSchema = z.object({
  slug: z.string().min(1),
  breed: z.string().min(1),
  nameOfficial: z.string().min(1),
  nameCall: z.string().min(1),
  sex: SexSchema,
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  deathDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  status: DogStatusSchema,
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  fatherSlug: z.string().optional(),
  motherSlug: z.string().optional(),
  hips: z.string().optional(),
  eyes: z.string().optional(),
  heightCm: z.number().positive().optional(),
  certs: z.array(z.string()).default([]),
  titles: z.array(z.string()).default([]),
  showNotes: z.string().optional(),
  heroImageUrl: z.string().url().optional(),
  galleryUrls: z.array(z.string().url()).default([]),
  bioMd: z.string().optional()
});

export const LitterStatusSchema = z.enum(["planned", "open", "full", "closed"]);

export const LitterSchema = z.object({
  code: z.string().min(1),
  slug: z.string().min(1),
  status: LitterStatusSchema,
  title: z.string().min(1),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  motherSlug: z.string().optional(),
  fatherName: z.string().optional(),
  fatherLink: z.string().url().optional(),
  summaryMd: z.string().optional(),
  storyMd: z.string().optional(),
  heroImageUrl: z.string().url().optional(),
  motherImageUrl: z.string().url().optional(),
  fatherImageUrl: z.string().url().optional(),
  albumUrl: z.string().url().optional()
});

export const PuppyStatusSchema = z.enum(["available", "reserved", "sold"]);

export const PuppySchema = z.object({
  litterCode: z.string().min(1),
  name: z.string().min(1),
  sex: SexSchema.optional(),
  collarColor: z.string().optional(),
  status: PuppyStatusSchema,
  imageUrl: z.string().url().optional()
});

export const PartnerSchema = z.object({
  name: z.string().min(1),
  logoUrl: z.string().url(),
  link: z.string().url(),
  note: z.string().optional()
});

export const GalleryAlbumSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  // FIX: některé řádky nemají coverImageUrl → musí být optional
  // (fallback zajistí mapper)
  coverImageUrl: z.string().url().optional(),
  items: z.array(z.string().url()).default([])
});

export const ResultSchema = z.object({
  date: z.string().optional(),
  event: z.string().optional(),
  discipline: z.string().optional(),
  category: z.string().optional(),
  placement: z.string().optional(),
  dogSlug: z.string().optional(),
  note: z.string().optional(),
  link: z.string().url().optional()
});

export const LeadInputSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  experience: z.string().min(1),
  housing: z.string().min(1),
  whyHusky: z.string().min(1),
  gdprConsent: z.literal(true),
  honeypot: z.string().optional().default("")
});