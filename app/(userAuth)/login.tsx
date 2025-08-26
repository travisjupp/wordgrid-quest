import LogIn from "@components/LogIn";
import { Text } from "@components/Text";
import { useAppTheme } from "@theme/themeConfig";
import { router } from "expo-router";
import { View } from "react-native";


export default function SignupScreen() {
  // Retrieve Custom Properties
  const { container } = useAppTheme();
  return (
    <>
      <LogIn />
      <Text variant="bodyLarge">Need an account?
        <Text variant="bodyLargeEmphasized" 
          onPress={() => {router.navigate('/signup')}}> Sign Up</Text>
      </Text>
    </>
  );
}


