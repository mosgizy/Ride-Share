import { ImageSourcePropType } from "react-native";

export interface AuthStore{
  isLoggedIn: boolean
  profile: Profile | null;
  languageSelected: string;
  setLanguageSelected:(language:string) => void
  setIsLoggedIn: (status: boolean) => void;
  logoutUser: () => void;
  setProfile:(profile:Profile) => void
}

export interface Profile{
  name: string;
  email: string;
  phoneNumber: {countryCode:string,number:string};
  city: string;
  street: string;
  image: ImageSourcePropType | null;
  gender?: string;
}