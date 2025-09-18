export type ShowModal = (content: React.ReactNode) => void;
export type HideModal = () => void;

export interface ModalContextType {
  /**
   * Displays a modal containing a component
   * @param content The content for the modal.
   */
  showModal: (content: React.ReactNode) => void;
  /**
   * Hides the currently visible modal.
   */
  hideModal: () => void;
}
