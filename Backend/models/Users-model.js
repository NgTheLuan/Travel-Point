import mongoose from "mongoose";

export const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 5 },
    image: { type: Boolean },
    bill: [{ type: mongoose.Types.ObjectId, required: true, ref: "Bill" }]
});

const User = mongoose.model("User", UserSchema);
export default User;