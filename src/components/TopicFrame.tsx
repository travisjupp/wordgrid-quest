import { View, DimensionValue } from 'react-native';
import CategoryHeader from "@components/CategoryHeader";
import DefinitionCarousel from "@components/DefinitionCarousel";

interface Props {
  definitions?:string[];
  category?:string;
  topicframeWidth?:DimensionValue;
  topicframeHeight?:DimensionValue;
}

const TopicFrame = ({ definitions, category, topicframeWidth, topicframeHeight }: Props) => {
  return (
    <View style={{ 
      height:topicframeHeight, 
      width:topicframeWidth
    }} testID='TopicFrame'>
      <CategoryHeader headerText={category} />
      <DefinitionCarousel definitions={definitions}
        width={topicframeWidth} 
        height={topicframeHeight}
      />
    </View>
  );
};

export default TopicFrame;

