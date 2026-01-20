import type { RootState } from '@store/index';

export const selectTempCustomMaterialItems = (state: RootState) => {
  return state.tempMaterial.items || {};
};

export const selectTempCustomCategory = (state: RootState) => {
  return state.tempMaterial.category || '';
};

export const selectIsInitialState = (state: RootState) => {
  return state.tempMaterial.isInitialState;
};

export const selectActiveItemIndex = (state: RootState) => {
  return state.tempMaterial.activeItemIndex;
};

