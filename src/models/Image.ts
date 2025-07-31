import { model, models, Schema } from "mongoose";

const ImageSchema = new Schema({
    url:{type:String,required:true},
    store:{type:Schema.Types.ObjectId,ref:"Store",required:true}
})

export default models.Image || model("Image", ImageSchema)