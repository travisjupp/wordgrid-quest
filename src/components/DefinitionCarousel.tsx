import { View, ScrollView, DimensionValue } from 'react-native';
import { Text } from '@components/Text';
import { useRef, useState, useEffect } from 'react';
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

  const scrollViewRef = useRef<ScrollView|null>(null);

  useEffect(() => {
    if (scrollViewRef.current && definitions && width) {
      // Get number of carousel frames
      const numFrames = definitions.length;
      // Get the width of a carousel frame
      const frameWidth: any = width;
      const initialDelay = 500;
      const delay = 500;
      const timeouts: number[] = [];
      // Scroll carousel items with a delay
      for (let i = 0; i < numFrames; i++) {
        const tid = setTimeout(() => scrollViewRef
          .current?.scrollTo({ x: frameWidth * i, animated: true }), initialDelay + i * delay);
        timeouts.push(tid);
      };
      // Scroll back to the first frame
      const resetTid = setTimeout(() => scrollViewRef
        .current?.scrollTo({x: 0, animated: true }), initialDelay + numFrames * delay );
      timeouts.push(resetTid);
      // Cleanup
      return () => timeouts.forEach(clearTimeout);
    }
  }, [definitions, width]); 

  return (
    <View 
      style={carousel.container}
      testID="ScrollViewWrapper"
    >
      <ScrollView
        testID="ScrollView"
        ref={scrollViewRef}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={handlePagination}
        alwaysBounceHorizontal={true}
        bounces={true}
        contentContainerStyle={{ 
          borderWidth: 1, 
          borderColor: 'slateblue'
        }}
        style={{ overflow: 'scroll' }} // Web: can scroll overflowing paragraphs
      >
        {definitions?.map((paragraph, index) => (
          <View key={index} 
            style={carousel.page}
            testID={"ScrollView"+index}
          >
          <ScrollView>
            <Text 
              style={[carousel.paragraphText, {width, height}]}
            >{paragraph}</Text>
          </ScrollView>
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

