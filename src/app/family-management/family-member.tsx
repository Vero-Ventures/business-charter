'use client';
import { useState } from 'react';
import { deleteFamilyMember } from './actions';
import { Loader2, Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FamilyMember({ member: contact }: { member: any }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteFamilyMember(contact.id);
    setIsDeleting(false);
  };

  return (
    <tr>
      <td>{contact.name}</td>
      <td>{contact.title}</td>
      <td>{contact.email}</td>
      <td>{contact.phone}</td>
      <td>
        <Button
          variant="destructive"
          disabled={isDeleting}
          onClick={handleDelete}>
          {isDeleting ? (
            <Loader2 className="animate-spin" size={24}>
              <title className="sr-only">Delete</title>
            </Loader2>
          ) : (
            <Trash2Icon size={24}>
              <title className="sr-only">Delete</title>
            </Trash2Icon>
          )}
        </Button>
      </td>
    </tr>
  );
}
