import { cookies } from "next/headers";

export async function POST(req) {
  try {
    cookies().delete(process.env.COOKIE_KEY);
    return Response.json({ message: "success" });
  } catch (err) {
    console.log(err);
    return Response.json(
      {
        message: "Logout failed",
      },
      { status: 500 }
    );
  }
}
