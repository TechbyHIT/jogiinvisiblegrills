import { NextResponse } from "next/server";
import { getPublishedPageCount, getIndexablePageCount } from "@/lib/pages/get-published-page";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    pages: {
      published: getPublishedPageCount(),
      indexable: getIndexablePageCount(),
    },
  });
}
