import { corsResponse } from "@/lib/cors";
import { connectDB } from "@/lib/mongoose";
import { createCustomerSession, deleteAllCustomerSession } from "@/lib/queries/customer";
import Customer from "@/models/Customer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        await connectDB();
        const customer = await Customer.findOne({ email });
        if (!customer)
            return corsResponse(NextResponse.json({ error: "User not found, try creating new account" }, { status: 404 }));

        if (password !== customer.password)
            return corsResponse(NextResponse.json({ error: "Incorrect password" }, { status: 401 }));

        await deleteAllCustomerSession(customer._id);
        await createCustomerSession(customer._id);
        
        return corsResponse(NextResponse.json({ success: true }, { status: 201 }))

    } catch (error) {
        console.log(error);
        return corsResponse(NextResponse.json({ error: "Internal server error" }, { status: 500 }));
    }

}