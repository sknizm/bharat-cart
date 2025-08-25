import { connectDB } from "@/lib/mongoose";
import Store from "@/models/Store";
import { NextResponse } from "next/server";

export async function GET(req: Request,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: any
) {
    try {
        const { searchParams } = new URL(req.url);
        const { slug } = context.params;
        const fields = searchParams.get("fields")

        const projection = fields ? fields.split(",").join(" ") : "";

        await connectDB();
        const store = await Store.findOne({ slug: slug }).select(projection);

        if (!store) return NextResponse.json({ error: "Store not found" }, { status: 404 });

        return NextResponse.json({ store, success: true }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

}