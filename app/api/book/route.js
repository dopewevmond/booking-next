import { bookValidationSchema } from "@/lib/validationSchema";
import Guest from "@/models/Guest";
import PaymentCode from "@/models/PaymentCode";
import Room from "@/models/Room";

export async function POST(req) {
  try {
    const {
      fullname,
      gender,
      branch,
      code,
      studentOrAlumni,
      highestlevelofeducation,
      institution,
      currentlyemployed,
      jobtitle,
      currentplaceofemployment,
      dob,
      phonenumber,
      emailaddress,
    } = await req.json();

    if (!code) throw new Error("Code is needed to book a room");

    const codeDoc = await PaymentCode.findOne({ code });
    if (codeDoc === null || codeDoc.hasBeenRedeemed)
      throw new Error("Code is invalid or has already been used");

    await bookValidationSchema.validate({
      fullname,
      gender,
      branch,
      studentOrAlumni,
      highestlevelofeducation,
      institution,
      currentlyemployed,
      jobtitle,
      currentplaceofemployment,
      code,
      dob,
      phonenumber,
      emailaddress,
    });

    const roomArray = await Room.find({
      gender,
      $expr: { $lt: [{ $size: "$guests" }, "$roomnumber"] },
    })
      .sort({ createdAt: 1 })
      .limit(1);

    const room = roomArray[0];

    if (room == null) throw new Error("No rooms available");

    const guest = await Guest.create({
      fullName: fullname,
      gender,
      branch,
      studentOrAlumni,
      highestLevelOfEducation: highestlevelofeducation,
      lastInstitutionAttended: institution,
      currentlyEmployed: currentlyemployed,
      profession: jobtitle,
      currentPlaceOfEmployment: currentplaceofemployment,
      dob,
      phonenumber,
      emailaddress,
    });

    room.guests.push(guest);
    await room.save();
    codeDoc.hasBeenRedeemed = true;
    await codeDoc.save();

    const res = { name: guest.fullName, roomName: room.roomname };
    return Response.json({ message: "success", ...res }, { status: 201 });
  } catch (err) {
    console.log(err);
    return Response.json(
      {
        message: err.message ?? "Booking room failed",
      },
      { status: 401 }
    );
  }
}
