import Section from "@/components/Section";
import DogsCatalogClient from "@/components/DogsCatalogClient";
import { getDogs, getSettings } from "@/lib/data/public";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata() {
  const settings = await getSettings();
  return buildMetadata({ settings, title: "Psi", path: "/psi" });
}

export default async function DogsPage() {
  const dogs = await getDogs();
  return (
    <Section title="Psi" subtitle="Katalog psů – zdraví, certifikace, výsledky, galerie.">
      <DogsCatalogClient dogs={dogs} />
    </Section>
  );
}
