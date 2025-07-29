import GoBack from '@/components/GoBack';
import PhoneNumberInput from '@/components/PhoneNumberInput';
import PrimaryBtn from '@/components/PrimaryBtn';
import SecondaryBtn from '@/components/SecondayBtn';
import { icons, images } from '@/constants';
import { imagePicker } from '@/helper/imagePicker';
import { saveUserProfile } from '@/helper/saveUserProfile';
import { uploadAvatar } from '@/helper/uploadAvatar';
import useGetUserData from '@/hooks/getUserData';
import { supabase } from '@/lib/supabase';
import useAuhStore from '@/store/authStore';
import useMapStore from '@/store/store';
import axios from 'axios';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, Image, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
	const { profile } = useAuhStore();

	const [form, setForm] = useState({
		name: profile?.name,
		email: profile?.email,
		phoneNumber: profile?.phoneNumber.number,
		city: '',
		street: '',
		image: null,
	});

	const [modal, setModal] = useState(false);
	const [numberCode, setNumberCode] = useState<string>(profile.phoneNumber.numberCode as string);
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchCities = async () => {
		try {
			const response = await axios.get(
				`https://country-state-city-search-rest-api.p.rapidapi.com/cities-by-countrycode`,
				{
					params: { countrycode: profile?.phoneNumber.countryCode },
					headers: {
						'X-RapidAPI-Key': process.env.EXPO_PUBLIC_STATE_KEY,
						'X-RapidAPI-Host': 'country-state-city-search-rest-api.p.rapidapi.com',
					},
				}
			);

			setResults(response.data);
		} catch (err) {
			console.error(err);
		}
	};

	const handleChange = (city: string) => {
		setForm({ ...form, city });
		setModal(false);
	};

	const [image, setImage] = useState<string>('');
	const { setAvatarPath } = useMapStore();
	const { status: fetchStatus, getUserData } = useGetUserData();

	const openPicker = async () => {
		const imageUrl = await imagePicker();

		if (!imageUrl) return;

		const {
			data: { user },
		} = await supabase.auth.getUser();

		const { error, path } = await uploadAvatar(imageUrl?.uri, user!.id);

		if (!path && error) {
			console.log(error);
			return;
		}

		setAvatarPath(path as string);

		supabase.storage
			.from('avatars')
			.download(path as string)
			.then(({ data }) => {
				const fr = new FileReader();
				fr.readAsDataURL(data!);
				fr.onload = () => {
					setImage(fr.result as string);
				};
			});
	};

	const [countryCode, setCountryCode] = useState(profile?.phoneNumber.countryCode);

	const handleSetPhoneNumber = (number: string, code: string, numberCode?: string | [string]) => {
		setForm({ ...form, phoneNumber: number });
		setCountryCode(code);
		numberCode && setNumberCode(numberCode[0]);
	};

	const handleSave = async () => {
		setLoading(true);
		const profileInfo = {
			name: form.name as string,
			email: form.email as string,
			avatar_url: image,
			gender: profile.gender,
			phoneNumber: {
				countryCode: countryCode as string,
				number: form.phoneNumber as string,
				numberCode,
			},
			city: form.city,
			street: form.street,
			terms: profile.terms,
		};

		const { status } = await saveUserProfile(profileInfo);

		if (!status) {
			setLoading(false);
			return;
		}

		await getUserData();

		if (!fetchStatus.status) console.log(fetchStatus.error);
		setLoading(false);

		router.push('/home');
	};

	useEffect(() => {
		fetchCities();
	}, []);

	return (
		<SafeAreaView className="h-full px-5">
			<GoBack title="Profile" />
			<View className="flex-row justify-center mt-8">
				<TouchableOpacity
					onPress={openPicker}
					className="relative items-center justify-center w-[121px] h-[121px] rounded-full bg-tertiary-300"
				>
					<Image
						source={image === '' ? images.profile : { uri: image }}
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
			<View className="mt-10 gap-6">
				<TextInput
					value={form.name}
					onChangeText={(e) => setForm({ ...form, name: e })}
					placeholder="Full Name"
					placeholderTextColor={'#D0D0D0'}
					className="border border-secondary-400 px-5 py-4 rounded-lg text-secondary-600"
				/>
				<PhoneNumberInput
					country={profile?.phoneNumber.countryCode}
					number={profile?.phoneNumber.number}
					setData={handleSetPhoneNumber}
				/>
				<TextInput
					value={form.email}
					onChangeText={(e) => setForm({ ...form, email: e })}
					placeholder="Email"
					placeholderTextColor={'#D0D0D0'}
					className="border border-secondary-400 px-5 py-4 rounded-lg text-secondary-600"
				/>
				<TextInput
					value={form.street}
					onChangeText={(e) => setForm({ ...form, street: e })}
					placeholder="Street"
					placeholderTextColor={'#D0D0D0'}
					className="border border-secondary-400 px-5 py-4 rounded-lg text-secondary-600"
				/>

				<View className="border border-secondary-400 px-5 py-4 rounded-lg text-secondary-600">
					<TouchableOpacity
						onPress={() => setModal(true)}
						className="flex-row justify-between items-center"
					>
						<Text className="text-tertiary-300 capitalize">{form.city}</Text>
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
							<Text className="text-lg font-semibold mb-2">Select Your City</Text>
							<FlatList
								data={results}
								keyExtractor={(item) => item.latitude}
								renderItem={({ item }) => (
									<TouchableOpacity
										onPress={() => handleChange(item.name)}
										className="mt-2 bg-tertiary-300 px-2 py-1 rounded-md"
									>
										<Text className="capitalize">{item.name}</Text>
									</TouchableOpacity>
								)}
							/>
						</View>
					</TouchableOpacity>
				</Modal>
			</View>
			<View className="mt-auto mb-12 flex-row gap-3">
				<SecondaryBtn
					fn={() => router.push('/set-password')}
					text="Cancel"
					additionalStyle="flex-1"
				/>
				<PrimaryBtn fn={handleSave} text="Save" loading={loading} additionalStyle="flex-1" />
			</View>
			<StatusBar style="dark" translucent />
		</SafeAreaView>
	);
};

export default Profile;
