import Customer from "@/models/Customer";
import { connectDB } from "../mongoose";

export async function createCustomer(email: string, password: string, store: string) {
    await connectDB();
    const customer = await Customer.create({ email, password, store });
    return customer
}

export async function checkIfCustomerAlreadyExist(email:string){
    await connectDB();
    const customer = await Customer.findOne({email});
    return customer ? true:false
}