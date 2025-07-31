import { Session } from "@supabase/supabase-js";
import { ImageSourcePropType } from "react-native";

export interface AuthStore{
  isLoggedIn: boolean
  profile: Profile;
  languageSelected: string;
  session: Session | null;
  notificationToken: string;
  setNotificationToken: (token:string) => void
  setSession: (session:Session | null) => void
  setLanguageSelected:(language:string) => void
  setIsLoggedIn: (status: boolean) => void;
  logoutUser: () => void;
  setProfile:(profile:Profile) => void
}

export interface Profile{
  name: string;
  email: string;
  phoneNumber: {countryCode:string,number:string,numberCode?:string};
  city: string;
  street: string;
  image: ImageSourcePropType | null | string;
  gender?: string;
  terms:boolean
}