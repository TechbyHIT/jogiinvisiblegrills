import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { contactFormSchema } from "@/lib/validation/contact-form";
import { checkRateLimit } from "@/lib/security/rate-limit";

export async function POST(request: Request) {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  const rateLimit = checkRateLimit(`contact-api:${ip}`, 5, 60_000);
  if (!rateLimit.success) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  const body = (await request.json()) as Record<string, unknown>;

  if (body.website) {
    return NextResponse.json({ success: true });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Validation failed", errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  console.info("[contact-api]", {
    name: parsed.data.name,
    phone: parsed.data.phone,
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json({ success: true, message: "Enquiry received" });
}
