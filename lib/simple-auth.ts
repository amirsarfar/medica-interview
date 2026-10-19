"use server";

import { cookies } from "next/headers";

export async function setLoginStatus(isLoggedIn: boolean) {
  const cookieStore = await cookies();
  cookieStore.set("isLoggedIn", isLoggedIn ? "true" : "false", {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });
}

export async function getLoginStatus(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("isLoggedIn")?.value === "true";
}
