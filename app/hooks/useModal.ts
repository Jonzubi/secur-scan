import { useState } from 'react';

export function useModal(initialText: string) {
  const [modalText, setModalText] = useState(initialText);
  const [showModal, setShowModal] = useState(false);

  return { modalText, setModalText, showModal, setShowModal };
}
