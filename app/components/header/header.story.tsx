import { storiesOf } from '@storybook/react-native';
import * as React from 'react';
import { ViewStyle } from 'react-native';

import { StoryScreen, Story, UseCase } from '~/storybook/views';

import { Header } from './header';

const STYLE: ViewStyle = {
  backgroundColor: 'white',
};

storiesOf('Header', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add('Default', () => (
    <Story>
      <UseCase style={STYLE} text='With title' usage='The primary.'>
        <Header title='Test Header' />
      </UseCase>
    </Story>
  ));
