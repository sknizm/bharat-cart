import Session from "@/models/Session";
import { connectDB } from "../mongoose";
import { v4 as uuidv4 } from 'uuid';
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "../types";

export async function createSession(userId: string) {

    const sessionToken = uuidv4();
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    await connectDB();
    await Session.create({
        sessionToken,
        userId,
        expires

    });

    const cookieStore = cookies();
    (await cookieStore).set(SESSION_COOKIE_NAME, sessionToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        expires,
    })

}

export async function deleteAllSession(userId: string) {
    await connectDB();
    await Session.deleteMany({
        userId
    })
}

export async function deleteSession() {
    const cookieStore = cookies();
    const sessionToken = (await cookieStore).get(SESSION_COOKIE_NAME)?.value;

    if (sessionToken) {

        await connectDB();
        await Session.deleteMany({
            sessionToken: sessionToken
        });
    }

    // Remove session cookie
    (await cookieStore).delete(SESSION_COOKIE_NAME);
}