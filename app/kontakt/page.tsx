import * as React from "react";
import { Box, Container, Link, Stack, Typography } from "@mui/material";
import MobileActionBar from "@/components/MobileActionBar";
import { getSettings } from "@/lib/data/public";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata() {
  const settings = await getSettings();
  return buildMetadata({ settings, title: "Kontakt", path: "/kontakt" });
}

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <>
      <Container sx={{ py: { xs: 4, md: 6 } }}>
        <Stack spacing={3}>
          <Typography variant="h3" sx={{ fontWeight: 950, letterSpacing: -0.8 }}>
            Kontakt
          </Typography>

          <Box sx={{ p: 3, border: "1px solid", borderColor: "divider", borderRadius: 3 }}>
            <Stack spacing={1}>
              <Typography sx={{ fontWeight: 900 }}>{settings.owners}</Typography>
              <Typography color="text.secondary">{settings.location}</Typography>
              <Link href={`tel:${settings.phone}`} underline="hover">
                {settings.phone}
              </Link>
              <Link href={`mailto:${settings.email}`} underline="hover">
                {settings.email}
              </Link>

              <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
                {settings.facebookUrl ? (
                  <Link href={settings.facebookUrl} target="_blank" rel="noreferrer" underline="hover">
                    Facebook
                  </Link>
                ) : null}
                {settings.instagramHandle ? (
                  <Link
                    href={`https://instagram.com/${settings.instagramHandle.replace(/^@/, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    underline="hover"
                  >
                    Instagram
                  </Link>
                ) : null}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>

      <MobileActionBar phone={settings.phone} email={settings.email} />
    </>
  );
}
