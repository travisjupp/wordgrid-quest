import { combineReducers } from '@reduxjs/toolkit';
import timerReducer from '@features/timer/timerSlice';
import materialReducer from '@features/material/materialSlice';

const rootReducer = combineReducers({
  timer: timerReducer,
  material: materialReducer,
  // Other slices of state here
});

export default rootReducer;

