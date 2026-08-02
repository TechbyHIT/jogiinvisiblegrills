import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { resetPageRegistryCache } from "@/lib/pages/registry";

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ success: false, message: "Revalidation not configured" }, { status: 500 });
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { path?: string; paths?: string[] };
  const paths = body.paths ?? (body.path ? [body.path] : ["/"]);

  resetPageRegistryCache();

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({ success: true, revalidated: paths, timestamp: new Date().toISOString() });
}
