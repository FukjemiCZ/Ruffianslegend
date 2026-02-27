"use client";

import * as React from "react";
import { Box, Button, Container, Typography } from "@mui/material";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <Container sx={{ py: 8 }}>
      <Box sx={{ p: 3, border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 900 }}>
          Něco se pokazilo
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          {error.message}
        </Typography>
        <Button onClick={reset} variant="contained" sx={{ mt: 2 }}>
          Zkusit znovu
        </Button>
      </Box>
    </Container>
  );
}
