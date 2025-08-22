import { corsResponse } from "@/lib/cors";
import { connectDB } from "@/lib/mongoose";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try{
        const body = await req.json();
        console.log("OBODY", body)
        await connectDB();
        const order = await Order.create(body);

        if(!order) return corsResponse(NextResponse.json({error:"Failed to create order"},{status:401}));

        return corsResponse(NextResponse.json({success:true},{status:201}));

    }catch(error){
        console.error(error);
        return corsResponse(NextResponse.json({error:"Internal server error"},{status:500}));
    }
    
}