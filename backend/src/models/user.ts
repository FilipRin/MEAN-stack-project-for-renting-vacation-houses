import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        firstname: String,
        lastname: String,
        type:String,
        gender:String,
        address:String,
        phone:String,
        email:String,
        pfp:String,
        credit:String,
        ban:Boolean,
        active:Boolean,
        favourites: Array
    },{
      versionKey:false  
    }
);
export default mongoose.model('UserModel',userSchema,'users');