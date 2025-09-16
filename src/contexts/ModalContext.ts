import React, { createContext } from 'react';
import { ModalContextType } from '@custom-types/ModalTypes';

const ModalContext = createContext<ModalContextType | null>(null);
export default ModalContext;
