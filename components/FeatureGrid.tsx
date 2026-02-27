import * as React from "react";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PetsIcon from "@mui/icons-material/Pets";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

type Feature = { icon: React.ReactNode; title: string; desc: string };

export default function FeatureGrid(props: { items?: Feature[] }) {
  const items: Feature[] =
    props.items ??
    [
      {
        icon: <HealthAndSafetyIcon />,
        title: "Zdraví & testy",
        desc: "Transparentní výsledky, dokumentace a dlouhodobá péče."
      },
      {
        icon: <VerifiedIcon />,
        title: "Certifikace",
        desc: "Důraz na kvalitu chovu a ověřitelné standardy."
      },
      {
        icon: <PetsIcon />,
        title: "Socializace",
        desc: "Povaha, kontakt a připravenost do nového domova."
      },
      {
        icon: <FavoriteBorderIcon />,
        title: "Podpora nových majitelů",
        desc: "Nejsi v tom sám — poradíme před i po převzetí štěněte."
      }
    ];

  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" }
      }}
    >
      {items.map((f) => (
        <Card key={f.title}>
          <CardContent>
            <Stack spacing={1.25}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  display: "grid",
                  placeItems: "center",
                  background: "rgba(31,77,122,0.10)",
                  color: "primary.main"
                }}
              >
                {f.icon}
              </Box>

              <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
                {f.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {f.desc}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}