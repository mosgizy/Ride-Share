import GoBack from '@/components/GoBack';
import PhoneNumberInput from '@/components/PhoneNumberInput';
import PrimaryBtn from '@/components/PrimaryBtn';
import TertiaryBtn from '@/components/TertiaryBtn';
import { icons } from '@/constants';
import useAuhStore from '@/store/authStore';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, Image, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Register = () => {
	const [form, setForm] = useState({
		name: '',
		email: '',
		phoneNumber: '',
		terms: false,
		country: '',
	});

	const { setProfile } = useAuhStore();

	const [modal, setModal] = useState(false);
	const [gender, setGender] = useState('Gender');
	const [countryCode, setCountryCode] = useState('');
	const [numberCode, setNumberCode] = useState<string>('');

	const genderType = ['male', 'female', 'others'];

	const handleSelectGender = (gender: string) => {
		setGender(gender);
		setModal(false);
	};

	const handleRegister = async () => {
		if (
			form.name !== '' &&
			countryCode !== '' &&
			form.email !== '' &&
			form.phoneNumber !== '' &&
			form.terms &&
			gender
		) {
			setProfile({
				name: form.name,
				email: form.email,
				phoneNumber: { countryCode, number: form.phoneNumber, numberCode },
				city: '',
				street: '',
				gender: gender,
				image: null,
				terms: form.terms,
			});
			router.push('/phone-verification');
		}
	};

	const handleSetPhoneNumber = (number: string, code: string, numberCode?: string) => {
		setForm({ ...form, phoneNumber: number });
		setCountryCode(code);
		numberCode && setNumberCode(numberCode);
	};

	return (
		<SafeAreaView className="h-full px-5">
			<GoBack />
			<View>
				<View className="mt-5 gap-3">
					<Text className="text-primary-100 text-2xl font-medium">
						Sign up with your email or phone number
					</Text>
					<View className="mt-6 gap-5">
						<TextInput
							value={form.name}
							onChangeText={(e) => setForm({ ...form, name: e })}
							placeholder="Name"
							placeholderTextColor={'#D0D0D0'}
							className="border border-secondary-400 px-5 py-4 rounded-lg text-secondary-600"
						/>
						<TextInput
							value={form.email}
							onChangeText={(e) => setForm({ ...form, email: e })}
							placeholder="Email"
							placeholderTextColor={'#D0D0D0'}
							className="border border-secondary-400 px-5 py-4 rounded-lg text-secondary-600"
						/>
						<PhoneNumberInput setData={handleSetPhoneNumber} number={form.phoneNumber} />

						<View className="border border-secondary-400 px-5 py-4 rounded-lg text-secondary-600">
							<TouchableOpacity
								onPress={() => setModal(true)}
								className="flex-row justify-between items-center"
							>
								<Text className="text-tertiary-300 capitalize">{gender}</Text>
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
									<FlatList
										data={genderType}
										keyExtractor={(item) => item}
										renderItem={({ item }) => (
											<TouchableOpacity onPress={() => handleSelectGender(item)} className="mt-2">
												<Text className="capitalize">{item}</Text>
											</TouchableOpacity>
										)}
									/>
								</View>
							</TouchableOpacity>
						</Modal>
						<TouchableOpacity
							onPress={() => setForm({ ...form, terms: true })}
							activeOpacity={0.8}
							className="flex-row items-center gap-2"
						>
							<Image
								source={form.terms ? icons.checkMarked : icons.unmark}
								resizeMode="contain"
								className="w-6 h-6"
							/>
							<Text className="font-medium text-xs">
								By signing up. you agree to the{' '}
								<Text className="text-primary">Terms of service</Text> and{' '}
								<Text className="text-primary">Privacy policy</Text>.
							</Text>
						</TouchableOpacity>
						<PrimaryBtn fn={handleRegister} text="Sign Up" additionalStyle="mt-8" />
					</View>
					<View className="flex-row items-center gap-2 mt-4">
						<View className="flex-1 h-px bg-secondary-400" />
						<Text className="text-secondary-400 font-medium">or</Text>
						<View className="flex-1 h-px bg-secondary-400" />
					</View>
					<View className="mt-4 gap-5">
						<TertiaryBtn text="Sign up with Gmail" fn={() => 'hello'} image={icons.gmail} />
						<TertiaryBtn text="Sign up with Facebook" fn={() => 'hello'} image={icons.facebook} />
						<TertiaryBtn text="Sign up with Apple" fn={() => 'hello'} image={icons.apple} />
					</View>
					<Text className="font-medium text-center mt-2">
						Already have an account?{' '}
						<Link href="/login" className="text-primary">
							Sign in
						</Link>
					</Text>
				</View>
			</View>
			<StatusBar style="dark" translucent />
		</SafeAreaView>
	);
};

export default Register;
