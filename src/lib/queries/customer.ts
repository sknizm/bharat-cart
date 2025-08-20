import Customer from "@/models/Customer";
import { connectDB } from "../mongoose";
import { cookies } from "next/headers";
import { CUSTOMER_SESSION_COOKIE_NAME, CustomerType } from "../types";
import CustomerSession from "@/models/CustomerSession";
import { v4 as uuidv4 } from 'uuid';

export async function createCustomer(email: string, password: string, store: string) {
    await connectDB();
    const customer = await Customer.create({ email, password, store });
    return customer
}

export async function checkIfCustomerAlreadyExist(email: string) {
    await connectDB();
    const customer = await Customer.findOne({ email });
    return customer ? true : false
}

export async function getCurrentCustomer(): Promise<CustomerType | null> {
    const cookieStore = cookies();
    const sessionToken = (await cookieStore).get(CUSTOMER_SESSION_COOKIE_NAME)?.value;

    if (!sessionToken) return null

    await connectDB();

    const session = await CustomerSession.findOne({ sessionToken }).exec();

    if (!session || !session.customerId) return null

    const customer = await Customer.findById(
        session.customerId,
        { _id: 1, email: 1 }
    )
        .lean<CustomerType>()
        .exec();

    if (!customer) return null;

    return {
        _id: customer._id.toString(),
        email: customer.email,
    } as CustomerType;

}



export async function createCustomerSession(customerId: string) {

    const sessionToken = uuidv4();
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    await connectDB();
    await CustomerSession.create({
        sessionToken,
        customerId,
        expires

    });

    const cookieStore = cookies();
    (await cookieStore).set(CUSTOMER_SESSION_COOKIE_NAME, sessionToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        expires,
    })

}

export async function deleteAllCustomerSession(customerId: string) {
    await connectDB();
    await CustomerSession.deleteMany({
        customerId
    })
}

export async function deleteCustomerSession() {
    const cookieStore = cookies();
    const sessionToken = (await cookieStore).get(CUSTOMER_SESSION_COOKIE_NAME)?.value;

    if (sessionToken) {

        await connectDB();
        await CustomerSession.deleteMany({
            sessionToken: sessionToken
        });
    }

    // Remove session cookie
    (await cookieStore).delete(CUSTOMER_SESSION_COOKIE_NAME);
}

export async function handleCustomerLogout() {

  window.history.replaceState(null, '', '/');
}