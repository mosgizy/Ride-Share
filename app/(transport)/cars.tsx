import CarProfile from '@/components/CarProfile';
import GoBack from '@/components/GoBack';
import { carsInfo } from '@/lib/cars';
import { useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Cars = () => {
	const [refreshing, setRefreshing] = useState(false);

	const refresh = () => {
		setRefreshing((prev) => !prev);
	};

	return (
		<SafeAreaView className="h-full px-5">
			<GoBack />
			<FlatList
				data={carsInfo}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
				renderItem={(item) => (
					<View className="mt-6">
						<CarProfile car={item.item} />
					</View>
				)}
				ListHeaderComponent={() => (
					<>
						<Text className="text-tertiary-100 text-2xl font-semibold">Avaiable cars for ride</Text>
						<Text className="text-secondary-400 text-sm font-medium">18 cars found</Text>
					</>
				)}
				ListEmptyComponent={() => (
					<View>
						<Text className="text-xl text-primary-100 text-center font-semibold">
							No Cars available
						</Text>
					</View>
				)}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
			/>
		</SafeAreaView>
	);
};

export default Cars;
