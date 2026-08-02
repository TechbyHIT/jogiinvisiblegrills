import { NextResponse } from "next/server";
import { BUSINESS_CONFIG } from "@/config/business";
import { CANONICAL_SITE_HOST } from "@/lib/site-url";

/** Use after deploy: curl -s https://www.jogiinvisiblegrills.in/api/site-identity/ */
export async function GET() {
  return NextResponse.json(
    {
      brand: BUSINESS_CONFIG.name,
      legalName: BUSINESS_CONFIG.legalName,
      canonicalHost: CANONICAL_SITE_HOST,
      websiteUrl: BUSINESS_CONFIG.websiteUrl,
      deployMarker: "jogi-invisible-grills-next",
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
