import { connectDB } from "@/lib/mongoose";
import { getCurrentUser } from "@/lib/queries/user";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req: Request,
  { params }: { params: { slug: string; _id: string } }
) {
    try {
        const { _id } = params;

        await connectDB();
        const product = await Product.findById(_id).lean().exec();

        if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

        return NextResponse.json({ product }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

}

export async function PUT(req: Request,
  { params }: { params: { slug: string; _id: string } }
) {
    try {
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { _id } = params;
        const { name, description, price, salePrice, categories, images } = await req.json();

        const product = await Product.findByIdAndUpdate({ _id }, {
            name: name,
            description: description,
            images: images,
            price: price,
            salePrice: salePrice,
            categories: categories
        }, { new: true });

        if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

}