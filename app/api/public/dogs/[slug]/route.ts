import { NextRequest, NextResponse } from "next/server";
import { getDogBySlug } from "@/lib/data/public";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const dog = await getDogBySlug(slug);
  if (!dog) return NextResponse.json({ error: "Dog not found" }, { status: 404 });

  return NextResponse.json(dog);
}