import { model, models, Schema } from "mongoose";


const CustomerSchema = new Schema({
    email :{type:String, required:true, unique:true},
    password :{type:String, required:true},
    sessions:[{type:Schema.Types.ObjectId, ref:"CustomerSession"}],
    store:{type:Schema.Types.ObjectId, ref:"Store", required:true},
    orders:[{type:Schema.Types.ObjectId, ref:"Order"}],
    payments:[{type:Schema.Types.ObjectId, ref:"Payment"}],
   
     // 🏠 Address fields
    line1: { type: String, default: null },
    line2: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    postalCode: { type: String, default: null },
    country: { type: String, default: null },

    // 👤 Profile info
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    phone: { type: String, default: null },
});


export default models?.Customer || model("Customer",CustomerSchema)