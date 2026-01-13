import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DiscoveryTermObject,
  TempMaterialState,
} from '@custom-types/AppTheme';

const initialState: TempMaterialState = {
  category: '',
  items: {},
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
      const { id, data } = action.payload;
      state.items[id] = data;
    },
    removeTempItem: (state, action: PayloadAction<number>) => {
      delete state.items[action.payload];
    },
    resetTempMaterial: () => ({ category: '', items: {} }),
    resetTempCategory: state => ({
      category: '',
      items: state.items,
    }),
  },
});

export const {
  setTempCategory,
  updateTempItem,
  removeTempItem,
  resetTempMaterial,
  resetTempCategory,
} = tempMaterialSlice.actions;
export default tempMaterialSlice.reducer;
