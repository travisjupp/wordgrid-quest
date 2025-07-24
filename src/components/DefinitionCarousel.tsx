import { View, ScrollView, StyleSheet, Dimensions, DimensionValue } from 'react-native';
import { Text } from '@components/Text';
import { useRef, useState } from 'react';
import { useAppTheme } from '@theme/themeConfig';

interface Props {
  definitions?:string[];
  width?:DimensionValue;
  height?:DimensionValue;
}


const DefinitionCarousel = ({definitions, width, height}: Props ) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePagination = (event:any) => {
    // Calculate the current page based on the scroll position
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    console.log('x offset', event.nativeEvent.contentOffset.x);
    if (typeof width === 'number') {
      /* In a 3 item carousel, if the carousel item *width* is 200,
      the *offset* is 0 on load, 200 on first swipe, 400 on last swipe.
      `offset/width` gives us indexes 0, 1, 2 -- one for each swipe --
      which are used to style active carousel dots as indicators */
      const newIndex = Math.round(contentOffsetX / width);
      setActiveIndex(newIndex);
    }
  };

  // Retrieve Custom Theme-properties
  const {
    carousel,
  } = useAppTheme();

  const scrollViewRef = useRef(null);
  return (
    <View 
      style={[carousel.container, {width, height}]}
      testID="ScrollViewWrapper"
    >
      <ScrollView
        testID="ScrollView"
        ref={scrollViewRef}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={handlePagination}
        // alwaysBounceHorizontal={true}
        contentContainerStyle={{ 
          borderWidth: 1, 
          borderColor: 'slateblue'
        }}
        scrollEventThrottle={16} // Adjust as needed for smoother updates
      >
        {definitions?.map((paragraph, index) => (
          <View key={index} style={[carousel.page, { width, height }]}
            testID={"ScrollView"+index}
          >
            <Text style={carousel.paragraphText}>{paragraph}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={carousel.dotsContainer}>
        {definitions?.map((_, index) => (
          <View
            key={index}
            style={[
              carousel.dot,
              activeIndex === index ? carousel.activeDot : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

export default DefinitionCarousel;

