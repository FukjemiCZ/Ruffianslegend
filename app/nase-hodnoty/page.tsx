import Section from "@/components/Section";
import Markdown from "@/components/Markdown";
import { getPageBySlug, getSettings } from "@/lib/data/public";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export async function generateMetadata() {
  const settings = await getSettings();
  const page = await getPageBySlug("nase-hodnoty");
  return buildMetadata({
    settings,
    title: page?.title ?? "Naše hodnoty",
    path: "/nase-hodnoty"
  });
}

export default async function ValuesPage() {
  const page = await getPageBySlug("nase-hodnoty");
  if (!page) notFound();

  return (
    <Section title={page.title}>
      <Markdown content={page.contentMd} />
    </Section>
  );
}
