import LiveLocationMap from '@/components/LiveLocation';
import NavBar from '@/components/NavBar';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
	return (
		<SafeAreaView className="relative h-full px-5">
			<NavBar noNotification />
			<LiveLocationMap />
		</SafeAreaView>
	);
};

export default Home;
