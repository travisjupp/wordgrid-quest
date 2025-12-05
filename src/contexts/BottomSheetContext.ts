import { createContext } from 'react';
import { BottomSheetContextType } from '@custom-types/BottomSheetTypes';

const BottomSheetContext = createContext<BottomSheetContextType | null>(null);
export default BottomSheetContext;
