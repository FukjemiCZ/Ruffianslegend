import "server-only";
import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export function getSheetsAuth() {
  const email = requireEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const keyRaw = requireEnv("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY");
  const key = keyRaw.replace(/\\n/g, "\n");

  return new google.auth.JWT({
    email,
    key,
    scopes: SCOPES
  });
}
