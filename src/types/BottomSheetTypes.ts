export type ShowBottomSheet = (content: React.ReactNode) => void;
export type HideBottomSheet = () => void;

export interface BottomSheetContextType {
  /**
   * Displays a Bottomsheet containing a component
   * @param content The content for the Bottomsheet.
   */
  showBottomSheet: ShowBottomSheet;
  /**
   * Hides the currently visible Bottomsheet.
   */
  hideBottomSheet: HideBottomSheet;
}
