import { corsResponse } from "@/lib/cors";
import { connectDB } from "@/lib/mongoose";
import Category from "@/models/Category";
import Product from "@/models/Product";
import Store from "@/models/Store";
import { NextResponse } from "next/server";

export async function OPTIONS() {
  // Respond to preflight with empty 204 but include CORS headers
  return corsResponse(new NextResponse(null, { status: 204 }));
}


export async function GET(
    req: Request,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: any
) {
    try {
        await connectDB(); // connect to MongoDB

        const { slug } = context.params;

        const store = await Store.findOne({slug});

        if (!store) {
            return corsResponse(NextResponse.json(
                { error: "Store not found", store: false },
                { status: 404 }
            ));
        }
        const products = await Product.find({ store: store._id })
            .select("name price images categories salePrice")
            .lean().exec();

        const categories = await Category.find({ store: store._id })
            .select("_id name").lean().exec();

        
        return corsResponse(NextResponse.json(
            {
                success: true,
                store,
                products,
                categories
            },
            { status: 200 }
        ))
    } catch (error) {
        console.error("Error fetching store:", error);
        return corsResponse(NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        ));
    }
}


export async function PUT(req: Request) {
    try {
        const body = await req.json();
        await connectDB();

        const result = await Store.updateOne({
            _id: body._id
        }, {
            $set: body
        });

        if (result.matchedCount === 0) return NextResponse.json({ error: "Store not found" }, { status: 404 });

        return NextResponse.json({ success: true }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

}