import { images } from '@/constants';
import React from 'react';
import { Image, Text, View } from 'react-native';
import RecieverMessage from './RecieverMessage';

const RecieverContainer = ({ messages }: { messages: string[] }) => {
	return (
		<View className="flex-row gap-3 my-4">
			<Image source={images.profile} resizeMode="contain" className="w-9 h-9" />
			<View className="gap-2">
				{messages.map((message, index) => {
					return <RecieverMessage key={index} text={message} />;
				})}
				<Text className="text-xs text-tertiary-1000 mt-1">8:29 pm</Text>
			</View>
		</View>
	);
};

export default RecieverContainer;
