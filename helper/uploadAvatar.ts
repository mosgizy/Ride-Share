import { supabase } from '@/lib/supabase';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

interface UploadResponse {
  error: Error | null;
  path?:string
}

export const uploadAvatar = async (uri: string, userId: string): Promise<UploadResponse> => {
  try {
    const fileExt = uri.split('.').pop()?.toLowerCase() || "jpg"
    const validExtensions = ['jpg', 'jpeg', 'png'];

    if (!validExtensions.includes(fileExt)) {
      throw new Error("Unsupported file type. Use jpg, jpeg or png")
    }

    const fileName = `${userId}/${uuidv4()}.png`
    // const path = `avatars/${fileName}`

    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });

    const { error } = await supabase.storage.from('avatars').upload(fileName,decode(base64), {
      contentType : 'image/png'
    })

    if (error) throw error
    
    return {error:null,path:fileName}
  } catch (error) {
    console.error('Avatar upload failed', error.message)
    return {error:error as Error}
  }
}