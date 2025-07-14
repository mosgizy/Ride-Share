import GoBack from '@/components/GoBack';
import { images } from '@/constants';
import { router } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SelectTransport = () => {
	const transports = ['car', 'bike', 'cycle', 'taxi'];
	return (
		<SafeAreaView className="h-full px-5">
			<GoBack title="Select Transport" />
			<Text className="text-tertiary-100 text-2xl text-center font-semibold">
				Select your transport
			</Text>
			<ScrollView>
				<View className="mt-10 flex-row flex-wrap gap-5">
					{transports.map((transport, index) => {
						return (
							<TouchableOpacity
								activeOpacity={0.75}
								onPress={() => router.push('/cars')}
								key={index}
								className="justify-center items-center w-[47.8%] h-[160px] border border-primary rounded-lg bg-primary/15"
							>
								<Image
									source={images[transport]}
									resizeMode="contain"
									className="w-[74px] h-[74px]"
								/>
								<Text className="text-tertiary-100 font-medium capitalize">{transport}</Text>
							</TouchableOpacity>
						);
					})}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SelectTransport;
