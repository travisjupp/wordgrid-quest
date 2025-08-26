import { Text } from '@components/Text';

interface Props {
  text?:string;
}

export function GuidanceText({text}: Props) {
  return <Text variant='bodyLarge'>{text}</Text>
}

