import { model, models, Schema } from "mongoose";

const SessionSchema = new Schema({
    sessionToken:{type:String,unique:true,require:true},
    user:{type:Schema.Types.ObjectId, ref:"User",required:true},
    expiryDate:{type:Date}
})

export default models.Session || model("Session", SessionSchema)