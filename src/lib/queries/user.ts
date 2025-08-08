
import User from "@/models/User";
import { connectDB } from "../mongoose";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "../types";
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


export async function getCurrentUser() {
    const cookieStore = cookies();
    const sessionToken = (await cookieStore).get(SESSION_COOKIE_NAME)?.value;

    if(!sessionToken) return

    await connectDB();

    const session = await Session.findOne({sessionToken}).exec();

    if(!session || !session.userId) return null

    const user = await User.findById(session.userId).exec();

    return user || null

}

