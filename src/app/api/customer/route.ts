import { corsResponse } from "@/lib/cors";
import { connectDB } from "@/lib/mongoose";
import Customer from "@/models/Customer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();
 
        await connectDB()
        const customer = await Customer.findOne({ email }, {
            firstName: 1,
            lastName: 1,
            phone: 1,
            line1: 1,
            line2: 1,
            city: 1,
            state: 1,
            postalCode: 1
        }).lean().exec();

        return corsResponse(NextResponse.json({ customer }));
    } catch (error) {
        console.error(error);
        return corsResponse(NextResponse.json({ error: "Internal server error" }, { status: 500 }));
    }
}


export async function PUT(req: Request) {
    try {
        const body = await req.json();

        await connectDB();
        const result = await Customer.updateOne({
            _id: body.body._id
        }, {
            $set: body.body
        });

        if (result.matchedCount === 0) return NextResponse.json({ error: "No customer found" }, { status: 404 })

        return corsResponse(NextResponse.json({ success: true }, { status: 201 }));
    } catch (error) {
        console.error(error);
        return corsResponse(NextResponse.json({ error: "Internal server error" }, { status: 500 }))
    }

}