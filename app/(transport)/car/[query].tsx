import GoBack from '@/components/GoBack';
import LoadingPage from '@/components/LoadingPage';
import PrimaryBtn from '@/components/PrimaryBtn';
import SecondaryBtn from '@/components/SecondayBtn';
import { icons } from '@/constants';
import { sendPushNotification } from '@/helper/sendNotification';
import { CarInfo } from '@/lib/interface';
import { supabase } from '@/lib/supabase';
import useAuhStore from '@/store/authStore';
import useRentStore from '@/store/rentStore';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CarDetails = () => {
	const { query } = useLocalSearchParams();
	const { setBooked, setBookLater, bookedCar } = useRentStore();
	const [car, setCar] = useState<CarInfo>();
	const [loading, setLoading] = useState(false);
	const { profile, notificationToken } = useAuhStore();

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

	const bookRide = async () => {
		const { data, error } = await supabase.from('booked').select('*').eq('email', profile.email);

		if (error) {
			console.log(error, 'check');
			return;
		}

		if (data && data?.length > 0) {
			router.push('/(transport)/request?type=Request for rent');
			Alert.alert('You already booked a ride');
			return;
		}

		const newCar = {
			email: profile.email,
			name: car?.name,
			model: car?.model,
			capacity: car?.capacity,
			color: car?.color,
			fuel_type: car?.fuel_type,
			gear_type: car?.gear_type,
			distance: car?.distance,
			rating: car?.rating,
			reviews: car?.reviews,
			max_power: car?.max_power,
			zero_to_sixty: car?.zero_to_sixty,
			tank_size: car?.tank_size,
			max_speed: car?.max_speed,
			image: car?.image,
			car_image: car?.car_image,
		};

		const { error: uploadCarError } = await supabase.from('booked').insert(newCar);

		if (uploadCarError) {
			console.log(uploadCarError, 'book ride failed');
			return;
		}

		const info = {
			title: 'You just booked a ride!',
			body: `Thanks for booking ${car?.name}`,
			sound: 'default',
			data: { screen: 'Booked Car', carId: car?.id },
		};

		sendPushNotification(notificationToken, info);

		router.push('/(transport)/request?type=Request for rent');
	};

	const bookeLater = async () => {
		const newCar = {
			email: profile.email,
			name: car?.name,
			model: car?.model,
			capacity: car?.capacity,
			color: car?.color,
			fuel_type: car?.fuel_type,
			gear_type: car?.gear_type,
			distance: car?.distance,
			rating: car?.rating,
			reviews: car?.reviews,
			max_power: car?.max_power,
			zero_to_sixty: car?.zero_to_sixty,
			tank_size: car?.tank_size,
			max_speed: car?.max_speed,
			image: car?.image,
			car_image: car?.car_image,
		};

		const { error: uploadCarError } = await supabase.from('book-later').insert(newCar);

		if (uploadCarError) {
			console.log(uploadCarError, 'book ride failed');
			return;
		}
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
						<SecondaryBtn text="Book later" fn={bookeLater} additionalStyle="flex-1" />
						<PrimaryBtn text="Ride Now" fn={bookRide} additionalStyle="flex-1" />
					</View>
				</ScrollView>
			)}
		</SafeAreaView>
	);
};

export default CarDetails;
