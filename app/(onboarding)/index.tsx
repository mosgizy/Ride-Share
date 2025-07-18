import CircularProgress from '@/components/ProgressBar';
import { images } from '@/constants';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Location = () => {
	return (
		<SafeAreaView className="h-full px-5">
			<View className="items-end w-full py-9">
				<TouchableOpacity
					activeOpacity={0.75}
					onPress={() => router.push('/(auth)')}
					className="flex-wrap"
				>
					<Text className="text-lg text-primary-100 font-regular">Skip</Text>
				</TouchableOpacity>
			</View>
			<View>
				<Image source={images.anywhere} resizeMode="contain" className="w-full" />
				<View className="items-center">
					<Text className="text-2xl font-medium">Anywhere you are</Text>
					<Text className="text-sm font-medium text-center text-tertiary-400 w-[220px] mt-4">
						Sell houses easily with the help of Listenoryx and to make this line big I am writing
						more.
					</Text>
				</View>
			</View>
			<View className="relative mt-auto mb-20 w-full items-center">
				<CircularProgress percent={33.3} link={'/time'} />
			</View>
			{/* <StatusBar style="dark" /> */}
		</SafeAreaView>
	);
};

export default Location;
