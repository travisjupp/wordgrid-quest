import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DiscoveryTermObject,
  TempMaterialState,
} from '@custom-types/AppTheme';

const initialState: TempMaterialState = {
  category: '',
  discoveryTerms: [],
};

const tempMaterialSlice = createSlice({
  name: 'tempMaterial',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    addItem: (state, action: PayloadAction<DiscoveryTermObject>) => {
      state.discoveryTerms.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<DiscoveryTermObject>) => {
      const CMAwithRemovedDTO = state.discoveryTerms.filter(DTO => {
        return DTO.dt !== action.payload.dt;
      });
      state.discoveryTerms = CMAwithRemovedDTO;
    },
    resetTempMaterial: () => ({ category: '', discoveryTerms: [] }),
    resetTempCategory: state => ({
      category: '',
      discoveryTerms: state.discoveryTerms,
    }),
  },
});

export const {
  setCategory,
  addItem,
  removeItem,
  resetTempMaterial,
  resetTempCategory,
} = tempMaterialSlice.actions;
export default tempMaterialSlice.reducer;
