"use client";

import * as React from "react";
import { Box, Button, Paper, Stack, useMediaQuery } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { useTheme } from "@mui/material/styles";

export default function MobileActionBar(props: { phone: string; email: string }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  if (!isMobile) return null;

  return (
    <Box sx={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 1200 }}>
      <Paper elevation={6} sx={{ borderRadius: 0, px: 2, py: 1 }}>
        <Stack direction="row" spacing={1}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<PhoneIcon />}
            component="a"
            href={`tel:${props.phone}`}
          >
            Zavolat
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<EmailIcon />}
            component="a"
            href={`mailto:${props.email}`}
          >
            Email
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
