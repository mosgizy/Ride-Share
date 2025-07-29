import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';

interface AnimationRefs {
	[key: number]: Animated.Value;
}

export const Loader = ({ otherStyles }: { otherStyles?: string }) => {
	const animations: AnimationRefs = {
		0: useRef(new Animated.Value(0)).current,
		1: useRef(new Animated.Value(0)).current,
		2: useRef(new Animated.Value(0)).current,
	};

	useEffect(() => {
		const animationLoops = Object.values(animations).map((anim, index) => {
			return Animated.loop(
				Animated.sequence([
					Animated.delay(index * 200),
					Animated.timing(anim, {
						toValue: 1,
						duration: 400,
						useNativeDriver: true,
						easing: Easing.ease,
					}),
					Animated.timing(anim, {
						toValue: 0.3,
						duration: 400,
						useNativeDriver: true,
						easing: Easing.ease,
					}),
				])
			);
		});

		animationLoops.forEach((loop) => loop.start());

		return () => {
			animationLoops.forEach((loop) => loop.stop());
		};
	}, []);

	return (
		<View
			className="flex-row gap-2 justify-center items-center"
			accessible={true}
			accessibilityLabel="Loading indicator"
		>
			{Object.values(animations).map((anim, i) => (
				<Animated.View
					key={i}
					className={`${otherStyles} bg-primary rounded-md w-3 h-3`}
					style={[
						{
							opacity: anim,
							transform: [{ scale: anim }],
						},
					]}
				/>
			))}
		</View>
	);
};
