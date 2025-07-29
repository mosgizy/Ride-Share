import CarProfile from '@/components/CarProfile';
import GoBack from '@/components/GoBack';
import { CarInfo } from '@/lib/interface';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Cars = () => {
	const [refreshing, setRefreshing] = useState(false);
	const [cars, setCars] = useState<CarInfo[]>();
	const [loading, setLoading] = useState(false);

	const fetchCars = async () => {
		setLoading(true);
		const { data, error } = await supabase.from('cars').select('*');

		if (error) {
			setLoading(false);
			console.log(error);
			return;
		}
		setCars(data);
		setLoading(false);
	};

	const refresh = async () => {
		setRefreshing(true);
		await fetchCars();
		setRefreshing(false);
	};

	useEffect(() => {
		fetchCars();
	}, []);

	return (
		<SafeAreaView className="h-full px-5">
			<GoBack />
			<FlatList
				data={cars}
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
						<Text className="text-secondary-400 text-sm font-medium">
							{cars?.length} cars found
						</Text>
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
