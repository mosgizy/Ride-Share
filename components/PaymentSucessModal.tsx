import { Text, View } from 'react-native';
import ModalTemplate from './Modal';
import PrimaryBtn from './PrimaryBtn';

const PaymentSucessModal = ({
	successModal,
	fn,
	feedBack,
}: {
	successModal: boolean;
	fn: () => void;
	feedBack: () => void;
}) => {
	return (
		<ModalTemplate status={successModal} close={fn}>
			<>
				<View className="border-b border-dashed border-secondary-400 min-w-full pb-3">
					<View className="w-[60%] mx-auto mt-6">
						<Text className="text-center font-medium text-2xl text-primary-100">
							Payment Success
						</Text>
						<Text className="text-center text-tertiary-800 text-sm font-medium mt-2">
							Your money has been successfully sent to Sergio Ramasis
						</Text>
						<Text className="text-center text-tertiary-100 text-xs font-medium mt-7">Amount</Text>
						<Text className="text-center text-tertiary-100 text-[34px] mt-2">$220</Text>
					</View>
				</View>
				<View className="w-[60%] mx-auto mt-6">
					<Text className="text-center font-medium text-sm text-primary-100">
						How is your trip?
					</Text>
					<Text className="text-center text-tertiary-400 text-sm font-medium mt-2">
						Your feedback will help us to improve your driving experience better
					</Text>
				</View>
				<View className="px-4">
					<PrimaryBtn text="Please Feedback" fn={feedBack} additionalStyle="mt-10 min-w-full" />
				</View>
			</>
		</ModalTemplate>
	);
};

export default PaymentSucessModal;
