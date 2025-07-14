import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const MyMapComponent = () => {
	const [location, setLocation] = useState<any>(null);
	const [errorMsg, setErrorMsg] = useState<any | string>(null);
	const mapRef = useRef(null);

	useEffect(() => {
		let subscription;

		(async () => {
			// Request location permissions
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
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

			// Subscribe to location updates
			subscription = await Location.watchPositionAsync(
				{
					accuracy: Location.Accuracy.High,
					timeInterval: 1000, // Update every 1 second
					distanceInterval: 10, // Update every 10 meters
				},
				(newLocation) => {
					setLocation({
						latitude: newLocation.coords.latitude,
						longitude: newLocation.coords.longitude,
						latitudeDelta: 0.01,
						longitudeDelta: 0.01,
					});

					mapRef.current?.animateToRegion({
						latitude: location.coords.latitude,
						longitude: location.coords.longitude,
						latitudeDelta: 0.005,
						longitudeDelta: 0.005,
					});
				}
			);
		})();

		// Cleanup subscription on unmount
		return () => {
			if (subscription) {
				subscription.remove();
			}
		};
	}, []);

	if (errorMsg) {
		return (
			<View className="flex-1 items-center justify-center bg-gray-100">
				<Text className="text-red-500 text-lg">{errorMsg}</Text>
			</View>
		);
	}

	if (!location) {
		return (
			<View className="flex-1 items-center justify-center bg-gray-100">
				<Text className="text-gray-700 text-lg">Loading location...</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<MapView
				ref={mapRef}
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				showsUserLocation
				showsMyLocationButton
				initialRegion={location}
			>
				{location && (
					<Marker
						coordinate={{
							latitude: location.latitude,
							longitude: location.longitude,
						}}
						title="You"
					/>
				)}
			</MapView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		width: '100%',
		height: '100%',
	},
});

export default MyMapComponent;
