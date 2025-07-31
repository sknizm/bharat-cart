import { Schema } from "mongoose";

const CategorySchema = new Schema({
    name:{type:String,required:true},
    store:{type:Schema.Types.ObjectId,ref:"Category",required:true}
})