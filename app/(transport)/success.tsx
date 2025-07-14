import GoBack from '@/components/GoBack';
import PrimaryBtn from '@/components/PrimaryBtn';
import { icons } from '@/constants';
import useRentStore from '@/store/rentStore';
import useMapStore from '@/store/store';
import { router } from 'expo-router';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Success = () => {
	const { setDriverStatus } = useRentStore();
	const { setLocationModal } = useMapStore();

	const handleSuccess = () => {
		router.push('/(tabs)/home');
		setDriverStatus(true);
		setLocationModal(false);
	};

	return (
		<SafeAreaView className="relative h-full px-5">
			<GoBack />
			<View className="justify-center items-center h-[80%]">
				<View className="w-full items-center">
					<Image source={icons.success} resizeMode="contain" className="w-[124px] h-[124px]" />
					<Text className="text-xl text-tertiary-100 text-center font-medium  mt-4">Thank you</Text>
					<View className="w-[180px]">
						<Text className="text-tertiary-100 text-xs text-center font-medium mt-2 text-wrap">
							Your booking has been placed sent to Md. Sharif Ahmed
						</Text>
					</View>
				</View>
			</View>
			<PrimaryBtn text="Confirm Ride" fn={handleSuccess} additionalStyle="w-full mt-auto mb-6" />
		</SafeAreaView>
	);
};

export default Success;
