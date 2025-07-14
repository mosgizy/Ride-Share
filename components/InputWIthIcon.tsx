import { icons } from '@/constants';
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';

interface inputI {
	icon: ImageSourcePropType;
	fn?: () => void;
	text: string;
	type?: 'secondary' | 'primary';
	address: string;
}

const InputWIthIcon = ({ icon, fn, text, address, type = 'primary' }: inputI) => {
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={fn}
			className={`${
				type === 'primary' ? 'border-tertiary-100' : 'border-primary'
			} flex-row items-center gap-2 justify-between px-3 py-4 border rounded-lg overflow-hidden`}
		>
			<View className="flex-row items-center gap-2">
				<Image source={icon} resizeMode="contain" className="w-6 h-6" />
				<Text className="pr-3 text-tertiary-400">{address !== '' ? address : text}</Text>
			</View>
			{address !== '' && text === 'From' && (
				<Image source={icons.targetRed} resizeMode="contain" className="w-6 h-6" />
			)}
		</TouchableOpacity>
	);
};

export default InputWIthIcon;
