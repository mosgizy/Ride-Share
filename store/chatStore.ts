import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useChatStore = create<ChatStoreI>()(
  persist(
    (set => ({
      conversationInfo:null,
      setConversationInfo: (conversation) => set({conversationInfo:conversation})
    })),
    {
      name: "chat-store",
      storage:createJSONStorage(() => AsyncStorage)
    }
  )
)

export default useChatStore

interface ChatStoreI{
  conversationInfo: ConversationInfoI | null;
  setConversationInfo: (conversation:ConversationInfoI) => void
}

interface ConversationInfoI{
  created_at: string;
  id: string;
  sender: string;
  reciever: string;
  sender_email: string;
  reciever_email: string;
}