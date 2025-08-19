import GoBack from '@/components/GoBack';
import RecieverContainer from '@/components/RecieverContainer';
import SenderContainer from '@/components/SenderContainer';
import { icons } from '@/constants';
import { fetchMessages } from '@/helper/getMessages';
import { sendMessage } from '@/helper/sendMessage';
import { supabase } from '@/lib/supabase';
import useChatStore from '@/store/chatStore';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { FlatList, Image, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Message = () => {
	const { query } = useLocalSearchParams();
	const [messages, setMessages] = useState<any>([]);
	const [text, setText] = useState('');
	const { conversationInfo, setConversationInfo } = useChatStore();
	const [user, setUser] = useState<any>();
	const [loading, setLoading] = useState(false);
	const flatListRef = useRef<FlatList>(null);

	const getAllMessages = async () => {
		const allMessages = await fetchMessages(query as string);
		setMessages(allMessages);
	};

	const fetchConversation = async () => {
		const { data } = await supabase.from('conversations').select('*').eq('id', query).single();
		setConversationInfo(data);
	};

	const handleSendMessage = async () => {
		try {
			if (text === '') return;

			let receiver =
				conversationInfo?.sender === user.id
					? conversationInfo?.reciever
					: conversationInfo?.sender;

			await sendMessage(query as string, text, receiver as string);

			if (conversationInfo?.reciever === user.id) {
				const { data, error } = await supabase
					.from('conversations')
					.update({
						sender: user.id,
						reciever: conversationInfo?.sender,
						sender_email: user.email,
						receiver_email: conversationInfo?.sender_email,
					})
					.eq('id', query)
					.select()
					.single();

				setConversationInfo(data);
			}

			setText('');
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const channel = supabase
			.channel(`conversation-${query}`)
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'messages',
					filter: `conversation_id=eq.${query}`,
				},
				(payload) => {
					setMessages((prev: any) => [...prev, payload.new]);
				}
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [supabase]);

	useEffect(() => {
		if (messages.length > 0) {
			flatListRef.current?.scrollToEnd({ animated: true });
		}
	}, [messages]);

	useEffect(() => {
		const getUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (!user) {
				console.log('getting user failed');
				return;
			}
			setUser(user);
		};

		getAllMessages();
		fetchConversation();
		getUser();
	}, []);

	return (
		<SafeAreaView className="h-full px-4">
			<GoBack title="Chat" />
			<FlatList
				ref={flatListRef}
				data={messages}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
				onEndReachedThreshold={0.5}
				renderItem={({ item }) => {
					// const date = new Date(item.inserted_at).toDateString();
					const time = new Date(item.inserted_at).toLocaleTimeString();

					return (
						<>
							{user.id === item.sender_id ? (
								<SenderContainer message={item.content} time={time} />
							) : (
								<RecieverContainer message={item.content} time={time} />
							)}
						</>
					);
				}}
				// inverted
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

export default Message;
