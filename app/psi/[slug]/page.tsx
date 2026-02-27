import * as React from "react";
import { Box, Chip, Container, Stack, Typography } from "@mui/material";
import { getDogBySlug, getDogs, getResults, getSettings } from "@/lib/data/public";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import DogDetailSections from "@/components/DogDetailSections";
import StatusChip from "@/components/StatusChip";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const dogs = await getDogs();
  return dogs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const settings = await getSettings();
  const dog = await getDogBySlug(slug);

  if (!dog) {
    return buildMetadata({
      settings,
      title: "Pes nenalezen",
      path: `/psi/${slug}`
    });
  }

  return buildMetadata({
    settings,
    title: dog.nameCall,
    description: `${dog.nameOfficial} — ${dog.breed}`,
    ogImageUrl: dog.heroImageUrl ?? settings.heroImageUrl,
    path: `/psi/${dog.slug}`
  });
}

export default async function DogDetailPage({ params }: Props) {
  const { slug } = await params;

  const dog = await getDogBySlug(slug);
  if (!dog) notFound();

  const results = (await getResults()).filter((r) => (r.dogSlug ?? "") === dog.slug);

  return (
    <Container sx={{ py: { xs: 4, md: 6 } }}>
      <Stack spacing={3}>
        {/* Above-the-fold: name + health chips + cert badges */}
        <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems="stretch">
          <Box sx={{ flex: 1 }}>
            {dog.heroImageUrl ? (
              <Box
                component="img"
                src={dog.heroImageUrl}
                alt={dog.nameCall}
                loading="eager"
                decoding="async"
                sx={{ width: "100%", height: { xs: 280, md: 420 }, objectFit: "cover", borderRadius: 3 }}
              />
            ) : null}
          </Box>

          <Stack sx={{ flex: 1 }} spacing={2}>
            <Stack spacing={0.5}>
              <Typography variant="h3" sx={{ fontWeight: 950, letterSpacing: -0.8 }}>
                {dog.nameCall}
              </Typography>
              <Typography color="text.secondary">{dog.nameOfficial}</Typography>
            </Stack>

            <Stack direction="row" spacing={1} flexWrap="wrap">
              <StatusChip kind="dog" value={dog.status} />
              <Chip size="small" label={dog.sex === "M" ? "Pes" : "Fena"} />
              {dog.hips ? <Chip size="small" label={`HD: ${dog.hips}`} /> : null}
              {dog.eyes ? <Chip size="small" label={`Eyes: ${dog.eyes}`} /> : null}
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>
                Certifikace
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {dog.certs.length ? (
                  dog.certs.map((c) => <Chip key={c} label={c} />)
                ) : (
                  <Chip variant="outlined" label="—" />
                )}
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <DogDetailSections dog={dog} results={results} />
      </Stack>
    </Container>
  );
}