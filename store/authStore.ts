import { AuthStore } from '@/lib/authInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useAuhStore = create<AuthStore>()(
  persist(
    (set => ({
      isLoggedIn: false,
      profile: null,
      languageSelected: "english",
      setLanguageSelected: (language) => set({ languageSelected: language }),
      logoutUser:() => set({isLoggedIn:false,profile:null}),
      setIsLoggedIn: (status) => set(() => ({isLoggedIn:status})),
      setProfile: (profile) => set(() => ({profile}))
    })),
    {
      name: "auth-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        profile: state.profile,
        languageSelected:state.languageSelected
      })
    }
  )
)

export default useAuhStore