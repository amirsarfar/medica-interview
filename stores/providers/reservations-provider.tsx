'use client'

import { type ReactNode, createContext, useState, useContext } from 'react'
import { useStore } from 'zustand'

import { type ReservationsStore, createReservationsStore } from '@/stores/reservations-store'

export type ReservationsStoreApi = ReturnType<typeof createReservationsStore>

export const ReservationsStoreContext = createContext<ReservationsStoreApi | undefined>(undefined)

export interface ReservationsStoreProviderProps {
  children: ReactNode
}

export const ReservationsStoreProvider = ({ children }: ReservationsStoreProviderProps) => {
  const [store] = useState(() => createReservationsStore())
  return <ReservationsStoreContext.Provider value={store}>{children}</ReservationsStoreContext.Provider>
}

export const useReservationsStore = <T,>(selector: (store: ReservationsStore) => T): T => {
  const reservationsStoreContext = useContext(ReservationsStoreContext)
  if (!reservationsStoreContext) {
    throw new Error(`useReservationsStore must be used within ReservationsStoreProvider`)
  }

  return useStore(reservationsStoreContext, selector)
}