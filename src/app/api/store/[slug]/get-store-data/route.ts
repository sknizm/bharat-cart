import { connectDB } from "@/lib/mongoose";
import Store from "@/models/Store";
import { NextResponse } from "next/server";

export async function GET(req: Request,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: any
) {
    try {
        const { slug } = context.params;

        await connectDB();
        const store = await Store.findOne({slug}).lean().exec();

        if (!store) return NextResponse.json({ error: "Store not found" }, { status: 404 });

        return NextResponse.json({ store }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}