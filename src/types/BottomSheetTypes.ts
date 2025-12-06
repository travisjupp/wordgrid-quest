export type ShowBottomSheet = (content: React.ReactNode) => void;
export type HideBottomSheet = () => void;

export interface BottomSheetContextType {
  /**
   * Displays a BottomSheet containing a component
   * @param content The content for the BottomSheet.
   */
  showBottomSheet: ShowBottomSheet;
  /**
   * Hides the currently visible BottomSheet.
   */
  hideBottomSheet: HideBottomSheet;
}
