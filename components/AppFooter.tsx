import * as React from "react";
import { Box, Container, Divider, Link, Stack, Typography } from "@mui/material";
import type { Settings } from "@/domain/types";

export default function AppFooter({ settings }: { settings: Settings }) {
  return (
    <Box component="footer" sx={{ mt: { xs: 7, md: 10 } }}>
      <Divider />
      <Box
        sx={{
          background:
            "linear-gradient(180deg, rgba(31,77,122,0.06), rgba(255,255,255,0))"
        }}
      >
        <Container sx={{ py: 6 }}>
          <Stack spacing={2}>
            <Typography variant="h6" sx={{ fontWeight: 950, letterSpacing: -0.4 }}>
              {settings.siteName}
            </Typography>

            <Typography color="text.secondary" sx={{ maxWidth: 820, lineHeight: 1.8 }}>
              {settings.tagline}
            </Typography>

            <Stack direction={{ xs: "column", md: "row" }} spacing={1} sx={{ flexWrap: "wrap" }}>
              <Typography color="text.secondary">{settings.location}</Typography>
              <Typography color="text.secondary">•</Typography>
              <Link href={`tel:${settings.phone}`}>{settings.phone}</Link>
              <Typography color="text.secondary">•</Typography>
              <Link href={`mailto:${settings.email}`}>{settings.email}</Link>
            </Stack>

            <Stack direction="row" spacing={2}>
              {settings.facebookUrl ? (
                <Link href={settings.facebookUrl} target="_blank" rel="noreferrer">
                  Facebook
                </Link>
              ) : null}
              {settings.instagramHandle ? (
                <Link
                  href={`https://instagram.com/${settings.instagramHandle.replace(/^@/, "")}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </Link>
              ) : null}
            </Stack>

            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} {settings.siteName}. Všechna práva vyhrazena.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}