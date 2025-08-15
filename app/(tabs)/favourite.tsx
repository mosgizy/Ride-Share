import NavBar from '@/components/NavBar';
import { icons } from '@/constants';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Favourite = () => {
	return (
		<SafeAreaView className="h-full px-5">
			<NavBar text="Favourite" />
			<ScrollView>
				<View className="mt-10 gap-6">
					<View className="justify-between flex-row gap-4 px-5 py-4 border border-tertiary-600 rounded-2xl">
						<View className="flex-row gap-2">
							<Image source={icons.targetPointerSolid} resizeMode="contain" className="w-6 h-6" />
							<View>
								<Text className="text-primary-100 font-medium">Office</Text>
								<Text className="text-xs text-secondary-400 mt-1">
									2972 Westheimer Rd. Santa Ana, Illinois 85486{' '}
								</Text>
							</View>
						</View>
						<TouchableOpacity activeOpacity={0.7}>
							<Image source={icons.deleteIcon} resizeMode="contain" className="w-6 h-6" />
						</TouchableOpacity>
					</View>
					<View className="justify-between flex-row gap-4 px-5 py-4 border border-tertiary-600 rounded-2xl">
						<View className="flex-row gap-2">
							<Image source={icons.targetPointerSolid} resizeMode="contain" className="w-6 h-6" />
							<View>
								<Text className="text-primary-100 font-medium">Office</Text>
								<Text className="text-xs text-secondary-400 mt-1">
									2972 Westheimer Rd. Santa Ana, Illinois 85486{' '}
								</Text>
							</View>
						</View>
						<TouchableOpacity activeOpacity={0.7}>
							<Image source={icons.deleteIcon} resizeMode="contain" className="w-6 h-6" />
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Favourite;
