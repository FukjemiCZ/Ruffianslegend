"use client";

import * as React from "react";
import { Box, Chip, Stack, TextField } from "@mui/material";
import type { Dog } from "@/domain/types";
import DogCard from "@/components/DogCard";

export default function DogsCatalogClient({ dogs }: { dogs: Dog[] }) {
  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState<"" | "active" | "retired" | "memory">("");

  const filtered = React.useMemo(() => {
    const qq = q.trim().toLowerCase();
    return dogs
      .filter((d) => (status ? d.status === status : true))
      .filter((d) => {
        if (!qq) return true;
        return (
          d.nameCall.toLowerCase().includes(qq) ||
          d.nameOfficial.toLowerCase().includes(qq) ||
          d.breed.toLowerCase().includes(qq)
        );
      });
  }, [dogs, q, status]);

  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
        <TextField
          fullWidth
          label="Hledat"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
          <Chip label="Všichni" clickable color={status === "" ? "primary" : "default"} onClick={() => setStatus("")} />
          <Chip label="Aktivní" clickable color={status === "active" ? "primary" : "default"} onClick={() => setStatus("active")} />
          <Chip label="V důchodu" clickable color={status === "retired" ? "primary" : "default"} onClick={() => setStatus("retired")} />
          <Chip label="Vzpomínáme" clickable color={status === "memory" ? "primary" : "default"} onClick={() => setStatus("memory")} />
        </Stack>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" },
          gap: 2
        }}
      >
        {filtered.map((d) => (
          <DogCard key={d.slug} dog={d} />
        ))}
      </Box>
    </Stack>
  );
}
