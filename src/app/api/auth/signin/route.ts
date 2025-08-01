import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await connectDB();
        const { email, password } = await req.json();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }

        if (user.password !== password) {
            return NextResponse.json({ error: "Password is incorrect" }, { status: 400 })
        }

        return NextResponse.json({ error: "Login Successful" }, { status: 201 })
    }
    catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}