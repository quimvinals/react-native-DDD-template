/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your MainNavigator) which the user
 * will use once logged in.
 */
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { useApplicationLayer } from '~/hooks';
import { LoginScreen } from '~/screens';

import {
  useBackButtonHandler,
  setRootNavigation,
} from './navigation-utilities';
import { RootParamList } from './params';
import { TabNavigator } from './tab-navigator';

const navigatorScreenOptions = {
  cardOverlayEnabled: true,
  cardStyle: { backgroundColor: 'transparent' },
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 0.5, 0.9, 1],
        outputRange: [0, 0.25, 0.7, 1],
      }),
    },
    overlayStyle: {
      opacity: progress.interpolate({
        extrapolate: 'clamp',
        inputRange: [0, 1],
        outputRange: [0, 0.5],
      }),
    },
  }),
  headerShown: false,
};

const Stack = createStackNavigator<RootParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={navigatorScreenOptions}>
      <Stack.Screen component={TabNavigator} name='Main' />
      <Stack.Screen
        component={LoginScreen}
        name='Login'
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};

const exitRoutes = ['Main'];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);

export const RootNavigator: React.FC = () => {
  const navigationRef = React.useRef<NavigationContainerRef>();
  const {
    controllers: { DriverController },
  } = useApplicationLayer();

  setRootNavigation(navigationRef);
  useBackButtonHandler(navigationRef, canExit);

  React.useEffect(() => {
    if (DriverController?.isLoginNeeded) {
      navigationRef?.current?.navigate('Login');
    }
  }, [navigationRef?.current]);

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack />
    </NavigationContainer>
  );
};

RootNavigator.displayName = 'RootNavigator';
