import GoBack from '@/components/GoBack';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const About = () => {
	return (
		<SafeAreaView className="h-full px-5">
			<GoBack title="About Us" />
			<View className="mt-3">
				<Text className="text-tertiary-100 text-sm text-justify leading-7">
					Professional Rideshare Platform. Here we will provide you only interesting content, which
					you will like very much. We&apos;re dedicated to providing you the best of Rideshare, with
					a focus on dependability and Earning. We&apos;re working to turn our passion for Rideshare
					into a booming online website. We hope you enjoy our Rideshare as much as we enjoy
					offering them to you. I will keep posting more important posts on my Website for all of
					you. Please give your support and love.Professional Rideshare Platform. Here we will
					provide you only interesting content, which you will like very much. We&apos;re dedicated
					to providing you the best of Rideshare, with a focus on dependability and Earning.
					We&apos;re working to turn our passion for Rideshare into a booming online website. We
					hope you enjoy our Rideshare as much as we enjoy offering them to you. I will keep posting
					more important posts on my Website for all of you. Please give your support and love.
				</Text>
			</View>
		</SafeAreaView>
	);
};

export default About;
