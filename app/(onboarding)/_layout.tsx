import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const Onboarding = () => {
	return (
		<>
			<Stack>
				<Stack.Screen name="auth" options={{ headerShown: false }} />
				<Stack.Screen name="time" options={{ headerShown: false }} />
				<Stack.Screen name="book" options={{ headerShown: false }} />
			</Stack>
			<StatusBar style="dark" />
		</>
	);
};

export default Onboarding;
