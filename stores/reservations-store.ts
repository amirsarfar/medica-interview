import { ReservationValues } from "@/lib/validations/reservation";
import { createStore } from "zustand/vanilla";

export type ReservationsState = { reservations: Reservation[] };

export type ReservationsActions = {
  create: (r: ReservationValues) => Reservation;
  update: (id: string, r: ReservationValues) => Reservation;
  delete: (id: string) => void;
};

export type ReservationsStore = ReservationsState & ReservationsActions;

export const defaultInitState: ReservationsState = {
  reservations: [
    {
      id: "1",
      customer: "علی رضایی",
      phone: "09123456789",
      type: "خدمت ۱",
      date: "2027-06-01T16:14:05.428Z",
      status: "confirmed",
    },
    {
      id: "2",
      customer: "فاطمه محمدی",
      phone: "09123456788",
      type: "خدمت ۲",
      date: "2027-06-02T16:14:05.428Z",
      status: "pending",
    },
    {
      id: "3",
      customer: "محمدرضا علیزاده",
      phone: "09123456787",
      type: "خدمت ۳",
      date: "2027-06-03T16:14:05.428Z",
      status: "cancelled",
    },
  ],
};

export const createReservationsStore = (
  initState: ReservationsState = defaultInitState,
) => {
  return createStore<ReservationsStore>()((set) => ({
    ...initState,
    create: (reservation: ReservationValues) => {
      const newReservation: Reservation = {
        ...reservation,
        id: Math.random().toString(36).substring(2, 9),
      };
      set((state) => ({
        ...state,
        reservations: [...state.reservations, newReservation],
      }));
      return newReservation;
    },
    update: (id: string, reservation: ReservationValues) => {
      set((state) => ({
        ...state,
        reservations: state.reservations.map((r) =>
          r.id === id ? { ...r, ...reservation } : r,
        ),
      }));
      return { id, ...reservation };
    },
    delete: (id: string) => {
      set((state) => ({
        ...state,
        reservations: state.reservations.filter((r) => r.id !== id),
      }));
    },
  }));
};
