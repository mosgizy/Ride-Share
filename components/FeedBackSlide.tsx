import { icons } from '@/constants';
import { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PrimaryBtn from './PrimaryBtn';
import SlideModal from './SlideModal';

const FeedBackSlide = ({
	feedback,
	close,
	submit,
}: {
	feedback: boolean;
	close: () => void;
	submit: () => void;
}) => {
	const tips = [1, 2, 5, 10, 20];
	const [currentTipSelected, setCurrentTipSelected] = useState(0);

	return (
		<SlideModal status={feedback} onClose={close}>
			<>
				<View className="flex-row justify-center gap-4 my-6">
					{Array.from({ length: 5 }, (_, index) => {
						return (
							<Image key={index} source={icons.star} resizeMode="contain" className="w-6 h-6" />
						);
					})}
				</View>
				<View className="">
					<Text className="text-[#00AA6D] text-xl text-center font-medium">Excellent</Text>
					<Text className="text-secondary-400 text-xs mt-2 text-center">
						You rated Sergio Ramasis 4 star
					</Text>
				</View>

				<TextInput
					multiline
					numberOfLines={5}
					placeholder="Write your text"
					placeholderClassName="text-tertiary-300 text-xs"
					className="h-[118px] w-full border border-tertiary-300 rounded-xl align-top px-3 py-4 mt-8"
				/>

				<Text className="text-tertiary-100 text-center font-medium my-7">
					Give some tips to Sergio Ramasis
				</Text>
				<View className="flex-row justify-between gap-4">
					{tips.map((tip, item) => {
						return (
							<TouchableOpacity
								activeOpacity={0.75}
								key={item}
								onPress={() => setCurrentTipSelected(tip)}
								className={`flex-1 items-center justify-center h-[62px] rounded-md border ${
									tip === currentTipSelected ? 'border-primary' : 'border-tertiary-900'
								}`}
							>
								<Text
									className={`font-medium ${
										tip === currentTipSelected ? 'text-primary' : 'text-tertiary-100'
									}`}
								>
									${tip}
								</Text>
							</TouchableOpacity>
						);
					})}
				</View>
				<View className="px-6">
					<PrimaryBtn text="Submit" fn={submit} additionalStyle="mt-10" />
				</View>
			</>
		</SlideModal>
	);
};

export default FeedBackSlide;
