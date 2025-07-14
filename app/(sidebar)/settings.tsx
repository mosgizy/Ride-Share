import GoBack from '@/components/GoBack';
import { icons } from '@/constants';
import { RelativePathString, router } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = () => {
	const settingsOptions = [
		{ title: 'Change Password', url: '/change-password' },
		{ title: 'Change Language', url: '/change-language' },
		{ title: 'Privacy Policy', url: '/privacy-policy' },
		{ title: 'Contact Us', url: '/contact-us' },
		{ title: 'Delete Account', url: '/delete-account' },
	];

	return (
		<SafeAreaView className="h-full px-5">
			<GoBack title="Settings" />
			<View className="gap-5">
				{settingsOptions.map((option, index) => {
					return (
						<TouchableOpacity
							onPress={() => router.push(option.url as RelativePathString)}
							key={index}
							className="border border-primary rounded-lg px-3 py-4 flex-row justify-between"
						>
							<Text className="text-primary-100 text-sm font-medium">{option.title}</Text>
							<Image source={icons.chevRight} resizeMode="contain" className="w-6 h-6" />
						</TouchableOpacity>
					);
				})}
			</View>
		</SafeAreaView>
	);
};

export default Settings;
