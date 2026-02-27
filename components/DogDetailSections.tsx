import * as React from "react";
import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import type { Dog, ResultRow } from "@/domain/types";
import Markdown from "./Markdown";

export default function DogDetailSections(props: { dog: Dog; results: ResultRow[] }) {
  const { dog } = props;

  return (
    <Stack spacing={3}>
      <Divider />

      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 900 }}>
          Zdraví
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {dog.hips ? <Chip label={`HD: ${dog.hips}`} /> : <Chip variant="outlined" label="HD: —" />}
          {dog.eyes ? <Chip label={`Eyes: ${dog.eyes}`} /> : <Chip variant="outlined" label="Eyes: —" />}
          {dog.heightCm ? <Chip label={`Výška: ${dog.heightCm} cm`} /> : null}
        </Stack>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 900 }}>
          Certifikace
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {dog.certs.length ? dog.certs.map((c) => <Chip key={c} label={c} />) : <Typography color="text.secondary">—</Typography>}
        </Stack>

        {dog.titles.length ? (
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, mt: 1 }}>
              Tituly
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
              {dog.titles.map((t) => (
                <Chip key={t} variant="outlined" label={t} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Stack>

      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 900 }}>
          Výsledky
        </Typography>
        {props.results.length ? (
          <Stack spacing={1}>
            {props.results.slice(0, 8).map((r, idx) => (
              <Box key={idx} sx={{ p: 2, border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
                <Typography sx={{ fontWeight: 800 }}>
                  {(r.event ?? "Událost") + (r.placement ? ` — ${r.placement}` : "")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {[r.date, r.discipline, r.category].filter(Boolean).join(" • ")}
                </Typography>
                {r.note ? (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {r.note}
                  </Typography>
                ) : null}
              </Box>
            ))}
          </Stack>
        ) : (
          <Typography color="text.secondary">Zatím bez záznamů.</Typography>
        )}
      </Stack>

      {dog.galleryUrls.length ? (
        <Stack spacing={1}>
          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            Galerie
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {dog.galleryUrls.slice(0, 12).map((url) => (
              <Box
                key={url}
                component="img"
                src={url}
                alt={dog.nameCall}
                loading="lazy"
                decoding="async"
                sx={{ width: 140, height: 100, objectFit: "cover", borderRadius: 2 }}
              />
            ))}
          </Stack>
        </Stack>
      ) : null}

      {dog.bioMd ? (
        <Stack spacing={1}>
          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            Profil
          </Typography>
          <Markdown content={dog.bioMd} />
        </Stack>
      ) : null}
    </Stack>
  );
}
