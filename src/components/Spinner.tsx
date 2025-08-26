import { ActivityIndicator, View } from 'react-native';

export function Spinner({theme}: any) {
  return (
  <View style={{
    flex: 1, 
    justifyContent: "center", 
    alignContent: "center",
  }}>
    <ActivityIndicator 
      style={{ 
        backgroundColor: theme.colors.background,
        height: "100%",
        width: "100%"
      }} 
      animating={true}
      size="large" 
      color={theme.colors.primary} />
  </View>
  );
};

