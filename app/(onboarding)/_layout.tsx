import { Stack } from 'expo-router';

const Onboarding = () => {
	return (
		<>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="time" options={{ headerShown: false }} />
				<Stack.Screen name="book" options={{ headerShown: false }} />
			</Stack>
		</>
	);
};

export default Onboarding;
