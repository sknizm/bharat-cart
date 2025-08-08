import { model, models, Schema } from "mongoose";

const SessionSchema = new Schema({
    sessionToken:{type:String,unique:true,require:true},
    userId:{type:String,require:true},
    expiryDate:{type:Date}
})

export default models?.Session || model("Session", SessionSchema)