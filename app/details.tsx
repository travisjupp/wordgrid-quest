import { View, Text, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';

export default function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Redirect href="/flex" />
      <Text>Details `app/details.tsx`</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(19 37 64)',
  },
});

