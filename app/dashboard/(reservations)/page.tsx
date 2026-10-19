import { ReservationsStoreProvider } from "@/stores/providers/reservations-provider";
import { Reservations } from "./reservations";

export default function ReservationsPage() {
  return (
    <ReservationsStoreProvider>
      <Reservations />
    </ReservationsStoreProvider>
  );
}
