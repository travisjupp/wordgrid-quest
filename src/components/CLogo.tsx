
import { Text } from '@/components/Text';
import Logo from './Logo';

import { useAppTheme } from '@/app/_layout';

const CLogo = () => {
  // Retrieve Custom Theme-properties
  const {  logo } = useAppTheme();
  return (
      <Text variant="brandMobile" style={logo}>
        Wordgrid Quest
        <Logo width={25.9} height={25.9} />
      </Text>
      
  )
}

export default CLogo;
