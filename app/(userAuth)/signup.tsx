import SignUp from "@components/SignUp";
import { Text } from "@components/Text";
import { useAppTheme } from "@theme/themeConfig";
import { router } from "expo-router";
import { View } from "react-native";


export default function SignupScreen() {
  // Retrieve Custom Properties
  const { container } = useAppTheme();
  return (
    <>
      <SignUp />
      <Text variant='bodyLarge'>Have an account?
      <Text variant='bodyLargeEmphasized' onPress={() => {router.navigate('/login')}}> Sign In</Text>
      </Text>
    </>
  );
}


