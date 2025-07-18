import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const Transport = () => {
	return (
		<>
			<Stack>
				<Stack.Screen name="select-transport" options={{ headerShown: false }} />
				<Stack.Screen name="cars" options={{ headerShown: false }} />
				<Stack.Screen name="car/[query]" options={{ headerShown: false }} />
				<Stack.Screen name="request" options={{ headerShown: false }} />
				<Stack.Screen name="success" options={{ headerShown: false }} />
			</Stack>
			<StatusBar style="dark" />
		</>
	);
};

export default Transport;
