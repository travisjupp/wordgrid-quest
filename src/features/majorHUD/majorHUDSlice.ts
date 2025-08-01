import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MajorHUDState {
  someBooleanProperty: boolean;
  someNumericProperty: number;
}

const initialState: MajorHUDState = {
  someBooleanProperty: false,
  someNumericProperty: 0,
}

const majorHUDSlice = createSlice({
  name: 'majorHUD',
  initialState,
  reducers: { 
  }
});

export const {} = majorHUDSlice.actions;
export default majorHUDSlice.reducer;

