import React, { createContext } from 'react';

type ShowModalType = (content: React.ReactNode) => void;
type HideModalType = () => void;

interface ModalContextType {
  showModal: ShowModalType;
  hideModal: HideModalType;
}

const ModalContext = createContext<ModalContextType | null>(null);
export default ModalContext;
