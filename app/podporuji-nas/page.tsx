import * as React from "react";
import { Box, Container, Link, Stack, Typography } from "@mui/material";
import { getPartners, getSettings } from "@/lib/data/public";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata() {
  const settings = await getSettings();
  return buildMetadata({ settings, title: "Podporují nás", path: "/podporuji-nas" });
}

export default async function PartnersPage() {
  const partners = await getPartners();

  return (
    <Container sx={{ py: { xs: 4, md: 6 } }}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h3" sx={{ fontWeight: 950, letterSpacing: -0.8 }}>
            Podporují nás
          </Typography>
          <Typography color="text.secondary">
            Děkujeme partnerům a podporovatelům.
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
            gap: 2
          }}
        >
          {partners.map((p) => (
            <Box key={p.name} sx={{ p: 2, border: "1px solid", borderColor: "divider", borderRadius: 3 }}>
              <Box
                component="img"
                src={p.logoUrl}
                alt={p.name}
                loading="lazy"
                decoding="async"
                sx={{ width: "100%", height: 80, objectFit: "contain", mb: 1 }}
              />
              <Typography sx={{ fontWeight: 900 }}>{p.name}</Typography>
              <Link href={p.link} target="_blank" rel="noreferrer" underline="hover">
                Web
              </Link>
              {p.note ? (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {p.note}
                </Typography>
              ) : null}
            </Box>
          ))}
        </Box>
      </Stack>
    </Container>
  );
}
