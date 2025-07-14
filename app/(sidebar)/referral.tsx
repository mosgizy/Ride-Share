import GoBack from '@/components/GoBack';
import PrimaryBtn from '@/components/PrimaryBtn';
import { icons } from '@/constants';
import * as Clipboard from 'expo-clipboard';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Referral = () => {
	const text = 'RkMFucd';

	const copyToClipboard = async () => {
		await Clipboard.setStringAsync(text);
		Alert.alert('Copied to clipboard!');
	};

	return (
		<SafeAreaView className="h-full px-5">
			<GoBack title="Referral" />
			<Text className="text-tertiary-100 font-medium">Refer a friend and Earn $20</Text>
			<View className="border border-secondary-400 px-5 py-5 rounded-lg text-secondary-600 mt-3">
				<TouchableOpacity
					onPress={copyToClipboard}
					className="flex-row justify-between items-center"
				>
					<Text className="text-primary-100 font-medium">{text}</Text>
					<Image source={icons.copy} resizeMode="contain" className="w-6 h-6" />
				</TouchableOpacity>
			</View>
			<View className="px-4">
				<PrimaryBtn text="Invite" fn={() => {}} additionalStyle="mt-10" />
			</View>
		</SafeAreaView>
	);
};

export default Referral;
