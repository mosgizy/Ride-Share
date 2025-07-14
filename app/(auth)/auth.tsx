import { icons, images } from '@/constants';
import useAuhStore from '@/store/authStore';
import useMapStore from '@/store/store';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Auth = () => {
	const { setLocationPermission } = useMapStore();
	const { isLoggedIn } = useAuhStore();

	const requestLocationPermission = async () => {
		try {
			let { status } = await Location.requestForegroundPermissionsAsync();
			setLocationPermission(status === 'granted' ? true : false);

			if (status === 'granted') {
				console.log('Location permission granted');
				handleSkip();
			} else {
				console.log('Location permission denied');
				router.push('/welcome');
				handleSkip();
			}
		} catch (err) {
			console.warn(err);
		}
	};

	const handleSkip = () => {
		if (isLoggedIn) {
			router.push('/home');
		} else {
			router.push('/welcome');
		}
	};

	return (
		<SafeAreaView className="h-full">
			<ImageBackground source={images.map} resizeMode="cover" className="flex-1">
				<View className="absolute inset-0 bg-primary-100/60 justify-center items-center px-8">
					<View className="bg-white rounded-3xl px-8 py-14 items-center min-w-[90%]">
						<Image source={icons.locator} resizeMode="contain" className="w-[110px] h-[110px]" />
						<View className="w-[55%]">
							<Text className="text-center font-medium text-2xl text-primary-100">
								Enable your location
							</Text>
							<Text className="text-center text-tertiary-400 text-sm font-medium mt-2">
								Choose your location to start find the request around you
							</Text>
						</View>
						<TouchableOpacity
							onPress={requestLocationPermission}
							activeOpacity={0.75}
							className="mt-12 bg-primary-200 px-8 py-6 rounded-xl min-w-full items-center"
						>
							<Text className="text-white font-medium">Use my location</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={handleSkip}
							activeOpacity={0.75}
							className="mt-12 items-center"
						>
							<Text className="text-secondary-400 font-medium">Skip for now</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
			<StatusBar style="dark" translucent />
		</SafeAreaView>
	);
};

export default Auth;
