import { createContext } from 'react';
import { DialogContextType } from '@custom-types/DialogTypes';

const DialogContext = createContext<DialogContextType | null>(null);
export default DialogContext;
