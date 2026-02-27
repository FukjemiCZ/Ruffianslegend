import * as React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import GalleryGrid from "@/components/GalleryGrid";
import { getGalleryAlbums, getSettings } from "@/lib/data/public";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata() {
  const settings = await getSettings();
  return buildMetadata({ settings, title: "Galerie", path: "/galerie" });
}

export default async function GalleryPage() {
  const albums = await getGalleryAlbums();

  return (
    <Container sx={{ py: { xs: 4, md: 6 } }}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h3" sx={{ fontWeight: 950, letterSpacing: -0.8 }}>
            Galerie
          </Typography>
          <Typography color="text.secondary">
            Fotky z vrhů, tréninků a života naší chovatelské stanice.
          </Typography>
        </Stack>

        <Stack spacing={4}>
          {albums.map((a) => {
            const gridItems =
              a.items.length > 0
                ? a.items
                : a.coverImageUrl
                ? [a.coverImageUrl]
                : [];

            // pokud nemáme vůbec žádnou fotku, album jen přeskočíme (nepadne build)
            if (gridItems.length === 0) return null;

            return (
              <Box key={a.slug} sx={{ p: { xs: 0, md: 2 }, borderRadius: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>
                  {a.title}
                </Typography>

                {a.description ? (
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {a.description}
                  </Typography>
                ) : null}

                <GalleryGrid
                  title={a.title}
                  items={gridItems}
                  colsMobile={2}
                  colsDesktop={4}
                />
              </Box>
            );
          })}
        </Stack>
      </Stack>
    </Container>
  );
}