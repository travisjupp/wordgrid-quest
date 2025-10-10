import type { RootState } from '@store/index';

export const selectTempCustomMaterialArray = (state: RootState) => {
  return state.tempMaterial.discoveryTerms || [];
};

export const selectTempCustomCategory = (state: RootState) => {
  return state.tempMaterial.category || '';
};
