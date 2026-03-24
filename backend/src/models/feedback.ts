import mongoose from "mongoose";

const feedbScema= new mongoose.Schema(
    { 
        comment:String,
        rating:Number,
        vikendica:String,
        place:String,
        dateStart:Date,
        dateEnd:Date,
        tourist:String
    }
);

export default mongoose.model('FeedModel',feedbScema,'feedbacks')