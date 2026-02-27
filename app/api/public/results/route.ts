import { NextRequest, NextResponse } from "next/server";
import { getResults } from "@/lib/data/public";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dogSlug = searchParams.get("dogSlug") ?? "";
  const discipline = searchParams.get("discipline") ?? "";
  const year = searchParams.get("year") ?? "";

  const rows = await getResults();
  const out = rows.filter((r) => {
    if (dogSlug && (r.dogSlug ?? "") !== dogSlug) return false;
    if (discipline && (r.discipline ?? "") !== discipline) return false;
    if (year) {
      const y = (r.date ?? "").slice(0, 4);
      if (y !== year) return false;
    }
    return true;
  });

  return NextResponse.json(out);
}