import * as React from 'react';
import { Text } from '@components/Text';

interface Props {
  headerText:string|undefined;
}

export function CategoryHeader({headerText}: Props) {
  return (
    <Text variant="category">{headerText}</Text>
  );
};

