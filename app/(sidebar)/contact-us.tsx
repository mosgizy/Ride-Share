import GoBack from '@/components/GoBack';
import PhoneInputWithDropdown from '@/components/PhoneNumberInput';
import PrimaryBtn from '@/components/PrimaryBtn';
import useAuhStore from '@/store/authStore';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ContactUs = () => {
	const { profile } = useAuhStore();
	const [form, setForm] = useState({
		name: '',
		email: '',
		phoneNumber: '',
		message: '',
	});

	const handleSetPhoneNumber = useCallback((number: string, code: string) => {
		setForm({ ...form, phoneNumber: number });
	}, []);

	return (
		<SafeAreaView className="h-full px-5">
			<GoBack title="Privacy Policy" />
			<View className="mt-4">
				<Text className="text-primary-100 text-lg text-center font-medium">
					Contact us for Ride share
				</Text>
				<Text className="text-primary-100 text-center font-medium mt-4">Address</Text>
				<Text className="text-tertiary-800 text-center text-xs font-medium mt-2">
					House# 72, Road# 21, Banani, Dhaka-1213 (near Banani Bidyaniketon School & College, beside
					University of South Asia)
				</Text>
				<View className="mt-5">
					<Text className="text-tertiary-800 text-center text-xs font-medium">
						Call : 13301 (24/7)
					</Text>
					<Text className="text-tertiary-800 text-center text-xs font-medium">
						Email : support@pathao.com
					</Text>
				</View>
			</View>
			<View className="mt-8">
				<Text className="text-primary-100 text-center font-medium">Send Message</Text>
				<View className="gap-5 mt-6">
					<TextInput
						value={form.name}
						onChangeText={(e) => setForm({ ...form, name: e })}
						placeholder="Full Name"
						placeholderTextColor={'#D0D0D0'}
						className="border border-secondary-400 px-5 py-4 rounded-lg text-secondary-600"
					/>
					<PhoneInputWithDropdown
						country={profile?.phoneNumber.countryCode}
						number={profile?.phoneNumber.number}
						setNumber={handleSetPhoneNumber}
					/>
					<TextInput
						value={form.email}
						onChangeText={(e) => setForm({ ...form, email: e })}
						placeholder="Email"
						placeholderTextColor={'#D0D0D0'}
						className="border border-secondary-400 px-5 py-4 rounded-lg text-secondary-600"
					/>
					<TextInput
						multiline
						numberOfLines={5}
						value={form.message}
						onChangeText={(e) => setForm({ ...form, message: e })}
						placeholder="Write your text"
						placeholderClassName="text-tertiary-300 text-xs"
						className="h-[118px] w-full border border-tertiary-300 rounded-xl align-top px-3 py-4"
					/>
				</View>
			</View>
			<PrimaryBtn text="Send Message" fn={() => {}} additionalStyle="mt-auto mb-8" />
			<StatusBar style="dark" />
		</SafeAreaView>
	);
};

export default ContactUs;
