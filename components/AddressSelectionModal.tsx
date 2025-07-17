import { icons } from '@/constants';
import { getAddressFromCoords } from '@/helper/getAddressFromCord';
import { MapCoordinate } from '@/lib/interface';
import useMapStore from '@/store/store';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import InputWIthIcon from './InputWIthIcon';
import PrimaryBtn from './PrimaryBtn';
import SlideModal from './SlideModal';

const AddressSelectionModal = () => {
	const {
		locationModal,
		setLocationModal,
		destination: userDestination,
		setAddressFromTo,
		userLocation,
		recentPlaces,
	} = useMapStore();

	const [address, setAddress] = useState({ from: '', to: '' });

	const handleAddress = async (location: MapCoordinate, type: 'from' | 'to') => {
		if (!location) {
			type === 'to' && Alert.alert('please select destination on the map');
			type === 'from' && Alert.alert('Location invalid, please allow access to location');
			return;
		}
		const address = await getAddressFromCoords(location);

		if (address) {
			setAddress((prev) => ({ ...prev, [type]: address }));
		}
	};

	const onClose = () => {
		setLocationModal(false);
	};

	useEffect(() => {
		setAddressFromTo(address);
	}, [address]);

	useEffect(() => {
		(async () => {
			const address = await getAddressFromCoords(userLocation);
			if (address) setAddress((prev) => ({ ...prev, from: address }));
		})();
	}, []);

	return (
		<View className="absolute inset-0 justify-end">
			<TouchableOpacity
				onPress={onClose}
				activeOpacity={1}
				className={`${locationModal && 'absolute z-30 inset-0 bg-black/40 transistion-all'}`}
			></TouchableOpacity>
			<SlideModal status={locationModal} onClose={onClose}>
				<>
					<Text className="text-tertiary-100 text-xl text-center font-medium mt-6 border-b border-[#DDDDDD] pb-2">
						Select address
					</Text>
					{address.to === '' ? (
						<View>
							<View className="px-5 py-6 gap-5 border-b border-tertiary-900">
								<InputWIthIcon
									icon={icons.from}
									text="From"
									fn={() => handleAddress(userLocation, 'from')}
									address={'Current location'}
								/>
								<InputWIthIcon
									icon={icons.targetPointer}
									text="To"
									fn={() => handleAddress(userDestination, 'to')}
									address={address.to}
								/>
							</View>
							<View className="px-5 pt-5 pb-10 text-tertiary-100 font-medium">
								<Text className="font-poppins">Recent Places</Text>
								<View className="my-2 gap-3">
									{recentPlaces.length === 0 ? (
										<Text className="text-lg font-medium text-primary-100 text-center">
											No places saved yet, please select destination on the map
										</Text>
									) : (
										recentPlaces?.map((places, index) => (
											<View key={index} className="flex-row justify-between items-start">
												<View className="flex-row gap-2">
													<Image
														source={icons.targetPointerSolid}
														resizeMode="contain"
														className="h-6 w-6"
													/>
													<View>
														<Text className="text-tertiary-100 font-medium">Office</Text>
														<Text className="text-secondary-400 text-xs">{places.address}</Text>
													</View>
												</View>
												<Text className="text-tertiary-100 text-sm">
													{places.distance.toFixed(2)}km
												</Text>
											</View>
										))
									)}
								</View>
							</View>
						</View>
					) : (
						<View className="relative px-5 py-6 pb-10 gap-10">
							<View className="flex-row justify-between items-start">
								<View className="flex-row gap-2">
									<Image source={icons.targetPointerRed} resizeMode="contain" className="h-6 w-6" />
									<View>
										<Text className="text-tertiary-100 font-medium">Current location</Text>
										<Text className="text-secondary-400 text-xs">{address.from}</Text>
									</View>
								</View>
							</View>
							<View className="flex-row justify-between items-start">
								<View className="flex-row gap-2">
									<Image
										source={icons.targetPointerSolid}
										resizeMode="contain"
										className="h-6 w-6"
									/>
									<View>
										<Text className="text-tertiary-100 font-medium">Destination</Text>
										<Text className="text-secondary-400 text-xs">{address.to}</Text>
									</View>
								</View>
								<Text className="text-tertiary-100 text-sm">
									{recentPlaces[recentPlaces.length - 1].distance.toFixed(2)}km
								</Text>
							</View>
							<View className="absolute left-8 top-[2.85rem] w-[2px] h-[48px] border-l border-dashed border-primary"></View>
							<PrimaryBtn text="Confirm Location" fn={() => router.push('/select-transport')} />
						</View>
					)}
				</>
			</SlideModal>
		</View>
	);
};

export default AddressSelectionModal;
