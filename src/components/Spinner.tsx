import { ActivityIndicator } from 'react-native-paper';

const Spinner = ({theme}: any) => (
  <ActivityIndicator 
    style={{
      flex: 1, 
      justifyContent: "center", 
      alignItems: "center",
      backgroundColor: theme.colors.background
    }} 
    animating={true}
    size="large" 
    color={theme.colors.primary} />
);

export default Spinner;
