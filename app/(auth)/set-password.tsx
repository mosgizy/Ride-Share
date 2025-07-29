import GoBack from '@/components/GoBack';
import PrimaryBtn from '@/components/PrimaryBtn';
import { icons } from '@/constants';
import { supabase } from '@/lib/supabase';
import useAuhStore from '@/store/authStore';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SetPassword = () => {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const { setSession, profile } = useAuhStore();

	const handleRegistration = async () => {
		if (profile?.email === '' || password !== confirmPassword) {
			Alert.alert('Please check password');
			return;
		}
		const {
			data: { session },
			error,
		} = await supabase.auth.signUp({
			email: profile.email,
			password: password,
		});

		if (error) {
			Alert.alert(error.message);
			return;
		}

		if (!session) Alert.alert('please check your inbox for email verification');

		setSession(session);

		router.push('/profile');
	};

	return (
		<SafeAreaView className="h-full px-5">
			<GoBack />
			<View className="mt-4">
				<Text className="text-2xl font-medium text-primary-100 text-center">Set password</Text>
				<Text className="text-tertiary-400 text-center mt-2">Set your password</Text>
			</View>
			<View className="mt-12 gap-5">
				<View className="flex-row items-center border border-secondary-400 px-5 py-3 rounded-lg text-secondary-600">
					<TextInput
						value={password}
						onChangeText={(e) => setPassword(e)}
						placeholder="Enter Your Password"
						placeholderTextColor={'#D0D0D0'}
						secureTextEntry={!showPassword}
						className="flex-1"
					/>
					<TouchableOpacity activeOpacity={0.8} onPress={() => setShowPassword((prev) => !prev)}>
						<Image source={icons.eye} resizeMode="contain" className="h-6 w-6" />
					</TouchableOpacity>
				</View>
				<View className="flex-row items-center border border-secondary-400 px-5 py-3 rounded-lg text-secondary-600">
					<TextInput
						value={confirmPassword}
						onChangeText={(e) => setConfirmPassword(e)}
						placeholder="Confirm Password"
						placeholderTextColor={'#D0D0D0'}
						secureTextEntry={!showConfirmPassword}
						className="flex-1"
					/>
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => setShowConfirmPassword((prev) => !prev)}
					>
						<Image source={icons.eye} resizeMode="contain" className="h-6 w-6" />
					</TouchableOpacity>
				</View>
			</View>
			<Text className="text-tertiary-500 text-sm font-semibold mt-2">
				Atleast 1 number or a special character
			</Text>
			<PrimaryBtn fn={handleRegistration} text="Register" additionalStyle="mt-auto mb-20" />
			<StatusBar style="dark" translucent />
		</SafeAreaView>
	);
};

export default SetPassword;
