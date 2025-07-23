import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

const useGetAvatar = () => {
	const [image, setImage] = useState<string>('');

	const getAvatar = (path: string) => {
		supabase.storage
			.from('avatars')
			.download(path as string)
			.then(({ data }) => {
				const fr = new FileReader();
				fr.readAsDataURL(data!);
				fr.onload = () => {
					setImage(fr.result as string);
				};
			});

		return image;
	};

	useEffect(() => {}, [image]);

	return { getAvatar };
};

export default useGetAvatar;
