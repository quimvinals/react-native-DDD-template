import { NavigationContext, NavigationRouteContext } from '@react-navigation/native';
import * as React from 'react';

interface Props {
  navigate?: () => void;
  reset?: () => void;
  goBack?: () => void;
  params?: object;
  name?: string;
  isFocused?: () => boolean;
  addListener?: () => void;
}

export const MockNavigator: React.FC<Props> = (props) => {
  const { navigate, reset, goBack, params, name, children, isFocused, addListener } = props;
  const navContext: any = {
    addListener,
    goBack,
    isFocused,
    navigate,
    reset,
  };

  const routeContext: any = {
    name,
    params,
  };
  return (
    <NavigationContext.Provider value={navContext}>
      <NavigationRouteContext.Provider value={routeContext}>
        {children}
      </NavigationRouteContext.Provider>
    </NavigationContext.Provider>
  );
};

MockNavigator.defaultProps = {
  addListener: () => null,
  goBack: () => null,
  isFocused: () => true,
  navigate: () => null,
  reset: () => null,
};
