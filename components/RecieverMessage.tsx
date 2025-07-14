import { Text } from 'react-native';

const RecieverMessage = ({ text }: { text: string }) => {
	return (
		<Text className="self-start text-tertiary-100 text-sm py-5 rounded-r-2xl rounded-b-2xl px-4 bg-[#E8E8E8]">
			{text}
		</Text>
	);
};

export default RecieverMessage;
