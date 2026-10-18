import { DashboardHeader } from "./dashboard-header";

export default function DashboardLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <DashboardHeader />
      {children}
    </>
  );
}
