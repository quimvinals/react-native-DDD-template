import * as React from 'react';
import { Text } from 'react-native';

import { testIdProps } from './test';

export const DummyComponent: React.FC = () => (
  <Text {...testIdProps('dummy-component')}>Lorem ipsum</Text>
);
