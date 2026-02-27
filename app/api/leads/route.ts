import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { LeadInputSchema } from "@/domain/schemas";
import { appendRow, readRange } from "@/lib/google/sheets";
import { isRateLimited } from "@/lib/rateLimit";

export const runtime = "nodejs";

function getIp(req: NextRequest): string {
  // Vercel: x-forwarded-for can be "client, proxy1, proxy2"
  const xff = req.headers.get("x-forwarded-for") ?? "";
  const ip = xff.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  return ip;
}

function sha256(s: string): string {
  return crypto.createHash("sha256").update(s).digest("hex");
}

async function ensureLeadsSheetExists() {
  // Cheap existence check: attempt read header row. If sheet missing, Google returns 400.
  try {
    await readRange("leads!A1:K1");
  } catch (e: any) {
    throw new Error("Sheet 'leads' does not exist or is not accessible. Create it with correct columns.");
  }
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  if (isRateLimited(ip, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = LeadInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // Honeypot: silent drop
  if ((parsed.data.honeypot ?? "").trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // GDPR enforced by schema (literal true)
  await ensureLeadsSheetExists();

  const createdAt = new Date().toISOString();
  const ipHash = sha256(ip);
  const userAgent = req.headers.get("user-agent") ?? "";
  const sourcePage = req.headers.get("referer") ?? "";

  // leads columns:
  // createdAt,name,email,phone,experience,housing,whyHusky,gdprConsent,sourcePage,ipHash,userAgent
  await appendRow("leads", [
    createdAt,
    parsed.data.name,
    parsed.data.email,
    parsed.data.phone,
    parsed.data.experience,
    parsed.data.housing,
    parsed.data.whyHusky,
    true,
    sourcePage,
    ipHash,
    userAgent
  ]);

  return NextResponse.json({ ok: true }, { status: 201 });
}