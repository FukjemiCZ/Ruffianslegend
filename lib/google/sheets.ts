import "server-only";
import { google, sheets_v4 } from "googleapis";
import { getSheetsAuth } from "./auth";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export async function getSheetsClient(): Promise<sheets_v4.Sheets> {
  const auth = getSheetsAuth();
  await auth.authorize();
  return google.sheets({ version: "v4", auth });
}

export async function readRange(rangeA1: string) {
  const spreadsheetId = requireEnv("GOOGLE_SHEETS_SPREADSHEET_ID");
  const sheets = await getSheetsClient();

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: rangeA1
  });

  return res.data.values ?? [];
}

export async function readSheetAsObjects(sheetName: string): Promise<Array<Record<string, string>>> {
  const values = await readRange(`${sheetName}!A1:ZZZ`);
  if (!values.length) return [];

  const [headerRow, ...rows] = values;
  const headers = (headerRow ?? []).map((h) => String(h).trim());

  return rows
    .filter((r) => (r ?? []).some((c) => String(c ?? "").trim().length > 0))
    .map((r) => {
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => {
        if (!h) return;
        obj[h] = String(r?.[i] ?? "").trim();
      });
      return obj;
    });
}

export async function appendRow(sheetName: string, rowValues: Array<string | number | boolean | null>) {
  const spreadsheetId = requireEnv("GOOGLE_SHEETS_SPREADSHEET_ID");
  const sheets = await getSheetsClient();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A1`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [rowValues.map((v) => (v == null ? "" : v))]
    }
  });
}
