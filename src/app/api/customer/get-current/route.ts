import { corsResponse } from "@/lib/cors";
import { getCurrentCustomer } from "@/lib/queries/customer";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const customer = await getCurrentCustomer();
        return corsResponse(NextResponse.json({ customer, success: true }, { status: 201 }));
    } catch (error) {
        console.error(error);
        return corsResponse(NextResponse.json({ error: "Internal server error" }, { status: 500 }))
    }

}