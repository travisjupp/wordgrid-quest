import { useAppTheme } from '@theme/themeConfig';
import { Text } from '@components/Text';
import { View, ScrollView } from 'react-native';


interface Props {
  text?:string|undefined; 
}

const PageHeading = ({text}: Props) => {
  // Retrieve Custom Theme-properties
  const {container} = useAppTheme();
  return (<Text variant='headlineSmall' >{text}</Text>);
}

export default PageHeading;
