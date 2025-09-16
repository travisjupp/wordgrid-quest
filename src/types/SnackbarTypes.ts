
export type Message = string;
export type Icon = string | undefined;
export type Visible = boolean;
export type IconPressCallback = (() => void) | undefined;
export type Action = ActionObject | undefined;
export type ActionLabel = string;

export interface ActionObject {
  label: ActionLabel;
  onPress: IconPressCallback;
}

export interface SnackbarState {
  message: Message;
  icon: Icon;
  visible: Visible;
  iconPressCb: IconPressCallback;
  action: Action;
}

export interface SnackbarConfig {
  /** The message text displayed in the snackbar. */
  message: Message;
  /** The name of the icon to display. */
  icon?: Icon;
  /** A callback function to execute when the icon is pressed. */
  iconPressCb?: IconPressCallback;
  /** The action button configuration. */
  action?: Action;
}

export type ShowSnackbar = (snackbarConfig: SnackbarConfig) => void;
export type HideSnackbar = () => void;

export interface SnackbarContextType {
  /**
   * Displays a snackbar with a message and optional action.
   * @param snackbarConfig The configuration object for the snackbar.
   */
  showSnackbar: (snackbarConfig: SnackbarConfig) => void;
  /**
   * Hides the currently visible snackbar. */
  hideSnackbar: () => void;
}
