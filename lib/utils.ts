import { t } from "./translations";

export { cn } from "cn";

export const getStatusLabel = (status: Status | "all") => {
  switch (status) {
    case "pending":
      return t.reservation.status.pending;
    case "confirmed":
      return t.reservation.status.confirmed;
    case "cancelled":
      return t.reservation.status.cancelled;
    case "all":
      return t.reservation.status.all;
    default:
      return t.reservation.status.na;
  }
};
