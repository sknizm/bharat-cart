import { connectDB } from "@/lib/mongoose";
import { getStoreDeatilsBySlug } from "@/lib/queries/store";
import { getCurrentUser } from "@/lib/queries/user";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req: Request,

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: any
) {
    try {
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { slug } = context.params;
        const store = await getStoreDeatilsBySlug(slug)
        if (!store) return NextResponse.json({ error: "Store not found" }, { status: 404 });

        const { name, description, price, salePrice, categories, images, variant } = await req.json();

        await connectDB();
        const product = await Product.create({
            name: name,
            description: description,
            images: images,
            price: price,
            salePrice: salePrice,
            categories: categories,
            variant: variant,
            store: store._id
        });

        if (!product) return NextResponse.json({ error: "Failed to create product" }, { status: 401 });

        return NextResponse.json({ success: true }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

}

export async function GET(req: Request,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: any
) {
    try {
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { slug } = context.params;
        const store = await getStoreDeatilsBySlug(slug);
        if (!store) return NextResponse.json({ error: "Store not found " }, { status: 404 });

        const products = await Product.find({ store: store._id }).lean().exec();
        return NextResponse.json({ products }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

}