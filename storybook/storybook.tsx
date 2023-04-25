import { getStorybookUI, configure } from '@storybook/react-native';
import React from 'react';

declare let module;

configure(() => {
  require('./storybook-registry');
}, module);

const StorybookUI = getStorybookUI({
  asyncStorage:
    require('@react-native-community/async-storage').default || null,
  host: 'localhost',
  onDeviceUI: true,
  port: 9001,
});

export function StorybookUIRoot() {
  return <StorybookUI />;
}
