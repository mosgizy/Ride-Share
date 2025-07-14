import { icons } from '@/constants';
import { ReactElement } from 'react';
import { Image, Modal, TouchableOpacity, View } from 'react-native';

const ModalTemplate = ({
	children,
	status,
	close,
}: {
	children: ReactElement;
	status: boolean;
	close: () => void;
}) => {
	return (
		<Modal animationType="slide" transparent visible={status} onRequestClose={close}>
			<TouchableOpacity
				onPress={close}
				className="absolute inset-0 bg-primary-100/60"
			></TouchableOpacity>
			<View className="absolute inset-0 justify-center items-center px-6">
				<View className="bg-white rounded-2xl py-4 items-center min-w-[90%]">
					<TouchableOpacity onPress={close} className="flex-row justify-end w-full px-4">
						<Image source={icons.xMark} resizeMode="contain" className="h-8 w-8" />
					</TouchableOpacity>
					<Image source={icons.success} resizeMode="contain" className="w-[124px] h-[124px] mt-4" />
					{children}
				</View>
			</View>
		</Modal>
	);
};

export default ModalTemplate;
