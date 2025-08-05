import { combineReducers } from '@reduxjs/toolkit';
import timerReducer from '@features/timer/timerSlice';
import materialReducer from '@features/material/materialSlice';
import tempMaterialReducer from '@features/tempMaterial/tempMaterialSlice';

const rootReducer = combineReducers({
  timer: timerReducer,
  material: materialReducer,
  tempMaterial: tempMaterialReducer,
  // Other slices of state here
});

export default rootReducer;

