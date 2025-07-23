import LoadingPage from '@/components/LoadingPage';
import { icons, images } from '@/constants';
import useGetUserData from '@/hooks/getUserData';
import useMapStore from '@/store/store';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Auth = () => {
	const { setLocationPermission } = useMapStore();
	const { status: userData } = useGetUserData();
	const [permission, setPermission] = useState(false);

	const requestLocationPermission = async () => {
		try {
			let { status } = await Location.requestForegroundPermissionsAsync();
			setLocationPermission(status === 'granted' ? true : false);

			if (status === 'granted') {
				setPermission(true);
			} else {
				Alert.alert('please grant permission for location');
			}
		} catch (err) {
			console.warn(err);
		}
	};

	const route = () => {
		if (userData.status === true) {
			router.replace('/home');
		}

		if (userData.status === false) {
			router.push('/welcome');
		}
	};

	const handleSkip = () => {
		setPermission(true);
		route();
	};

	useEffect(() => {
		if (permission) {
			handleSkip();
		}
	}, [userData.status, permission]);

	if (userData.status === null && permission) {
		return <LoadingPage />;
	}

	return (
		<SafeAreaView className="h-full">
			<ImageBackground source={images.map} resizeMode="cover" className="flex-1">
				<View className="absolute inset-0 bg-primary-100/60 justify-center items-center px-8">
					<View className="bg-white rounded-3xl px-8 py-14 items-center min-w-[90%]">
						<Image source={icons.locator} resizeMode="contain" className="w-[110px] h-[110px]" />
						<View className="w-[60%]">
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
			<StatusBar style="dark" />
		</SafeAreaView>
	);
};

export default Auth;
