import { AuthStore } from '@/lib/authInterface';
import { signOut } from '@/lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const profile = {
  name: "",
  email: "",
  phoneNumber: {countryCode:"",number:"",numberCode:""},
  city: "",
  street: "",
  image: null,
  gender: "",
  terms:false
}

const useAuhStore = create<AuthStore>()(
  persist(
    (set => ({
      isLoggedIn: false,
      profile: profile,
      languageSelected: "english",
      session: null,
      notificationToken: "",
      setNotificationToken: (token) => set({notificationToken:token}),
      setSession:(session) => set({session}),
      setLanguageSelected: (language) => set({ languageSelected: language }),
      logoutUser: () => set((state) => {
        signOut()
        router.push('/(auth)/login')
        return {isLoggedIn:false,profile:profile,session:null}
      }),
      setIsLoggedIn: (status) => set(() => ({isLoggedIn:status})),
      setProfile: (profile) => set(() => ({profile}))
    })),
    {
      name: "auth-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        profile: state.profile,
        notificationToken:state.notificationToken,
        languageSelected:state.languageSelected
      })
    }
  )
)

export default useAuhStore