import React, { useEffect, Suspense, useRef } from 'react';
import Modal from 'react-modal';
import FamilyMembers from './family-members';
import Loading from '@/components/loading';
import { AddFamilyMemberForm } from './add-family-member-form';
import { Separator } from '../../components/ui/separator';
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
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75"
    >
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-full overflow-auto p-6">
        <button onClick={onRequestClose} className="mb-4">Close</button>
        <h1 className="text-3xl font-bold">{family?.name} Family</h1>
        {family && (
          <Suspense fallback={<Loading />}>
            <FamilyMembers ref={familyMembersRef} familyId={family.id} />
          </Suspense>
        )}
        {family && (
          <>
            <Separator className="mx-auto mt-2 w-[100%]" />
            <AddFamilyMemberForm familyId={family.id} onSuccess={handleMemberAddSuccess} />
            <EditFamilyForm family={family} onSuccess={handleFamilyEditSuccess} />
          </>
        )}
      </div>
    </Modal>
  );
};

export default ModalComponent;

