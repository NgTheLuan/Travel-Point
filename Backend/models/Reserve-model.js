import mongoose from "mongoose";

export const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
    numberofguest: { type: Number },   
    guestName: { type: String },
    smoking: { type: Boolean },
    date: { type: Date },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

const Bill = mongoose.model("Bill", PlaceSchema);
export default Bill;