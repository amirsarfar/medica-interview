import { getLoginStatus } from "@/lib/simple-auth";
import { LoginForm } from "./login-form";
import { redirect } from "next/navigation";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "سامانه رزرو خدمات - ورود",
};

export default async function Login() {
  const isLoggedIn = await getLoginStatus();

  if (isLoggedIn) {
    redirect("/dashboard");
  }

  return <LoginForm />;
}
