import GoBack from '@/components/GoBack';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Help = () => {
	return (
		<SafeAreaView className="h-full px-5">
			<GoBack title="Help and Support" />
			<Text className="text-primary-100 text-lg font-medium mb-4 mt-6">Help and Support</Text>
			<View>
				<Text className="text-justify text-tertiary-1000 leading-7">
					Lorem ipsum dolor sit amet consectetur. Sit pulvinar mauris mauris eu nibh semper nisl
					pretium laoreet. Sed non faucibus ac lectus eu arcu. Nulla sit congue facilisis vestibulum
					egestas nisl feugiat pharetra. Odio sit tortor morbi at orci ipsum dapibus interdum. Lorem
					felis est aliquet arcu nullam pellentesque. Et habitasse ac arcu et nunc euismod rhoncus
					facilisis sollicitudin.
				</Text>
			</View>
		</SafeAreaView>
	);
};

export default Help;
