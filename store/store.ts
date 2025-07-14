import { MapStore } from '@/lib/interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useMapStore = create<MapStore>()(
	persist(
		(set) => ({
			userLocation: null,
			otherUsers: [],
			destination: null,
			locationModal: false,
			locationPermission: false,
			addressFromTo:null,
			recentPlaces: [],
			sideBarModal: false,
			setSideBarModal:(status) => set({sideBarModal:status}),
			setRecentPlaces:(place) => set((state) => ({recentPlaces:[...state.recentPlaces,place].slice(-5)})),
			setLocationPermission: (permission) => set({ locationPermission: permission }),
			setAddressFromTo: (address) => set({addressFromTo:address}),
			setDestination: (location) => set({ destination: location }),
			setLocationModal: (modal) => set({ locationModal: modal }),
			setUserLocation: (location) => set({ userLocation: location }),
			setOtherUsers: (users) => set({ otherUsers: users }),
			clearLocations: () => set({ userLocation: null, otherUsers: [] }),
		}),
		{
			name: "map-store",
			storage: createJSONStorage(() => AsyncStorage ),
			partialize: (state) => ({
				recentPlaces: state.recentPlaces
			})
		}
	)
);

export default useMapStore;
