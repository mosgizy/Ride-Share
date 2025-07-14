import GoBack from '@/components/GoBack';
import ModalTemplate from '@/components/Modal';
import PrimaryBtn from '@/components/PrimaryBtn';
import { icons } from '@/constants';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddMoney = () => {
	const [amount, setAmount] = useState('');
	const [accountNumber, setAccountNumber] = useState('');
	const [paymentMethod, setPaymentMethod] = useState('Select Pyament Method');
	const [togglePaymentMethod, setTogglePaymentMethod] = useState(false);
	const [modal, setModal] = useState(false);

	return (
		<SafeAreaView className="px-5 h-full">
			<GoBack title="Amount" />
			<View className="mt-3">
				{togglePaymentMethod ? (
					<View className="gap-4">
						<TextInput
							value={accountNumber}
							onChangeText={(e) => setAccountNumber(e)}
							placeholder="Enter Amount"
							placeholderTextColor={'#D0D0D0'}
							className="border border-secondary-400 px-5 py-4 rounded-lg text-secondary-600"
						/>
						<View className="border border-secondary-400 px-5 py-4 rounded-lg text-secondary-600">
							<TouchableOpacity
								onPress={() => setModal(true)}
								className="flex-row justify-between items-center"
							>
								<Text className="text-tertiary-300 capitalize">{paymentMethod}</Text>
								<Image source={icons.arrowDown} resizeMode="contain" className="w-4 h-4" />
							</TouchableOpacity>
						</View>
					</View>
				) : (
					<TextInput
						value={amount}
						onChangeText={(e) => setAmount(e)}
						placeholder="Enter Amount"
						placeholderTextColor={'#D0D0D0'}
						className="border border-secondary-400 px-5 py-4 rounded-lg text-secondary-600"
					/>
				)}
				{!togglePaymentMethod && (
					<TouchableOpacity onPress={() => setTogglePaymentMethod(true)} className="items-end mt-3">
						<Text className="text-[#304FFE] text-sm font-medium">Add payment Method</Text>
					</TouchableOpacity>
				)}
				{togglePaymentMethod && (
					<View className="mt-7 px-4">
						<PrimaryBtn
							text="Save Payment Method"
							fn={() => setTogglePaymentMethod(false)}
							additionalStyle="mb-2"
						/>
					</View>
				)}
			</View>
			<View className="mt-8">
				{!togglePaymentMethod && (
					<Text className="text-tertiary-100 text-lg font-semibold mb-8">
						Select payment method
					</Text>
				)}
				<View className="gap-3">
					<View className="flex-row items-center gap-4 p-4 rounded-lg bg-primary/15 border border-primary">
						<Image source={icons.visa} resizeMode="contain" className="w-[45px] h-[35px]" />
						<View>
							<Text className="text-tertiary-100 font-medium">**** **** **** 8970</Text>
							<Text className="text-tertiary-400 text-sm font-medium">Expires: 12/26</Text>
						</View>
					</View>
					<View className="relative flex-row items-center gap-4 p-4 rounded-lg bg-primary/15 border border-primary">
						<Image source={icons.masterCard} resizeMode="contain" className="w-[45px] h-[35px]" />
						<View>
							<Text className="text-tertiary-100 font-medium">**** **** **** 8970</Text>
							<Text className="text-tertiary-400 text-sm font-medium">Expires: 12/26</Text>
						</View>
						<View className="absolute inset-0 bg-[#E2F5ED]/80 z-50"></View>
					</View>
					<View className="relative flex-row items-center gap-4 p-4 rounded-lg bg-primary/15 border border-primary">
						<Image source={icons.paypal} resizeMode="contain" className="w-[45px] h-[35px]" />
						<View>
							<Text className="text-tertiary-100 font-medium">mailaddress@mail.com</Text>
							<Text className="text-tertiary-400 text-sm font-medium">Expires: 12/26</Text>
						</View>
						<View className="absolute inset-0 bg-[#E2F5ED]/80 z-50"></View>
					</View>
					<View className="relative flex-row items-center gap-4 p-4 rounded-lg bg-primary/15 border border-primary">
						<Image source={icons.cash} resizeMode="contain" className="w-[45px] h-[35px]" />
						<View>
							<Text className="text-tertiary-100 font-medium">Cash</Text>
							<Text className="text-tertiary-400 text-sm font-medium">Expires: 12/26</Text>
						</View>
						<View className="absolute inset-0 bg-[#E2F5ED]/80 z-50"></View>
					</View>
				</View>
			</View>
			{!togglePaymentMethod && (
				<PrimaryBtn text="Confirm" fn={() => setModal(true)} additionalStyle="mt-auto mb-5" />
			)}

			{modal && (
				<ModalTemplate status={modal} close={() => setModal(false)}>
					<>
						<View className="min-w-full">
							<View className="w-[60%] mx-auto mt-6">
								<Text className="text-center font-medium text-2xl text-primary-100">
									Add Success
								</Text>
								<Text className="text-center text-tertiary-800 text-sm font-medium mt-2">
									Your money has been add successfully
								</Text>
								<Text className="text-center text-tertiary-100 text-xs font-medium mt-7">
									Amount
								</Text>
								<Text className="text-center text-tertiary-100 text-[34px] mt-2">$220</Text>
							</View>
						</View>

						<View className="px-4">
							<PrimaryBtn
								text="Back Home"
								fn={() => router.push('/(tabs)/home')}
								additionalStyle="mt-10 min-w-full"
							/>
						</View>
					</>
				</ModalTemplate>
			)}
		</SafeAreaView>
	);
};

export default AddMoney;
