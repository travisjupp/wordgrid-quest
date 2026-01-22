import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DiscoveryTermObject,
  TempMaterialState,
} from '@custom-types/AppTheme';

const initialState: TempMaterialState = {
  isInitialState: true,
  activeItemIndex: null,
  category: '',
  items: {
    0: { dt: '', def: '' },
  },
};

interface AddItemPayload {
  id: number;
  data: DiscoveryTermObject;
}

const tempMaterialSlice = createSlice({
  name: 'tempMaterial',
  initialState,
  reducers: {
    setTempCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    updateTempItem: (state, action: PayloadAction<AddItemPayload>) => {
      state.isInitialState = false;
      const { id, data } = action.payload;
      state.items[id] = data;
    },
    removeTempItem: (state, action: PayloadAction<number>) => {
      delete state.items[action.payload];
    },
    setActiveItemIndex: (state, action: PayloadAction<number>) => {
      state.activeItemIndex = action.payload;
    },
    resetTempMaterial: () => ({ isInitialState: true, category: '', items: {} }),
    resetTempCategory: state => ({
      isInitialState: state.isInitialState,
      category: '',
      items: state.items,
    }),
  },
});

export const {
  setTempCategory,
  setActiveItemIndex,
  updateTempItem,
  removeTempItem,
  resetTempMaterial,
  resetTempCategory,
} = tempMaterialSlice.actions;
export default tempMaterialSlice.reducer;
