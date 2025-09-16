import { SnackbarContextType } from '@custom-types/SnackbarTypes';
import { createContext } from 'react';

const SnackbarContext = createContext<SnackbarContextType | null>(null);
export default SnackbarContext;
