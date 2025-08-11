import { supabase } from "@/lib/supabase";

export const fetchMessages = async (conversationId: string) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('inserted_at', { ascending: true });
  if (error) throw error;
  return data;
}
