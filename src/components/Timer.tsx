import { View } from "react-native";
import { Text } from '@components/Text';
import { useAppTheme } from '@theme/themeConfig';
import * as React from 'react';
import { Button } from "react-native-paper";


const Timer = () => {
  const [isRunning, setIsRunning] = React.useState(false);
  const [seconds ,setSeconds] = React.useState(0);

  React.useEffect(() => {
    let interval:any;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 0);
    }
    return () => clearInterval(interval);
  }, [isRunning]);
  const handleTimerReset = () => { setSeconds(0); };
  const handleTimerPause = () => { setIsRunning(!isRunning); };
  const handleTimerStart = () => { setIsRunning(true); };

  const formatTime = (timeInSeconds:number) => {
    // const hours = String(Math.floor(timeInSeconds / 3600)%12).padStart(2, '0');
    const minutes = String(Math.floor(timeInSeconds / 60)%60).padStart(2, '0');
    const seconds = String(timeInSeconds%60).padStart(2, '0');
    // return `${hours}:${minutes}:${seconds}`;
    return `${minutes}:${seconds}`;
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
        {formatTime(seconds)}
      </Text>
      <Button onPress={handleTimerReset} icon="redo">
        <Text style={{color: onSecondaryContainer}}> Reset Timer</Text>
      </Button>
      <Button onPress={handleTimerPause} icon="pause">Pause Timer</Button>
      <Button onPress={handleTimerStart} icon="play">Start Timer</Button>
    </View>
  );
};

export default Timer;
