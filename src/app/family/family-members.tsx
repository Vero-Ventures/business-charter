'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import FamilyMember from './family-member';

export default function Contacts() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function loadContacts() {
      const supabase = createClient();
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError) {
        setError(userError.message);
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('family_id')
        .eq('user_id', userData.user?.id)
        .single();

      if (profileError) {
        setError(profileError.message);
        return;
      }

      const { data: familyMembers, error: familyError } = await supabase
        .from('profiles')
        .select('*')
        .eq('family_id', profileData?.family_id);

      if (familyError) {
        setError(familyError.message);
      } else {
        setContacts(familyMembers);
      }
    }

    loadContacts();
  }, []);

  return (
    <div className="prose mt-8">
      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map(contact => (
              <FamilyMember key={contact.email} contact={contact} />
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
