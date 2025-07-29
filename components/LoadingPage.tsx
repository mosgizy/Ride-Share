import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Loader } from './Loader';

const LoadingPage = () => {
	return (
		<SafeAreaView className="h-full px-5 justify-center items-center">
			<Loader />
		</SafeAreaView>
	);
};

export default LoadingPage;
