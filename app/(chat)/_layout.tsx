import { Stack } from 'expo-router';
import React from 'react';

const Chat = () => {
	return (
		<Stack>
			<Stack.Screen name="messaging" options={{ headerShown: false }} />
			<Stack.Screen name="calling" options={{ headerShown: false }} />
		</Stack>
	);
};

export default Chat;
