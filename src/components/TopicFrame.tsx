import { View, DimensionValue } from 'react-native';
import { CategoryHeader } from '@components/CategoryHeader';
import { DefinitionCarousel } from '@components/DefinitionCarousel';
import { useAppTheme } from '@theme/themeConfig';

interface Props {
  definitions?: string[];
  category?: string;
  topicframeWidth?: DimensionValue;
  topicframeHeight?: DimensionValue;
}

export function TopicFrame({
  definitions,
  category,
  topicframeWidth,
  topicframeHeight,
}: Props) {
  // Retrieve Custom Theme-properties
  const { topicFrame } = useAppTheme();

  return (
    <View
      style={[
        topicFrame.container,
        {
          height: topicframeHeight,
          width: topicframeWidth,
        },
      ]}
      testID='TopicFrame'
    >
      <CategoryHeader headerText={category} />
      <DefinitionCarousel
        definitions={definitions}
        width={topicframeWidth}
        height={topicframeHeight}
      />
    </View>
  );
}
