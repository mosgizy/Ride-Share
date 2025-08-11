import GoBack from '@/components/GoBack';
import RecieverContainer from '@/components/RecieverContainer';
import SenderContainer from '@/components/SenderContainer';
import { icons } from '@/constants';
import { fetchMessages } from '@/helper/getMessages';
import { sendMessage } from '@/helper/sendMessage';
import { supabase } from '@/lib/supabase';
import useChatStore from '@/store/chatStore';
import { useEffect, useState } from 'react';
import { FlatList, Image, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Messaging = () => {
	const [messages, setMessages] = useState<any>([]);
	const [text, setText] = useState('');
	const { conversationInfo } = useChatStore();

	const getAllMessages = async () => {
		const allMessages = await fetchMessages(conversationInfo!.id);
		setMessages(allMessages);
	};

	const handleSendMessage = async () => {
		try {
			await sendMessage(conversationInfo?.id as string, text);
			getAllMessages();
			setText('');
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const channel = supabase
			.channel(`conversation:${conversationInfo!.id}`)
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'messages',
					filter: `conversation_id=eq.${conversationInfo!.id}`,
				},
				(payload) => {
					setMessages((prev) => [...prev, payload.new]);
				}
			)
			.subscribe();

		getAllMessages();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [conversationInfo]);

	return (
		<SafeAreaView className="h-full px-4">
			<GoBack title="Chat" />
			<FlatList
				data={messages}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => {
					// const date = new Date(item.inserted_at).toDateString();
					const time = new Date(item.inserted_at).toLocaleTimeString();

					return (
						<>
							{conversationInfo?.sender === item.sender_id ? (
								<SenderContainer message={item.content} time={time} />
							) : (
								<RecieverContainer message={item.content} time={time} />
							)}
						</>
					);
				}}
			/>
			<View className="flex-row gap-2 items-center mb-4">
				<TouchableOpacity activeOpacity={0.75}>
					<Image source={icons.addMedia} resizeMode="contain" className="w-6 h-6" />
				</TouchableOpacity>
				<View className="flex-1 flex-row items-center gap-4 px-3 py-1 border border-secondary-400 rounded-lg">
					<TextInput
						value={text}
						onChangeText={(e) => setText(e)}
						placeholder="Type your message"
						placeholderClassName="text-tertiary-300 font-medium"
						className="flex-1"
					/>
					<TouchableOpacity activeOpacity={0.75}>
						<Image source={icons.emojiSelector} resizeMode="contain" className="w-6 h-6" />
					</TouchableOpacity>
				</View>
				<TouchableOpacity activeOpacity={0.75} onPress={handleSendMessage}>
					<Image source={icons.send} resizeMode="contain" className="w-6 h-6" />
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default Messaging;
