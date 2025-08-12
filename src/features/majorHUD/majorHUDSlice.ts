import { createSlice, 
  // PayloadAction
} from '@reduxjs/toolkit';

export interface InitialState {
  someBooleanProperty: boolean;
  someNumericProperty: number;
}

const initialState: InitialState = {
  someBooleanProperty: false,
  someNumericProperty: 0,
}

const majorHUDSlice = createSlice({
  name: 'majorHUD',
  initialState,
  reducers: { 
  }
});

// export const {} = majorHUDSlice.actions;
export default majorHUDSlice.reducer;

