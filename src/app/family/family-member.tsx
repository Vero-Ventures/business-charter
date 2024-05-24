'use client';
import { useState } from 'react';
import { Loader2, Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FamilyMember({ contact }: { contact: any }) {
  return (
    <tr>
      <td>{contact.name}</td>
      <td>{contact.title}</td>
      <td>{contact.email}</td>
      <td>{contact.phone}</td>
    </tr>
  );
}
