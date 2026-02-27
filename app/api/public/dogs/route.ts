import { NextRequest, NextResponse } from "next/server";
import { getDogs, searchDogs } from "@/lib/data/public";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") ?? undefined;
  const q = searchParams.get("q") ?? undefined;

  const dogs = await getDogs();
  const out = searchDogs(dogs, q, status ?? undefined);
  return NextResponse.json(out);
}