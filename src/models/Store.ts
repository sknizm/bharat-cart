import { model, models, Schema } from "mongoose";

const StoreSchema = new Schema({
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    domain: { type: String, unique: true, sparse: true, default: null },
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

export default models?.Store || model("Store", StoreSchema)