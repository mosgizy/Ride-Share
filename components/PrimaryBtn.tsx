import { Text, TouchableOpacity } from 'react-native';

const PrimaryBtn = ({
	fn,
	text,
	additionalStyle,
}: {
	fn: () => void;
	text: string;
	additionalStyle?: string;
}) => {
	return (
		<TouchableOpacity
			onPress={fn}
			activeOpacity={0.75}
			className={`${additionalStyle} bg-primary-200 px-8 py-6 rounded-xl items-center`}
		>
			<Text className="text-white font-medium">{text}</Text>
		</TouchableOpacity>
	);
};

export default PrimaryBtn;
