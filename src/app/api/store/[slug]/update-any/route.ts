import { getCurrentUser } from "@/lib/queries/user";
import Store from "@/models/Store";
import { NextResponse } from "next/server";

export async function PUT(req: Request,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: any
) {
    try {
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { slug } = context.params;
        const body = await req.json();

        const result = await Store.updateOne({ slug: slug }, {
            $set: body
        });

        if (result.matchedCount === 0) return NextResponse.json({ error: "Store not found" }, { status: 404 });

        return NextResponse.json({ success: true }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

}