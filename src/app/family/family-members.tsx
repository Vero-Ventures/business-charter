'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import FamilyMember from './family-member';
import { loadFamilyMembers } from './actions';

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

      try {
        const familyMembers = await loadFamilyMembers(userData.user?.id);
        setContacts(familyMembers);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unexpected error occurred');
        }
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
