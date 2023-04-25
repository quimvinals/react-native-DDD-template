import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

/**
 * Helper component to create a Dummy Stack to access {navigation} object on *.story.tsx files
 *
 * @usage add this decorator
 * ```
 * .addDecorator(reactNavigationDecorator)
 * ```
 */

const StoryBookStack = createStackNavigator();

export const reactNavigationDecorator = (story) => {
  const Screen = () => story();
  return (
    <NavigationContainer independent>
      <StoryBookStack.Navigator>
        <StoryBookStack.Screen
          component={Screen}
          name="MyStorybookScreen"
          options={{ header: () => null }}
        />
      </StoryBookStack.Navigator>
    </NavigationContainer>
  );
};
