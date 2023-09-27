import { connectToDB } from "@/lib/connect";
const mongoose = await connectToDB()
import { model, Schema } from "mongoose";

const GuestSchema = new Schema(
  {
    fullName: { type: String, required: true },
    gender: { type: String, required: true },
    branch: { type: String, required: true },
    studentOrAlumni: { type: String, required: true },
    highestLevelOfEducation: { type: String, required: true },
    lastInstitutionAttended: { type: String, required: true },
    currentlyEmployed: { type: String, required: false },
    profession: { type: String, required: false },
    currentPlaceOfEmployment: { type: String, required: false },
    dob: { type: String, required: true },
    phonenumber: { type: String, required: true },
    emailaddress: { type: String, required: false }
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Guest || model("Guest", GuestSchema);
