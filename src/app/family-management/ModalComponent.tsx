import React, { useState, useEffect, Suspense } from 'react';
import Modal from 'react-modal';
import FamilyMembers from './family-members';
import Loading from '@/components/loading';
import { addFamilyMember } from './actions';

interface ModalComponentProps {
  isOpen: boolean;
  onRequestClose: () => void;
  family: { id: number; name: string } | null;
  onSave: (name: string) => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, onRequestClose, family, onSave }) => {
  const [name, setName] = useState(family?.name || '');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      Modal.setAppElement(document.body);
    }
  }, []);

  useEffect(() => {
    if (family) {
      setName(family.name);
    }
  }, [family]);

  useEffect(() => {
    console.log('Family object:', family);
  }, [family]);

  const handleSave = () => {
    onSave(name);
    onRequestClose();
  };

  const handleAddFamilyMember = async () => {
    if (!family?.id) {
      alert('Invalid family ID');
      return;
    }

    try {
      await addFamilyMember({ email, family_id: family.id });
      alert('Family member added successfully');
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
      <button onClick={onRequestClose}>Close</button>
      <h1 className="text-3xl font-bold">{name} Family</h1>
      {family && (
        <Suspense fallback={<Loading />}>
          <FamilyMembers familyId={family.id} />
        </Suspense>
      )}
      <h2>Add Family Member</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="User Email"
      />
      <button onClick={handleAddFamilyMember}>Add Family Member</button>
      <h2>Edit Family Name</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Family Name" />
      <button onClick={handleSave}>Save</button>
      {error && <p className="error">{error}</p>}
    </Modal>
  );
};

export default ModalComponent;
