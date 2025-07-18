import GoBack from '@/components/GoBack';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DeleteAccount = () => {
	return (
		<SafeAreaView className="h-full px-5">
			<GoBack title="Delete Account" />

			<View>
				<Text className="text-justify text-tertiary-1000 leading-7">
					Are you sure you want to delete your account? Please read how account deletion will
					affect.
				</Text>
				<Text className="text-justify text-tertiary-1000 leading-7">
					Deleting your account removes personal information our database. Tour email becomes
					permanently reserved and same email cannot be re-use to register a new account.
				</Text>
			</View>
			<TouchableOpacity
				activeOpacity={0.75}
				className={`bg-secondary-300 px-8 py-6 rounded-xl items-center mt-10 mx-3`}
			>
				<Text className="text-white font-medium">Delete</Text>
			</TouchableOpacity>
			<StatusBar style="dark" />
		</SafeAreaView>
	);
};

export default DeleteAccount;
