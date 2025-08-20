// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/signin", "/signup", "/store-list", "/onboarding", "/adminboard"];

export async function middleware(req: NextRequest) {
  const hostname = req.headers.get("host") || "";
  const url = req.nextUrl;

  // ✅ Only allow PUBLIC_PATHS on main domain (2cd.site)
  if ((hostname === "2cd.site" || hostname === "localhost:3000" || hostname === "www.2cd.site") && PUBLIC_PATHS.includes(url.pathname)) {
    return NextResponse.next(); // allow directly on 2cd.site
  }

  // 🚫 If someone tries PUBLIC_PATHS on a custom domain → redirect to 2cd.site
  if (PUBLIC_PATHS.includes(url.pathname)) {
    return NextResponse.redirect(`https://2cd.site${url.pathname}`);
  }

  // ✅ Local dev should bypass custom domain handling
  if (hostname.includes("2cd.site") || hostname.includes("localhost")) {
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
    // Only prepend slug if it's not already in the path
    if (!url.pathname.startsWith(`/${data.store.slug}`)) {
      url.pathname = `/${data.store.slug}${url.pathname}`;
    }

    return NextResponse.rewrite(url);
  } catch (err) {
    console.error("Middleware error:", err);
    return NextResponse.redirect("https://2cd.site/not-found");
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};