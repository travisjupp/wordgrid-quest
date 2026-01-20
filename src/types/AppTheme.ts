import { themeBuilder } from '@theme/themeConfig';

export type AppTheme = ReturnType<typeof themeBuilder>;

export interface CustomMaterialArray {
  [key: string]: DiscoveryTermObject[];
}

export interface DiscoveryTermObject {
  dt: string;
  def: string;
}

export interface InitialMaterialSliceState {
  activeCategory: string;
  category: CustomMaterialArray;
}

export type NumericKeyObjectRecord = Record<number, DiscoveryTermObject>;

export interface TempMaterialState {
  isInitialState?: boolean;
  activeItemIndex?: number | null;
  category: string;
  items: NumericKeyObjectRecord;
}

