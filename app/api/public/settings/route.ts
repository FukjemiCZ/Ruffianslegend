import { NextRequest, NextResponse } from "next/server";
import { getSettings } from "@/lib/data/public";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET(_req: NextRequest) {
  const settings = await getSettings();
  return NextResponse.json(settings);
}