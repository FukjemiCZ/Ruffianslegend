import * as React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";

export default function Section(props: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <Container sx={{ py: { xs: 5, md: 7 } }}>
      <Stack spacing={2.25}>
        {props.title ? (
          <Stack spacing={0.75}>
            <Typography variant="h4" sx={{ fontWeight: 950, letterSpacing: -0.6 }}>
              {props.title}
            </Typography>
            {props.subtitle ? (
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 860, lineHeight: 1.8 }}>
                {props.subtitle}
              </Typography>
            ) : null}
          </Stack>
        ) : null}

        <Box>{props.children}</Box>
      </Stack>
    </Container>
  );
}