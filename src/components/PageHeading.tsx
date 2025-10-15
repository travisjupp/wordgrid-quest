import { Text } from '@components/Text';
import { usePathname } from 'expo-router';

interface Props {
  text?: string | undefined;
}

export function PageHeading({ text }: Props) {
  const pathname = usePathname();

  const pageHeadingTextSelector = () => {
    switch (pathname) {
      case '/login':
      case '/signup':
        return 'Welcome';
      case '/loadcat':
        return 'Load Material';
      default:
        return 'Path not found';
    }
  };

  return <Text variant='headlineSmall'>{pageHeadingTextSelector()}</Text>;
}
