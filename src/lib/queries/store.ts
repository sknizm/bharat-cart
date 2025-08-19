import Store from "@/models/Store";
import { connectDB } from "../mongoose";
import Membership from "@/models/Membership";


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
        const store = await Store.create({ name: name, slug: slug, owner: owner, membership: membership._id });

        return store
    } catch (error) {
        console.log(error)
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
    const storeDoc = await Store.findOne({ slug }, {
        slug: 1, name: 1, description: 1
        , domain: 1, logo: 1, favicon: 1
    });
    if (!storeDoc) return null;

    const store = {
        _id: storeDoc._id.toString(),
        slug: storeDoc.slug,
        name: storeDoc.name,
        domain: storeDoc.domain,
        logo: storeDoc.logo,
        description: storeDoc.description,
        favicon: storeDoc.favicon
    }
    return store
}

export async function getStoreByDomain(domain:string) {
    await connectDB();

    const store = await Store.findOne({domain});
    return store
    
}