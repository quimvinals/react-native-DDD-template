import { render } from '@testing-library/react-native';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { IApplication, MockApplication } from '~/application';
import { ApplicationLayerProvider } from '~/hooks/use-application-layer/application-context';

import { MockNavigator } from './mock-navigator';

const initialSafeAreaInsets = { bottom: 4, left: 2, right: 3, top: 1 };

const createApplicationProvider = (application: IApplication) => {
  return function Providers({ children }) {
    return (
      <SafeAreaProvider initialSafeAreaInsets={initialSafeAreaInsets}>
        <ApplicationLayerProvider value={application}>{children}</ApplicationLayerProvider>
      </SafeAreaProvider>
    );
  };
};

const createHookWrapper =
  (name, application, goBack = jest.fn(), navigate = jest.fn(), reset = jest.fn()) =>
  // eslint-disable-next-line react/display-name
  ({ children }) =>
    (
      <MockNavigator goBack={goBack} name={name} navigate={navigate} reset={reset}>
        <ApplicationLayerProvider value={application}>{children}</ApplicationLayerProvider>
      </MockNavigator>
    );

const renderWithApplicationLayer = (ui, application: IApplication) => {
  const applicationLayer = application || new MockApplication();
  return render(ui, { wrapper: createApplicationProvider(applicationLayer) });
};

// re-export everything
// eslint-disable-next-line import/export
export * from '@testing-library/react-native';

// override render method
// eslint-disable-next-line import/export
export { renderWithApplicationLayer, createHookWrapper };
