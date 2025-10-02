import { createContext } from 'react';
import { SnackbarContextType } from '@custom-types/SnackbarTypes';

const SnackbarContext = createContext<SnackbarContextType | null>(null);
export default SnackbarContext;
