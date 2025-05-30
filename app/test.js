import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

export default function BottomSheetTest() {
  const [index, setIndex] = useState(-1);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Open Sheet" onPress={() => setIndex(0)} />
      <Button title="Close Sheet" onPress={() => setIndex(-1)} color="red" />
      <BottomSheet
        snapPoints={['40%', '75%']}
        index={index}
        onChange={setIndex}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>This is the BottomSheet</Text>
          <Button title="Close from inside" onPress={() => setIndex(-1)} />
        </View>
      </BottomSheet>
    </View>
  );
}
