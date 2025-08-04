import type { RootState } from '../../store';

export const selectDefinitionsForActiveCategory = (state: RootState) => {
  const customMaterialArray = state.material.category[state.material.activeCategory] || [];
  return customMaterialArray.map(discoveryTermObject => discoveryTermObject.def);
};

export const selectActiveCategory = (state: RootState) => {
  return state.material.activeCategory;
};

