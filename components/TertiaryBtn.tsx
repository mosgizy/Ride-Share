import { Image, Text, TouchableOpacity } from 'react-native';

const TertiaryBtn = ({
	fn,
	text,
	additionalStyle,
	image,
}: {
	fn: () => void;
	text: string;
	additionalStyle?: string;
	image: any;
}) => {
	return (
		<TouchableOpacity
			onPress={fn}
			activeOpacity={0.75}
			className={`${additionalStyle} flex-row justify-center gap-3 border border-tertiary-300 px-8 py-3 rounded-xl min-w-full items-center`}
		>
			<Image source={image} resizeMode="contain" className="w-6 h-6" />
			<Text className="text-tertiary-100 font-medium">{text}</Text>
		</TouchableOpacity>
	);
};

export default TertiaryBtn;
