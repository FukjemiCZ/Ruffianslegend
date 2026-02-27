import * as React from "react";
import { alpha } from "@mui/material/styles";
import { Box, Card, CardActionArea, CardContent, Chip, Stack, Typography } from "@mui/material";
import NextLink from "@/components/NextLink";
import type { Dog } from "@/domain/types";
import StatusChip from "./StatusChip";

export default function DogCard({ dog }: { dog: Dog }) {
  return (
    <Card
      sx={{
        transition: "transform 180ms ease, box-shadow 180ms ease",
        "&:hover": { transform: "translateY(-2px)", boxShadow: "0 16px 34px rgba(15,23,42,0.10)" }
      }}
    >
      <CardActionArea component={NextLink} href={`/psi/${dog.slug}`}>
        <Box sx={{ position: "relative" }}>
          {dog.heroImageUrl ? (
            <Box
              component="img"
              src={dog.heroImageUrl}
              alt={dog.nameCall}
              loading="lazy"
              decoding="async"
              sx={{ width: "100%", height: 240, objectFit: "cover" }}
            />
          ) : (
            <Box sx={{ width: "100%", height: 240, bgcolor: alpha("#1f4d7a", 0.08) }} />
          )}

          <Box sx={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 1, flexWrap: "wrap" }}>
            <StatusChip kind="dog" value={dog.status} />
            <Chip size="small" label={dog.sex === "M" ? "Pes" : "Fena"} />
          </Box>
        </Box>

        <CardContent>
          <Stack spacing={1}>
            <Typography variant="h6" sx={{ fontWeight: 950, letterSpacing: -0.3 }}>
              {dog.nameCall}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {dog.nameOfficial}
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap">
              {dog.hips ? <Chip size="small" label={`HD: ${dog.hips}`} /> : null}
              {dog.eyes ? <Chip size="small" label={`Eyes: ${dog.eyes}`} /> : null}
              {dog.certs.slice(0, 2).map((c) => (
                <Chip key={c} size="small" variant="outlined" label={c} />
              ))}
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}