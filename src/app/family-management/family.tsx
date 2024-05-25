'use client';
import { useState } from 'react';
import { deleteFamily } from './actions';
import { Loader2, Trash2Icon, Edit2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModalComponent from './ModalComponent';

export default function Family({ families }: { families: any }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteFamily(families.id);
    setIsDeleting(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = (name: string) => {
    // Implement the save logic here, e.g., update the family name
    console.log('Saved name:', name);
  };

  return (
    <tr>
      <td>{families.name}</td>
      <td>
        <Button
          variant="destructive"
          disabled={isDeleting}
          onClick={handleDelete}
        >
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
        <Button variant="default" onClick={openModal}>
          <Edit2Icon size={24}>
            <title className="sr-only">Edit</title>
          </Edit2Icon>
        </Button>
        <ModalComponent
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          family={families}
          onSave={handleSave}
        />
      </td>
    </tr>
  );
}
