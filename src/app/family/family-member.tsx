'use client';
import { useState } from 'react';
import { Loader2, Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FamilyMember({ member: member }: { member: any }) {
  return (
    <tr>
      <td>{member.name}</td>
      <td>{member.title}</td>
      <td>{member.email}</td>
      <td>{member.phone}</td>
    </tr>
  );
}
