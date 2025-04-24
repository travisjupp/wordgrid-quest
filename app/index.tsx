import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
    <Text style={styles.text}>Home `app/index.tsx`</Text>
      <Link style={styles.link} href="/details">View details</Link>
      <Link style={styles.link} href="/flex">View flex</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(19 37 64)'
  },
  text: {
    color: 'purple',
    fontSize: 45
  },
  link: {
    color: 'cornflowerblue',
    fontVariant: 'bold',
    fontSize: 26
  }
});

