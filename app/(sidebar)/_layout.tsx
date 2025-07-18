import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const LayoutSideBar = () => {
	return (
		<>
			<Stack>
				<Stack.Screen name="history" options={{ headerShown: false }} />
				<Stack.Screen name="complain" options={{ headerShown: false }} />
				<Stack.Screen name="referral" options={{ headerShown: false }} />
				<Stack.Screen name="about" options={{ headerShown: false }} />
				<Stack.Screen name="settings" options={{ headerShown: false }} />
				<Stack.Screen name="change-password" options={{ headerShown: false }} />
				<Stack.Screen name="change-language" options={{ headerShown: false }} />
				<Stack.Screen name="privacy-policy" options={{ headerShown: false }} />
				<Stack.Screen name="contact-us" options={{ headerShown: false }} />
				<Stack.Screen name="delete-account" options={{ headerShown: false }} />
				<Stack.Screen name="help" options={{ headerShown: false }} />
			</Stack>
			<StatusBar style="dark" />
		</>
	);
};

export default LayoutSideBar;
