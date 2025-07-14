import { icons } from '@/constants';
import { useNavigation } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const GoBack = ({ title }: { title?: string }) => {
	const navigation = useNavigation();
	return (
		<View className="w-full py-8 flex-row items-center justify-between">
			<TouchableOpacity
				activeOpacity={0.75}
				onPress={() => navigation.goBack()}
				className="flex-wrap justify-center gap-2 flex-row items-center"
			>
				<Image source={icons.arrowLeft} resizeMode="contain" className="w-4 h-4" />
				<Text className="text-lg text-primary-100 font-regular">Back</Text>
			</TouchableOpacity>
			{title && <Text className="text-lg font-medium">{title}</Text>}
			<Text className="opacity-0">asterisk</Text>
		</View>
	);
};

export default GoBack;
