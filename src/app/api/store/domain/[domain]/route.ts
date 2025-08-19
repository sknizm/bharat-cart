import { connectDB } from "@/lib/mongoose";
import Store from "@/models/Store"
import { NextResponse } from "next/server";

export async function GET(req:Request,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context:any
) {
    try{
    const {domain} = context.params
    
    await connectDB()
    const store = await Store.findOne({domain:domain});
    console.log("STORE", store)

    return NextResponse.json({store}); 

    }catch(error){
        console.error(error);
    }
    
}