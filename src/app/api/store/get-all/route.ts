import { connectDB } from "@/lib/mongoose";
import { getCurrentUser } from "@/lib/queries/user";
import Store from "@/models/Store";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        const stores = await Store.find({ owner: user._id }, {
            _id: 1,
            slug: 1,
            domain: 1,
            banner: 1,
            logo: 1,
        }).lean();

        return NextResponse.json({ stores })
    } catch (error) {
        console.error("ERROR", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}