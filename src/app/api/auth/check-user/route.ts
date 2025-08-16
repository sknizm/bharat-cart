import { getCurrentUser } from "@/lib/queries/user";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
    try{
        const user = await getCurrentUser()
        const isUser = !!user;
        return NextResponse.json({isUser});
    }catch(error){
        console.error(error);
        return NextResponse.json({errro:"Internal server error"},{status:500})
    }
    
}