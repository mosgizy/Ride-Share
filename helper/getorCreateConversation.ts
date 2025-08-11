import { supabase } from "@/lib/supabase";

export const getOrCreateConversation = async (otherUserId: string) => {
  const { data: {user} } = await supabase.auth.getUser();

  if(!user) return

  const myId = user.id;

  const [sender, reciever] = myId < otherUserId
    ? [myId, otherUserId]
    : [otherUserId, myId];

  let { data: conv } = await supabase
    .from('conversations')
    .select('*')
    .eq('sender', sender)
    .eq('reciever', reciever)
    .maybeSingle();

  if (!conv) {
    const { data, error } = await supabase
      .from('conversations')
      .insert({ sender,reciever  })
      .select()
      .single();
    if (error) throw error;
    conv = data;
  }

  return conv;
}
