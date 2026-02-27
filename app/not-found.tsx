import { Container, Typography, Button, Stack } from "@mui/material";
import NextLink from "@/components/NextLink";

export default function NotFound() {
  return (
    <Container sx={{ py: 10 }}>
      <Stack spacing={2}>
        <Typography variant="h3" sx={{ fontWeight: 900 }}>
          404
        </Typography>
        <Typography color="text.secondary">
          Stránka nebyla nalezena.
        </Typography>
        <Button component={NextLink} href="/" variant="contained" sx={{ alignSelf: "flex-start" }}>
          Zpět na úvod
        </Button>
      </Stack>
    </Container>
  );
}
