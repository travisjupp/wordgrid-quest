import { combineReducers } from '@reduxjs/toolkit';
import timerReducer from '@features/timer/timerSlice';

const rootReducer = combineReducers({
  timer: timerReducer,
  // Other slices of state here
});

export default rootReducer;

