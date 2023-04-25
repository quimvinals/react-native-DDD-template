/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigation, so head over there
 * if you're interested in adding screens and navigators.
 */
import '~/i18n';
import * as React from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';

import { ToggleStorybook } from '~/storybook/toggle-storybook';

import { Application } from './application/application';
import { IApplication } from './application/application.interface';
import { ApplicationLayerProvider } from './hooks/use-application-layer/application-context';
import { RootNavigator } from './navigation';

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
enableScreens();

/**
 * This is the root component of our app.
 */
function App() {
  const [applicationLayer, setApplicationLayer] = React.useState<
    IApplication | undefined
  >(undefined);

  React.useEffect(() => {
    (async () => {
      if (!applicationLayer) {
        const app = new Application();
        await app.setup();
        setApplicationLayer(app);
      }
    })();
  }, []);

  React.useEffect(() => {
    if (applicationLayer) {
      SplashScreen.hide();
    }
  }, [applicationLayer]);

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color. You can replace
  // with your own loading component if you wish.
  if (!applicationLayer) return null;

  // otherwise, we're ready to render the app
  return (
    <ToggleStorybook>
      <ApplicationLayerProvider value={applicationLayer}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <RootNavigator />
        </SafeAreaProvider>
      </ApplicationLayerProvider>
    </ToggleStorybook>
  );
}

export default App;
