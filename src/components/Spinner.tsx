import { ActivityIndicator, View } from 'react-native';

const Spinner = ({theme}: any) => (
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

export default Spinner;
