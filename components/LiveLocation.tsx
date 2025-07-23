import { icons } from '@/constants';
import { getAddressFromCoords } from '@/helper/getAddressFromCord';
import useMapStore from '@/store/store';
import * as Location from 'expo-location';
import haversine from 'haversine';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import PrimaryBtn from './PrimaryBtn';

const LiveMap = () => {
	const [location, setLocation] = useState<Location.Region | null>(null);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const mapRef = useRef<MapView>(null);

	const { setLocationModal, setDestination } = useMapStore();
	const [destination, setLocalDestination] = useState<Location.Region | null>(null);

	const [locationText, setLocationText] = useState('');
	const [selected, setSelected] = useState('transport');

	const { setUserLocation, locationPermission, setLocationPermission, setRecentPlaces } =
		useMapStore();

	const handleSelection = (select: string) => {
		setSelected(select);
	};

	const handleToTargetMark = () => {
		mapRef.current?.animateToRegion(
			{
				latitude: location.latitude,
				longitude: location.longitude,
				latitudeDelta: 0.01,
				longitudeDelta: 0.01,
			},
			500
		);
	};

	const onMapPress = async (event) => {
		const { coordinate } = event.nativeEvent;
		const newDestination = {
			latitude: coordinate.latitude,
			longitude: coordinate.longitude,
			latitudeDelta: 0.01,
			longitudeDelta: 0.01,
		};

		setLocalDestination(newDestination);
		setDestination(newDestination);

		const address = await getAddressFromCoords(newDestination);

		if (address)
			setRecentPlaces({
				address: address,
				distance: haversine(location, newDestination, { unit: 'km' }),
			});
	};

	useEffect(() => {
		let subscription = null;

		(async () => {
			// Request location permissions

			if (!locationPermission) {
				setErrorMsg('Permission to access location was denied');
				const { status } = await Location.requestForegroundPermissionsAsync();
				setLocationPermission(status === 'granted' ? true : false);
				return;
			}

			// Get initial location
			let initialLocation = await Location.getCurrentPositionAsync({});
			setLocation({
				latitude: initialLocation.coords.latitude,
				longitude: initialLocation.coords.longitude,
				latitudeDelta: 0.01,
				longitudeDelta: 0.01,
			});

			subscription = await Location.watchPositionAsync(
				{
					accuracy: Location.Accuracy.High,
					timeInterval: 1000,
					distanceInterval: 10,
				},
				(newLocation) => {
					setLocation({
						latitude: newLocation.coords.latitude,
						longitude: newLocation.coords.longitude,
						latitudeDelta: 0.01,
						longitudeDelta: 0.01,
					});
				}
			);
		})();

		return () => {
			if (subscription) {
				subscription.remove();
			}
		};
	}, []);

	useEffect(() => {
		setUserLocation(location);
	}, [location]);

	if (errorMsg) {
		return (
			<View className="flex-1 items-center justify-center bg-gray-100">
				<Text className="text-red-500 text-lg">{errorMsg}</Text>
			</View>
		);
	}

	return (
		<View className="flex-1 absolute inset-0 z-0">
			{location ? (
				<MapView
					ref={mapRef}
					style={{ width: '100%', height: '100%', flex: 1 }}
					region={location}
					showsUserLocation={false}
					showsMyLocationButton={false}
					followsUserLocation={true}
					onPress={onMapPress}
				>
					<Marker
						coordinate={{
							latitude: location.latitude,
							longitude: location.longitude,
						}}
						title="Your Location"
						description="You are here"
					/>

					{destination && (
						<Marker
							coordinate={{
								latitude: destination.latitude,
								longitude: destination.longitude,
							}}
							title="Your Location"
							description="You are here"
						/>
					)}

					{destination && location && (
						<Polyline coordinates={[location, destination]} strokeColor="#10B981" strokeWidth={4} />
					)}
				</MapView>
			) : (
				<View className="flex-1 items-center justify-center bg-gray-100">
					<Text className="text-gray-700 text-lg">Loading location...</Text>
				</View>
			)}
			<View className="absolute inset-0 flex items-center justify-end mb-20 px-3">
				<View className="flex-row justify-between items-center w-full">
					<PrimaryBtn
						text="Rental"
						fn={() => setLocationModal(true)}
						additionalStyle="flex-1 !py-5"
					/>
					<View className="flex-1 items-end">
						<TouchableOpacity
							activeOpacity={0.75}
							onPress={location && handleToTargetMark}
							className="bg-white p-4 rounded-sm w-10 h-10 justify-center items-center"
						>
							<Image source={icons.targetMarker} resizeMode="contain" className="w-6 h-6" />
						</TouchableOpacity>
					</View>
				</View>
				<View className="w-full bg-tertiary-600 border border-primary rounded-lg px-6 py-4 mt-5">
					<View className="flex-row justify-between items-center gap-2 bg-primary-300 px-3 py-2 border border-tertiary-700 rounded-lg">
						<View className="flex-row items-center gap-2">
							<Image source={icons.search} resizeMode="contain" className="w-6 h-6" />
							<TextInput
								value={locationText}
								onChangeText={(e) => setLocationText(e)}
								placeholder="Where would you go?"
								placeholderTextColor={'#A0A0A0'}
								placeholderClassName="font-medium"
							/>
						</View>
						<Image source={icons.love} resizeMode="contain" className="w-6 h-6" />
					</View>
					<View className="flex-row bg-primary-300 rounded-lg border border-tertiary-700 mt-5">
						<TouchableOpacity
							onPress={() => handleSelection('transport')}
							className={`${
								selected === 'transport' && 'bg-primary-200'
							} flex-1 px-8 py-5 rounded-xl items-center`}
						>
							<Text className={`${selected === 'transport' && 'text-white'} text-primary-100`}>
								Transport
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => handleSelection('delivery')}
							className={`${
								selected === 'delivery' && 'bg-primary-200'
							} flex-1 px-8 py-5 rounded-xl items-center`}
						>
							<Text className={`${selected === 'delivery' && 'text-white'} text-primary-100`}>
								Delivery
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
};

export default LiveMap;
