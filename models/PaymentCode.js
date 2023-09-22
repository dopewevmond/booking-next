import { model, Schema } from "mongoose";
import { connectToDB } from "@/lib/connect";
const mongoose = await connectToDB()

const PaymentCodeSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    amountPaid: { type: String, required: true },
    hasBeenRedeemed: { type: Boolean, default: false},
    nameofpayer: { type: String, required: true},
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.PaymentCode || model("PaymentCode", PaymentCodeSchema);
