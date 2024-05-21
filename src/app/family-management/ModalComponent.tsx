import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient('https://your-project.supabase.co', 'public-anon-key');

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
      const { data, error } = await supabase
        .from('auth.users')
        .update({ family_id: family.id })
        .eq('email', email);

      if (error) {
        console.error('Error updating user:', error);
      } else {
        console.log('User updated:', data);
        alert('Family member added successfully');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
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
