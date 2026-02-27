import * as React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import NextLink from "@/components/NextLink";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import Section from "@/components/Section";
import DogCard from "@/components/DogCard";
import LitterCard from "@/components/LitterCard";
import FeatureGrid from "@/components/FeatureGrid";
import Hero from "@/components/Hero";
import { getDogs, getLitters, getSettings } from "@/lib/data/public";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata() {
  const settings = await getSettings();
  return buildMetadata({ settings, path: "/" });
}

export default async function HomePage() {
  const settings = await getSettings();
  const [dogs, litters] = await Promise.all([getDogs(), getLitters()]);

  const featuredDogs = dogs.filter((d) => d.status === "active").slice(0, 6);
  const currentLitter = litters.find((l) => l.code === settings.currentLitterCode) ?? null;

  return (
    <>
      <AnnouncementBanner text={settings.announcementText} />

      <Hero
        title={settings.siteName}
        subtitle={settings.tagline}
        imageUrl={settings.heroImageUrl}
        primaryCtaHref="/stenata/prihlaska"
        primaryCtaLabel="Rezervace štěněte"
        secondaryCtaHref="/psi"
        secondaryCtaLabel="Naši psi"
      />

      <Section
        title="Co je pro nás důležité"
        subtitle="Moderní, transparentní chov – důraz na zdraví, povahu, socializaci a dlouhodobou podporu nových majitelů."
      >
        <FeatureGrid />
      </Section>

      {currentLitter ? (
        <Section title="Aktuální vrh" subtitle="Dostupnost a detaily najdeš na stránce vrhu.">
          <LitterCard litter={currentLitter} />
        </Section>
      ) : null}

      <Section title="Naši psi" subtitle="Katalog aktivních psů v chovatelské stanici.">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" },
            gap: 2
          }}
        >
          {featuredDogs.map((d) => (
            <DogCard key={d.slug} dog={d} />
          ))}
        </Box>

        <Stack direction="row" spacing={1} sx={{ mt: 3, flexWrap: "wrap" }}>
          <Button component={NextLink} href="/psi" variant="contained">
            Otevřít katalog
          </Button>
          <Button component={NextLink} href="/kontakt" variant="outlined">
            Napsat / Zavolat
          </Button>
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, maxWidth: 820, lineHeight: 1.8 }}>
          Preferujeme osobní setkání a férovou komunikaci — ať je výsledkem dobrý match pro obě strany.
        </Typography>
      </Section>
    </>
  );
}