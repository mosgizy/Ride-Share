import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

const Chat = () => {
	return (
		<>
			<Stack>
				<Stack.Screen name="messaging" options={{ headerShown: false }} />
				<Stack.Screen name="calling" options={{ headerShown: false }} />
			</Stack>
			<StatusBar style="dark" />
		</>
	);
};

export default Chat;
