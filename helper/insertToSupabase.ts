import { supabase } from "@/lib/supabase";

interface TableData {
  [key: string]: any; 
}

export const insertToSupabase = async <T extends TableData>(
  { type, data }: { type: string; data: T }
): Promise<{ error: Error | null }> => {
  try {
    const { error } = await supabase.from(type).insert(data);

    if (error) {
      throw error;
    }

    return {  error: null };
  } catch (error) {
    console.error(`Insert to ${type} failed:`, error instanceof Error ? error.message : 'Unknown error');
    return { error: error instanceof Error ? error : new Error('Unknown error') };
  }
};
