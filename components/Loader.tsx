import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export const DotLoader = () => {
	const animations = [
		useRef(new Animated.Value(0)).current,
		useRef(new Animated.Value(0)).current,
		useRef(new Animated.Value(0)).current,
	];

	useEffect(() => {
		animations.forEach((anim, index) => {
			Animated.loop(
				Animated.sequence([
					Animated.delay(index * 200),
					Animated.timing(anim, {
						toValue: 1,
						duration: 400,
						useNativeDriver: true,
					}),
					Animated.timing(anim, {
						toValue: 0.3,
						duration: 400,
						useNativeDriver: true,
					}),
				])
			).start();
		});
	}, []);

	return (
		<View style={styles.container}>
			{animations.map((anim, i) => (
				<Animated.View
					key={i}
					style={[
						styles.dot,
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

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	dot: {
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: '#08B783',
	},
});
