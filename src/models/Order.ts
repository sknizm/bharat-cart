import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema({
    customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    customerEmail:{type:String,default:null},
    type:{type:String,enum:["delivery","pickup","fast-delivery"]},
    store: { type: Schema.Types.ObjectId, ref: "Store", required: true },
    amount: { type: Number, default: 0 },
    items: {type:[Object],default:null},
    details:{type:Object,default:null},

    razorPayOrderId:{type:String,default:null},
    razorPayPaymentId:{type:String,default:null},

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
},{timestamps:true});


export default models?.Order || model("Order",OrderSchema)