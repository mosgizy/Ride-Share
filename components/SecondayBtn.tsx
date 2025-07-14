import { Text, TouchableOpacity } from 'react-native';

const SecondaryBtn = ({
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
			className={`${additionalStyle} border border-primary px-8 py-6 rounded-xl items-center`}
		>
			<Text className="text-primary-200 font-medium">{text}</Text>
		</TouchableOpacity>
	);
};

export default SecondaryBtn;
