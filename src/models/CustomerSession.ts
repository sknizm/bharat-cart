import { model, models, Schema } from "mongoose";

const CustomerSessionSchema = new Schema({
    sessionToken:{type:String,unique:true,require:true},
    customerId:{type:String,require:true},
    expiryDate:{type:Date}
})

export default models?.CustomerSession || model("CustomerSession", CustomerSessionSchema)