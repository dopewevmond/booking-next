import { checkPasswordsMatch, createJWT, hashPassword } from "@/lib/auth";
import User from "@/models/User";

export async function POST(req) {
  const { username, password } = await req.json();

  try {
    const personWithSameUsername = await User.findOne({ username });
    if (personWithSameUsername != null) {
      throw new Error("User with same username already exists");
    }
    await User.create({ username, passwordHash: await hashPassword(password) });

    return Response.json({ message: "success", username }, { status: 201 });
  } catch (err) {
    console.log(err);
    return Response.json(
      {
        message: err.message ?? 'Signup failed',
      },
      { status: 401 }
    );
  }
}
