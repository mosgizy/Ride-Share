import GoBack from '@/components/GoBack';
import LoadingPage from '@/components/LoadingPage';
import PrimaryBtn from '@/components/PrimaryBtn';
import useGetUserData from '@/hooks/getUserData';
import useAuhStore from '@/store/authStore';
import { useNavigationState } from '@react-navigation/native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PhoneVerification = () => {
	const numInputs = 5;
	const { setIsLoggedIn, session } = useAuhStore();

	const [values, setValues] = useState(Array(numInputs).fill(''));
	const inputs = useRef<TextInput[]>([]);

	const handleChange = useCallback((text: string, index: number) => {
		setValues((prevValues) => {
			const newValues = [...prevValues];
			newValues[index] = text;
			return newValues;
		});

		if (text && index < numInputs - 1) {
			inputs.current[index + 1]?.focus();
		}
	}, []);

	const previousRoute = useNavigationState((state) => {
		const currentIndex = state.index;
		const routes = state.routes;

		return currentIndex > 0 ? routes[currentIndex - 1].name : null;
	});

	const handleVerify = () => {
		if (!session && previousRoute !== 'register') {
			return;
		}
		setIsLoggedIn(true);
		router.push(previousRoute === 'register' ? '/set-password' : '/home');
	};

	const userData = useGetUserData();

	if (!userData.status) {
		return <LoadingPage />;
	}

	return (
		<SafeAreaView className="h-full px-5">
			<GoBack />
			<View className="mt-4">
				<Text className="text-2xl font-medium text-primary-100 text-center">
					Phone verification
				</Text>
				<Text className="text-tertiary-400 text-center mt-2">Enter your OTP code</Text>
				<View className="flex-row justify-between gap-4 mt-12 max-w-[80%] mx-auto">
					{values.map((value, index) => (
						<TextInput
							key={index}
							ref={(ref) => {
								if (ref) inputs.current[index] = ref;
							}}
							value={value}
							maxLength={1}
							onChangeText={(text) => handleChange(text, index)}
							keyboardType="number-pad"
							className="w-[50px] h-12 border border-gray-300 rounded-md text-center text-lg text-black"
						/>
					))}
				</View>
				<Text className="font-medium text-tertiary-100 text-center mt-6">
					Didn’t receive code? <Text className="text-primary">Resend again</Text>
				</Text>
			</View>
			<PrimaryBtn fn={handleVerify} text="Verify" additionalStyle="mt-auto mb-20" />
			<StatusBar style="dark" translucent />
		</SafeAreaView>
	);
};

export default PhoneVerification;
