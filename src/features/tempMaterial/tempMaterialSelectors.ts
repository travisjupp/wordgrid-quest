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

export const selectScrollPulse = (state: RootState) => {
  return state.tempMaterial.scrollPulse;
};

export const selectUIReadyForScroll = (state: RootState) => {
  return state.tempMaterial.UIReadyForScroll;
};

export const selectItemFocusDisabled = (state: RootState) => {
  return state.tempMaterial.itemFocusDisabled;
};

export const selectValidationErrors = (state: RootState) => {
  const { category, items } = state.tempMaterial;
  const itemEntries = Object.values(items);

  if (!category.trim()) return 'Assign a Category to begin';
  if (itemEntries.length < 3) return `Add ${3 - itemEntries.length} more items`;

  const hasIncompleteFields = itemEntries.some(
    i => !i.dt.trim() || !i.def.trim(),
  );
  if (hasIncompleteFields) return 'Complete all Discovery fields';

  return null;
};
