import GoBack from '@/components/GoBack';
import Notification from '@/components/Notification';
import { notifications } from '@/lib/notifications';
import { useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Notifications = () => {
	const itemList = useCallback(
		({ item }) => <Notification type={item.type} text={item.text} time={item.time} bg={item.bg} />,
		[]
	);

	return (
		<SafeAreaView className="h-full px-5">
			<GoBack title="Notification" />
			<View>
				<Text className="font-medium text-sm">Today</Text>
				<FlatList
					data={notifications}
					keyExtractor={(item) => item.id.toString()}
					renderItem={itemList}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		</SafeAreaView>
	);
};

export default Notifications;
