'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { InsertFamily } from './family-form';

export async function addFamily(contact: InsertFamily) {
  const supabase = createClient();
  const { error } = await supabase.from('families').insert(contact);
  if (error) {
    console.error("Error inserting family:", error.message);
    throw new Error(`Failed to add family: ${error.message}`);
  }

  revalidatePath('/families');
  return { success: true };
}

export async function deleteFamily(id: number) {
  const supabase = createClient();
  const { error } = await supabase.from('families').delete().eq('id', id);
  if (error) {
    console.error("Error deleting family:", error.message);
    throw new Error(`Failed to delete family: ${error.message}`);
  }

  revalidatePath('/families');
  return { success: true };
}

export async function addFamilyMember(contact: InsertFamily) {
  const supabase = createClient();
  const { error } = await supabase.from('contacts').insert(contact);
  if (error) {
    console.error("Error inserting contact:", error.message);
    throw new Error(`Failed to add contact: ${error.message}`);
  }

  revalidatePath('/contacts');
  return { success: true };
}

export async function deleteFamilyMember(id: number) {
  const supabase = createClient();
  const { error } = await supabase.from('contacts').delete().eq('id', id);
  if (error) {
    console.error("Error deleting contact:", error.message);
    throw new Error(`Failed to delete contact: ${error.message}`);
  }

  revalidatePath('/contacts');
  return { success: true };
}