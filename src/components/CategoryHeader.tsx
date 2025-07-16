import * as React from 'react';
import { View } from 'react-native';
import { Text } from '@components/Text';
import { useAppTheme } from '@theme/themeConfig';

interface Props {
  headerText:string;
}

const CategoryHeader = ({headerText}: Props) => {
  // Retrieve Custom Theme-properties
  const { logo, colors: { onBackground } } = useAppTheme();
  return (
    <Text variant="category">{headerText}</Text>
  );
};

export default CategoryHeader;
