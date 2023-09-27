import { connectToDB } from "@/lib/connect";
const mongoose = await connectToDB();
import { model, Schema } from "mongoose";

const RoomSchema = new Schema(
  {
    roomname: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    roomnumber: { type: Number, required: true },
    guests: [{ type: Schema.Types.ObjectId, ref: "Guest" }],
  },
  {
    timestamps: true,
  }
);

RoomSchema.methods.populateGuests = function () {
  return this.populate("guests");
};

export default mongoose.models.Room || model("Room", RoomSchema);
