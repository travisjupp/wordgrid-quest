import BottomSheetContext from '@contexts/BottomSheetContext';
import { useContext } from 'react';

export const useBottomSheetCustom = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }
  return context;
};
