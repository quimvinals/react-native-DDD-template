import initStoryshots, { multiSnapshotWithOptions } from '@storybook/addon-storyshots';

initStoryshots({
  configPath: './storybook',
  framework: 'react-native',
  test: multiSnapshotWithOptions({}),
});
