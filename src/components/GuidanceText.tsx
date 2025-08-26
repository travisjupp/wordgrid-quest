import { Text } from '@components/Text';

interface Props {
  text?:string;
}

const GuidanceText = ({text}: Props) => {
  return <Text variant='bodyLarge'>{text}</Text>
}

export default GuidanceText;

