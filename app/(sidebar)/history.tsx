import GoBack from '@/components/GoBack';
import { histories, HistoryCategory } from '@/lib/history';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const History = () => {
	const [current, setCurrent] = useState<HistoryCategory>('upcoming');

	const navItems = ['upcoming', 'completed', 'cancelled'];

	const handleSelectCurrent = (current: HistoryCategory) => {
		setCurrent(current);
	};

	return (
		<SafeAreaView className="h-full px-5">
			<GoBack title="History" />

			<View className="bg-primary/15 border border-primary rounded-xl flex-row justify-between mt-4">
				{navItems.map((item, index) => {
					return (
						<TouchableOpacity
							onPress={() => handleSelectCurrent(item as HistoryCategory)}
							key={index}
							className={`${item === current && 'bg-primary'} py-6 flex-1 rounded-xl`}
						>
							<Text
								className={`${
									item === current && 'text-white'
								} text-center text-tertiary-100 text-xs font-medium capitalize`}
							>
								{item}
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>
			<View className="mt-12">
				<FlatList
					data={histories[current]}
					keyExtractor={(item) => item.id.toString()}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => (
						<View className="mb-5 flex-row justify-between items-center border border-primary px-3 py-4 rounded-xl">
							<View className="">
								<Text className="text-sm text-primary-100 font-medium">{item.name}</Text>
								<Text className="text-slate-400 text-xs font-medium mt-1">{item.car}</Text>
							</View>
							<Text
								className={`${
									current === 'completed'
										? '!text-[#43A048]'
										: current === 'cancelled'
										? '!text-[#D32F2F]'
										: ''
								} text-primary-100 text-xs font-medium`}
							>
								{current !== 'upcoming' ? item?.status : item.time}
							</Text>
						</View>
					)}
				/>
			</View>
		</SafeAreaView>
	);
};

export default History;
