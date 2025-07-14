import { icons } from '@/constants';
import useAuhStore from '@/store/authStore';
import React from 'react';
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';

interface LangSel {
	country: string;
	icon: ImageSourcePropType;
	language: string;
}

const LanguageSelect = ({ country, icon, language }: LangSel) => {
	const { setLanguageSelected, languageSelected } = useAuhStore();

	return (
		<TouchableOpacity
			onPress={() => setLanguageSelected(language)}
			className={`${
				languageSelected === language ? 'border-primary' : ''
			} border rounded-xl py-5 px-3 flex-row justify-between items-center mb-5`}
		>
			<View className="flex-row gap-4">
				<Image source={icon} resizeMode="contain" className="w-[46px] h-[32px]" />
				<View>
					<Text className="text-tertiary-100 font-medium">{language}</Text>
					<Text className="text-tertiary-100 text-xs">{country}</Text>
				</View>
			</View>
			<Image
				source={languageSelected === language ? icons.checkMarked : icons.unmark}
				resizeMode="contain"
				className="w-6 h-6"
			/>
		</TouchableOpacity>
	);
};

export default LanguageSelect;
