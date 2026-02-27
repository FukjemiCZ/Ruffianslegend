import { NextRequest, NextResponse } from "next/server";
import { getLitters } from "@/lib/data/public";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET(_req: NextRequest) {
  const litters = await getLitters();
  return NextResponse.json(litters);
}