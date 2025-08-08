import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { CheckIfUserAlreadyExist, CreateUser } from "@/lib/queries/user";
import { createSession } from "@/lib/queries/session";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    // Check if user already exists
    const existingUser = await CheckIfUserAlreadyExist(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 } 
      );
    }

    // Create the new user
    const newUser = await CreateUser(email, password);

    // Check if the user was successfully created
    if (!newUser) {
      // This case handles potential server-side failures during user creation
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }
    await createSession(newUser._id);
    // Success response
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("User creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}