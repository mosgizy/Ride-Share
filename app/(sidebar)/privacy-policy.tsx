import GoBack from '@/components/GoBack';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PrivacyPolicy = () => {
	return (
		<SafeAreaView className="h-full px-5">
			<GoBack title="Privacy Policy" />
			<ScrollView className="mt-5">
				<Text className="text-primary-100 text-lg font-medium mb-4">
					Privacy Policy for Ride share
				</Text>
				<View>
					<Text className="text-justify text-tertiary-1000 leading-7">
						At Rideshare, accessible from rideshare.com, one of our main priorities is the privacy
						of our visitors. This Privacy Policy document contains types of information that is
						collected and recorded by rideshare and how we use it.
					</Text>
					<Text className="text-justify text-tertiary-1000 leading-7">
						If you have additional questions or require more information about our Privacy Policy,
						do not hesitate to contact us.
					</Text>
					<Text className="text-justify text-tertiary-1000 leading-7">
						This Privacy Policy applies only to our online activities and is valid for visitors to
						our website with regards to the information that they shared and/or collect in
						rideshare. This policy is not applicable to any information collected offline or via
						channels other than this website. Our Privacy Policy was created with the help of the
						Free Privacy Policy Generator.
					</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default PrivacyPolicy;
