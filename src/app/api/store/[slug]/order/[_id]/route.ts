import { connectDB } from "@/lib/mongoose";
import { getCurrentUser } from "@/lib/queries/user"
import Order from "@/models/Order";
import { NextResponse } from "next/server"

export async function PUT(req: Request,
    context: any
) {
    try {
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { _id } = context.params;
        const body = await req.json();
        console.log("BOD", body)
        await connectDB();
        const result = await Order.updateOne({ _id: _id }, {
            $set: body
        });

        if (result.matchedCount === 0) return NextResponse.json({ error: "Order not found" }, { status: 404 });

        return NextResponse.json({ success: true }, { status: 201 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }

}