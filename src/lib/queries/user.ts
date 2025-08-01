import User from "@/models/User";
import { connectDB } from "../mongoose";

export async function CheckIfUserAlreadyExist(email:string){
    await connectDB();
    const user = await User.findOne({email})
    return user ? true:false
}

export async function CreateUser(email:string, password:string){
    await connectDB();
    const user = await User.create({email,password});
    return user
}