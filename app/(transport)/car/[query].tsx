import GoBack from '@/components/GoBack';
import LoadingPage from '@/components/LoadingPage';
import PrimaryBtn from '@/components/PrimaryBtn';
import SecondaryBtn from '@/components/SecondayBtn';
import { icons } from '@/constants';
import { CarInfo } from '@/lib/interface';
import { supabase } from '@/lib/supabase';
import useRentStore from '@/store/rentStore';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CarDetails = () => {
	const { query } = useLocalSearchParams();
	const { setBooked, setBookLater } = useRentStore();
	const [car, setCar] = useState<CarInfo>();
	const [loading, setLoading] = useState(false);

	const fetchCar = async () => {
		setLoading(true);
		const { data, error } = await supabase.from('cars').select('*').eq('id', query).single();

		if (error) {
			console.log(error);
			Alert.alert('No car with the id found');
			setLoading(false);
			return;
		}

		setCar(data);
		setLoading(false);
	};

	console.log(car, query);

	const bookRide = () => {
		setBooked(car);
		router.push('/(transport)/request?type=Request for rent');
	};

	useEffect(() => {
		fetchCar();
	}, []);

	return (
		<SafeAreaView className="h-full px-5">
			<GoBack />
			{loading ? (
				<LoadingPage />
			) : (
				<ScrollView showsVerticalScrollIndicator={false}>
					<Text className="text-tertiary-100 text-2xl font-semibold">{car?.name}</Text>
					<View className="flex-row gap-3 items-center mt-2">
						<Image source={icons.star} resizeMode="contain" className="w-5 h-5" />
						<Text className="text-sm text-secondary-400">
							{car?.rating} ({car?.reviews} reviews)
						</Text>
					</View>
					<View className="items-center mt-16">
						<Image
							source={{ uri: car?.image }}
							resizeMode="contain"
							className="w-[500px] h-[156px]"
						/>
					</View>
					<View className="mt-10">
						<Text className="text-tertiary-100 text-lg font-medium">Specifications</Text>
						<View className="mt-8 flex-row gap-7">
							<View className="flex-1 items-center px-4 py-5 rounded-lg bg-primary/15 border border-primary">
								<Image source={icons.battery} resizeMode="contain" className="w-6 h-6" />
								<Text className="mt-2 text-secondary-400 text-xs font-semibold">Max. power</Text>
								<Text className="text-secondary-400 text-[10px]">{car?.max_power}</Text>
							</View>
							<View className="flex-1 items-center px-4 py-5 rounded-lg bg-primary/15 border border-primary">
								<Image source={icons.fuel} resizeMode="contain" className="w-6 h-6" />
								<Text className="mt-2 text-secondary-400 text-xs font-semibold">Fuel</Text>
								<Text className="text-secondary-400 text-[10px]">{car?.tank_size}</Text>
							</View>
							<View className="flex-1 items-center px-4 py-5 rounded-lg bg-primary/15 border border-primary">
								<Image source={icons.meter} resizeMode="contain" className="w-6 h-6" />
								<Text className="mt-2 text-secondary-400 text-xs font-semibold">Max. speed</Text>
								<Text className="text-secondary-400 text-[10px]">{car?.max_speed}</Text>
							</View>
							<View className="flex-1 items-center px-4 py-5 rounded-lg bg-primary/15 border border-primary">
								<Image source={icons.acceleration} resizeMode="contain" className="w-6 h-6" />
								<Text className="mt-2 text-secondary-400 text-xs font-semibold">0-60mph</Text>
								<Text className="text-secondary-400 text-[10px]">{car?.zero_to_sixty}</Text>
							</View>
						</View>
					</View>
					<View>
						<Text className="text-tertiary-100 text-lg font-medium mt-10">Car features</Text>
						<View className="mt-5 gap-3">
							<View className="flex-row items-center justify-between px-5 py-4 rounded-lg bg-primary/15 border border-primary">
								<Text className="text-tertiary-100 text-sm font-medium">Model</Text>
								<Text className="text-tertiary-100 text-sm font-medium">{car?.model}</Text>
							</View>
							<View className="flex-row items-center justify-between px-5 py-4 rounded-lg bg-primary/15 border border-primary">
								<Text className="text-tertiary-100 text-sm font-medium">Capacity</Text>
								<Text className="text-tertiary-100 text-sm font-medium">{car?.max_power}</Text>
							</View>
							<View className="flex-row items-center justify-between px-5 py-4 rounded-lg bg-primary/15 border border-primary">
								<Text className="text-tertiary-100 text-sm font-medium">Color</Text>
								<Text className="text-tertiary-100 text-sm font-medium">{car?.color}</Text>
							</View>
							<View className="flex-row items-center justify-between px-5 py-4 rounded-lg bg-primary/15 border border-primary">
								<Text className="text-tertiary-100 text-sm font-medium">Fuel type</Text>
								<Text className="text-tertiary-100 text-sm font-medium">{car?.fuel_type}</Text>
							</View>
							<View className="flex-row items-center justify-between px-5 py-4 rounded-lg bg-primary/15 border border-primary">
								<Text className="text-tertiary-100 text-sm font-medium">Gear type</Text>
								<Text className="text-tertiary-100 text-sm font-medium">{car?.gear_type}</Text>
							</View>
						</View>
					</View>
					<View className="flex-row gap-2 mt-7 mb-10">
						<SecondaryBtn text="Book later" fn={() => setBookLater(car)} additionalStyle="flex-1" />
						<PrimaryBtn text="Ride Now" fn={bookRide} additionalStyle="flex-1" />
					</View>
				</ScrollView>
			)}
		</SafeAreaView>
	);
};

export default CarDetails;
