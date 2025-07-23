import { supabase } from "@/lib/supabase";

export const saveUserProfile = async (profile) => {
  const { error } = await supabase.from('users').insert({
    ...profile
  }).single()
  
  if (error) return {error,status:false}
  
  return {error:null,status:true}
}