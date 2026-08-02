import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CANONICAL_SITE_HOST, isLocalDevHost } from "@/lib/site-url";

export function middleware(request: NextRequest) {
  const hostHeader = request.headers.get("host") ?? "";
  const host = hostHeader.split(":")[0]?.toLowerCase() ?? "";

  if (!host || isLocalDevHost(host)) {
    return NextResponse.next();
  }

  const proto = (request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", "")).toLowerCase();
  const needsHttps = proto === "http";
  const needsWww = host === "jogiinvisiblegrills.in";

  if (!needsHttps && !needsWww) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.protocol = "https:";
  url.host = CANONICAL_SITE_HOST;
  url.port = "";

  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
