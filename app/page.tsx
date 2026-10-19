import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getLoginStatus } from "@/lib/simple-auth";

export default async function Home() {
  const isLoggedIn = await getLoginStatus();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {isLoggedIn ? (
          <Link href="/dashboard">
            <Button>داشبورد</Button>
          </Link>
        ) : (
          <Link href="/login">
            <Button>ورود</Button>
          </Link>
        )}
      </div>
    </main>
  );
}
