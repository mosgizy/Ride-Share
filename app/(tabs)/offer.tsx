import NavBar from '@/components/NavBar';
import PrimaryBtn from '@/components/PrimaryBtn';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Offer = () => {
	return (
		<SafeAreaView className="px-5 h-full">
			<NavBar text="Favourite" />
			<ScrollView className="mt-10">
				<View className="rounded-lg border border-primary py-3 px-4 mb-6 flex-row justify-between">
					<View>
						<Text className="text-secondary-800 font-medium">15% off</Text>
						<Text className="text-xs text-secondary-400 font-medium mt-2">Black Friday</Text>
					</View>
					<PrimaryBtn text="Collect" fn={() => {}} additionalStyle="!py-4 !px-12" />
				</View>
				<View className="rounded-lg border border-primary py-3 px-4 mb-6 flex-row justify-between">
					<View>
						<Text className="text-secondary-800 font-medium">15% off</Text>
						<Text className="text-xs text-secondary-400 font-medium mt-2">Black Friday</Text>
					</View>
					<PrimaryBtn text="Collect" fn={() => {}} additionalStyle="!py-4 !px-12" />
				</View>
				<View className="rounded-lg border border-primary py-3 px-4 mb-6 flex-row justify-between">
					<View>
						<Text className="text-secondary-800 font-medium">15% off</Text>
						<Text className="text-xs text-secondary-400 font-medium mt-2">Black Friday</Text>
					</View>
					<PrimaryBtn text="Collect" fn={() => {}} additionalStyle="!py-4 !px-12" />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Offer;
