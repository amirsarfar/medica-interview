import { ReservationsStoreProvider } from "@/stores/providers/reservations-provider";
import { Reservations } from "./reservations";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "سامانه رزرو خدمات - رزرو ها",
};

export default function ReservationsPage() {
  return (
    <ReservationsStoreProvider>
      <Reservations />
    </ReservationsStoreProvider>
  );
}
