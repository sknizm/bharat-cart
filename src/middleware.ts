// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/signin", "/signup", "/store-list", "/onboarding", "/adminboard"];

export async function middleware(req: NextRequest) {
  const hostname = req.headers.get("host") || "";
  const url = req.nextUrl;

  // ✅ Allow platform routes (signup, signin, store-list etc.)
  if (PUBLIC_PATHS.includes(url.pathname)) {
    return NextResponse.next();
  }

  // ✅ Local development should bypass custom domain handling
  if (hostname.includes("2cd.site")) {
    return NextResponse.next();
  }

  // ✅ Handle custom domains
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/store/domain/${hostname}`
    );
    if (!res.ok) {
      return NextResponse.redirect("https://2cd.site/not-found");
    }

    const data = await res.json();

    // rewrite → /[slug]/whatever
    url.pathname = `/${data.store.slug}${url.pathname}`;
    return NextResponse.rewrite(url);
  } catch (err) {
    console.error("Middleware error:", err);
    return NextResponse.redirect("https://2cd.site/not-found");
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
