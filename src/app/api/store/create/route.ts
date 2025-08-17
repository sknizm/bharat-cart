import { checkSlugIfExist, createStore } from "@/lib/queries/store";
import { getCurrentUser } from "@/lib/queries/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        const { name, slug } = await req.json();

        if (!name || !slug) {
            return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
        }

        if (await checkSlugIfExist(slug)) {
            return NextResponse.json({ error: "Slug Already Taken" }, { status: 409 })
        }
        const store = await createStore(name, slug, user._id)
        
        console.log("HELLO", store)
        if (!store) {
            return NextResponse.json({ error: "Failed to create Store" }, { status: 401 })
        }
        return NextResponse.json({ message: "Store created Successfully" }, { status: 201 })


    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internl Server Error" }, { status: 500 })
    }
}