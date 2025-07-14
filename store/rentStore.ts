import { RentStore } from '@/lib/interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useRentStore = create<RentStore>()(
  persist(
    (set => ({
      bookedCar: null,
      bookLater: [],
      date: null,
      driverStatus: false,
      setDriverStatus:(status) => set({driverStatus:status}),
      setDate:(date) => set({date}),
      setBookLater: (car) => set((state) => ({
        bookLater : [...state.bookLater,car]
      })),
      setBooked:(car) => set(() => ({bookedCar:car}))
    })),
    {
      name: "rent-store",
			storage: createJSONStorage(() => AsyncStorage ),
			partialize: (state) => ({
        bookLater: state.bookLater,
        bookedCar:state.bookedCar
			})
    }
  )
)

export default useRentStore