import GoBack from '@/components/GoBack';
import PrimaryBtn from '@/components/PrimaryBtn';
import { icons } from '@/constants';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChangePassword = () => {
	const [form, setForm] = useState({
		old: { text: '', status: false },
		new: { text: '', status: false },
		confirm: { text: '', status: false },
	});

	return (
		<SafeAreaView className="h-full px-5">
			<GoBack title="Change Password" />
			<View className="gap-5">
				<View className="flex-row items-center border border-secondary-400 px-5 py-3 rounded-lg text-secondary-600">
					<TextInput
						value={form.old.text}
						onChangeText={(e) => setForm({ ...form, old: { ...form.old, text: e } })}
						placeholder="Old Password"
						placeholderTextColor={'#D0D0D0'}
						secureTextEntry={!form.old.status}
						className="flex-1"
					/>
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => setForm({ ...form, old: { ...form.old, status: !form.old.status } })}
					>
						<Image source={icons.eye} resizeMode="contain" className="h-6 w-6" />
					</TouchableOpacity>
				</View>
				<View className="flex-row items-center border border-secondary-400 px-5 py-3 rounded-lg text-secondary-600">
					<TextInput
						value={form.new.text}
						onChangeText={(e) => setForm({ ...form, new: { ...form.new, text: e } })}
						placeholder="New Password"
						placeholderTextColor={'#D0D0D0'}
						secureTextEntry={!form.new.status}
						className="flex-1"
					/>
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => setForm({ ...form, new: { ...form.new, status: !form.new.status } })}
					>
						<Image source={icons.eye} resizeMode="contain" className="h-6 w-6" />
					</TouchableOpacity>
				</View>
				<View className="flex-row items-center border border-secondary-400 px-5 py-3 rounded-lg text-secondary-600">
					<TextInput
						value={form.confirm.text}
						onChangeText={(e) => setForm({ ...form, confirm: { ...form.confirm, text: e } })}
						placeholder="Confirm Password"
						placeholderTextColor={'#D0D0D0'}
						secureTextEntry={!form.confirm.status}
						className="flex-1"
					/>
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() =>
							setForm({ ...form, confirm: { ...form.confirm, status: !form.confirm.status } })
						}
					>
						<Image source={icons.eye} resizeMode="contain" className="h-6 w-6" />
					</TouchableOpacity>
				</View>
			</View>
			<View className="px-4 mt-10">
				<PrimaryBtn text="Save" fn={() => {}} />
			</View>
			<StatusBar style="dark" />
		</SafeAreaView>
	);
};

export default ChangePassword;
