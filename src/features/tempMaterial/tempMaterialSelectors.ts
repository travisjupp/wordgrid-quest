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

const MIN_ITEMS_REQUIRED = 3;

export const selectValidationErrors = (state: RootState) => {
  const { isInitialState, category, items } = state.tempMaterial;
  const itemEntries = Object.values(items);
  const numItems = itemEntries.length;

  if (!category.trim()) return 'Assign a Category to begin';

  if (isInitialState) {
    return `At least ${MIN_ITEMS_REQUIRED} items required`;
  }

  const itemsRequired = numItems < MIN_ITEMS_REQUIRED;
  if (itemsRequired) {
    const remainingCount = MIN_ITEMS_REQUIRED - numItems;
    const unit = remainingCount === 1 ? 'item' : 'items';
    return `Add ${remainingCount} more ${unit}`;
  }

  const hasIncompleteFields = itemEntries.some(
    i => !i.dt.trim() || !i.def.trim(),
  );
  return hasIncompleteFields ? 'Complete all Discovery fields' : null;
};
