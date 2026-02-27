"use client";

import * as React from "react";
import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function AnnouncementBanner({ text }: { text?: string }) {
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    const v = window.localStorage.getItem("rl_announcement_dismissed");
    if (v === "1") setOpen(false);
  }, []);

  if (!text?.trim()) return null;

  return (
    <Collapse in={open}>
      <Alert
        severity="info"
        sx={{ borderRadius: 0 }}
        action={
          <IconButton
            aria-label="Zavřít"
            size="small"
            onClick={() => {
              window.localStorage.setItem("rl_announcement_dismissed", "1");
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {text}
      </Alert>
    </Collapse>
  );
}
