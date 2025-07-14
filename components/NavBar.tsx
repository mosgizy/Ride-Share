import { icons } from '@/constants';
import useMapStore from '@/store/store';
import { router } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const NavBar = ({ text, noNotification }: { text?: string; noNotification?: boolean }) => {
	const { setSideBarModal } = useMapStore();

	return (
		<>
			<View className="z-20 w-full flex-row items-center justify-between mt-8">
				<TouchableOpacity
					onPress={() => setSideBarModal(true)}
					activeOpacity={0.75}
					className="bg-tertiary-700 p-2 rounded-lg"
				>
					<Image source={icons.hamburger} resizeMode="contain" className="w-6 h-6" />
				</TouchableOpacity>
				{text && <Text className="font-medium text-tertiary-200 text-lg">{text}</Text>}
				{noNotification ? (
					<TouchableOpacity
						onPress={() => router.push('/notification')}
						activeOpacity={0.75}
						className="bg-white p-2 rounded-lg"
					>
						<Image source={icons.bell} resizeMode="contain" className="w-6 h-6" />
					</TouchableOpacity>
				) : (
					<View></View>
				)}
			</View>
		</>
	);
};

export default NavBar;
