import { ModalContent } from '@custom-types/AppTheme';
import React, { createContext } from 'react';

const ModalContext = createContext({
  showModal: (content: React.ReactNode) => {
    console.log('ModalContext not provided');
  },
  hideModal: () => {
    console.log('ModalContext not provided');
  },
});

export default ModalContext;
