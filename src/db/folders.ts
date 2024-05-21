import { supabase } from '@/lib/supabase/browser-client';
import { TablesInsert, TablesUpdate } from '@/supabase/types';
import { revalidatePath } from 'next/cache';

export const getFoldersByWorkspaceId = async (workspaceId: string) => {
  const { data: folders, error } = await supabase
    .from('folders')
    .select('*')
    .eq('workspace_id', workspaceId);

  if (!folders) {
    throw new Error(error.message);
  }

  return folders;
};

export const createFolder = async (folder: TablesInsert<'folders'>) => {
  const { data: createdFolder, error } = await supabase
    .from('folders')
    .insert([folder])
    .select('*')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/chat');

  return createdFolder;
};

export const updateFolder = async (
  folderId: string,
  folder: TablesUpdate<'folders'>
) => {
  const { data: updatedFolder, error } = await supabase
    .from('folders')
    .update(folder)
    .eq('id', folderId)
    .select('*')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/chat');

  return updatedFolder;
};

export const deleteFolder = async (folderId: string) => {
  const { error } = await supabase.from('folders').delete().eq('id', folderId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/chat');

  return true;
};
