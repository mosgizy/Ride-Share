import GoBack from '@/components/GoBack';
import LoadingPage from '@/components/LoadingPage';
import { images } from '@/constants';
import { supabase } from '@/lib/supabase';
import { RelativePathString, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Messages = () => {
	const [chatList, setChatList] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchMyChats = async () => {
		setLoading(true);
		try {
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (!user) {
				console.log('getting user failed');
				return;
			}

			const { data } = await supabase
				.from('conversations')
				.select('*')
				.or(`sender_email.eq.${user?.email},receiver_email.eq.${user?.email}`);

			const contacts = await Promise.all(
				data?.map(async (chat) => {
					const receiver =
						user.email === chat.sender_email ? chat.receiver_email : chat.sender_email;

					console.log(chat, 'chat');

					const { data: users, error } = await supabase
						.from('users')
						.select('*')
						.eq('email', receiver)
						.single();

					if (error) {
						console.error(`Error fetching user for ${receiver}:`, error);
						return null;
					}

					const newUser = {
						id: chat.id,
						name: users.name,
						avatar_url: users.avatar_url,
						email: users.email,
					};

					return newUser;
				}) || []
			);

			setLoading(false);
			setChatList(contacts);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	const clickMessage = (query: string) => {
		router.push(`/(chat)/message/${query}` as RelativePathString);
	};

	useEffect(() => {
		fetchMyChats();
	}, []);

	return (
		<SafeAreaView className="h-full px-5">
			<GoBack title="Messages" />
			{loading ? (
				<LoadingPage />
			) : (
				<FlatList
					data={chatList}
					keyExtractor={(item) => item.id}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity
								onPress={() => clickMessage(item.id)}
								className="w-full flex-row items-center gap-2 mb-4"
							>
								<View className="flex-row items-center gap-2">
									<View>
										<Image
											source={!item.avatar_url ? images.profile : { uri: item.avatar_url }}
											resizeMode="contain"
											className="w-14 h-14 rounded-full"
										/>
									</View>
									<View>
										<Text className="text-primary text-lg">{item.name}</Text>
										<Text>{item.email}</Text>
									</View>
								</View>
							</TouchableOpacity>
						);
					}}
					ListEmptyComponent={() => (
						<View>
							<Text className="text-xl text-primary-100 text-center font-semibold">
								No Messages
							</Text>
						</View>
					)}
				/>
			)}
		</SafeAreaView>
	);
};

export default Messages;
