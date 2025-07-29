import { Text, TouchableOpacity } from 'react-native';
import { Loader } from './Loader';

const PrimaryBtn = ({
	fn,
	text,
	additionalStyle,
	loading,
}: {
	fn: () => void;
	text: string;
	additionalStyle?: string;
	loading?: boolean;
}) => {
	return (
		<TouchableOpacity
			onPress={fn}
			activeOpacity={0.75}
			className={`${additionalStyle} bg-primary-200 px-8 py-6 rounded-xl items-center`}
		>
			{loading ? <Loader /> : <Text className="text-white font-medium">{text}</Text>}
		</TouchableOpacity>
	);
};

export default PrimaryBtn;
