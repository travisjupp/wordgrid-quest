import { View } from 'react-native';
import { useAppTheme } from '@theme/themeConfig';
import { Timer } from '@features/timer/Timer';
import { TopicFrame } from '@components/TopicFrame';
import { useAppSelector } from '@hooks/useAppHooks';
import {
  selectDefinitionsForActiveCategory,
  selectActiveCategory,
} from '@features/material/materialSelectors';

export function MajorHUD() {
  const category = useAppSelector(selectActiveCategory);
  const definitions = useAppSelector(selectDefinitionsForActiveCategory);
  // Retrieve Custom Theme-properties
  const { majorHUD } = useAppTheme();

  return (
    <View style={majorHUD.container}>
      <Timer />
      <TopicFrame
        category={category}
        definitions={definitions}
        topicframeWidth={200}
        topicframeHeight={200}
      />
    </View>
  );
}
