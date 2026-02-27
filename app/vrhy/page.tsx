import { Box } from "@mui/material";
import Section from "@/components/Section";
import LitterCard from "@/components/LitterCard";
import { getLitters, getSettings } from "@/lib/data/public";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata() {
  const settings = await getSettings();
  return buildMetadata({ settings, title: "Vrh", path: "/vrhy" });
}

export default async function LittersPage() {
  const litters = await getLitters();

  return (
    <Section title="Vrh" subtitle="Přehled vrhů – stav a detail.">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2
        }}
      >
        {litters.map((l) => (
          <LitterCard key={l.code} litter={l} />
        ))}
      </Box>
    </Section>
  );
}
