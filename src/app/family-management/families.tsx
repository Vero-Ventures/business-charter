'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Family from './family-member';

export default function Families() {
  const [families, setFamilies] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadContacts() {
      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();
      const { data: familiesData, error } = await supabase
        .from('families')
        .select('*');
        // .eq('user_id', userData.user?.id);

      if (error) {
        setError(error.message);
      } else {
        setFamilies(familiesData);
      }
    }

    loadContacts();
  }, []);

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
              <Family key={families.family_name} families={families} />
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">You have no contacts yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}