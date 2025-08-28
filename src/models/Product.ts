import { model, models, Schema } from "mongoose";

const VariantSchema = new Schema({
    type: { type: String, required: true },
    value: { type: String, required: true },
    price: { type: Number, default: 0 },
})

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: null },
    images: { type: [Object], default: [] },
    price: { type: Number, default: 0, required: true },
    salePrice: { type: Number, default: 0 },
    store: { type: Schema.Types.ObjectId, ref: "Store", required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    variant:[{type:[VariantSchema],default:[]}]
});

export default models?.Product || model("Product", ProductSchema)