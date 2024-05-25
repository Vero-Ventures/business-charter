'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Family from './family';

export default async function Families() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const { data: families, error } = await supabase
    .from('families')
    .select('*');
    // .eq('user_id', data.user?.id);

  if (error) {
    return <div>{error.message}</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="prose mt-8">
      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {families.length > 0 ? (
            families.map(families => (
              <Family key={families.name} families={families} />
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">You have no family members yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}