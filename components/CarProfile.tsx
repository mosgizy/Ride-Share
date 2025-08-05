import { icons } from '@/constants';
import { CarInfo } from '@/lib/interface';
import { supabase } from '@/lib/supabase';
import useAuhStore from '@/store/authStore';
import { router } from 'expo-router';
import { useToast } from 'expo-toast';
import { useState } from 'react';
import { Image, Text, View } from 'react-native';
import PrimaryBtn from './PrimaryBtn';
import SecondaryBtn from './SecondayBtn';

const CarProfile = ({ car }: { car: CarInfo }) => {
	const [viewCar, setViewCar] = useState(false);
	const { profile } = useAuhStore();
	const toast = useToast();

	const { name, distance, image } = car;

	const info = `${car.gear_type} | ${car.capacity} | ${car.fuel_type}`;

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

	const bookLater = async () => {
		try {
			const { data, error } = await supabase
				.from('book-later')
				.select('*')
				.eq('email', profile.email);

			if (!data && error) {
				console.log(error);

				return;
			}

			const alreadySaved = data.some((item) => item.name === car.name && item.model === car.model);

			if (alreadySaved) {
				toast.show('Ride already saved', {
					duration: 2000,
				});
				return;
			}

			const { error: uploadCarError } = await supabase.from('book-later').insert(newCar);

			if (uploadCarError) {
				console.log(uploadCarError, 'book ride failed');
				return;
			}

			toast.show('Ride saved to book later', {
				duration: 2000,
			});
			setViewCar(false);
		} catch (error) {
			console.log(error);
		}
	};

	// const bookLater = () => {
	// 	setBookLater(car);
	// };

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
				<Image
					source={{ uri: image }}
					resizeMode="contain"
					className="w-[101px] h-[59px] rounded-sm mix-blend-lighten"
				/>
			</View>
			{viewCar ? (
				<View className="flex-row gap-2 mt-7">
					<SecondaryBtn text="Book later" fn={bookLater} additionalStyle="flex-1" />
					<PrimaryBtn
						text="Ride Now"
						fn={() => router.push(`/car/${car.id}`)}
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
