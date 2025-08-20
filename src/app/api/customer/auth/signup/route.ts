import { corsResponse } from "@/lib/cors";
import { checkIfCustomerAlreadyExist, createCustomer } from "@/lib/queries/customer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, password, store } = await req.json();

        if (!email || !password || !store)
            return corsResponse(NextResponse.json({ error: "All fields are required" }, { status: 401 }))

        if (await checkIfCustomerAlreadyExist(email))
            return corsResponse(NextResponse.json({ error: "Email already in use" }, { status: 409 }))

        const customer = await createCustomer(email, password, store);
        if (!customer)
            return corsResponse(NextResponse.json({ error: "Failed to create account" }, { status: 401 }));

        return corsResponse(NextResponse.json({success:true},{status:201}))
    } catch (error) {
        console.error(error);
        return corsResponse(NextResponse.json({ error: "Internal server error" }, { status: 500 }))
    }
}