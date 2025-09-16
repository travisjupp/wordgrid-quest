import { createContext } from 'react';

type Message = string;
type Icon = string | undefined;
type IconPressCallback = (() => void) | undefined;
type Action = ActionObject | undefined;
type ActionLabel = string;

interface ActionObject {
  label: ActionLabel;
  onPress: IconPressCallback;
}

interface SnackbarConfig {
  message: Message;
  icon?: Icon;
  iconPressCb?: IconPressCallback;
  action?: Action;
}

type ShowSnackbar = (snackbarConfig: SnackbarConfig) => void;
type HideSnackbar = () => void;

interface SnackbarContextType {
  showSnackbar: ShowSnackbar;
  hideSnackbar: HideSnackbar;
}

const SnackbarContext = createContext<SnackbarContextType | null>(null);
export default SnackbarContext;
