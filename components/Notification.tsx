import React from 'react';
import { Text, View } from 'react-native';

interface notificationI {
	bg: string;
	type: string;
	text: string;
	time: string;
}

const Notification = ({ bg, type, text, time }: notificationI) => {
	return (
		<View className={`${bg && ' bg-primary-300 rounded-md'} px-6 py-3 gap-1`}>
			<Text className="font-medium">{type}</Text>
			<Text className="text-xs text-tertiary-800">{text}</Text>
			<Text className="text-xs text-tertiary-800">{time}</Text>
		</View>
	);
};

export default React.memo(Notification);
