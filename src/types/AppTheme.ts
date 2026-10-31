import { themeBuilder } from '@theme/themeConfig';
import { DiscoveryTermObjectInput } from '@shared/domain/customMaterial/discoverySchema';

export type AppTheme = ReturnType<typeof themeBuilder>;

export interface CustomMaterialArray {
  [key: string]: DiscoveryTermObjectInput[];
}

export interface InitialMaterialSliceState {
  activeCategory: string;
  category: CustomMaterialArray;
}

export type NumericKeyObjectRecord = Record<number, DiscoveryTermObjectInput>;

export interface TempMaterialState {
  category: string;
  items: NumericKeyObjectRecord;
  isInitialState?: boolean;
  activeItemIndex?: number | null;
  scrollPulse?: number;
  UIReadyForScroll?: boolean;
  itemFocusDisabled?: boolean;
}
