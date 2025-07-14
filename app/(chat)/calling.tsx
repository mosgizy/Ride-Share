import GoBack from '@/components/GoBack';
import { icons, images } from '@/constants';
import { StatusBar } from 'expo-status-bar';
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Icon = ({
	icon,
	additionalStyles,
}: {
	icon: ImageSourcePropType;
	additionalStyles?: string;
}) => {
	return (
		<TouchableOpacity
			className={`${
				additionalStyles ? additionalStyles : 'w-[50px] h-[50px] bg-tertiary-600'
			} rounded-full justify-center items-center`}
		>
			<Image
				source={icon}
				resizeMode="contain"
				className={`${additionalStyles ? 'w-[42px] h-[42px]' : 'w-6 h-6'}`}
			/>
		</TouchableOpacity>
	);
};

const Calling = () => {
	return (
		<SafeAreaView className="h-full px-4">
			<GoBack />
			<View>
				<View className="items-center justify-center h-[70vh]">
					<Image source={images.profile} resizeMode="contain" className="w-[100px] h-[100px]" />
					<Text className="text-tertiary-100 text-[28px] font-medium mt-5 mb-3">
						Sergio Ramasis
					</Text>
					<Text className="text-sm text-secondary-400">Calling....</Text>
				</View>
			</View>
			<View className="flex-row justify-between items-center mt-auto mb-6">
				<Icon icon={icons.imagePicker} />
				<Icon icon={icons.voiceRecoder} />
				<Icon icon={icons.call} additionalStyles="w-[70px] h-[70px] bg-secondary-700" />
				<Icon icon={icons.videoRecoder} />
				<Icon icon={icons.moreOptions} />
			</View>
			<StatusBar style="dark" translucent />
		</SafeAreaView>
	);
};

export default Calling;
