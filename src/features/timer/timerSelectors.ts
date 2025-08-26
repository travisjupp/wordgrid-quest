import type { RootState } from '@store/index';

export const selectTimerIsRunning = (state: RootState) => state.timer.isRunning;
export const selectTargetTime = (state: RootState) => state.timer.targetTime;
