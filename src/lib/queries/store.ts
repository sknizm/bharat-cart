import Store from "@/models/Store";
import { connectDB } from "../mongoose";
import Membership from "@/models/Membership";
import { StoreType } from "../types";


export async function createStore(name: string, slug: string, owner: string) {

    try {

        await connectDB();
        const expiryDate = new Date;
        expiryDate.setDate(expiryDate.getDate() + 3);

        const membership = await Membership.create({
            type: "FREE",
            createdDate: new Date,
            expiryDate

        })
        const store = await Store.create({ name, slug, owner, membership: membership._id });

        return store
    } catch (error) {
        return null
    }
}

export async function checkSlugIfExist(slug: string) {
    await connectDB();
    const existingSlug = await Store.findOne({ slug: slug });
    if (existingSlug) {
        return true

    }
    return false
}

export async function isStoreOwner(userId: string, storeSlug: string) {
    await connectDB();
    return await Store.exists({ slug: storeSlug, owner: userId });
}

export async function doesStoreExist(slug: string) {
    await connectDB();
    return await Store.exists({ slug: slug });
}

export async function getStoreDeatilsBySlug(slug: string) {
    await connectDB();
    const storeDoc = await Store.findOne({ slug });
    if (!storeDoc) return null;

    const store = storeDoc.toObject();
    return store
}