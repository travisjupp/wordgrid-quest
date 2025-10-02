export type Message = string;
export type Icon = string | undefined;
export type Visible = boolean;
export type IconPressCallback = (() => void) | undefined;
export type Action = ActionObject | undefined;
export type ActionLabel = string;
export type CalledFromModal = boolean | undefined;

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
  calledFromModal: CalledFromModal;
}

export interface SnackbarConfig {
  /** The message text displayed in the Snackbar. */
  message: Message;
  /** The name of the icon to display in the Snackbar. */
  icon?: Icon;
  /** A callback function to execute when the Snackbar icon is pressed. */
  iconPressCb?: IconPressCallback;
  /** The action button configuration for the Snackbar. */
  action?: Action;
  /** Whether or not Snackbar was called from a Modal. */
  calledFromModal?: CalledFromModal;
}

export type ShowSnackbar = (snackbarConfig: SnackbarConfig) => void;
export type HideSnackbar = () => void;

export interface SnackbarContextType {
  /**
   * Displays a Snackbar with a message and optional action.
   * @param snackbarConfig The configuration object for the Snackbar.
   */
  showSnackbar: ShowSnackbar;
  /**
   * Hides the currently visible Snackbar. */
  hideSnackbar: HideSnackbar;
}
