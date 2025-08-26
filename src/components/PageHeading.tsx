import { Text } from '@components/Text';

interface Props {
  text?:string|undefined; 
}

export function PageHeading({text}: Props) {
  return (<Text variant='headlineSmall' >{text}</Text>);
}

