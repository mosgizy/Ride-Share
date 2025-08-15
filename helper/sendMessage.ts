import { supabase } from "@/lib/supabase";

export const sendMessage = async (conversationId: string, content: string,receiver:string) => {
  const { data: user } = await supabase.auth.getUser();
  if (!user?.user) throw new Error('Not logged in');

  const { error } = await supabase.from('messages').insert({
    conversation_id: conversationId,
    sender_id: user.user.id,
    receiver_id:receiver,
    content
  });
  if (error) throw error;
}
