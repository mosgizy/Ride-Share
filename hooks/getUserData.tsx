import { supabase } from '@/lib/supabase';
import useAuhStore from '@/store/authStore';
import { useEffect, useState } from 'react';

const useGetUserData = () => {
	const { setProfile } = useAuhStore();
	const [status, setStatus] = useState<{ status: null | boolean; error: string | null }>({
		status: null,
		error: null,
	});

	const getUserData = async () => {
		const {
			data: { session },
			error: sessionError,
		} = await supabase.auth.getSession();

		if (!session) {
			setStatus({ status: false, error: sessionError?.message as string });
			return;
		}

		const { error, data: userData } = await supabase
			.from('users')
			.select('*')
			.eq('email', session!.user.email)
			.single();

		if (error || !userData) {
			console.error('No such user found', error);
			setStatus({ status: false, error: error?.message ?? 'User not found' });
			return;
		}

		setProfile({
			name: userData.name,
			email: userData.email,
			city: userData.city,
			street: userData.street,
			image: userData.avatar_url,
			gender: userData.gender,
			phoneNumber: {
				countryCode: userData.phoneNumber.countryCode,
				number: userData.phoneNumber.number,
				numberCode: userData.phoneNumber.numberCode,
			},
			terms: userData.terms,
		});

		setStatus({ status: true, error: null });
	};

	useEffect(() => {
		getUserData();
	}, []);

	return { status, getUserData };
};

export default useGetUserData;
