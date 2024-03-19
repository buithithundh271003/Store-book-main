import mongoose, { Schema } from "mongoose";
const userSchema = new Schema(
    {
        fullname: { type: String, minLength: 3, maxLength: 55, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        confirmPassword: { type: String },
        role: { type: String, enum: ["admin", "member"], default: "member" },
        cartId: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
        bills: [{ billId: { type: mongoose.Schema.Types.ObjectId, ref: "Bill" } }],
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("User", userSchema);