import { models, model, Schema } from "mongoose";

const UserSchema = new Schema({
    email :{type:String, required:true, unique:true},
    password :{type:String, required:true},
    sessions:[{type:Schema.Types.ObjectId, ref:"Session"}],
    stores :[{type:Schema.Types.ObjectId, ref:"Store"}],

});

export default models.User || model("User", UserSchema)
