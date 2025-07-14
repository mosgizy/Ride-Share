import { icons, images } from '@/constants';
import useRentStore from '@/store/rentStore';
import { router } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import PrimaryBtn from './PrimaryBtn';
import SecondaryBtn from './SecondayBtn';
import SlideModal from './SlideModal';

const LocationScreenConfirm = () => {
	const { setDriverStatus, driverStatus, bookedCar } = useRentStore();
	const onClose = () => {
		setDriverStatus(false);
	};

	const handleContinue = () => {
		setDriverStatus(false);
		router.push('/(transport)/request?type=payment');
	};

	return (
		<>
			{driverStatus && (
				<View className="absolute inset-0 justify-end">
					<TouchableOpacity
						className="absolute inset-0 z-50 transistion-all"
						onPress={onClose}
						activeOpacity={1}
					></TouchableOpacity>
					<SlideModal status={driverStatus} onClose={onClose}>
						<>
							<Text className="text-tertiary-100 text-xl font-medium mt-6 border-b border-tertiary-900 pb-3 px-5">
								Your driver is coming in 3:35
							</Text>
							<View className="px-5 py-4 flex-row justify-between items-center border-b border-tertiary-900">
								<View className="flex-row items-center gap-3">
									<Image
										source={images.profile}
										resizeMode="contain"
										className="w-[54px] h-[59px]"
									/>
									<View>
										<Text className="text-tertiary-100 font-medium">Sergio Ramasis</Text>
										<View className="flex-row gap-1 py-1">
											<Image
												source={icons.targetPointerSolid}
												resizeMode="contain"
												className="w-4 h-4"
											/>
											<Text className="text-tertiary-400 text-[10px]">800m (5mins away)</Text>
										</View>
										<View className="flex-row gap-1">
											<Image source={icons.star} resizeMode="contain" className="w-3 h-3" />
											<Text className="text-tertiary-400 text-[10px]">800m (5mins away)</Text>
										</View>
									</View>
								</View>
								<Image
									source={bookedCar?.image}
									resizeMode="contain"
									className="w-[93px] h-[54px]"
								/>
							</View>
							<View className="px-5 py-5">
								<View className="flex-row items-center justify-between">
									<Text className="text-tertiary-100 font-medium">Payment method</Text>
									<Text className="text-tertiary-100 font-medium text-[28px]">$220.00</Text>
								</View>
								<View className="flex-row items-center gap-4 my-6 p-4 rounded-lg bg-primary/15 border border-primary">
									<Image source={icons.visa} resizeMode="contain" className="w-[45px] h-[35px]" />
									<View>
										<Text className="text-tertiary-100 font-medium">**** **** **** 8970</Text>
										<Text className="text-tertiary-400 text-sm font-medium">Expires: 12/26</Text>
									</View>
								</View>
							</View>
							<View className="flex-row gap-3 px-5">
								<SecondaryBtn
									text="Call"
									fn={() => router.push('/(chat)/calling')}
									additionalStyle="flex-1"
								/>
								<PrimaryBtn
									text="Message"
									fn={() => router.push('/(chat)/messaging')}
									additionalStyle="flex-1"
								/>
							</View>
							<View className="px-5">
								<PrimaryBtn
									text="Continue"
									fn={handleContinue}
									additionalStyle="flex-1 mb-14 mt-4"
								/>
							</View>
						</>
					</SlideModal>
				</View>
			)}
		</>
	);
};

export default LocationScreenConfirm;
