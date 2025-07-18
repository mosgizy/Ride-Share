import CircularProgress from '@/components/ProgressBar';
import { images } from '@/constants';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Book = () => {
	return (
		<SafeAreaView className="h-full px-5 flex-col">
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
				<Image source={images.time} resizeMode="contain" className="w-full" />
				<View className="items-center">
					<Text className="text-2xl font-medium">Book your car</Text>
					<Text className="text-sm font-medium text-center text-tertiary-400 w-[220px] mt-4">
						Sell houses easily with the help of Listenoryx and to make this line big I am writing
						more.
					</Text>
				</View>
			</View>
			<View className="mt-auto mb-20 w-full items-center">
				<CircularProgress percent={100} link={'/(auth)'} end />
			</View>
			{/* <StatusBar style="dark" /> */}
		</SafeAreaView>
	);
};

export default Book;
