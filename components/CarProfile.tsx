import { icons } from '@/constants';
import { CarInfo } from '@/lib/interface';
import useRentStore from '@/store/rentStore';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Text, View } from 'react-native';
import PrimaryBtn from './PrimaryBtn';
import SecondaryBtn from './SecondayBtn';

const CarProfile = ({ car }: { car: CarInfo }) => {
	const [viewCar, setViewCar] = useState(false);
	const { setBookLater } = useRentStore();

	const { name, distance, image } = car;

	const info = `${car.gearType} | ${car.capacity} | ${car.fuelType}`;

	const bookLater = () => {
		setBookLater(car);
		setViewCar(false);
	};

	return (
		<View className="bg-primary/15 rounded-lg border border-primary px-3 py-4">
			<View className="flex-row justify-between items-center">
				<View className="gap-1">
					<Text className="text-tertiary-100 font-medium">{name}</Text>
					<Text className="text-secondary-400 text-xs font-medium">{info}</Text>
					<View className="flex-row items-center gap-1">
						<Image source={icons.targetPointerSolid} resizeMode="contain" className="w-4 h-4" />
						<Text className="text-primary-100 text-xs font-medium">{distance}</Text>
					</View>
				</View>
				<Image source={image} resizeMode="contain" className="w-[101px] h-[59px]" />
			</View>
			{viewCar ? (
				<View className="flex-row gap-2 mt-7">
					<SecondaryBtn text="Book later" fn={bookLater} additionalStyle="flex-1" />
					<PrimaryBtn
						text="Ride Now"
						fn={() => router.push(`/car/${name}`)}
						additionalStyle="flex-1"
					/>
				</View>
			) : (
				<SecondaryBtn text="View car list" fn={() => setViewCar(true)} additionalStyle="mt-6" />
			)}
		</View>
	);
};

export default CarProfile;
