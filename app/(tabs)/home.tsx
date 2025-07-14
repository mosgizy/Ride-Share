import LiveLocationMap from '@/components/LiveLocation';
import NavBar from '@/components/NavBar';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
	return (
		<SafeAreaView className="relative h-full px-5">
			<NavBar noNotification />
			<LiveLocationMap />
			<StatusBar style="dark" translucent />
		</SafeAreaView>
	);
};

export default Home;
