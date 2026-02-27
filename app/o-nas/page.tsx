import Section from "@/components/Section";
import Markdown from "@/components/Markdown";
import { getPageBySlug, getSettings } from "@/lib/data/public";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export async function generateMetadata() {
  const settings = await getSettings();
  const page = await getPageBySlug("o-nas");
  return buildMetadata({
    settings,
    title: page?.title ?? "O nás",
    description: settings.seoDescDefault,
    path: "/o-nas"
  });
}

export default async function AboutPage() {
  const page = await getPageBySlug("o-nas");
  if (!page) notFound();

  return (
    <Section title={page.title}>
      <Markdown content={page.contentMd} />
    </Section>
  );
}
