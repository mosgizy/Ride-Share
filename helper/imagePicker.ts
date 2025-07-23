import * as ImagePicker from 'expo-image-picker';

export const imagePicker = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (result.canceled) return
  
  return result.assets[0]
}