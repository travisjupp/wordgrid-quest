import { createContext } from 'react';

type ShowSnackbar = (message: string) => void;

interface SnackbarContextType {
  showSnackbar: ShowSnackbar;
}

const SnackbarContext = createContext<SnackbarContextType | null>(null);
export default SnackbarContext;
