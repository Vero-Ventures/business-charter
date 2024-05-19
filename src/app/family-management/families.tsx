'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Contact from './family-member';

export default function Families() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadContacts() {
      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();
      const { data: contactsData, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('user_id', userData.user?.id);

      if (error) {
        setError(error.message);
      } else {
        setContacts(contactsData);
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
            <th>Title</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map(contact => (
              <Contact key={contact.email} contact={contact} />
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