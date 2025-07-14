import { icons, images } from '@/constants';
import useAuhStore from '@/store/authStore';
import useMapStore from '@/store/store';
import { RelativePathString, router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';

const MenuItems = ({
	url,
	icon,
	text,
}: {
	url: RelativePathString;
	icon: ImageSourcePropType;
	text: string;
}) => {
	const { setSideBarModal } = useMapStore();
	const { setIsLoggedIn } = useAuhStore();

	const handleLink = () => {
		if (text === 'logout') {
			setIsLoggedIn(false);
			router.push('/(auth)/login');
			return;
		}

		router.push(url);
		setSideBarModal(false);
	};

	return (
		<TouchableOpacity
			onPress={handleLink}
			className={`${
				text !== 'logout' && 'border-b border-[#E8E8E8]'
			} w-full flex-row items-center gap-3 px-5 py-5`}
		>
			<Image source={icon} resizeMode="contain" className="w-4 h-4" />
			<Text className="text-primary-100 text-xs font-medium capitalize w-full">{text}</Text>
		</TouchableOpacity>
	);
};

const SideBar = () => {
	const slideAnim = useRef(new Animated.Value(-250)).current;
	const { sideBarModal, setSideBarModal } = useMapStore();
	const { profile } = useAuhStore();

	const sideBarItems = [
		{
			url: '/(sidebar)/history',
			icon: icons.history,
			text: 'history',
		},
		{
			url: '/(sidebar)/complain',
			icon: icons.complain,
			text: 'complain',
		},
		{
			url: '/(sidebar)/referral',
			icon: icons.referral,
			text: 'referral',
		},
		{
			url: '/(sidebar)/about',
			icon: icons.about,
			text: 'about us',
		},
		{
			url: '/(sidebar)/settings',
			icon: icons.settings,
			text: 'settings',
		},
		{
			url: '/(sidebar)/help',
			icon: icons.help,
			text: 'help and support',
		},
		{
			url: '/(sidebar)/history',
			icon: icons.logout,
			text: 'logout',
		},
	];

	useEffect(() => {
		Animated.timing(slideAnim, {
			toValue: sideBarModal ? 0 : -250,
			duration: 300,
			useNativeDriver: true,
		}).start();
	}, [sideBarModal]);

	return (
		<View className="absolute inset-0">
			<TouchableOpacity
				onPress={() => setSideBarModal(false)}
				className={`${sideBarModal && 'absolute inset-0 bg-black/10'}`}
			></TouchableOpacity>
			<Animated.View
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					zIndex: 100,
					width: 250,
					height: '100%',
					borderTopRightRadius: 80,
					borderBottomRightRadius: 80,
					backgroundColor: '#fff',
					transform: [{ translateX: slideAnim }],
					elevation: 100,
				}}
			>
				<View className="pt-12 pb-8">
					<TouchableOpacity
						activeOpacity={0.75}
						onPress={() => setSideBarModal(false)}
						className="flex-wrap gap-2 flex-row items-center px-5"
					>
						<Image source={icons.arrowLeft} resizeMode="contain" className="w-4 h-4" />
						<Text className="text-lg text-primary-100 font-regular">Back</Text>
					</TouchableOpacity>
				</View>
				<View className="px-5">
					<View className="w-[70px] h-[70px] rounded-full border border-primary overflow-hidden">
						<Image
							source={profile?.image !== null ? { uri: profile?.image?.uri } : images.profile}
							resizeMode="cover"
							className="w-[70px] h-[70px] rounded-full"
						/>
					</View>
					<Text className="text-primary-100 text-lg uppercase font-medium mt-4">
						{profile?.name}
					</Text>
					<Text className="text-primary-100 text-xs font-medium">{profile?.email}</Text>
				</View>
				<View className="my-10">
					{sideBarItems.map((item, index) => {
						return (
							<MenuItems
								key={index}
								text={item.text}
								icon={item.icon}
								url={item.url as RelativePathString}
							/>
						);
					})}
				</View>
			</Animated.View>
		</View>
	);
};

export default SideBar;
