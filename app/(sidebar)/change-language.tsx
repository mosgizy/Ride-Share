import GoBack from '@/components/GoBack';
import LanguageSelect from '@/components/LanguageSelect';
import { languages } from '@/lib/languages';
import { StatusBar } from 'expo-status-bar';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChangeLanguage = () => {
	return (
		<SafeAreaView className="h-full px-5">
			<GoBack title="Change Language" />
			<FlatList
				data={languages}
				keyExtractor={(item) => item.country}
				renderItem={({ item }) => (
					<LanguageSelect country={item.country} icon={item.icon} language={item.language} />
				)}
			/>
			<StatusBar style="dark" />
		</SafeAreaView>
	);
};

export default ChangeLanguage;
