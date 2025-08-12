import type { RootState } from '@store/index';
import { createSelector } from '@reduxjs/toolkit';

const selectCustomMaterialArray = (state: RootState) => {
  return  state.material.category[state.material.activeCategory] || [];
};

export const selectDiscoveryTermsForActiveCategory = createSelector([selectCustomMaterialArray], (customMaterialArray) => {
  return customMaterialArray
    .map(discoveryTermObject => discoveryTermObject.dt);
});

export const selectDefinitionsForActiveCategory = createSelector([selectCustomMaterialArray], (customMaterialArray) => {
  return customMaterialArray
    .map(discoveryTermObject => discoveryTermObject.def);
});

export const selectActiveCategory = (state: RootState) => {
  return state.material.activeCategory;
};

