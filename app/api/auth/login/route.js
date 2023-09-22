import { checkPasswordsMatch, createJWT } from "@/lib/auth";
import User from "@/models/User";
import { cookies } from "next/headers";

export async function POST(req) {
  const { username, password } = await req.json();

  try {
    const { passwordHash, isAdmin: isadmin } = await User.findOne({ username });
    const isPasswordCorrect = await checkPasswordsMatch(password, passwordHash);
    
    console.log('checkpoint 1')
    if (!isPasswordCorrect) {
      throw new Error('Passwords don\'t match');
    }

    console.log('checkpoint 2')
    
    const jwt = await createJWT({ username, isadmin });
    console.log({ jwt })
    console.log('checkpoint 3')
  
    cookies().set({
      name: String(process.env.COOKIE_KEY),
      value: jwt,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: Date.now() + Number(3600) * 24 * 1000
    });

    return Response.json({ message: "success" });

  } catch (err) {
    console.log(err)
      return Response.json({
        message: "Login failed, please check credentials and try again",
      }, { status: 401 });
  }
}