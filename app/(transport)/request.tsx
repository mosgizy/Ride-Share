import FeedBackSlide from '@/components/FeedBackSlide';
import GoBack from '@/components/GoBack';
import ModalTemplate from '@/components/Modal';
import PaymentSucessModal from '@/components/PaymentSucessModal';
import PrimaryBtn from '@/components/PrimaryBtn';
import { icons } from '@/constants';
import useRentStore from '@/store/rentStore';
import useMapStore from '@/store/store';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Request = () => {
	const { addressFromTo, recentPlaces } = useMapStore();
	const { bookedCar, setDate: setStoreDate } = useRentStore();
	const { type } = useLocalSearchParams();

	const [date, setDate] = useState(new Date());
	const [showPicker, setShowPicker] = useState(false);
	const [mode, setMode] = useState<'date' | 'time'>('date');

	const [successModal, setSuccessModal] = useState(false);
	const [feedback, setFeedBack] = useState(false);

	const [showPrice, setShowPrice] = useState(false);

	const [thanks, setThanks] = useState(false);

	const onChange = (event, selectedDate) => {
		if (selectedDate) {
			setDate(selectedDate);
			setStoreDate(selectedDate);
		}
		setShowPicker(Platform.OS === 'ios');
	};

	const showMode = (currentMode: 'date' | 'time') => {
		setMode(currentMode);
		setShowPicker(true);
	};

	const handleBooking = () => {
		setShowPrice((prev) => !prev);

		if (showPrice && type === 'Request for rent') {
			router.push('/success');
		}
		if (type === 'payment') {
			setSuccessModal(true);
		}
	};

	const handleFeedBack = () => {
		setSuccessModal(false);
		setFeedBack(true);
	};

	const submitFeedback = () => {
		setFeedBack(false);
		setThanks(true);
	};

	const backHome = () => {
		router.push('/(tabs)/home');
		setThanks(false);
	};

	return (
		<>
			<SafeAreaView className="h-full px-5">
				<GoBack title={type as string} />
				<View className="relative px-5 py-6 pb-10 gap-10">
					<View className="flex-row justify-between items-start">
						<View className="flex-row gap-2">
							<Image source={icons.targetPointerRed} resizeMode="contain" className="h-6 w-6" />
							<View>
								<Text className="text-tertiary-100 font-medium">Current location</Text>
								<Text className="text-secondary-400 text-xs">{addressFromTo?.from}</Text>
							</View>
						</View>
					</View>
					<View className="flex-row justify-between items-start">
						<View className="flex-row gap-2">
							<Image source={icons.targetPointerSolid} resizeMode="contain" className="h-6 w-6" />
							<View>
								<Text className="text-tertiary-100 font-medium">Destination</Text>
								<Text className="text-secondary-400 text-xs">{addressFromTo?.to}</Text>
							</View>
						</View>
						<Text className="text-tertiary-100 text-sm">
							{recentPlaces[recentPlaces.length - 1]?.distance.toFixed(2)}km
						</Text>
					</View>
					<View className="absolute left-8 top-[2.85rem] w-[2px] h-[48px] border-l border-dashed border-primary"></View>
				</View>
				<View className="flex-row items-center justify-between p-4 rounded-lg bg-primary/15 border border-primary">
					<View>
						<Text className="text-tertiary-100 font-medium">{bookedCar?.name}</Text>
						<View className="flex-row gap-3 items-center mt-2">
							<Image source={icons.star} resizeMode="contain" className="w-5 h-5" />
							<Text className="text-sm text-secondary-400">
								{bookedCar?.rating} ({bookedCar?.reviews} reviews)
							</Text>
						</View>
					</View>
					<Image source={bookedCar?.image} resizeMode="contain" className="w-[93px] h-[54px]" />
				</View>
				{showPrice ? (
					<View className="mt-5">
						<Text className="text-tertiary-100 font-medium">Charge</Text>
						<View className="mt-4 flex-row justify-between items-center">
							<Text className="text-tertiary-100 text-[10px]">
								<Text className="text-sm">{bookedCar?.name}/</Text>per
							</Text>
							<Text>$200</Text>
						</View>
						<View className="mt-4 flex-row justify-between items-center">
							<Text className="text-tertiary-100 text-[10px]">
								<Text className="text-sm">VAT </Text>(5%)
							</Text>
							<Text>$20</Text>
						</View>
					</View>
				) : (
					<View className="gap-5 mt-5">
						<TouchableOpacity
							onPress={() => showMode('date')}
							className="border border-secondary-400 px-5 py-5 rounded-lg text-secondary-600"
						>
							<Text className="text-tertiary-300">{date.toDateString()}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => showMode('time')}
							className="border border-secondary-400 px-5 py-5 rounded-lg text-secondary-600"
						>
							<Text className="text-tertiary-300">{date.toLocaleTimeString()}</Text>
						</TouchableOpacity>
						{showPicker && (
							<DateTimePicker value={date} mode={mode} display="default" onChange={onChange} />
						)}
					</View>
				)}
				<View className="mt-8">
					<Text className="text-tertiary-100 text-lg font-semibold">Select payment method</Text>
					<View className="mt-7 gap-3">
						<View className="flex-row items-center gap-4 p-4 rounded-lg bg-primary/15 border border-primary">
							<Image source={icons.visa} resizeMode="contain" className="w-[45px] h-[35px]" />
							<View>
								<Text className="text-tertiary-100 font-medium">**** **** **** 8970</Text>
								<Text className="text-tertiary-400 text-sm font-medium">Expires: 12/26</Text>
							</View>
						</View>
						<View className="relative flex-row items-center gap-4 p-4 rounded-lg bg-primary/15 border border-primary">
							<Image source={icons.masterCard} resizeMode="contain" className="w-[45px] h-[35px]" />
							<View>
								<Text className="text-tertiary-100 font-medium">**** **** **** 8970</Text>
								<Text className="text-tertiary-400 text-sm font-medium">Expires: 12/26</Text>
							</View>
							<View className="absolute inset-0 bg-[#E2F5ED]/80 z-50"></View>
						</View>
						<View className="relative flex-row items-center gap-4 p-4 rounded-lg bg-primary/15 border border-primary">
							<Image source={icons.paypal} resizeMode="contain" className="w-[45px] h-[35px]" />
							<View>
								<Text className="text-tertiary-100 font-medium">mailaddress@mail.com</Text>
								<Text className="text-tertiary-400 text-sm font-medium">Expires: 12/26</Text>
							</View>
							<View className="absolute inset-0 bg-[#E2F5ED]/80 z-50"></View>
						</View>
						<View className="relative flex-row items-center gap-4 p-4 rounded-lg bg-primary/15 border border-primary">
							<Image source={icons.cash} resizeMode="contain" className="w-[45px] h-[35px]" />
							<View>
								<Text className="text-tertiary-100 font-medium">Cash</Text>
								<Text className="text-tertiary-400 text-sm font-medium">Expires: 12/26</Text>
							</View>
							<View className="absolute inset-0 bg-[#E2F5ED]/80 z-50"></View>
						</View>
					</View>
				</View>
				<View className="px-4">
					<PrimaryBtn text="Confirm Booking" fn={handleBooking} additionalStyle="mt-10" />
				</View>

				<PaymentSucessModal
					fn={() => setSuccessModal(false)}
					feedBack={handleFeedBack}
					successModal={successModal}
				/>

				<ModalTemplate status={thanks} close={() => setThanks(false)}>
					<>
						<View className="w-[60%] mx-auto mt-6">
							<Text className="text-center font-medium text-2xl text-primary-100">Thank you</Text>
							<Text className="text-center text-tertiary-800 text-sm font-medium mt-2">
								Thank you for your valuable feedback and tip
							</Text>
						</View>

						<View className="px-4">
							<PrimaryBtn text="Back Home" fn={backHome} additionalStyle="mt-10 min-w-full" />
						</View>
					</>
				</ModalTemplate>
			</SafeAreaView>
			<FeedBackSlide feedback={feedback} close={() => setFeedBack(false)} submit={submitFeedback} />
		</>
	);
};

export default Request;
