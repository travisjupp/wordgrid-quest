import { View } from "react-native";
import { Text } from '@components/Text';
import { useAppTheme } from '@theme/themeConfig';

const Timer = () => {
  const {timer} = useAppTheme();
  return (
    <View style={timer}>
      <Text variant="timer">
        00:00
      </Text>
    </View>
  );
};

export default Timer;
