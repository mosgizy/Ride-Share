import NavBar from '@/components/NavBar';
import SecondaryBtn from '@/components/SecondayBtn';
import { icons } from '@/constants';
import { transactions } from '@/lib/transactions';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Wallet = () => {
	return (
		<SafeAreaView className="h-full px-5">
			<NavBar noNotification />
			<View className="mt-12 mb-10 items-end">
				<SecondaryBtn
					fn={() => router.push('/add-money')}
					text="Add Money"
					additionalStyle="!py-4 !px-12"
				/>
			</View>
			<View className="flex-row gap-8">
				<View className="flex-1 bg-primary/15 border border-primary gap-8 items-center justify-center rounded-xl py-12">
					<Text className="text-tertiary-100 text-[28px] font-medium">$500</Text>
					<Text className="text-tertiary-100 text-sm font-medium">Available Balance</Text>
				</View>
				<View className="flex-1 bg-primary/15 border border-primary gap-8 items-center justify-center rounded-xl py-12">
					<Text className="text-tertiary-100 text-[28px] font-medium">$200</Text>
					<Text className="text-tertiary-100 text-sm font-medium">Total Expend</Text>
				</View>
			</View>
			<View className="mt-10">
				<View className="flex-row items-center justify-between mb-7">
					<Text className="text-primary-100 font-semibold">Transections</Text>
					<TouchableOpacity activeOpacity={0.75}>
						<Text className="text-[#007848] text-xs font-medium">See All</Text>
					</TouchableOpacity>
				</View>
				<FlatList
					data={transactions}
					keyExtractor={(item) => item.id}
					showsVerticalScrollIndicator={false}
					renderItem={(transaction) => (
						<View className="border border-primary rounded-xl py-4 px-3 mb-6 flex-row justify-between items-center">
							<View className="flex-row gap-3">
								<Image
									source={transaction.item.type === 'debit' ? icons.up : icons.down}
									resizeMode="contain"
									className="w-10 h-10"
								/>
								<View>
									<Text className="text-primary-400 text-sm font-medium">Nathsam</Text>
									<Text className="text-tertiary-100 font-xs">Today at 09:20 am</Text>
								</View>
							</View>
							<Text className="text-primary-400 text-sm font-medium pr-2">$570.00</Text>
						</View>
					)}
				/>
			</View>
			<StatusBar style="dark" />
		</SafeAreaView>
	);
};

export default Wallet;
