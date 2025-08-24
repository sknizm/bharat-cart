import { getStoreDeatilsBySlug } from "@/lib/queries/store";
import { getCurrentUser } from "@/lib/queries/user";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET(req: Request,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: any
) {
    try {
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 409 });

        const { slug } = context.params;
        const store = await getStoreDeatilsBySlug(slug);
        if (!store) return NextResponse.json({ error: "Store not found" }, { status: 404 });

        const orders = await Order.find({ store: store._id }).sort({createdAt:-1}).lean().exec();

        return NextResponse.json({ orders })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

}