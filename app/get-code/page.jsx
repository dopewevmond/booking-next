import AddRoomForm from "@/components/AddRoom";
import React from "react";
import { cookies } from "next/headers";
import { validateJWT } from "@/lib/auth";
import { redirect } from "next/navigation";
import GetCodeForm from "@/components/GetCodeForm";

export default async function GetCode() {
  const cookieStore = cookies();
  const authToken = cookieStore.get(process.env.COOKIE_KEY);
  if (!authToken || !authToken.value) redirect('/login')

  const { isadmin } = await validateJWT(authToken.value);
  if (!isadmin) redirect('/login')

  return <GetCodeForm />;
}
