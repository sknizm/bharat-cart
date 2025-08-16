import { connectDB } from "@/lib/mongoose";
import { getStoreDeatilsBySlug } from "@/lib/queries/store";
import Category from "@/models/Category";
import Product from "@/models/Product";
import Store from "@/models/Store";
import { NextResponse } from "next/server";



export async function GET(
    req: Request,
    context: { params: { slug: string } }
) {
    try {
        await connectDB(); // connect to MongoDB

        const { slug } = context.params;

        const store = await getStoreDeatilsBySlug(slug);

        if (!store) {
            return NextResponse.json(
                { error: "Store not found", store: false },
                { status: 404 }
            );
        }
        const products = await Product.find({ store: store._id })
            .select("name price images categories")
            .lean().exec();

        const categories = await Category.find({ store: store._id })
            .select("_id name").lean().exec();

        return NextResponse.json(
            {
                success: true,
                store,
                products,
                categories
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching store:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}