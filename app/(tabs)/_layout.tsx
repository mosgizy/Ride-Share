import AddressSelectionModal from '@/components/AddressSelectionModal';
import LocationScreenConfirm from '@/components/LocationScreenConfirm';
import Sidebar from '@/components/Sidebar';
import { icons } from '@/constants';
import { supabase } from '@/lib/supabase';
import useAuhStore from '@/store/authStore';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ColorValue, Image, ImageSourcePropType, Text, View } from 'react-native';

interface TabIconI {
	icon: ImageSourcePropType;
	color: ColorValue;
	name: string;
	focused: boolean;
}

const TabIcon = ({ icon, color, name, focused }: TabIconI) => {
	return (
		<View
			className={`${
				focused ? '-translate-y-11' : ''
			} items-center justify-center gap-1 mt-14 h-full min-w-[200px]`}
		>
			<View
				className={`${
					focused ? 'bg-primary rounded-full w-28 h-28 justify-center items-center' : ''
				}`}
			>
				<Image
					source={icon}
					resizeMode="contain"
					tintColor={focused ? color : undefined}
					className={`${focused ? 'w-14 h-14' : 'w-6 h-6'}`}
				/>
			</View>
			<Text className={`${focused ? 'text-primary' : ''} capitalize font-semibold text-xs w-full`}>
				{name}
			</Text>
		</View>
	);
};

const Pages = () => {
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarShowLabel: false,
					tabBarActiveTintColor: 'white',
					tabBarInactiveTintColor: '#414141',
					tabBarStyle: {
						backgroundColor: '#ffffff',
						borderTopRightRadius: 65,
						borderTopLeftRadius: 65,
						height: 120,
						alignItems: 'center',
						borderColor: '#08B783',
					},
				}}
			>
				<Tabs.Screen
					name="home"
					options={{
						title: 'home',
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon icon={icons.home} color={color} focused={focused} name="Home" />
						),
					}}
				/>

				<Tabs.Screen
					name="favourite"
					options={{
						title: 'favourite',
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon icon={icons.favorite} color={color} focused={focused} name="Favourite" />
						),
					}}
				/>
				<Tabs.Screen
					name="wallet"
					options={{
						title: 'wallet',
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon icon={icons.wallet} color={color} focused={focused} name="Wallet" />
						),
					}}
				/>
				<Tabs.Screen
					name="offer"
					options={{
						title: 'offer',
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon icon={icons.offer} color={color} focused={focused} name="offer" />
						),
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						title: 'profile',
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon icon={icons.profile} color={color} focused={focused} name="profile" />
						),
					}}
				/>
			</Tabs>
			<Sidebar />
			<AddressSelectionModal />
			<LocationScreenConfirm />
			<StatusBar style="dark" />
		</>
	);
};

export default Pages;
