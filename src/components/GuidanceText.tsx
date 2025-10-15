import { Text } from '@components/Text';
import { usePathname } from 'expo-router';

export function GuidanceText() {
  const pathname = usePathname();

  const guidanceTextSelector = () => {
    switch (pathname) {
      case '/login':
        return 'Sign-in to continue';
      case '/signup':
        return 'Create an account';
      case '/loadcat':
        return 'Create a category for this material';
      default:
        return 'Path not found';
    }
  };

  return <Text variant='bodyLarge'>{guidanceTextSelector()}</Text>;
}
