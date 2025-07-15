import { createSlice } from '@reduxjs/toolkit';

export interface TimerState {
  isRunning: boolean;
}

const initialState: TimerState = {
  isRunning: false,
}

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: { 
    startTimer: (state) => {
      state.isRunning = true;
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

