import { validateJWT } from "@/lib/auth";
import { roomValidationSchema } from "@/lib/validationSchema";
import Room from "@/models/Room";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const cookieStore = cookies()
    const authcookie = cookieStore.get(process.env.COOKIE_KEY)
    if (!authcookie || !authcookie.value) throw new Error('Unable to get access token from cookie')
    const { isadmin } = await validateJWT(authcookie.value);
    if (!isadmin) throw new Error('Does not have permissions to add a room')

    const { roomname, roomnumber, gender } = await req.json();
    await roomValidationSchema.validate({ roomname, roomnumber, gender })
    const room = await Room.create({ roomname, roomnumber, gender })
    
    return Response.json({ message: "success", ...room }, { status: 201 });

  } catch (err) {
    console.log(err)
      return Response.json({
        message: err.message ?? "Adding room failed",
      }, { status: 401 });
  }
}