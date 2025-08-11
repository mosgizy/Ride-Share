import GoBack from '@/components/GoBack';
import Notification from '@/components/Notification';
import { supabase } from '@/lib/supabase';
import useAuhStore from '@/store/authStore';
import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Notifications = () => {
	const { profile } = useAuhStore();
	const [notifications, setNotifications] = useState<any[] | null>();
	const [refreshing, setRefreshing] = useState(false);
	const [currentDay, setCurrentDay] = useState('');
	// const [previousDay, setPreviousDay] = useState('');

	// const checkDate = (createdAt: string) => {
	// 	const dateCreated = new Date(createdAt);
	// 	const today = new Date();
	// 	const yesterday = new Date();
	// 	yesterday.setDate(today.getDate() - 1);
	// 	const date =
	// 		dateCreated.toDateString() === today.toDateString()
	// 			? 'today'
	// 			: dateCreated.toDateString() === yesterday.toDateString()
	// 			? 'yesterday'
	// 			: dateCreated.toDateString();

	// 	if (date === currentDay) {
	// 		setCurrentDay('');
	// 		return '';
	// 	} else {
	// 		setCurrentDay(date);
	// 		return date;
	// 	}
	// };

	// const itemList = useCallback(({ item, index }: any) => {
	// 	const day = checkDate(item.created_at);
	// 	console.log(day, 'day', item.created_at);

	// 	return (
	// 		<>
	// 			{day && (
	// 				<Text className="text-sm text-primary-400 font-medium capitalize mb-3">{currentDay}</Text>
	// 			)}
	// 			<Notification
	// 				type={item.title}
	// 				text={item.description}
	// 				time={new Date(item.created_at).toLocaleTimeString()}
	// 				bg={index % 2 !== 1}
	// 			/>
	// 		</>
	// 	);
	// }, []);

	const itemList = ({ item, index }: any) => {
		const dateCreated = new Date(item.created_at);
		const today = new Date();
		const yesterday = new Date();
		yesterday.setDate(today.getDate() - 1);

		let dayLabel = '';
		if (dateCreated.toDateString() === today.toDateString()) {
			dayLabel = 'today';
		} else if (dateCreated.toDateString() === yesterday.toDateString()) {
			dayLabel = 'yesterday';
		} else {
			dayLabel = dateCreated.toDateString();
		}

		if (index > 0) {
			const prevItemDate = new Date(notifications[index - 1].created_at).toDateString();
			if (prevItemDate === dateCreated.toDateString()) {
				dayLabel = '';
			}
		}

		return (
			<>
				{dayLabel && (
					<Text className="text-sm text-primary-400 font-medium capitalize mb-3">{dayLabel}</Text>
				)}
				<Notification
					type={item.title}
					text={item.description}
					time={new Date(item.created_at).toLocaleTimeString()}
					bg={index % 2 !== 1}
				/>
			</>
		);
	};

	const fetchUserNotifications = async () => {
		try {
			const { data } = await supabase
				.from('notifications')
				.select()
				.eq('email', profile.email)
				.order('created_at', { ascending: false });
			setNotifications(data);
		} catch (error) {
			console.error(error);
		}
	};

	const refresh = async () => {
		setRefreshing(true);
		await fetchUserNotifications();
		setRefreshing(false);
	};

	useEffect(() => {
		fetchUserNotifications();
	}, []);

	return (
		<SafeAreaView className="h-full px-5">
			<GoBack title="Notification" />
			<View>
				<FlatList
					data={notifications}
					keyExtractor={(item) => item.id.toString()}
					renderItem={itemList}
					showsVerticalScrollIndicator={false}
					ListEmptyComponent={() => (
						<View>
							<Text className="text-xl text-primary-100 text-center font-semibold">
								No notifications
							</Text>
						</View>
					)}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
				/>
			</View>
		</SafeAreaView>
	);
};

export default Notifications;
