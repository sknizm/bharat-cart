import { NextResponse } from "next/server";

const VERCEL_TOKEN = process.env.VERCEL_TOKEN!;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID!;

export async function GET() {
  try {
    const res = await fetch(
      `https://api.vercel.com/v10/projects/${VERCEL_PROJECT_ID}/domains`,
      {
        headers: {
          Authorization: `Bearer ${VERCEL_TOKEN}`,
        },
      }
    );

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch domains", details: data },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
