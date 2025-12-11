import {
  WithSpringConfig,
  WithTimingConfig,
} from 'react-native-reanimated';

export type ShowBottomSheet = (content: React.ReactNode) => void;
export type HideBottomSheet = () => void;
export type SnapBottomSheet = (position: number | string, animationConfigs?: WithSpringConfig | WithTimingConfig) => void;
export type ExpandedBottomSheet = boolean;

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
  /**
   * Snap BottomSheet to position in pixel or percentage
   */
  snapBottomSheet: SnapBottomSheet;
  /**
   * Check if BottomSheet is expanded
   */
  expandedBottomSheet: ExpandedBottomSheet;
}
