'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function loadFamilyMembers(user_id: string) {
  const supabase = createClient();

  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('family_id')
    .eq('user_id', user_id)
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  const { data: familyMembers, error: familyError } = await supabase
    .from('profiles')
    .select('*')
    .eq('family_id', profileData?.family_id);

  if (familyError) {
    throw new Error(familyError.message);
  }

  return familyMembers;
}