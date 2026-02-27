import * as React from "react";
import { alpha } from "@mui/material/styles";
import { Box, Card, CardActionArea, CardContent, Stack, Typography, Button } from "@mui/material";
import NextLink from "@/components/NextLink";
import type { Litter } from "@/domain/types";
import StatusChip from "./StatusChip";

export default function LitterCard({ litter }: { litter: Litter }) {
  return (
    <Card
      sx={{
        transition: "transform 180ms ease, box-shadow 180ms ease",
        "&:hover": { transform: "translateY(-2px)", boxShadow: "0 16px 34px rgba(15,23,42,0.10)" }
      }}
    >
      <CardActionArea component={NextLink} href={`/vrhy/${litter.code}`}>
        <Box sx={{ position: "relative" }}>
          {litter.heroImageUrl ? (
            <Box
              component="img"
              src={litter.heroImageUrl}
              alt={litter.title}
              loading="lazy"
              decoding="async"
              sx={{ width: "100%", height: 260, objectFit: "cover" }}
            />
          ) : (
            <Box sx={{ width: "100%", height: 260, bgcolor: alpha("#1f4d7a", 0.08) }} />
          )}

          <Box sx={{ position: "absolute", top: 12, left: 12 }}>
            <StatusChip kind="litter" value={litter.status} />
          </Box>

          <Box
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              p: 1.25,
              background: "linear-gradient(180deg, rgba(2,6,23,0), rgba(2,6,23,0.55))"
            }}
          >
            <Typography sx={{ color: "white", fontWeight: 950, letterSpacing: -0.3 }}>
              Vrh {litter.code}
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)" }}>
              {litter.title}
            </Typography>
          </Box>
        </Box>

        <CardContent>
          <Stack spacing={1}>
            <Button component={NextLink} href={`/vrhy/${litter.code}`} variant="outlined" sx={{ alignSelf: "flex-start" }}>
              Detail
            </Button>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}