export type ShowBottomsheet = (content: React.ReactNode) => void;
export type HideBottomsheet = () => void;

export interface BottomsheetContextType {
  /**
   * Displays a Bottomsheet containing a component
   * @param content The content for the Bottomsheet.
   */
  showBottomsheet: ShowBottomsheet;
  /**
   * Hides the currently visible Bottomsheet.
   */
  hideBottomsheet: HideBottomsheet;
}
