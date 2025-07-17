import NavBar from '@/components/NavBar';
import PhoneNumberInput from '@/components/PhoneNumberInput';
import SecondaryBtn from '@/components/SecondayBtn';
import { icons, images } from '@/constants';
import useAuhStore from '@/store/authStore';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
	const { profile, setIsLoggedIn, setProfile } = useAuhStore();

	const [form, setForm] = useState({
		name: profile?.name,
		email: profile?.email,
		phoneNumber: profile?.phoneNumber.number,
		gender: 'male',
		image: profile?.image,
	});

	const [modal, setModal] = useState(false);

	const handleChange = (gender: string) => {
		setForm({ ...form, gender });
		setProfile({ ...profile, gender });
		setModal(false);
	};

	const openPicker = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ['images'],
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setForm({ ...form, image: result.assets[0] });
			setProfile({ ...profile, image: result.assets[0] });
		}
	};

	const handleSetPhoneNumber = useCallback((number: string, code: string) => {
		setForm({ ...form, phoneNumber: number });
	}, []);

	const logout = () => {
		setIsLoggedIn(false);
		router.push('/(auth)/login');
	};

	return (
		<SafeAreaView className="px-5 h-full">
			<NavBar text="Profile" />
			<View className="flex-row justify-center mt-8">
				<TouchableOpacity
					onPress={openPicker}
					className="relative items-center justify-center w-[121px] h-[121px] rounded-full bg-tertiary-300"
				>
					<Image
						source={form.image === null ? images.profile : { uri: form.image?.uri }}
						resizeMode="cover"
						className="w-[121px] h-[121px] rounded-full"
					/>

					<Image
						source={icons.camera}
						resizeMode="contain"
						className="absolute bottom-2 right-1 w-7 h-7"
					/>
				</TouchableOpacity>
			</View>
			<Text className="text-tertiary-100 text-center text-[28px] mt-6">{profile?.name}</Text>
			<View className="mt-6 gap-6">
				<View className="border border-secondary-400 px-5 py-5 rounded-lg text-secondary-600">
					<Text className="font-poppins">{profile?.email}</Text>
				</View>
				<PhoneNumberInput
					country={profile?.phoneNumber.countryCode}
					number={profile?.phoneNumber.number}
					setNumber={handleSetPhoneNumber}
				/>

				<View className="border border-secondary-400 px-5 py-4 rounded-lg text-secondary-600">
					<TouchableOpacity
						onPress={() => setModal(true)}
						className="flex-row justify-between items-center"
					>
						<Text className="text-tertiary-300 capitalize">{form.gender}</Text>
						<Image source={icons.arrowDown} resizeMode="contain" className="w-4 h-4" />
					</TouchableOpacity>
				</View>
				<Modal visible={modal} transparent animationType="slide">
					<TouchableOpacity
						onPressOut={() => setModal(false)}
						activeOpacity={1}
						className="flex-1 bg-black/30 justify-center items-center"
					>
						<View className="bg-white w-[80%] max-h-[50%] rounded-lg p-4">
							<Text className="text-lg font-semibold mb-2">Select Gender</Text>
							<View>
								<TouchableOpacity
									onPress={() => handleChange('male')}
									className="mt-2 bg-tertiary-300 px-2 py-1 rounded-md"
								>
									<Text className="capitalize">Male</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => handleChange('female')}
									className="mt-2 bg-tertiary-300 px-2 py-1 rounded-md"
								>
									<Text className="capitalize">Female</Text>
								</TouchableOpacity>
							</View>
						</View>
					</TouchableOpacity>
				</Modal>
				<View className="border border-secondary-400 px-5 py-5 rounded-lg text-secondary-600">
					<Text className="font-poppins">
						{profile?.city ? `${profile?.street}, ${profile?.city}` : 'Address'}
					</Text>
				</View>
			</View>
			<SecondaryBtn fn={logout} text="Logout" additionalStyle="mt-auto" />
		</SafeAreaView>
	);
};

export default Profile;
