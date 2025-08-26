import { SignUp } from "@components/SignUp";
import { Text } from "@components/Text";
import { router } from "expo-router";

export default function SignupScreen() {
  return (
    <>
      <SignUp />
      <Text variant='bodyLarge'>Have an account?
      <Text variant='bodyLargeEmphasized' onPress={() => {router.navigate('/login')}}> Sign In</Text>
      </Text>
    </>
  );
}

