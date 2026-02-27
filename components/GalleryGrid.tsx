"use client";

import * as React from "react";
import { Box, Dialog, IconButton, ImageList, ImageListItem, Stack, Typography, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useTheme } from "@mui/material/styles";

export default function GalleryGrid(props: { title?: string; items: string[]; colsMobile?: number; colsDesktop?: number }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const cols = isMobile ? (props.colsMobile ?? 2) : (props.colsDesktop ?? 4);

  const [open, setOpen] = React.useState(false);
  const [idx, setIdx] = React.useState(0);

  const openAt = (i: number) => {
    setIdx(i);
    setOpen(true);
  };

  const prev = () => setIdx((x) => (x - 1 + props.items.length) % props.items.length);
  const next = () => setIdx((x) => (x + 1) % props.items.length);

  if (!props.items.length) return null;

  return (
    <>
      <ImageList cols={cols} gap={10}>
        {props.items.map((src, i) => (
          <ImageListItem key={src} onClick={() => openAt(i)} sx={{ cursor: "pointer" }}>
            <Box
              component="img"
              src={src}
              alt={props.title ?? "Galerie"}
              loading="lazy"
              decoding="async"
              sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2 }}
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Dialog fullScreen={isMobile} open={open} onClose={() => setOpen(false)} maxWidth="lg">
        <Stack sx={{ p: 2, gap: 2 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography sx={{ fontWeight: 900 }}>{props.title ?? "Galerie"}</Typography>
            <IconButton onClick={() => setOpen(false)} aria-label="Zavřít">
              <CloseIcon />
            </IconButton>
          </Stack>

          <Box
            component="img"
            src={props.items[idx]}
            alt="Foto"
            sx={{ width: "100%", maxHeight: isMobile ? "70vh" : "78vh", objectFit: "contain", borderRadius: 2 }}
          />

          <Stack direction="row" justifyContent="space-between">
            <IconButton onClick={prev} aria-label="Předchozí">
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton onClick={next} aria-label="Další">
              <NavigateNextIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Dialog>
    </>
  );
}
