import PrimaryBtn from '@/components/PrimaryBtn';
import SecondaryBtn from '@/components/SecondayBtn';
import { images } from '@/constants';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Welcome = () => {
	return (
		<SafeAreaView className="h-full px-5">
			<View>
				<Image source={images.welcome} resizeMode="contain" className="w-full" />
				<View className="items-center">
					<Text className="text-2xl font-medium">Welcome</Text>
					<Text className="text-sm font-medium text-center text-tertiary-400 w-[220px] mt-4">
						Have a better sharing experience
					</Text>
				</View>
			</View>
			<View className="mt-auto mb-14 gap-7">
				<PrimaryBtn fn={() => router.push('/register')} text="Create an account" />
				<SecondaryBtn fn={() => router.push('/login')} text="Log In" />
			</View>
			<StatusBar style="dark" translucent />
		</SafeAreaView>
	);
};

export default Welcome;
