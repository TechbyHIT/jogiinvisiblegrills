import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { quoteFormSchema } from "@/lib/validation/quote-form";
import { checkRateLimit } from "@/lib/security/rate-limit";

export async function POST(request: Request) {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  const rateLimit = checkRateLimit(`quote-api:${ip}`, 5, 60_000);
  if (!rateLimit.success) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  const formData = await request.formData();

  if (formData.get("website")) {
    return NextResponse.json({ success: true });
  }

  const raw = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    locality: formData.get("locality"),
    serviceSlug: formData.get("serviceSlug") ?? "",
    propertyType: formData.get("propertyType") ?? "",
    dimensions: formData.get("dimensions") ?? "",
    message: formData.get("message") ?? "",
    consent: formData.get("consent") === "on" ? true : formData.get("consent"),
  };

  const parsed = quoteFormSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Please check your form details and try again." },
      { status: 400 },
    );
  }

  console.info("[quote-api]", {
    name: parsed.data.name,
    phone: parsed.data.phone,
    serviceSlug: parsed.data.serviceSlug,
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json({ success: true, message: "Quote request received" });
}
