import { icons } from '@/constants';
import { countryI, countries as rawCountries } from '@/lib/countryCodes';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

const countries = rawCountries.map((country) => ({
	...country,
	image: `https://flagcdn.com/w40/${country.code.toLowerCase()}.png`,
}));

export default function PhoneInputWithDropdown({
	number,
	country,
	setNumber,
}: {
	country?: string;
	number?: string;
	setNumber: (number: string, code: string) => void;
}) {
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedCountry, setSelectedCountry] = useState(countries[0]);

	const handleSelect = (country: countryI) => {
		setSelectedCountry(country);
		setModalVisible(false);
	};

	useEffect(() => {
		if (country) {
			const [newCountry] = rawCountries.filter((rawCountry) => rawCountry.code === country);
			setSelectedCountry({
				...newCountry,
				image: `https://flagcdn.com/w40/${country.toLowerCase()}.png`,
			});
		}
	}, []);

	return (
		<>
			<View className="flex-row items-center border border-secondary-400 pl-2 pr-5 py-[0.35rem] rounded-lg text-secondary-600">
				<TouchableOpacity
					onPress={() => setModalVisible(true)}
					className="flex-row items-center gap-3 py-2"
				>
					<Image source={{ uri: selectedCountry.image }} className="w-6 h-4 rounded-sm" />
					<Image source={icons.arrowDown} resizeMode="contain" className="w-4 h-4" />
				</TouchableOpacity>

				<View className="w-px h-6 bg-gray-300 mx-2" />

				<Text className="text-black font-semibold mr-2">{selectedCountry.dialCodes}</Text>

				<TextInput
					placeholder="Your mobile number"
					placeholderTextColor={'#D0D0D0'}
					keyboardType="number-pad"
					className="flex-1 text-base text-black"
					value={number}
					{...(setNumber && {
						onChangeText: (e) => setNumber(e, selectedCountry.code),
					})}
				/>
			</View>

			<Modal visible={modalVisible} transparent animationType="slide">
				<TouchableOpacity
					className="flex-1 bg-black/30 justify-center items-center"
					activeOpacity={1}
					onPressOut={() => setModalVisible(false)}
				>
					<View className="w-[80%] max-h-[50%] bg-white rounded-lg p-4">
						<Text className="text-lg font-semibold mb-2">Select Country</Text>
						<FlatList
							data={countries}
							keyExtractor={(item) => item.code}
							renderItem={({ item }) => (
								<TouchableOpacity
									className="flex-row items-center py-2"
									onPress={() => handleSelect(item)}
								>
									<Image source={{ uri: item.image }} className="w-6 h-4 mr-3" />
									<Text className="text-black">
										{item.name} ({item.dialCodes})
									</Text>
								</TouchableOpacity>
							)}
						/>
					</View>
				</TouchableOpacity>
			</Modal>
		</>
	);
}
