import { connectDB } from "@/lib/mongoose";
import { getStoreDeatilsBySlug } from "@/lib/queries/store";
import { getCurrentUser } from "@/lib/queries/user";
import Image from "@/models/Image";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { Client } from "basic-ftp";
import { Readable } from "stream"; // ✅ Add this import

function bufferToStream(buffer: Buffer) {
  return new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
}


async function connectFTP() {
  const client = new Client();
  await client.access({
    host: process.env.FTP_HOST!,
    user: process.env.FTP_USER!,
    password: process.env.FTP_PASSWORD!,
    secure: false, // Hostinger shared hosting usually doesn’t use FTPS
  });
  return client;
}

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  const store = await getStoreDeatilsBySlug(slug);
  if (!store)
    return NextResponse.json({ error: "Store not found" }, { status: 404 });

  await connectDB();
  const imagesDocs = await Image.find({ store: store._id }, { url: 1 }).lean();

  return NextResponse.json(imagesDocs);
}

export async function POST(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  try {
    const user = await getCurrentUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file)
      return NextResponse.json({ error: "No image uploaded" }, { status: 400 });

    const ext = file.name.split(".").pop();
    const filename = `${uuidv4()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const client = await connectFTP();
    const uploadPath = `${process.env.FTP_ROOT}/${filename}`;
    console.log("Uploading to:", uploadPath);

    await client.uploadFrom(bufferToStream(buffer), uploadPath);
    client.close();

    const imageUrl = `${process.env.PUBLIC_IMAGE_URL}/${filename}`;

    const store = await getStoreDeatilsBySlug(slug);
    if (!store)
      return NextResponse.json({ error: "Store not found" }, { status: 404 });

    await connectDB();
    const image = await Image.create({ url: imageUrl, store: store._id });

    return NextResponse.json(
      { message: "Image uploaded successfully", url: imageUrl },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await req.json();
    if (!id)
      return NextResponse.json({ error: "Image id is required" }, { status: 400 });

    await connectDB();
    const image = await Image.findById(id);
    if (!image)
      return NextResponse.json({ error: "Image not found" }, { status: 404 });

    const key = image.url.split("/").pop(); // filename
    const client = await connectFTP();
    const deletePath = `${process.env.FTP_ROOT}/${key}`;

    try {
      await client.remove(deletePath);
    } catch (err) {
      console.error(err);
      client.close();
      return NextResponse.json({ error: "Failed to delete" }, { status: 401 });
    }

    client.close();
    await Image.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
