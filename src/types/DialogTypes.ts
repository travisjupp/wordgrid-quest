import React from 'react';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

export type Title = string | undefined;
export type Icon = IconSource | string | undefined;
export type Visible = boolean;
export type Content = React.ReactNode | string | undefined;
export type Dismissable = boolean;
export type DismissableBackButton = boolean;
export type OnDismissPressCallback = (() => void) | undefined;
export type CalledFromModal = boolean | undefined;
export type Actions = React.ReactNode;
export type ScrollArea = React.ReactNode;

export interface DialogState {
  title: Title;
  content: Content;
  icon: Icon;
  visible: Visible;
  onDismissPressCb: OnDismissPressCallback;
  actions: Actions;
  calledFromModal: CalledFromModal;
}

export interface DialogConfig {
  /** The title text displayed in the Dialog. */
  title?: Title;
  /** The component to show content in the Dialog */
  content?: Content;
  /** The callback to call when Dialog dismissed */
  onDismissPressCb?: OnDismissPressCallback;
  /** The component to show list of actions in Dialog. */
  actions?: Actions;
  /** The name of the icon to display in Dialog. */
  icon?: Icon;
  /** Whether or not Dialog was called from a Modal. */
  calledFromModal?: CalledFromModal;
}

export type ShowDialog = (dialogConfig: DialogConfig) => void;
export type HideDialog = () => void;

export interface DialogContextType {
  /**
   * Displays a Dialog with a content, title, and actions components.
   * @param dialogConfig The configuration object for the Dialog.
   */
  showDialog: ShowDialog;
  /**
   * Hides the currently visible Dialog. */
  hideDialog: HideDialog;
}
