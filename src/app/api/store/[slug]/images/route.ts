import { connectDB } from "@/lib/mongoose";
import { getStoreDeatilsBySlug } from "@/lib/queries/store";
import { getCurrentUser } from "@/lib/queries/user";
import Image from "@/models/Image";
import { NextResponse } from "next/server";
import path from "path";
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';




const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads');

async function ensureUploadDir() {
    try {
        await fs.access(UPLOAD_DIR);
    } catch {
        await fs.mkdir(UPLOAD_DIR, { recursive: true });
        console.log(`Created upload directory at ${UPLOAD_DIR}`);
    }
}


export async function GET(
    req: Request,
    context: { params: Promise<{ slug: string }> }
) {
    const { slug } = await context.params;

    const store = await getStoreDeatilsBySlug(slug);
    if (!store) return NextResponse.json({ error: 'Store not found' }, { status: 404 });

    await connectDB();
    const imagesDocs = await Image.find({ store: store._id }, { url: 1 }).lean();

    return NextResponse.json(imagesDocs);
}


export async function POST(req: Request, context: { params: Promise<{ slug: string }> }) {
    const { slug } = await context.params;
    try {
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const formData = await req.formData();
        const file = formData.get('file') as File;
        if (!file) return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
        await ensureUploadDir();

        const ext = path.extname(file.name);
        const filename = `${uuidv4()}${ext}`;
        const buffer = Buffer.from(await file.arrayBuffer());
        const filePath = path.join(UPLOAD_DIR, filename);
        await fs.writeFile(filePath, buffer);
        const imageUrl = `/uploads/${filename}`;

        const store = await getStoreDeatilsBySlug(slug);
        if (!store) return NextResponse.json({ error: "Store not found" }, { status: 404 })

        await connectDB();
        const image = await Image.create({ url: imageUrl, store: store._id });
        if (image) {
            return NextResponse.json({ message: "Image uploaded successfully" }, { status: 201 })
        } else {
            return NextResponse.json({ error: "Failed to upload Image" }, { status: 401 })
        }


    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {

        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id } = await req.json();
        if (!id) return NextResponse.json({ error: "Image id is reuired" }, { status: 400 });

        await connectDB();

        const image = await Image.findById( id);
        if (!image) return NextResponse.json({ error: "Image not found" }, { status: 404 });

        const filePath = path.join(process.cwd(), 'public', image.url);

        try {
            await fs.access(filePath);
            await fs.unlink(filePath);
        } catch (error) {
            console.error(error);
            return NextResponse.json({ error: "Failed to delete" }, { status: 401 });
        }

        await Image.findByIdAndDelete(id);

        return NextResponse.json({ success: true })



    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });

    }
}