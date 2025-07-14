import { icons } from '@/constants';
import { ReactElement, useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, TouchableOpacity, View } from 'react-native';

const { height } = Dimensions.get('window');

const SlideModal = ({
	children,
	status,
	onClose,
}: {
	children: ReactElement;
	status: boolean;
	onClose: () => void;
}) => {
	const slideAnim = useRef(new Animated.Value(height)).current;

	useEffect(() => {
		Animated.timing(slideAnim, {
			toValue: status ? 0 : height,
			duration: 300,
			useNativeDriver: true,
		}).start();
	}, [status]);

	return (
		<Animated.View
			style={{
				position: 'absolute',
				bottom: 0,
				zIndex: 100,
				width: '100%',
				backgroundColor: '#fff',
				borderTopLeftRadius: 30,
				borderTopRightRadius: 30,
				transform: [{ translateY: slideAnim }],
				elevation: 100,
			}}
		>
			<View className="pb-12 px-5">
				<View className="flex-row items-center justify-between mt-4 w-full">
					<View className="w-6"></View>
					<View className="bg-primary-100 w-32 h-1"></View>
					<TouchableOpacity activeOpacity={0.75} onPress={onClose}>
						<Image source={icons.xMark} resizeMode="contain" className="h-6 w-6" />
					</TouchableOpacity>
				</View>
				{children}
			</View>
		</Animated.View>
	);
};

export default SlideModal;
