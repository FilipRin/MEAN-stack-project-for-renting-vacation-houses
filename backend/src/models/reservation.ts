import mongoose, { Schema } from "mongoose";
import UserM from '../models/user';
import VikM from '../models/vikendica';

let user= new UserM;
let u=UserM.schema

const resSchema= new mongoose.Schema(
    {
        tourist:String,
        dateStart:Date,
        dateEnd:Date,
        vikendica:String,
        price:String,
        requests:String,
        active:Boolean,
        place:String
    }
);

export default mongoose.model('ResModel',resSchema,'reservations');