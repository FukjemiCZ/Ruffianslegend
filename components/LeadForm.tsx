"use client";

import * as React from "react";
import { Alert, Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from "@mui/material";

type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  experience: string;
  housing: string;
  whyHusky: string;
  gdprConsent: boolean;
  honeypot: string;
};

export default function LeadForm() {
  const [data, setData] = React.useState<LeadPayload>({
    name: "",
    email: "",
    phone: "",
    experience: "",
    housing: "",
    whyHusky: "",
    gdprConsent: false,
    honeypot: ""
  });

  const [state, setState] = React.useState<{ kind: "idle" | "ok" | "err"; msg?: string }>({ kind: "idle" });
  const [loading, setLoading] = React.useState(false);

  const set = (k: keyof LeadPayload) => (e: any) =>
    setData((d) => ({ ...d, [k]: k === "gdprConsent" ? Boolean(e.target.checked) : String(e.target.value) }));

  const submit = async () => {
    setLoading(true);
    setState({ kind: "idle" });

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
      });

      if (res.status === 201) {
        setState({ kind: "ok", msg: "Děkujeme! Ozveme se co nejdříve." });
        setData((d) => ({ ...d, whyHusky: "", experience: "", housing: "" }));
        return;
      }

      const j = await res.json().catch(() => ({}));
      setState({ kind: "err", msg: j?.error ?? `Chyba: ${res.status}` });
    } catch (e: any) {
      setState({ kind: "err", msg: e?.message ?? "Neznámá chyba" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={2}>
      {state.kind === "ok" ? <Alert severity="success">{state.msg}</Alert> : null}
      {state.kind === "err" ? <Alert severity="error">{state.msg}</Alert> : null}

      {/* Honeypot (hidden) */}
      <Box sx={{ display: "none" }}>
        <TextField label="Company" value={data.honeypot} onChange={set("honeypot")} />
      </Box>

      <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
        <TextField fullWidth label="Jméno" value={data.name} onChange={set("name")} />
        <TextField fullWidth label="Email" value={data.email} onChange={set("email")} />
      </Stack>

      <TextField fullWidth label="Telefon" value={data.phone} onChange={set("phone")} />

      <TextField
        fullWidth
        label="Zkušenosti se psy / severskými plemeny"
        value={data.experience}
        onChange={set("experience")}
        multiline
        minRows={3}
      />

      <TextField
        fullWidth
        label="Bydlení a režim (byt/dům, zahrada, čas na psa)"
        value={data.housing}
        onChange={set("housing")}
        multiline
        minRows={3}
      />

      <TextField
        fullWidth
        label="Proč právě husky / proč naše chovatelská stanice?"
        value={data.whyHusky}
        onChange={set("whyHusky")}
        multiline
        minRows={3}
      />

      <FormControlLabel
        control={<Checkbox checked={data.gdprConsent} onChange={set("gdprConsent")} />}
        label={
          <Typography variant="body2" color="text.secondary">
            Souhlasím se zpracováním osobních údajů za účelem vyřízení poptávky.
          </Typography>
        }
      />

      <Button disabled={loading} onClick={submit} variant="contained" sx={{ borderRadius: 999 }}>
        {loading ? "Odesílám..." : "Odeslat přihlášku"}
      </Button>
    </Stack>
  );
}
