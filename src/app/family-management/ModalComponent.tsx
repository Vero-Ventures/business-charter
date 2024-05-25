import React, { useEffect, Suspense, useRef } from 'react';
import Modal from 'react-modal';
import FamilyMembers from './family-members';
import Loading from '@/components/loading';
import { AddFamilyMemberForm } from './add-family-member-form';
import { EditFamilyForm } from './edit-family-form';

interface ModalComponentProps {
  isOpen: boolean;
  onRequestClose: () => void;
  family: { id: number; name: string } | null;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, onRequestClose, family }) => {
  const familyMembersRef = useRef<any>(null);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      Modal.setAppElement(document.body);
    }
  }, []);

  const handleMemberAddSuccess = () => {
    if (familyMembersRef.current) {
      familyMembersRef.current.reloadMembers();
    }
  };

  const handleFamilyEditSuccess = () => {
    if (familyMembersRef.current) {
      familyMembersRef.current.reloadMembers();
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
      <h1 className="text-3xl font-bold">{family?.name} Family</h1>
      {family && (
        <Suspense fallback={<Loading />}>
          <FamilyMembers ref={familyMembersRef} familyId={family.id} />
        </Suspense>
      )}
      {family && (
        <>
          <h2>Add Family Member</h2>
          <AddFamilyMemberForm familyId={family.id} onSuccess={handleMemberAddSuccess} />
          <h2>Edit Family Name</h2>
          <EditFamilyForm family={family} onSuccess={handleFamilyEditSuccess} />
        </>
      )}
    </Modal>
  );
};

export default ModalComponent;
