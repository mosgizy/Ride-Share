import NavBar from '@/components/NavBar';
import PhoneNumberInput from '@/components/PhoneNumberInput';
import SecondaryBtn from '@/components/SecondayBtn';
import { icons, images } from '@/constants';
import { imagePicker } from '@/helper/imagePicker';
import { uploadAvatar } from '@/helper/uploadAvatar';
import { supabase } from '@/lib/supabase';
import useAuhStore from '@/store/authStore';
import useMapStore from '@/store/store';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
	const { profile, setIsLoggedIn, setProfile, logoutUser } = useAuhStore();
	const { avatarPath, setAvatarPath } = useMapStore();

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

	const [image, setImage] = useState<string>(profile.image as string);

	const openPicker = async () => {
		const imageUrl = await imagePicker();

		if (!imageUrl) return;
		const {
			data: { user },
		} = await supabase.auth.getUser();

		const { error, path } = await uploadAvatar(imageUrl?.uri, user!.id);

		if (path && path !== avatarPath) {
			setAvatarPath(path);
		}

		if (error) {
			console.log(error);
			return;
		}

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

		await supabase.storage.from('avatars').remove([avatarPath]);
	};

	const uploadImageToUser = async (imageUrl: string, email: string) => {
		const { error } = await supabase
			.from('users')
			.update({ avatar_url: imageUrl })
			.eq('email', email);

		if (error) return { status: false, error };

		return { status: true, error };
	};

	const handleSetPhoneNumber = useCallback(
		async (number: string, code: string, numberCode?: string) => {
			// const newPhoneNumber = {
			// 	number,
			// 	countryCode: code,
			// 	numberCode,
			// };

			// const { error, data } = await supabase
			// 	.from('users')
			// 	.update({
			// 		phoneNumber: newPhoneNumber,
			// 	})
			// 	.eq('email', profile.email);

			// if (error) {
			// 	Alert.alert('Something went wrong', error.message);
			// 	return;
			// }

			// console.log(data);

			setForm({ ...form, phoneNumber: number });
		},
		[]
	);

	const logout = () => {
		setIsLoggedIn(false);
		logoutUser();
		router.push('/(auth)/login');
	};

	useEffect(() => {
		if (image !== profile.image) {
			setForm({ ...form, image: image });
			setProfile({ ...profile, image: image });
			uploadImageToUser(image, profile.email);
		}
	}, [image]);

	useEffect(() => {
		const channel = supabase.channel('user-channel');
		channel
			.on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, (payload) => {
				const updatedUser = payload.new;
				const newUser = {
					name: updatedUser.name as string,
					email: updatedUser.email as string,
					image: updatedUser.avatar_Url,
					gender: updatedUser.gender,
					phoneNumber: {
						countryCode: updatedUser.phoneNumber.countryCode as string,
						number: updatedUser.phoneNumber.number as string,
						numberCode: updatedUser.phoneNumber.numberCode,
					},
					city: updatedUser.city,
					street: updatedUser.street,
					terms: updatedUser.terms,
				};

				if (payload.eventType === 'UPDATE') {
					setProfile(newUser);
				}
			})
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, []);

	return (
		<SafeAreaView className="px-5 h-full">
			<NavBar text="Profile" />
			<View className="flex-row justify-center mt-8">
				<TouchableOpacity
					onPress={openPicker}
					className="relative items-center justify-center w-[121px] h-[121px] rounded-full bg-tertiary-300"
				>
					<Image
						source={form.image === '' ? images.profile : { uri: image }}
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
					setData={handleSetPhoneNumber}
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
			<StatusBar style="dark" />
		</SafeAreaView>
	);
};

export default Profile;
