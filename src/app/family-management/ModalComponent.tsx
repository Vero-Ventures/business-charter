import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

interface ModalComponentProps {
  isOpen: boolean;
  onRequestClose: () => void;
  family: any;
  onSave: (name: string) => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, onRequestClose, family, onSave }) => {
  const [name, setName] = useState(family.name);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      Modal.setAppElement(document.body);
    }
  }, []);

  const handleSave = () => {
    onSave(name);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Family"
    >
      <h2>Edit Family</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleSave}>Save</button>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default ModalComponent;
