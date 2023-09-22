import { model, Schema } from "mongoose";
import { connectToDB } from "@/lib/connect";
const mongoose = await connectToDB();

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || model("User", UserSchema);
