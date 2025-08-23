import { corsResponse } from "@/lib/cors";
import { connectDB } from "@/lib/mongoose";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET(req: Request,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: any
) {
    try {
        const { _id } = context.params;

        await connectDB();
        const orders = await Order.find({ customer: _id }).lean().exec();
        return corsResponse(NextResponse.json({ orders }))
    } catch (error) {
        console.error(error);
        return corsResponse(NextResponse.json({ error: "Internal server error" }, { status: 500 }))
    }

}