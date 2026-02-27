import * as React from "react";
import { Box, Button, Divider, Stack, Typography, Chip } from "@mui/material";
import NextLink from "@/components/NextLink";
import type { Litter, Puppy } from "@/domain/types";
import Markdown from "./Markdown";

export default function LitterDetailSections(props: { litter: Litter; puppies: Puppy[] }) {
  const { litter, puppies } = props;

  return (
    <Stack spacing={3}>
      <Divider />

      {litter.summaryMd ? (
        <Stack spacing={1}>
          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            Shrnutí
          </Typography>
          <Markdown content={litter.summaryMd} />
        </Stack>
      ) : null}

      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 900 }}>
          Štěňata
        </Typography>
        {puppies.length ? (
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {puppies.map((p) => (
              <Chip
                key={`${p.litterCode}-${p.name}`}
                label={`${p.name}${p.collarColor ? ` (${p.collarColor})` : ""} — ${p.status}`}
                variant={p.status === "available" ? "filled" : "outlined"}
                color={p.status === "available" ? "success" : "default"}
              />
            ))}
          </Stack>
        ) : (
          <Typography color="text.secondary">Informace budou doplněny.</Typography>
        )}

        <Button component={NextLink} href="/stenata/prihlaska" variant="contained" sx={{ alignSelf: "flex-start", mt: 1, borderRadius: 999 }}>
          Mám zájem / Rezervace
        </Button>
      </Stack>

      {litter.storyMd ? (
        <Stack spacing={1}>
          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            Příběh vrhu
          </Typography>
          <Markdown content={litter.storyMd} />
        </Stack>
      ) : null}

      {litter.albumUrl ? (
        <Box>
          <Button href={litter.albumUrl} target="_blank" rel="noreferrer" variant="outlined">
            Otevřít album
          </Button>
        </Box>
      ) : null}
    </Stack>
  );
}
