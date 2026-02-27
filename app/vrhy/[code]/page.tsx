import * as React from "react";
import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import NextLink from "@/components/NextLink";
import { getLitterByCode, getLitters, getPuppiesByLitterCode, getSettings } from "@/lib/data/public";
import { buildMetadata } from "@/lib/seo";
import { formatDateCz } from "@/lib/utils";
import { notFound } from "next/navigation";
import StatusChip from "@/components/StatusChip";
import LitterDetailSections from "@/components/LitterDetailSections";

export const revalidate = 3600;

type Props = {
  params: Promise<{ code: string }>;
};

export async function generateStaticParams() {
  const litters = await getLitters();
  return litters.map((l) => ({ code: l.code }));
}

export async function generateMetadata({ params }: Props) {
  const { code } = await params;

  const settings = await getSettings();
  const litter = await getLitterByCode(code);

  if (!litter) {
    return buildMetadata({
      settings,
      title: "Vrh nenalezen",
      path: `/vrhy/${code}`
    });
  }

  return buildMetadata({
    settings,
    title: `Vrh ${litter.code}`,
    description: litter.title,
    ogImageUrl: litter.heroImageUrl ?? settings.heroImageUrl,
    path: `/vrhy/${litter.code}`
  });
}

export default async function LitterDetailPage({ params }: Props) {
  const { code } = await params;

  const litter = await getLitterByCode(code);
  if (!litter) notFound();

  const puppies = await getPuppiesByLitterCode(litter.code);

  return (
    <Container sx={{ py: { xs: 4, md: 6 } }}>
      <Stack spacing={3}>
        {/* Above-the-fold: status + CTA */}
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <Box sx={{ flex: 1 }}>
            {litter.heroImageUrl ? (
              <Box
                component="img"
                src={litter.heroImageUrl}
                alt={`Vrh ${litter.code}`}
                loading="eager"
                decoding="async"
                sx={{ width: "100%", height: { xs: 280, md: 420 }, objectFit: "cover", borderRadius: 3 }}
              />
            ) : null}
          </Box>

          <Stack sx={{ flex: 1 }} spacing={2}>
            <Typography variant="h3" sx={{ fontWeight: 950, letterSpacing: -0.8 }}>
              Vrh {litter.code}
            </Typography>
            <Typography color="text.secondary">{litter.title}</Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap">
              <StatusChip kind="litter" value={litter.status} />
              {litter.birthDate ? <Chip size="small" label={`Narození: ${formatDateCz(litter.birthDate)}`} /> : null}
            </Stack>

            <Button
              component={NextLink}
              href="/stenata/prihlaska"
              variant="contained"
              sx={{ alignSelf: "flex-start", borderRadius: 999 }}
            >
              Přihláška / Rezervace
            </Button>

            {litter.fatherName ? (
              <Typography variant="body2" color="text.secondary">
                Otec: {litter.fatherLink ? <a href={litter.fatherLink}>{litter.fatherName}</a> : litter.fatherName}
              </Typography>
            ) : null}
            {litter.motherSlug ? (
              <Typography variant="body2" color="text.secondary">
                Matka: <a href={`/psi/${litter.motherSlug}`}>{litter.motherSlug}</a>
              </Typography>
            ) : null}
          </Stack>
        </Stack>

        <LitterDetailSections litter={litter} puppies={puppies} />
      </Stack>
    </Container>
  );
}