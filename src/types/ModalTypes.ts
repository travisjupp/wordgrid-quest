export type ShowModal = (content: React.ReactNode) => void;
export type HideModal = () => void;

export interface ModalContextType {
  /**
   * Displays a Modal containing a component
   * @param content The content for the Modal.
   */
  showModal: ShowModal;
  /**
   * Hides the currently visible Modal.
   */
  hideModal: HideModal;
}
