type Status = "pending" | "confirmed" | "cancelled";

type Reservation = {
  id: string;
  customer: string;
  phone: string;
  type: string;
  date: string;
  status: Status;
};
