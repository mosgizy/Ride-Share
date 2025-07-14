import { Text, View } from 'react-native';
import SenderMessage from './SenderMessage';

const SenderContainer = ({ messages }: { messages: string[] }) => {
	return (
		<View className="gap-2 items-end w-full my-4">
			<View className="gap-2">
				{messages.map((message, index) => {
					return <SenderMessage key={index} text={message} />;
				})}
				<Text className="text-xs text-tertiary-1000 self-end mt-1">8:29 pm</Text>
			</View>
		</View>
	);
};

export default SenderContainer;
