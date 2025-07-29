import { supabase } from '@/lib/supabase';
import useAuhStore from '@/store/authStore';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { AppState } from 'react-native';
import 'react-native-gesture-handler';
import '../global.css';

AppState.addEventListener('change', (state) => {
	if (state === 'active') {
		supabase.auth.startAutoRefresh();
	} else {
		supabase.auth.stopAutoRefresh();
	}
});

export default function RootLayout() {
	const { isLoggedIn, setSession, setIsLoggedIn, setProfile, session } = useAuhStore();
	const [fontsLoaded] = useFonts({
		'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
		'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
		'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
		'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
	});

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	useEffect(() => {
		const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
			if (session) {
				setSession(session);
				setIsLoggedIn(true);
			}
		});

		return () => {
			data.subscription.unsubscribe();
		};
	}, []);

	if (!fontsLoaded) {
		return null;
	}

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
