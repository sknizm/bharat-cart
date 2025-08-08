import { model, models, Schema } from "mongoose";

const ProductSchema = new Schema({
    name:{type:String,required:true},
    description:{type:String,default:null},
    images:{type:[Object],default:[]},
    store:{type:Schema.Types.ObjectId,ref:"Store",required:true},
    categories:[{type:Schema.Types.ObjectId,ref:"Category"}]
});

export default models?.Product || model("Product",ProductSchema)