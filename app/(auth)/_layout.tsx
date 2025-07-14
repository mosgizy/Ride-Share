import { Stack } from 'expo-router';

const Auth = () => {
	return (
		<>
			<Stack>
				<Stack.Screen name="auth" options={{ headerShown: false }} />
				<Stack.Screen name="welcome" options={{ headerShown: false }} />
				<Stack.Screen name="login" options={{ headerShown: false }} />
				<Stack.Screen name="register" options={{ headerShown: false }} />
				<Stack.Screen name="phone-verification" options={{ headerShown: false }} />
				<Stack.Screen name="set-password" options={{ headerShown: false }} />
				<Stack.Screen name="profile" options={{ headerShown: false }} />
				<Stack.Screen name="forget-password" options={{ headerShown: false }} />
			</Stack>
		</>
	);
};

export default Auth;
