import * as React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import NextLink from "@/components/NextLink";
import FAQAccordion from "@/components/FAQAccordion";
import MobileActionBar from "@/components/MobileActionBar";
import Section from "@/components/Section";
import { getLitters, getSettings } from "@/lib/data/public";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata() {
  const settings = await getSettings();
  return buildMetadata({ settings, title: "Štěňata", path: "/stenata" });
}

export default async function PuppiesLandingPage() {
  const settings = await getSettings();
  const litters = await getLitters();
  const current = litters.find((l) => l.code === settings.currentLitterCode) ?? null;

  const faq = [
    { q: "Jak probíhá rezervace?", a: "Vyplňte přihlášku. Ozveme se a domluvíme další kroky (seznámení, podmínky, termíny)." },
    { q: "Je možné se přijet podívat?", a: "Ano — preferujeme osobní setkání, aby vše sedělo pro obě strany." },
    { q: "Co když nemám zkušenosti se severským plemenem?", a: "Nevadí. Důležitá je motivace, čas a vhodné podmínky. Rádi poradíme." }
  ];

  return (
    <>
      <Container sx={{ py: { xs: 4, md: 6 } }}>
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography variant="h3" sx={{ fontWeight: 950, letterSpacing: -0.8 }}>
              Štěňata
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 760, lineHeight: 1.7 }}>
              Informace o aktuální dostupnosti a procesu rezervace. Naším cílem je správný match mezi povahou štěněte a budoucím domovem.
            </Typography>
          </Stack>

          {current ? (
            <Box sx={{ p: 3, border: "1px solid", borderColor: "divider", borderRadius: 3 }}>
              <Typography sx={{ fontWeight: 900 }}>Aktuální vrh: {current.code}</Typography>
              <Typography color="text.secondary">{current.title}</Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
                <Button component={NextLink} href={`/vrhy/${current.code}`} variant="outlined">
                  Detail vrhu
                </Button>
                <Button component={NextLink} href="/stenata/prihlaska" variant="contained">
                  Přihláška / Rezervace
                </Button>
              </Stack>
            </Box>
          ) : null}

          <Section title="FAQ" subtitle="Časté dotazy k rezervaci a soužití se severským plemenem.">
            <FAQAccordion items={faq} />
          </Section>
        </Stack>
      </Container>

      <MobileActionBar phone={settings.phone} email={settings.email} />
    </>
  );
}
