import { View } from 'react-native';
import { Text } from '@components/Text';
import { useAppTheme } from '@theme/themeConfig';
import { useState, useRef, useEffect } from 'react';
import { Button } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '@hooks/useAppHooks';
import { startTimer, stopTimer, resetTimer } from '@features/timer/timerSlice';
import { selectTargetTime, selectTimerIsRunning } from '@features/timer/timerSelectors';

export function Timer() {
  const dispatch = useAppDispatch();
  const isRunning = useAppSelector(selectTimerIsRunning);
  const targetTime = useAppSelector(selectTargetTime);
  // Display time remaining
  const [ timeRemaining, setTimeRemaining ] = useState(0);
  // Local ref for interval ID
  const intervalIdRef = useRef<number | null>(null); 

  useEffect(() => {
    if (isRunning && targetTime) {
      intervalIdRef.current = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, targetTime - now);
        setTimeRemaining(remaining);

        if (remaining === 0 && intervalIdRef.current) {
          clearInterval(intervalIdRef.current);
          dispatch(stopTimer());
        }
      }, 1000);
    } else {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [isRunning, targetTime, dispatch]);

  const handleTimerStart = () => {
    dispatch(startTimer(Date.now() + 1000 * 60 * 5));
  };
  const handleTimerStop = () => {
    dispatch(stopTimer());
  };
  const handleTimerReset = () => {
    dispatch(resetTimer());
    setTimeRemaining(0);
  };

  const formatTime = (ms:number) => {
    // const hours = Math.floor(ms / (1000 * 60 * 60))%12;
    const minutes = Math.floor(ms / (1000 * 60))%60;
    const seconds = Math.floor(ms / 1000)%60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Retrieve Custom Theme-properties
  const {
    // newsurfaceContainer,
    // colors: { brandPrimary },
    timer,
    colors: { onSecondaryContainer }
  } = useAppTheme();

  return (
    <View style={timer}>
      <Text variant="timer" style={{color: onSecondaryContainer}}>
        {formatTime(timeRemaining)}
      </Text>
      <Button onPress={handleTimerReset} icon="redo">
        <Text style={{color: onSecondaryContainer}}>Reset Timer</Text>
      </Button>
      {/* <Button onPress={handleTimerPause} icon="pause">Pause Timer</Button> */}
      <Button onPress={handleTimerStart} icon="play">Start Timer</Button>
      <Button onPress={handleTimerStop} icon="stop">Stop Timer</Button>
    </View>
  );
};

