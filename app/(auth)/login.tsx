import GoBack from '@/components/GoBack';
import PrimaryBtn from '@/components/PrimaryBtn';
import TertiaryBtn from '@/components/TertiaryBtn';
import { icons } from '@/constants';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
	const [form, setForm] = useState({
		emailorPhone: '',
		password: '',
	});
	const [showPassword, setShowPassword] = useState(false);

	return (
		<SafeAreaView className="h-full px-5">
			<GoBack />
			<View>
				<View className="mt-5 gap-3">
					<Text className="text-primary-100 text-2xl font-medium">
						Sign in with your email or phone number
					</Text>
					<View className="mt-6 gap-5">
						<TextInput
							value={form.emailorPhone}
							onChangeText={(e) => setForm({ ...form, emailorPhone: e })}
							placeholder="Email or Phone Number"
							placeholderTextColor={'#D0D0D0'}
							className="border border-secondary-400 px-5 py-4 rounded-lg text-secondary-600"
						/>
						<View className="flex-row items-center border border-secondary-400 px-5 py-3 rounded-lg text-secondary-600">
							<TextInput
								value={form.password}
								onChangeText={(e) => setForm({ ...form, password: e })}
								placeholder="Enter Your Password"
								placeholderTextColor={'#D0D0D0'}
								secureTextEntry={!showPassword}
								className="flex-1"
							/>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => setShowPassword((prev) => !prev)}
							>
								<Image source={icons.eye} resizeMode="contain" className="h-6 w-6" />
							</TouchableOpacity>
						</View>
					</View>
					<TouchableOpacity
						onPress={() => router.push('/forget-password')}
						activeOpacity={0.8}
						className="flex-row justify-end"
					>
						<Text className="font-medium text-sm text-secondary-300">Forget password?</Text>
					</TouchableOpacity>
					<PrimaryBtn
						fn={() => router.push('/phone-verification')}
						text="Sign In"
						additionalStyle="mt-8"
					/>
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
						<Link href="/register" className="text-primary">
							Sign Up
						</Link>
					</Text>
				</View>
			</View>
			<StatusBar style="dark" translucent />
		</SafeAreaView>
	);
};

export default Login;
