import * as React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import NextLink from "@/components/NextLink";

export default function Hero(props: {
  title: string;
  subtitle: string;
  imageUrl: string;
  primaryCtaHref: string;
  primaryCtaLabel: string;
  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;
}) {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid",
        borderColor: "divider",
        backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0.60), rgba(2,6,23,0.18)), url(${props.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Stack spacing={2} sx={{ maxWidth: 820 }}>
          <Typography
            variant="h2"
            sx={{
              color: "common.white",
              fontWeight: 950,
              letterSpacing: -1.1,
              lineHeight: 1.05
            }}
          >
            {props.title}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "rgba(255,255,255,0.92)",
              maxWidth: 720,
              lineHeight: 1.55
            }}
          >
            {props.subtitle}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ pt: 2, flexWrap: "wrap" }}>
            <Button component={NextLink} href={props.primaryCtaHref} variant="contained">
              {props.primaryCtaLabel}
            </Button>

            {props.secondaryCtaHref && props.secondaryCtaLabel ? (
              <Button
                component={NextLink}
                href={props.secondaryCtaHref}
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.55)",
                  "&:hover": { borderColor: "rgba(255,255,255,0.75)" }
                }}
              >
                {props.secondaryCtaLabel}
              </Button>
            ) : null}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}