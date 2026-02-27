import { NextRequest, NextResponse } from "next/server";
import { getPartners } from "@/lib/data/public";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET(_req: NextRequest) {
  const partners = await getPartners();
  return NextResponse.json(partners);
}