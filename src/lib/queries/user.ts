
import User from "@/models/User";
import { connectDB } from "../mongoose";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, type UserType } from "../types";
import Session from "@/models/Session";

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


export async function getCurrentUser(): Promise<UserType | null> {
    const cookieStore = cookies();
    const sessionToken = (await cookieStore).get(SESSION_COOKIE_NAME)?.value;

    if(!sessionToken) return null

    await connectDB();

    const session = await Session.findOne({sessionToken}).exec();

    if(!session || !session.userId) return null

    const user = await User.findById(session.userId,{ _id:1, email:1 }).lean().exec();
    
    return (user as unknown as UserType) || null;

}

