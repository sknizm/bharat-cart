import { corsResponse } from "@/lib/cors";
import { deleteCustomerSession } from "@/lib/queries/customer";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await deleteCustomerSession();
        return corsResponse(NextResponse.json({ success: true }, { status: 201 }));

    } catch (error) {
        console.error(error);
        return corsResponse(NextResponse.json({ error: "Internal server error" }, { status: 500 }))
    }

}