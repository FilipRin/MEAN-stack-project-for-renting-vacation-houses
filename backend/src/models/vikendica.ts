import mongoose from "mongoose";

const vikSchema = new mongoose.Schema({
    name:String,
    place:String,
    services:String,
    prices:Array,
    phone:String,
    coordinates:String,
    pictures:String,
    landlord:String
})

export default mongoose.model('vikModel',vikSchema,'vikendice');