import GoBack from '@/components/GoBack';
import RecieverContainer from '@/components/RecieverContainer';
import SenderContainer from '@/components/SenderContainer';
import { icons } from '@/constants';
import { sendMessage } from '@/helper/sendMessage';
import { supabase } from '@/lib/supabase';
import useChatStore from '@/store/chatStore';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Image, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const Message = () => {
	const { query } = useLocalSearchParams();
	const [messages, setMessages] = useState<any>([]);
	const [text, setText] = useState('');
	const { conversationInfo, setConversationInfo } = useChatStore();
	const [user, setUser] = useState<any>();
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [lastItemId, setLastItemId] = useState(null);

	const flatListRef = useRef<FlatList>(null);

	const keyboard = useAnimatedKeyboard();

	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: -keyboard.height.value + 22 }],
		};
	});

	const getAllMessages = useCallback(
		async (retryCount = 0) => {
			if (loading || !hasMore) return;

			setLoading(true);

			try {
				let queryBase = supabase
					.from('messages')
					.select('*')
					.eq('conversation_id', query)
					.order('inserted_at', { ascending: false })
					.limit(30);

				if (lastItemId) {
					queryBase = queryBase.lt('inserted_at', lastItemId);
				}

				const { data: newData, error } = await queryBase;

				if (error) throw error;

				if (!newData || newData.length === 0) {
					setHasMore(false);
					return;
				}

				setMessages((prevMessages) => {
					const existingIds = new Set(prevMessages.map((msg) => msg.id));
					const uniqueNewMessages = newData.filter((msg) => !existingIds.has(msg.id));
					return [...prevMessages, ...uniqueNewMessages];
				});

				setLastItemId(newData[newData.length - 1].inserted_at);

				if (newData.length < 30) {
					setHasMore(false);
				}
			} catch (error: any) {
				console.error('Error fetching data:', error.message);

				if (retryCount < 3 && error.message.includes('network')) {
					console.log(`Retrying... Attempt ${retryCount + 1}`);
					setTimeout(() => {
						getAllMessages(retryCount + 1);
					}, 1000 * (retryCount + 1));
					return;
				}

				if (error.code === 'PGRST116') {
					setHasMore(false);
				}
			} finally {
				setLoading(false);
			}
		},
		[loading, hasMore, lastItemId]
	);

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
					setMessages((prev: any) => [payload.new, ...prev]);
				}
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [supabase]);

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

		if (messages.length > 0) {
			flatListRef.current?.scrollToOffset({
				offset: 0,
				animated: true,
			});
		}
	}, []);

	return (
		<SafeAreaView className="h-full px-4">
			<GoBack title="Chat" />
			<Animated.View style={[animatedStyles]} className="h-[83%] z-10">
				<FlatList
					ref={flatListRef}
					data={messages}
					keyExtractor={(item) => item.id.toString()}
					showsVerticalScrollIndicator={false}
					onEndReached={() => getAllMessages()}
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
					inverted
					maintainVisibleContentPosition={{
						minIndexForVisible: 0,
						autoscrollToTopThreshold: 20,
					}}
					removeClippedSubviews={true}
					maxToRenderPerBatch={10}
				/>
			</Animated.View>

			<Animated.View style={[animatedStyles]}>
				<View className="flex-row gap-2 items-center bg-white py-3">
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
			</Animated.View>
		</SafeAreaView>
	);
};

export default Message;
