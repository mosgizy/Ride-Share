import GoBack from '@/components/GoBack';
import PrimaryBtn from '@/components/PrimaryBtn';
import SecondaryBtn from '@/components/SecondayBtn';
import { icons } from '@/constants';
import { carsInfo } from '@/lib/cars';
import { CarInfo } from '@/lib/interface';
import useRentStore from '@/store/rentStore';
import { router, useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CarDetails = () => {
	const { query } = useLocalSearchParams();
	const { setBooked, setBookLater } = useRentStore();

	const [car] = carsInfo.filter((car) => car.name === query);

	const bookRide = () => {
		setBooked(car as CarInfo);
		router.push('/(transport)/request?type=Request for rent');
	};

	return (
		<SafeAreaView className="h-full px-5">
			<GoBack />
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text className="text-tertiary-100 text-2xl font-semibold">{car.name}</Text>
				<View className="flex-row gap-3 items-center mt-2">
					<Image source={icons.star} resizeMode="contain" className="w-5 h-5" />
					<Text className="text-sm text-secondary-400">
						{car.rating} ({car.reviews} reviews)
					</Text>
				</View>
				<View className="items-center mt-16">
					<Image source={car.image} resizeMode="contain" className="w-[269px] h-[156px]" />
				</View>
				<View className="mt-10">
					<Text className="text-tertiary-100 text-lg font-medium">Specifications</Text>
					<View className="mt-8 flex-row gap-7">
						<View className="flex-1 items-center px-4 py-5 rounded-lg bg-primary/15 border border-primary">
							<Image source={icons.battery} resizeMode="contain" className="w-6 h-6" />
							<Text className="mt-2 text-secondary-400 text-xs font-semibold">Max. power</Text>
							<Text className="text-secondary-400 text-[10px]">{car.maxPower}</Text>
						</View>
						<View className="flex-1 items-center px-4 py-5 rounded-lg bg-primary/15 border border-primary">
							<Image source={icons.fuel} resizeMode="contain" className="w-6 h-6" />
							<Text className="mt-2 text-secondary-400 text-xs font-semibold">Fuel</Text>
							<Text className="text-secondary-400 text-[10px]">{car.tankSize}</Text>
						</View>
						<View className="flex-1 items-center px-4 py-5 rounded-lg bg-primary/15 border border-primary">
							<Image source={icons.meter} resizeMode="contain" className="w-6 h-6" />
							<Text className="mt-2 text-secondary-400 text-xs font-semibold">Max. speed</Text>
							<Text className="text-secondary-400 text-[10px]">{car.maxSpeed}</Text>
						</View>
						<View className="flex-1 items-center px-4 py-5 rounded-lg bg-primary/15 border border-primary">
							<Image source={icons.acceleration} resizeMode="contain" className="w-6 h-6" />
							<Text className="mt-2 text-secondary-400 text-xs font-semibold">0-60mph</Text>
							<Text className="text-secondary-400 text-[10px]">{car.zeroToSixty}</Text>
						</View>
					</View>
				</View>
				<View>
					<Text className="text-tertiary-100 text-lg font-medium mt-10">Car features</Text>
					<View className="mt-5 gap-3">
						<View className="flex-row items-center justify-between px-5 py-4 rounded-lg bg-primary/15 border border-primary">
							<Text className="text-tertiary-100 text-sm font-medium">Model</Text>
							<Text className="text-tertiary-100 text-sm font-medium">{car.model}</Text>
						</View>
						<View className="flex-row items-center justify-between px-5 py-4 rounded-lg bg-primary/15 border border-primary">
							<Text className="text-tertiary-100 text-sm font-medium">Capacity</Text>
							<Text className="text-tertiary-100 text-sm font-medium">{car.maxPower}</Text>
						</View>
						<View className="flex-row items-center justify-between px-5 py-4 rounded-lg bg-primary/15 border border-primary">
							<Text className="text-tertiary-100 text-sm font-medium">Color</Text>
							<Text className="text-tertiary-100 text-sm font-medium">{car.color}</Text>
						</View>
						<View className="flex-row items-center justify-between px-5 py-4 rounded-lg bg-primary/15 border border-primary">
							<Text className="text-tertiary-100 text-sm font-medium">Fuel type</Text>
							<Text className="text-tertiary-100 text-sm font-medium">{car.fuelType}</Text>
						</View>
						<View className="flex-row items-center justify-between px-5 py-4 rounded-lg bg-primary/15 border border-primary">
							<Text className="text-tertiary-100 text-sm font-medium">Gear type</Text>
							<Text className="text-tertiary-100 text-sm font-medium">{car.gearType}</Text>
						</View>
					</View>
				</View>
				<View className="flex-row gap-2 mt-7 mb-10">
					<SecondaryBtn
						text="Book later"
						fn={() => setBookLater(car as CarInfo)}
						additionalStyle="flex-1"
					/>
					<PrimaryBtn text="Ride Now" fn={bookRide} additionalStyle="flex-1" />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default CarDetails;
