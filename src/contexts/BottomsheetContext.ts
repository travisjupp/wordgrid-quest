import { createContext } from 'react';
import { BottomsheetContextType } from '@custom-types/BottomsheetTypes';

const BottomsheetContext = createContext<BottomsheetContextType | null>(null);
export default BottomsheetContext;
