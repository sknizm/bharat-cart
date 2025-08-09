import { model, models, Schema } from "mongoose";

const MembershipSchema = new Schema({
    type: { type: String, required: true, default: "FREE" },
    createdDate: { type: Date, default: Date.now },
    expiryDate: { type: Date, default: null }
})

export default models?.Membership || model("Membership", MembershipSchema)