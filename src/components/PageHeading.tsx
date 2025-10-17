import { Text } from '@components/Text';
import { usePathname } from 'expo-router';

export function PageHeading() {
  const pathname = usePathname();

  const pageHeadingTextSelector = () => {
    switch (pathname) {
      case '/login':
      case '/signup':
        return 'Welcome';
      case '/loadcat':
      case '/loaditems':
        return 'Load Material';
      default:
        return 'Path not found';
    }
  };

  return <Text variant='headlineSmall'>{pageHeadingTextSelector()}</Text>;
}
