import { Text } from 'react-native';

const SenderMessage = ({ text }: { text: string }) => {
	return (
		<Text className="bg-primary/15 border border-primary self-start text-tertiary-100 text-sm py-5 rounded-l-2xl rounded-b-2xl px-4">
			{text}
		</Text>
	);
};

export default SenderMessage;
