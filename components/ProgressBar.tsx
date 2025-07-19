import { icons } from '@/constants';
import { RelativePathString, router } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const CircularProgress = ({
	percent,
	link,
	end,
}: {
	percent: number;
	link: string;
	end?: boolean;
}) => {
	return (
		<>
			<AnimatedCircularProgress
				size={90}
				width={6}
				fill={percent}
				tintColor="#08B783"
				onAnimationComplete={() => {}}
				backgroundColor="#B9E5D1"
			/>
			<TouchableOpacity
				onPress={() => router.push(link as RelativePathString)}
				activeOpacity={0.75}
				className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[70px] h-[70px] bg-primary rounded-full items-center justify-center"
			>
				{end ? (
					<Text className="font-medium text-xl">Go</Text>
				) : (
					<Image source={icons.arrowRight} resizeMode="contain" className="w-6 h-6" />
				)}
			</TouchableOpacity>
		</>
	);
};

export default CircularProgress;
