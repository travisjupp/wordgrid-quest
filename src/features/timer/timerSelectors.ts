import type { RootState } from '../../store';

export const selectTimerIsRunning = (state: RootState) => state.timer.isRunning;
export const selectTargetTime = (state: RootState) => state.timer.targetTime;

