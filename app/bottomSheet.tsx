import React, { useState } from 'react';
import { Button, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <View style={{ flex: 1 }}>
        <Button title="Toggle Sheet" onPress={() => setIsOpen(o => !o)} />
        <BottomSheet
          snapPoints={['50%', '75%']}
          index={isOpen ? 0 : -1}
          // index={0}
          onChange={idx => setIsOpen(idx !== -1)}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Close" onPress={() => setIsOpen(false)} />
          </View>
        </BottomSheet>
      </View>
  );
}
