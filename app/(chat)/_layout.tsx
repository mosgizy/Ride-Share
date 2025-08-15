import { Stack } from 'expo-router';
import React from 'react';

const Chat = () => {
	return (
		<>
			<Stack>
				<Stack.Screen name="message/[query]" options={{ headerShown: false }} />
				<Stack.Screen name="calling" options={{ headerShown: false }} />
			</Stack>
		</>
	);
};

export default Chat;
