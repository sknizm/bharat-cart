import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL as string

if(!MONGODB_URL){
  throw new Error("Please add your Mongo URI to .env.local")
}

let isConnected = false;

export async function connectDB(){
    if(isConnected) return
    try{
        await mongoose.connect(MONGODB_URL);
        isConnected = true;
        console.log("MongoDB Connected")
    }catch(err){
        console.log("MongoDB connection Error", err);
    }
}