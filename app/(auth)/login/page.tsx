import { getLoginStatus } from "@/lib/simple-auth";
import { LoginForm } from "./login-form";
import { redirect } from "next/navigation";

export default async function Login() {
  const isLoggedIn = await getLoginStatus();

  if (isLoggedIn) {
    redirect("/dashboard");
  }

  return <LoginForm />;
}
