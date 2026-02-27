import Section from "@/components/Section";
import LeadForm from "@/components/LeadForm";
import { getSettings } from "@/lib/data/public";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata() {
  const settings = await getSettings();
  return buildMetadata({ settings, title: "Přihláška", path: "/stenata/prihlaska" });
}

export default function LeadPage() {
  return (
    <Section
      title="Přihláška / Rezervace"
      subtitle="Vyplňte krátký formulář. Ozveme se a domluvíme další postup."
    >
      <LeadForm />
    </Section>
  );
}
