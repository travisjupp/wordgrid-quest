import { View, ScrollView, StyleSheet, Dimensions, DimensionValue } from 'react-native';
import { Text } from '@components/Text';
import { useRef, useState } from 'react';

interface Props {
  definitions?:string[];
  width?:DimensionValue;
  height?:DimensionValue;
}

// const { width } = Dimensions.get('window'); // Get the device width
// const definitions = [
//   "This is the first paragraph. A little longer to see how it wraps.",
//   "Here is the second paragraph.  It's also quite informative and can be a bit lengthy to showcase the carousel's adaptability.",
//   "And finally, the third paragraph. This one provides a concise summary of the key points discussed earlier."
// ];

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

  const scrollViewRef = useRef(null);
  return (
    <View 
      style={[styles.carouselContainer, {width, height}]}
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
          <View key={index} style={[styles.page, { width, height }]}
            testID={"ScrollView"+index}
          >
            <Text style={styles.paragraphText}>{paragraph}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.dotsContainer}>
        {definitions?.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    width: "auto",
    flex: 1,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#00FF00',
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, // Add some padding for better readability
    height: "auto",
    // width: "100%"
  },
  paragraphText: {
    textAlign: 'center',
    fontSize: 26,
    lineHeight: 24,
    borderWidth: 1,
    borderColor: 'red',
    color: '#FF00FF',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#ccc', // Inactive dot color
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#333', // Active dot color
  },
});

export default DefinitionCarousel;
