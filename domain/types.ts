import type { z } from "zod";
import {
  SettingsSchema,
  PageSchema,
  DogSchema,
  LitterSchema,
  PuppySchema,
  PartnerSchema,
  GalleryAlbumSchema,
  ResultSchema,
  LeadInputSchema
} from "./schemas";

export type Settings = z.infer<typeof SettingsSchema>;
export type Page = z.infer<typeof PageSchema>;
export type Dog = z.infer<typeof DogSchema>;
export type Litter = z.infer<typeof LitterSchema>;
export type Puppy = z.infer<typeof PuppySchema>;
export type Partner = z.infer<typeof PartnerSchema>;
export type GalleryAlbum = z.infer<typeof GalleryAlbumSchema>;
export type ResultRow = z.infer<typeof ResultSchema>;
export type LeadInput = z.infer<typeof LeadInputSchema>;
