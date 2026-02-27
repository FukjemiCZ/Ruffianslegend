export function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export function siteBaseUrl(): string {
  const raw = requireEnv("SITE_BASE_URL");
  return raw.replace(/\/$/, "");
}

export function formatDateCz(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("cs-CZ", { year: "numeric", month: "long", day: "numeric" });
}
