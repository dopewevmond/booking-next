import React from "react";
import { cookies } from "next/headers";
import { validateJWT } from "@/lib/auth";
import GetCodeForm from "@/components/GetCodeForm";
import AuthwallCard from "@/components/AuthwallCard";

export default async function GetCode() {
  const cookieStore = cookies();
  const authToken = cookieStore.get(process.env.COOKIE_KEY);
  if (!authToken || !authToken.value) return <AuthwallCard />

  const { isadmin } = await validateJWT(authToken.value);
  if (!isadmin) return <AuthwallCard />

  return <GetCodeForm />;
}
