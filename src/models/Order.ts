import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema({
    customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    store: { type: Schema.Types.ObjectId, ref: "Store", required: true },
    amount: { type: Number, default: 0 },
    items: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    details:{type:Object,default:null},

    status: {
        type: String,
        enum: ["processing", "pending", "confirmed", "shipped", "delivered", "cancelled"],
        default: "processing"
    },

    paymentStatus: {
        type: String,
        enum: ["unpaid", "paid", "failed", "refunded"],
        default: "unpaid"
    }
});


export default models?.Order || model("Order",OrderSchema)