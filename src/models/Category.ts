import { model, models, Schema } from "mongoose";

const CategorySchema = new Schema({
    name:{type:String,required:true},
    store:{type:Schema.Types.ObjectId,ref:"Store",required:true}
})

export default models?.Category || model("Category", CategorySchema)