import { createContext } from 'react';

type IconPressCallback = (() => void) | undefined;
type ShowSnackbar = (message: string, onIconPressCallback?: IconPressCallback) => void;
type HideSnackbar = () => void;

interface SnackbarContextType {
  showSnackbar: ShowSnackbar;
  hideSnackbar: HideSnackbar;
}

const SnackbarContext = createContext<SnackbarContextType | null>(null);
export default SnackbarContext;
