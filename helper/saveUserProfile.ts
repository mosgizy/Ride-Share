import { supabase } from "@/lib/supabase";

export interface Profile{
  name: string;
  email: string;
  phoneNumber: {countryCode:string,number:string,numberCode?:string};
  city: string;
  street: string;
  avatar_url: string;
  gender?: string;
  terms:boolean
}

export const saveUserProfile = async (profile:Profile) => {
  const { error } = await supabase.from('users').insert({
    ...profile
  }).single()
  
  if (error) return {error,status:false}
  
  return {error:null,status:true}
}