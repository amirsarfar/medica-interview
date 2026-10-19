import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toast";
import { Suspense } from "react";

const vazirmatn = Vazirmatn({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "سامانه رزرو خدمات",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={cn("h-full", "antialiased", vazirmatn.variable, "font-sans")}
    >
      <body className="min-h-dvh flex flex-col">
        <Suspense fallback={"Loading..."}>{children}</Suspense>
        <Toaster />
      </body>
    </html>
  );
}
