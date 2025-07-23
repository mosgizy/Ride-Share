import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const LoaderGrid = () => {
	const animations = useRef(Array.from({ length: 9 }, () => new Animated.Value(1))).current;

	useEffect(() => {
		const animate = (index: number) => {
			Animated.sequence([
				Animated.timing(animations[index], {
					toValue: 2,
					duration: 300,
					useNativeDriver: true,
				}),
				Animated.timing(animations[index], {
					toValue: 1,
					duration: 300,
					useNativeDriver: true,
				}),
			]).start(() => animate((index + 1) % 9));
		};

		animate(0);
	}, []);

	return (
		<View style={styles.grid}>
			{animations.map((anim, i) => (
				<Animated.View
					key={i}
					style={[
						styles.dot,
						{
							transform: [{ scale: anim }],
							opacity: anim.interpolate({
								inputRange: [1, 2],
								outputRange: [0.6, 1],
							}),
						},
					]}
				/>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	grid: {
		width: 80,
		height: 80,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		alignContent: 'space-between',
	},
	dot: {
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: '#08B783',
		margin: 2,
	},
});

export default LoaderGrid;
