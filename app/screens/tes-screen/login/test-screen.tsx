import { observer } from 'mobx-react-lite';
import React from 'react';
import { View } from 'react-native';

import { TestScreenProps as Props } from './test-screen.props';
import { TestScreenStyles as styles } from './test-screen.styles';

export const TestScreen: React.FC<Props> = observer(() => {
  return <View style={styles.view.content}></View>;
});
