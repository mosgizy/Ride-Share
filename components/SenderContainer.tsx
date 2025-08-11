import { Text, View } from 'react-native';

const SenderContainer = ({ message, time }: { message: string; time: string }) => {
	return (
		<View className="gap-2 items-end w-full my-4">
			<View className="gap-2">
				<Text className="bg-primary/15 border border-primary self-start text-tertiary-100 text-sm py-5 rounded-l-2xl rounded-b-2xl px-4">
					{message}
				</Text>
				<Text className="text-xs text-tertiary-1000 self-end">{time}</Text>
			</View>
		</View>
	);
};

export default SenderContainer;
