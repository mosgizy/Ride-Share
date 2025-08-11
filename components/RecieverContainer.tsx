import { images } from '@/constants';
import React from 'react';
import { Image, Text, View } from 'react-native';

const RecieverContainer = ({ message, time }: { message: string; time: string }) => {
	return (
		<View className="flex-row gap-3 my-4">
			<Image source={images.profile} resizeMode="contain" className="w-9 h-9" />
			<View className="gap-2">
				<Text className="self-start text-tertiary-100 text-sm py-5 rounded-r-2xl rounded-b-2xl px-4 bg-[#E8E8E8]">
					{message}
				</Text>
				<Text className="text-xs text-tertiary-1000">{time}</Text>
			</View>
		</View>
	);
};

export default RecieverContainer;
