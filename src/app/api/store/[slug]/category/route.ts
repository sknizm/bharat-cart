import { connectDB } from "@/lib/mongoose";
import { getStoreDeatilsBySlug } from "@/lib/queries/store";
import { getCurrentUser } from "@/lib/queries/user";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function POST(req: Request,
    context: { params: Promise<{ slug: string }> }
) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
        }

        const { slug } = await context.params;
        const { name } = await req.json();

        const store = await getStoreDeatilsBySlug(slug);
        if (!store) {
            return NextResponse.json({ error: "Store not found" }, { status: 404 });
        }

        await connectDB();
        const category = await Category.create({ name: name, store: store._id })
        if (category) {
            return NextResponse.json({ success: true }, { status: 201 })
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });

    }

}

export async function GET(req: Request,
    context: { params: Promise<{ slug: string }> }
) {
    try { 
        const user = getCurrentUser();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { slug } = await context.params;
        const store = await getStoreDeatilsBySlug(slug);

        if(!store) return NextResponse.json({error:"Store not found"},{status:404});

        await connectDB();
        const categoryDoc = await Category.find({ store: store._id }).lean().exec();

        return NextResponse.json({ categoryDoc })


    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}