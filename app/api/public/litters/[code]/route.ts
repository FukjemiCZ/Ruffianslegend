import { NextRequest, NextResponse } from "next/server";
import { getLitterByCode } from "@/lib/data/public";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  const litter = await getLitterByCode(code);
  if (!litter) return NextResponse.json({ error: "Litter not found" }, { status: 404 });

  return NextResponse.json(litter);
}