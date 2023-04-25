import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { TabParamList } from '~/navigation/params';
import { TestScreen } from '~/screens/tes-screen/login';

import { TabNavigatorStyles as styles } from './tab-navigator.styles';

const Tab = createMaterialBottomTabNavigator<TabParamList>();

/**
 * Tabbed screen menu
 *
 * @param tabs The screen and titles to display in tab menu
 */
export const TabNavigator: React.FC = observer(() => {
  const tabStyles = styles.view.bar;
  return (
    <Tab.Navigator
      activeColor={'blue'}
      backBehavior='none'
      barStyle={tabStyles}
      inactiveColor={'grey'}
    >
      <Tab.Screen
        key='home'
        component={TestScreen}
        name='Home'
        options={{
          title: 'Home',
        }}
      />
    </Tab.Navigator>
  );
});
