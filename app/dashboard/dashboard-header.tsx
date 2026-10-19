"use client";

import { Button } from "@/components/ui/button";
import { setLoginStatus } from "@/lib/simple-auth";
import { t } from "@/lib/translations";
import { redirect } from "next/navigation";

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div>
        <h1 className="text-2xl font-bold">{t.dashboard.title}</h1>
      </div>
      <Button
        variant="destructive"
        onClick={() => {
          setLoginStatus(false);
          redirect("/");
        }}
      >
        {t.dashboard.logout}
      </Button>
    </div>
  );
}
