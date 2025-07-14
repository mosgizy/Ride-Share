import GoBack from '@/components/GoBack';
import ModalTemplate from '@/components/Modal';
import PrimaryBtn from '@/components/PrimaryBtn';
import { icons } from '@/constants';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Complain = () => {
	const [toggle, setToggle] = useState(false);
	const [complaint, setComplaint] = useState('');

	return (
		<SafeAreaView className="h-full px-5">
			<GoBack title="Complain" />
			<View className="relative">
				<View className="border border-secondary-400 px-5 py-4 rounded-lg text-secondary-600 mt-4">
					<TouchableOpacity
						onPress={() => setToggle((prev) => !prev)}
						className="flex-row justify-between items-center"
					>
						<Text className="text-tertiary-300 capitalize">Vehicle not clean</Text>
						<Image source={icons.arrowDown} resizeMode="contain" className="w-4 h-4" />
					</TouchableOpacity>
				</View>
				<TextInput
					value={complaint}
					onChangeText={(e) => setComplaint(e)}
					placeholder="Write your complain here (minimum 10 characters)"
					placeholderTextColor={'#D0D0D0'}
					multiline
					numberOfLines={5}
					className="h-[118px] w-full border border-tertiary-300 rounded-xl align-top px-3 py-4 mt-4"
				/>
				<View className="px-4">
					<PrimaryBtn text="Submit" fn={() => setToggle(true)} additionalStyle="mt-12" />
				</View>
				<ModalTemplate status={toggle} close={() => setToggle(false)}>
					<>
						<View className="w-[60%] mx-auto mt-6">
							<Text className="text-center font-medium text-2xl text-primary-100">
								Send successful
							</Text>
							<Text className="text-center text-tertiary-800 text-sm font-medium mt-2">
								Your complain has been send successful
							</Text>
						</View>

						<View className="px-4 mb-3">
							<PrimaryBtn
								text="Back Home"
								fn={() => router.push('/home')}
								additionalStyle="mt-10 min-w-full"
							/>
						</View>
					</>
				</ModalTemplate>
			</View>
		</SafeAreaView>
	);
};

export default Complain;
