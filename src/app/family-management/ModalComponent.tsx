import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { createClient } from '@/lib/supabase/client';

interface ModalComponentProps {
  isOpen: boolean;
  onRequestClose: () => void;
  family: any;
  onSave: (name: string) => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, onRequestClose, family, onSave }) => {
  const [name, setName] = useState(family.name);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (typeof document !== 'undefined') {
      Modal.setAppElement(document.body);
    }
  }, []);

  const handleSave = () => {
    onSave(name);
    onRequestClose();
  };

  const handleAddFamilyMember = async () => {
    try {
      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();
      const { data: contactsData, error } = await supabase
        .from('profiles')
        .update({ family_id: family.id })
        .eq('email', userData.user?.email);
  
      if (error) {
        console.error('Error updating user:', error);
        alert('Error updating user: ' + error.message);
      } else {
        console.log('User updated:');
        alert('Family member added successfully');
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error('Unexpected error:', err);
        alert('Unexpected error occurred: ' + err.message);
      } else {
        console.error('Unexpected error:', err);
        alert('Unexpected error occurred');
      }
    }
    onRequestClose();
  };
  
  
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Family"
    >
      <h2>Edit Family</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Family Name" />
      <button onClick={handleSave}>Save</button>
      <h2>Add Family Member</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="User Email"
      />
      <button onClick={handleAddFamilyMember}>Add Family Member</button>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default ModalComponent;
