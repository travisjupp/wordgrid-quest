import BottomsheetContext from '@contexts/BottomsheetContext';
import { useContext } from 'react';

export const useBottomsheet = () => {
  const context = useContext(BottomsheetContext);
  if (!context) {
    throw new Error('useBottomsheet must be used within a BottomsheetProvider');
  }
  return context;
};
