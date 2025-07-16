import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TimerState {
  isRunning: boolean;
  targetTime: number;
}

const initialState: TimerState = {
  isRunning: false,
  targetTime: 0,
}

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: { 
    startTimer: (state, action: PayloadAction<number>) => {
      state.isRunning = true;
      state.targetTime = action.payload;
    },
    stopTimer: (state) => {
      state.isRunning = false;
    },
    resetTimer: (state) => {
      state.isRunning = false;
    },
  }
});

export const { startTimer, stopTimer, resetTimer } = timerSlice.actions;
export default timerSlice.reducer;

