import GoBack from '@/components/GoBack';
import RecieverContainer from '@/components/RecieverContainer';
import SenderContainer from '@/components/SenderContainer';
import { icons } from '@/constants';
import { Image, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Messaging = () => {
	const recieverChat = ['hello how are you doing', 'i have got a ride booked with you'];
	const senderChat = ['thanks for booking a ride, i&apos;m on my way.'];

	return (
		<SafeAreaView className="h-full px-4">
			<GoBack title="Chat" />
			<ScrollView className="mt-4">
				<RecieverContainer messages={recieverChat} />
				<SenderContainer messages={senderChat} />
			</ScrollView>
			<View className="flex-row gap-2 items-center mb-4">
				<TouchableOpacity activeOpacity={0.75}>
					<Image source={icons.addMedia} resizeMode="contain" className="w-6 h-6" />
				</TouchableOpacity>
				<View className="flex-1 flex-row items-center gap-4 px-3 py-1 border border-secondary-400 rounded-lg">
					<TextInput
						placeholder="Type your message"
						placeholderClassName="text-tertiary-300 font-medium"
						className="flex-1"
					/>
					<TouchableOpacity activeOpacity={0.75}>
						<Image source={icons.emojiSelector} resizeMode="contain" className="w-6 h-6" />
					</TouchableOpacity>
				</View>
				<TouchableOpacity activeOpacity={0.75}>
					<Image source={icons.send} resizeMode="contain" className="w-6 h-6" />
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default Messaging;
