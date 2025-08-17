import { model, models, Schema } from "mongoose";

const StoreSchema = new Schema({
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, default: null },
    domain: { type: String, default: null },
    membership: { type: Schema.Types.ObjectId, ref: "Membership", default: null },
    banner: { type: [Object], default: [] },
    logo: { type: String, default: null },
    favicon: { type: String, default: null },
    whatsapp: { type: String, default: null },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    images: [{ type: Schema.Types.ObjectId, ref: "Image" }],

})

StoreSchema.index(
    { domain: 1 },
    { unique: true, partialFilterExpression: { domain: { $type: "string" } } }
);

export default models?.Store || model("Store", StoreSchema)