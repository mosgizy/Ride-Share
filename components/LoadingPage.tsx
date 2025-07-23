import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DotLoader } from './Loader';

const LoadingPage = () => {
	return (
		<SafeAreaView className="h-full px-5 justify-center items-center">
			<DotLoader />
		</SafeAreaView>
	);
};

export default LoadingPage;
