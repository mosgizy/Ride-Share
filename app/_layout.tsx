import useAuhStore from '@/store/authStore';
import { Stack } from 'expo-router';
import 'react-native-gesture-handler';
import '../global.css';

export default function RootLayout() {
	const { isLoggedIn } = useAuhStore();

	return (
		<Stack>
			<Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
			<Stack.Screen name="(auth)" options={{ headerShown: false }} />
			<Stack.Protected guard={isLoggedIn}>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack.Protected>
			<Stack.Protected guard={isLoggedIn}>
				<Stack.Screen name="(transport)" options={{ headerShown: false }} />
			</Stack.Protected>
			<Stack.Protected guard={isLoggedIn}>
				<Stack.Screen name="(chat)" options={{ headerShown: false }} />
			</Stack.Protected>
			<Stack.Protected guard={isLoggedIn}>
				<Stack.Screen name="(sidebar)" options={{ headerShown: false }} />
			</Stack.Protected>
			<Stack.Protected guard={isLoggedIn}>
				<Stack.Screen name="notification" options={{ headerShown: false }} />
			</Stack.Protected>
			<Stack.Protected guard={isLoggedIn}>
				<Stack.Screen name="add-money" options={{ headerShown: false }} />
			</Stack.Protected>
		</Stack>
	);
}
